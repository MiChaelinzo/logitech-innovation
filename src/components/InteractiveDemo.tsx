import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { 
  Play, 
  Pause, 
  ArrowCounterClockwise, 
  Sparkle, 
  SlidersHorizontal,
  Image as ImageIcon,
  Palette,
  MagicWand
} from '@phosphor-icons/react'

type DemoState = {
  dialValue: number
  isGenerating: boolean
  generatedAsset: string | null
  promptText: string
}

const prompts = [
  "Cinematic sunset over mountains",
  "Abstract geometric patterns",
  "Futuristic city skyline",
  "Organic flowing textures",
  "Vintage film grain overlay"
]

const assets = [
  "🌄 Sunset Mountains",
  "🔷 Geometric Art", 
  "🏙️ City Lights",
  "🌊 Fluid Textures",
  "📽️ Film Grain"
]

export function InteractiveDemo() {
  const [demoState, setDemoState] = useState<DemoState>({
    dialValue: 50,
    isGenerating: false,
    generatedAsset: null,
    promptText: prompts[0]
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (isPlaying && !demoState.isGenerating) {
      const interval = setInterval(() => {
        setDemoState(prev => ({
          ...prev,
          dialValue: (prev.dialValue + 1) % 101
        }))
        setRotation(prev => (prev + 3) % 360)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isPlaying, demoState.isGenerating])

  useEffect(() => {
    const promptIndex = Math.floor((demoState.dialValue / 100) * (prompts.length - 1))
    setDemoState(prev => ({
      ...prev,
      promptText: prompts[promptIndex]
    }))
  }, [demoState.dialValue])

  const handleGenerate = () => {
    setDemoState(prev => ({ ...prev, isGenerating: true }))
    setIsPlaying(false)
    
    setTimeout(() => {
      const assetIndex = Math.floor((demoState.dialValue / 100) * (assets.length - 1))
      setDemoState(prev => ({
        ...prev,
        isGenerating: false,
        generatedAsset: assets[assetIndex]
      }))
    }, 2000)
  }

  const handleReset = () => {
    setDemoState({
      dialValue: 50,
      isGenerating: false,
      generatedAsset: null,
      promptText: prompts[0]
    })
    setIsPlaying(false)
    setRotation(0)
  }

  const handleDialChange = (value: number[]) => {
    setDemoState(prev => ({ ...prev, dialValue: value[0] }))
    setRotation((value[0] / 100) * 360)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <div className="space-y-6">
        <div>
          <h3 className="font-['Space_Grotesk'] font-semibold text-3xl mb-3">
            Try It Yourself
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Experience how MotionFlow AI turns physical dial movements into AI-powered asset generation. 
            Rotate the dial to adjust parameters, then press to generate.
          </p>
        </div>

        <Card className="glass-effect border-border/50 bg-card/30">
          <CardContent className="pt-8 space-y-8">
            <div className="flex items-center justify-center">
              <div className="relative">
                <motion.div
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1"
                  animate={{ 
                    boxShadow: isPlaying 
                      ? '0 0 60px rgba(180, 83, 255, 0.6), 0 0 100px rgba(76, 201, 240, 0.4)'
                      : '0 0 30px rgba(180, 83, 255, 0.3), 0 0 50px rgba(76, 201, 240, 0.2)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"
                      style={{ rotate: rotation }}
                    />
                    <motion.div
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative z-10 cursor-pointer select-none"
                      style={{ rotate: rotation }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGenerate}
                    >
                      <div className="w-4 h-4 rounded-full bg-foreground absolute top-8 left-1/2 -translate-x-1/2" />
                      <SlidersHorizontal size={48} className="text-primary-foreground" weight="duotone" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={demoState.isGenerating ? { rotate: 360 } : {}}
                  transition={demoState.isGenerating ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                >
                  <Sparkle size={32} className="text-accent-foreground" weight="duotone" />
                </motion.div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dial Position</span>
                <Badge variant="secondary" className="font-mono">
                  {demoState.dialValue}%
                </Badge>
              </div>
              <Slider
                value={[demoState.dialValue]}
                onValueChange={handleDialChange}
                max={100}
                step={1}
                className="cursor-pointer"
                disabled={demoState.isGenerating}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MagicWand size={18} weight="duotone" className="text-primary" />
                <span>Current AI Prompt</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <p className="text-sm text-foreground/90 font-mono">
                  {demoState.promptText}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                className="w-full"
                disabled={demoState.isGenerating}
              >
                {isPlaying ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
                {isPlaying ? 'Pause' : 'Auto'}
              </Button>
              <Button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                disabled={demoState.isGenerating}
              >
                <Sparkle size={18} weight="duotone" />
                Generate
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
                disabled={demoState.isGenerating}
              >
                <ArrowCounterClockwise size={18} />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-['Space_Grotesk'] font-semibold text-3xl mb-3">
            Generated Output
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Watch as AI transforms dial movements into creative assets in real-time, 
            ready to be inserted into your workflow.
          </p>
        </div>

        <Card className="glass-effect border-border/50 bg-card/30 min-h-[500px] flex items-center justify-center">
          <CardContent className="pt-8 w-full">
            <AnimatePresence mode="wait">
              {demoState.isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1"
                  >
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <Sparkle size={48} className="text-primary" weight="duotone" />
                    </div>
                  </motion.div>
                  <div>
                    <h4 className="text-2xl font-semibold mb-2">Generating Asset...</h4>
                    <p className="text-muted-foreground">Processing with AI</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 rounded-full bg-primary"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : demoState.generatedAsset ? (
                <motion.div
                  key="generated"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center text-8xl border border-border/30 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <span className="relative z-10">{demoState.generatedAsset}</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ImageIcon size={24} className="text-primary" weight="duotone" />
                        <span className="font-semibold text-lg">Asset Generated</span>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Ready to Use
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">2.3s</div>
                        <div className="text-xs text-muted-foreground">Generation Time</div>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                        <div className="text-2xl font-bold text-accent mb-1">4K</div>
                        <div className="text-xs text-muted-foreground">Resolution</div>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                        <div className="text-2xl font-bold text-secondary mb-1">AI</div>
                        <div className="text-xs text-muted-foreground">Powered</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-primary hover:bg-primary/90">
                        <Palette size={18} weight="duotone" />
                        Insert to Project
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <ArrowCounterClockwise size={18} />
                        Regenerate
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-6 py-12"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center border border-border/30"
                  >
                    <ImageIcon size={64} className="text-muted-foreground" weight="duotone" />
                  </motion.div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-semibold">Ready to Generate</h4>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Rotate the dial to adjust parameters, then click Generate or press the dial button to create AI-powered assets
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Sparkle size={12} weight="fill" className="mr-1" />
                      AI Generation
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <SlidersHorizontal size={12} weight="fill" className="mr-1" />
                      Real-time Control
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <MagicWand size={12} weight="fill" className="mr-1" />
                      Instant Results
                    </Badge>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
