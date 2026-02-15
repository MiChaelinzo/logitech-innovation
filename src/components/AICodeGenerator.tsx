import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Code, 
  Sparkle, 
  Copy,
  Download,
  Play,
  Lightning
} from '@phosphor-icons/react'
import { toast } from 'sonner'

type Language = 'javascript' | 'typescript' | 'python'
type Framework = 'react' | 'vue' | 'vanilla' | 'electron'

export function AICodeGenerator() {
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState<Language>('typescript')
  const [framework, setFramework] = useState<Framework>('react')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [explanation, setExplanation] = useState('')

  const generateCode = async () => {
    if (!prompt.trim()) {
      toast.error('Please describe what you want to build')
      return
    }

    setIsGenerating(true)

    try {
      // @ts-ignore - spark API type definition issue
      const llmPrompt = window.spark.llmPrompt`You are an expert Logitech Actions SDK developer. Generate production-ready code based on this request:

Request: ${prompt}
Language: ${language}
Framework: ${framework}

Generate complete, working code that integrates with the Logitech Actions SDK. Include:
1. Proper SDK initialization
2. Action handlers for dials and buttons
3. Context-aware functionality
4. Error handling
5. Comments explaining key parts

Also provide a brief explanation of how the code works.

Format your response as:
CODE:
\`\`\`${language}
[your code here]
\`\`\`

EXPLANATION:
[brief explanation of the code]`

      const response = await window.spark.llm(llmPrompt, 'gpt-4o')

      const codeMatch = response.match(/CODE:\s*```[\w]*\n([\s\S]*?)```/)
      const explanationMatch = response.match(/EXPLANATION:\s*([\s\S]*)/)

      if (codeMatch && codeMatch[1]) {
        setGeneratedCode(codeMatch[1].trim())
      } else {
        setGeneratedCode(response)
      }

      if (explanationMatch && explanationMatch[1]) {
        setExplanation(explanationMatch[1].trim())
      } else {
        setExplanation('Code generated successfully!')
      }

      toast.success('Code generated successfully!')
    } catch (error) {
      toast.error('Failed to generate code')
      console.error('Code generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    toast.success('Code copied to clipboard')
  }

  const downloadCode = () => {
    const extension = language === 'python' ? 'py' : language === 'typescript' ? 'ts' : 'js'
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `motionflow-plugin.${extension}`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Code downloaded')
  }

  const examplePrompts = [
    "Create a video timeline scrubber using the left dial with frame-perfect control",
    "Build an AI color grading assistant that generates LUTs from dial input",
    "Make a 3D viewport controller with dial rotation and zoom controls",
    "Design a multi-track audio mixer with separate dial controls for each track",
    "Create a brush size controller with pressure sensitivity simulation"
  ]

  return (
    <section id="code-generator" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 px-6 py-2 text-base bg-primary/20 text-primary border-primary/30" variant="outline">
            AI-Powered Development
          </Badge>
          <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
            Plugin Code Generator
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Describe your plugin idea and let AI generate production-ready code for the Logitech Actions SDK
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-effect border-border/50 h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
                    <Sparkle size={28} weight="duotone" className="text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Describe Your Plugin</CardTitle>
                    <CardDescription>AI will generate the complete code</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>What do you want to build?</Label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Create a plugin that uses the dial to control video playback speed in real-time..."
                    rows={6}
                    className="bg-muted/30 border-border focus:border-primary resize-none"
                  />
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setPrompt(example)}
                        className="text-xs"
                      >
                        {example.substring(0, 30)}...
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label>Language</Label>
                    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                      <SelectTrigger className="bg-muted/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Framework</Label>
                    <Select value={framework} onValueChange={(value: Framework) => setFramework(value)}>
                      <SelectTrigger className="bg-muted/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="vanilla">Vanilla JS</SelectItem>
                        <SelectItem value="electron">Electron</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={generateCode}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Lightning className="mr-2 animate-pulse" weight="bold" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkle className="mr-2" weight="bold" />
                      Generate Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-effect border-border/50 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-secondary to-accent">
                      <Code size={28} weight="duotone" className="text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Generated Code</CardTitle>
                      <CardDescription>Production-ready plugin code</CardDescription>
                    </div>
                  </div>
                  {generatedCode && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyCode}
                        className="rounded-full"
                      >
                        <Copy size={18} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={downloadCode}
                        className="rounded-full"
                      >
                        <Download size={18} />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!generatedCode ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <Code size={64} className="text-muted-foreground mb-4" weight="duotone" />
                    <h3 className="font-semibold text-lg mb-2">No Code Generated Yet</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Describe your plugin idea and click "Generate Code" to get started
                    </p>
                  </div>
                ) : (
                  <Tabs defaultValue="code" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="code">Code</TabsTrigger>
                      <TabsTrigger value="explanation">Explanation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="code" className="mt-0">
                      <div className="relative">
                        <pre className="bg-muted/30 rounded-lg p-4 overflow-x-auto max-h-[500px] custom-scrollbar text-sm">
                          <code className="text-foreground">{generatedCode}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="explanation" className="mt-0">
                      <div className="bg-muted/30 rounded-lg p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{explanation}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
