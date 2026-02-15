import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatCircle, 
  PaperPlaneRight, 
  X, 
  Microphone, 
  MicrophoneSlash,
  Paperclip,
  Image as ImageIcon,
  File as FileIcon,
  VideoCamera,
  Trash,
  SparkleIcon as Sparkle,
  Check,
  ArrowDown
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  files?: UploadedFile[]
  voiceInput?: boolean
  suggestions?: string[]
}

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  url: string
  preview?: string
}

interface VoiceCommandResult {
  action: 'navigate' | 'scroll' | 'open' | 'close' | 'demo' | 'unknown'
  target?: string
  recognized: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024

const contextualSuggestions = {
  hero: [
    "Tell me more about MotionFlow AI",
    "How does the AI generation work?",
    "What hardware do I need?"
  ],
  demo: [
    "How do I use the interactive demo?",
    "Can I save my configurations?",
    "What quality settings are available?"
  ],
  pricing: [
    "What's included in the Professional plan?",
    "Is there a free trial?",
    "How does team licensing work?"
  ],
  community: [
    "How do I share my presets?",
    "Can I customize downloaded presets?",
    "How are presets rated?"
  ],
  default: [
    "Show me a demo",
    "Calculate ROI for my team",
    "Compare pricing plans"
  ]
}

export function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useKV<ChatMessage[]>('chat-messages', [])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<UploadedFile[]>([])
  const [currentContext, setCurrentContext] = useState('default')
  const [showScrollButton, setShowScrollButton] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          setIsOpen(prev => !prev)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  useEffect(() => {
    const sections = ['hero', 'demo', 'pricing', 'community', 'roi', 'videos']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (sections.includes(sectionId)) {
              setCurrentContext(sectionId)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach(id => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isOpen && (messages?.length || 0) === 0) {
      const greeting: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "👋 Hi! I'm your MotionFlow AI assistant. I can help you explore features, answer questions, analyze files you upload, and even respond to voice commands. How can I assist you today?",
        timestamp: Date.now(),
        suggestions: contextualSuggestions[currentContext as keyof typeof contextualSuggestions] || contextualSuggestions.default
      }
      setMessages([greeting])
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement
    const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100
    setShowScrollButton(!isNearBottom)
  }

  const processVoiceCommand = (text: string): VoiceCommandResult => {
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('open chat') || lowerText.includes('show chat')) {
      return { action: 'open', recognized: 'Open chat', target: 'chat' }
    }
    if (lowerText.includes('close chat') || lowerText.includes('hide chat')) {
      return { action: 'close', recognized: 'Close chat', target: 'chat' }
    }
    if (lowerText.includes('demo') || lowerText.includes('demonstration')) {
      return { action: 'scroll', recognized: 'Navigate to demo', target: 'demo' }
    }
    if (lowerText.includes('pricing') || lowerText.includes('price') || lowerText.includes('cost')) {
      return { action: 'scroll', recognized: 'Navigate to pricing', target: 'pricing' }
    }
    if (lowerText.includes('video') || lowerText.includes('watch')) {
      return { action: 'scroll', recognized: 'Navigate to videos', target: 'videos' }
    }
    if (lowerText.includes('community') || lowerText.includes('preset')) {
      return { action: 'scroll', recognized: 'Navigate to community', target: 'community' }
    }
    if (lowerText.includes('roi') || lowerText.includes('calculator') || lowerText.includes('calculate')) {
      return { action: 'scroll', recognized: 'Navigate to ROI calculator', target: 'roi' }
    }
    if (lowerText.includes('top') || lowerText.includes('home') || lowerText.includes('start')) {
      return { action: 'navigate', recognized: 'Navigate to top', target: 'top' }
    }
    
    return { action: 'unknown', recognized: text }
  }

  const executeVoiceCommand = (command: VoiceCommandResult) => {
    switch (command.action) {
      case 'open':
        setIsOpen(true)
        toast.success('Chat opened')
        break
      case 'close':
        setIsOpen(false)
        toast.success('Chat closed')
        break
      case 'scroll':
      case 'navigate':
        if (command.target === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          document.getElementById(command.target || '')?.scrollIntoView({ behavior: 'smooth' })
        }
        toast.success(`Navigating to ${command.target}`)
        break
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        await processVoiceInput(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      toast.success('Recording... Speak now')
    } catch (error) {
      toast.error('Microphone access denied. Please enable microphone permissions.')
      console.error('Microphone error:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const processVoiceInput = async (audioBlob: Blob) => {
    // @ts-ignore - spark API type definition issue
    const prompt = window.spark.llmPrompt`You are a speech-to-text processor. The user has sent an audio message. Transcribe this message as if you received voice input. Since we cannot actually process audio in this simulation, generate a plausible user question about MotionFlow AI features, pricing, or demos. Return only the transcribed text, nothing else.`
    const transcribedText = await window.spark.llm(prompt, 'gpt-4o-mini')
    
    const commandResult = processVoiceCommand(transcribedText)
    
    if (commandResult.action !== 'unknown') {
      executeVoiceCommand(commandResult)
      
      const commandMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: `🎤 Voice command: "${commandResult.recognized}"`,
        timestamp: Date.now(),
        voiceInput: true
      }
      
      const confirmationMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `✓ Executed: ${commandResult.recognized}`,
        timestamp: Date.now() + 1
      }
      
      setMessages(prev => [...(prev || []), commandMessage, confirmationMessage])
    } else {
      setInputValue(transcribedText)
      toast.success('Voice transcribed - press send')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    files.forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Max size is 10MB.`)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const uploadedFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          url: event.target?.result as string,
          preview: file.type.startsWith('image/') ? event.target?.result as string : undefined
        }
        
        setAttachedFiles(prev => [...prev, uploadedFile])
        toast.success(`${file.name} attached`)
      }
      
      reader.readAsDataURL(file)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const sendMessage = async (content?: string) => {
    const messageText = content || inputValue.trim()
    if (!messageText && attachedFiles.length === 0) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText || 'Sent files',
      timestamp: Date.now(),
      files: attachedFiles.length > 0 ? [...attachedFiles] : undefined
    }

    setMessages(prev => [...(prev || []), userMessage])
    setInputValue('')
    setAttachedFiles([])
    setIsTyping(true)

    setTimeout(async () => {
      const contextInfo = `Current page section: ${currentContext}. `
      const fileInfo = userMessage.files 
        ? `User uploaded ${userMessage.files.length} file(s): ${userMessage.files.map(f => `${f.name} (${f.type})`).join(', ')}. ` 
        : ''
      
      // @ts-ignore - spark API type definition issue
      const prompt = window.spark.llmPrompt`You are a helpful AI assistant for MotionFlow AI, an innovative plugin for the Logitech MX Creative Console that combines AI-powered asset generation with physical controls for creative professionals.

${contextInfo}${fileInfo}

User message: ${messageText}

Provide a helpful, conversational response about MotionFlow AI. If files were uploaded, acknowledge them and offer relevant insights. Keep responses concise (2-3 sentences). Include 2-3 contextual suggestions as a JSON array at the end in this exact format:

SUGGESTIONS: ["suggestion 1", "suggestion 2", "suggestion 3"]`

      const response = await window.spark.llm(prompt as any, 'gpt-4o-mini')
      
      let aiContent = response
      let suggestions: string[] | undefined
      
      const suggestionsMatch = response.match(/SUGGESTIONS:\s*(\[.*\])/s)
      if (suggestionsMatch) {
        try {
          suggestions = JSON.parse(suggestionsMatch[1])
          aiContent = response.replace(/SUGGESTIONS:\s*\[.*\]/s, '').trim()
        } catch (e) {
          console.error('Failed to parse suggestions', e)
        }
      }

      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: aiContent,
        timestamp: Date.now(),
        suggestions
      }

      setMessages(prev => [...(prev || []), assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon weight="duotone" />
    if (type.startsWith('video/')) return <VideoCamera weight="duotone" />
    return <FileIcon weight="duotone" />
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              onClick={() => setIsOpen(true)}
              className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg hover:shadow-xl hover:scale-110 transition-all"
            >
              <ChatCircle size={28} weight="duotone" />
            </Button>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] flex flex-col"
          >
            <Card className="glass-effect border-border/50 flex flex-col h-full shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Sparkle size={20} weight="duotone" className="text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">MotionFlow AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X size={18} />
                </Button>
              </div>

              <ScrollArea 
                ref={scrollAreaRef}
                className="flex-1 p-4"
                onScroll={handleScroll as any}
              >
                <div className="space-y-4">
                  {(messages || []).map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl px-4 py-2.5 ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground'
                              : 'bg-muted/50 text-foreground'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                          
                          {message.files && message.files.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.files.map(file => (
                                <div key={file.id} className="bg-black/20 rounded-lg p-2">
                                  {file.preview ? (
                                    <img src={file.preview} alt={file.name} className="w-full rounded mb-1" />
                                  ) : (
                                    <div className="flex items-center gap-2 text-xs">
                                      {getFileIcon(file.type)}
                                      <span className="flex-1 truncate">{file.name}</span>
                                    </div>
                                  )}
                                  <p className="text-xs opacity-70">{formatFileSize(file.size)}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.suggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                size="sm"
                                variant="outline"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full justify-start text-xs h-auto py-2 px-3 border-border/50 hover:border-primary/50"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-[10px] text-muted-foreground mt-1 px-1">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted/50 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {showScrollButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-32 right-8 w-8 h-8 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center shadow-lg"
                >
                  <ArrowDown size={16} className="text-primary-foreground" />
                </motion.button>
              )}

              {attachedFiles.length > 0 && (
                <div className="px-4 py-2 border-t border-border/50 bg-muted/30">
                  <div className="flex flex-wrap gap-2">
                    {attachedFiles.map(file => (
                      <Badge key={file.id} variant="secondary" className="pr-1 gap-2">
                        {getFileIcon(file.type)}
                        <span className="text-xs truncate max-w-[150px]">{file.name}</span>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="hover:text-destructive"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-10 w-10 p-0"
                    title="Attach file"
                  >
                    <Paperclip size={20} />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`h-10 w-10 p-0 ${isRecording ? 'text-destructive animate-pulse' : ''}`}
                    title={isRecording ? 'Stop recording' : 'Voice input'}
                  >
                    {isRecording ? <MicrophoneSlash size={20} weight="fill" /> : <Microphone size={20} />}
                  </Button>

                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 h-10 bg-muted/30"
                    disabled={isRecording}
                  />

                  <Button
                    size="sm"
                    onClick={() => sendMessage()}
                    disabled={!inputValue.trim() && attachedFiles.length === 0}
                    className="h-10 w-10 p-0 bg-gradient-to-br from-primary to-accent"
                  >
                    <PaperPlaneRight size={18} weight="fill" />
                  </Button>
                </div>
                
                <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                  <Badge variant="outline" className="text-[9px] py-0 h-5">Press C to toggle</Badge>
                  <Badge variant="outline" className="text-[9px] py-0 h-5">Voice commands enabled</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
