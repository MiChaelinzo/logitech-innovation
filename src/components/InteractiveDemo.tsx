import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Play, 
  Pause, 
  ArrowCounterClockwise, 
  Sparkle, 
  SlidersHorizontal,
  Image as ImageIcon,
  Palette,
  MagicWand,
  Sliders,
  Lightning,
  Cube,
  Download,
  Share,
  BookmarkSimple,
  Gear
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

type DemoState = {
  dialValue: number
  isGenerating: boolean
  generatedAsset: string | null
  promptText: string
  quality: 'draft' | 'standard' | 'high'
  style: 'photorealistic' | 'artistic' | 'abstract' | 'minimal'
  generationTime: number
  iterations: number
}

const prompts = [
  "Cinematic sunset over mountains",
  "Abstract geometric patterns",
  "Futuristic city skyline",
  "Organic flowing textures",
  "Vintage film grain overlay",
  "Neon cyberpunk atmosphere",
  "Ethereal fantasy landscape",
  "Industrial metal textures"
]

const assets = [
  "🌄 Sunset Mountains",
  "🔷 Geometric Art", 
  "🏙️ City Lights",
  "🌊 Fluid Textures",
  "📽️ Film Grain",
  "🌃 Neon Dreams",
  "✨ Fantasy Realm",
  "⚙️ Metal Surface"
]

const qualitySettings = {
  draft: { time: 1000, label: 'Draft (1s)' },
  standard: { time: 2000, label: 'Standard (2s)' },
  high: { time: 3500, label: 'High (3.5s)' }
}

const stylePresets = {
  photorealistic: { icon: '📸', color: 'from-blue-500 to-cyan-500', label: 'Photo' },
  artistic: { icon: '🎨', color: 'from-purple-500 to-pink-500', label: 'Artistic' },
  abstract: { icon: '🔮', color: 'from-orange-500 to-red-500', label: 'Abstract' },
  minimal: { icon: '⬜', color: 'from-gray-500 to-slate-500', label: 'Minimal' }
}

export function InteractiveDemo() {
  const [savedConfigs, setSavedConfigs] = useKV<Array<{ name: string; config: DemoState }>>('demo-configs', [])
  const [demoState, setDemoState] = useState<DemoState>({
    dialValue: 50,
    isGenerating: false,
    generatedAsset: null,
    promptText: prompts[0],
    quality: 'standard',
    style: 'photorealistic',
    generationTime: 0,
    iterations: 0
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
    
    const generationTime = qualitySettings[demoState.quality].time
    
    setTimeout(() => {
      const assetIndex = Math.floor((demoState.dialValue / 100) * (assets.length - 1))
      setDemoState(prev => ({
        ...prev,
        isGenerating: false,
        generatedAsset: assets[assetIndex],
        generationTime,
        iterations: prev.iterations + 1
      }))
      toast.success('Asset generated successfully!', {
        description: `Created in ${(generationTime / 1000).toFixed(1)}s with ${demoState.style} style`
      })
    }, generationTime)
  }

  const handleReset = () => {
    setDemoState({
      dialValue: 50,
      isGenerating: false,
      generatedAsset: null,
      promptText: prompts[0],
      quality: 'standard',
      style: 'photorealistic',
      generationTime: 0,
      iterations: 0
    })
    setIsPlaying(false)
    setRotation(0)
  }

  const saveConfiguration = () => {
    const configName = `Config ${(savedConfigs || []).length + 1}`
    setSavedConfigs((current) => [
      ...(current || []),
      { name: configName, config: { ...demoState } }
    ])
    toast.success('Configuration saved!')
  }

  const loadConfiguration = (config: DemoState) => {
    setDemoState(config)
    setRotation((config.dialValue / 100) * 360)
    toast.success('Configuration loaded!')
  }

  const handleDialChange = (value: number[]) => {
    setDemoState(prev => ({ ...prev, dialValue: value[0] }))
    setRotation((value[0] / 100) * 360)
  }

  const handleShare = () => {
    toast.success('Share link copied to clipboard!')
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-card/50 glass-effect">
          <TabsTrigger value="basic">Basic Demo</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Controls</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-8">
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
                {demoState.iterations > 0 && (
                  <Badge variant="outline" className="mt-3">
                    <Lightning size={14} weight="fill" className="mr-1 text-accent" />
                    {demoState.iterations} generations completed
                  </Badge>
                )}
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
                        className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={demoState.isGenerating ? { rotate: 360 } : {}}
                        transition={demoState.isGenerating ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                        onClick={handleGenerate}
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
                          className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${stylePresets[demoState.style].color} p-1`}
                        >
                          <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                            <Sparkle size={48} className="text-primary" weight="duotone" />
                          </div>
                        </motion.div>
                        <div>
                          <h4 className="text-2xl font-semibold mb-2">Generating Asset...</h4>
                          <p className="text-muted-foreground">Processing with AI - {demoState.style} style</p>
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
                          className={`aspect-video rounded-xl bg-gradient-to-br ${stylePresets[demoState.style].color} flex items-center justify-center text-8xl border border-border/30 relative overflow-hidden`}
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
                              {stylePresets[demoState.style].icon} {stylePresets[demoState.style].label}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3">
                            <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                              <div className="text-2xl font-bold text-primary mb-1">{(demoState.generationTime / 1000).toFixed(1)}s</div>
                              <div className="text-xs text-muted-foreground">Generation Time</div>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                              <div className="text-2xl font-bold text-accent mb-1">4K</div>
                              <div className="text-xs text-muted-foreground">Resolution</div>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                              <div className="text-2xl font-bold text-secondary mb-1">{demoState.quality.toUpperCase()}</div>
                              <div className="text-xs text-muted-foreground">Quality</div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button className="flex-1 bg-primary hover:bg-primary/90">
                              <Palette size={18} weight="duotone" />
                              Insert to Project
                            </Button>
                            <Button variant="outline" onClick={handleGenerate}>
                              <ArrowCounterClockwise size={18} />
                              Regenerate
                            </Button>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
                              <Share size={16} />
                              Share
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1" onClick={saveConfiguration}>
                              <BookmarkSimple size={16} />
                              Save Config
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Download size={16} />
                              Download
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
        </TabsContent>

        <TabsContent value="advanced" className="mt-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="glass-effect border-border/50">
              <CardContent className="pt-8 space-y-6">
                <div>
                  <h3 className="font-['Space_Grotesk'] font-semibold text-2xl mb-2 flex items-center gap-2">
                    <Gear size={24} weight="duotone" className="text-primary" />
                    Advanced Settings
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fine-tune generation parameters for optimal results
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Generation Quality</label>
                    <Select value={demoState.quality} onValueChange={(v) => setDemoState(prev => ({ ...prev, quality: v as DemoState['quality'] }))}>
                      <SelectTrigger className="bg-muted/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">{qualitySettings.draft.label}</SelectItem>
                        <SelectItem value="standard">{qualitySettings.standard.label}</SelectItem>
                        <SelectItem value="high">{qualitySettings.high.label}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Style Preset</label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(stylePresets).map(([key, style]) => (
                        <Button
                          key={key}
                          variant={demoState.style === key ? 'default' : 'outline'}
                          className={demoState.style === key ? `bg-gradient-to-r ${style.color} text-white hover:opacity-90` : ''}
                          onClick={() => setDemoState(prev => ({ ...prev, style: key as DemoState['style'] }))}
                        >
                          <span className="mr-2">{style.icon}</span>
                          {style.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Precision Control</label>
                    <Slider
                      value={[demoState.dialValue]}
                      onValueChange={handleDialChange}
                      max={100}
                      step={0.1}
                      className="cursor-pointer"
                      disabled={demoState.isGenerating}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className="font-mono">{demoState.dialValue.toFixed(1)}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30">
                  <Button 
                    onClick={handleGenerate} 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    disabled={demoState.isGenerating}
                    size="lg"
                  >
                    {demoState.isGenerating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkle size={20} weight="duotone" />
                        </motion.div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkle size={20} weight="duotone" />
                        Generate with Advanced Settings
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border/50">
              <CardContent className="pt-8 space-y-6">
                <div>
                  <h3 className="font-['Space_Grotesk'] font-semibold text-2xl mb-2 flex items-center gap-2">
                    <BookmarkSimple size={24} weight="duotone" className="text-accent" />
                    Saved Configurations
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Load previously saved settings to quickly resume work
                  </p>
                </div>

                {savedConfigs && savedConfigs.length > 0 ? (
                  <div className="space-y-3">
                    {savedConfigs.map((saved, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card className="bg-muted/30 border-border/30 hover:border-primary/30 transition-all cursor-pointer" onClick={() => loadConfiguration(saved.config)}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm mb-1">{saved.name}</h4>
                                <div className="flex gap-2 text-xs text-muted-foreground">
                                  <Badge variant="outline" className="text-xs">
                                    {saved.config.dialValue}%
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {stylePresets[saved.config.style].icon} {saved.config.style}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {saved.config.quality}
                                  </Badge>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Play size={16} weight="fill" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookmarkSimple size={48} weight="duotone" className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      No saved configurations yet. Generate an asset and save your settings!
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-border/30">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={saveConfiguration}>
                      <BookmarkSimple size={18} />
                      Save Current
                    </Button>
                    <Button variant="outline" onClick={() => setSavedConfigs([])}>
                      <ArrowCounterClockwise size={18} />
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect border-border/50 mt-8">
            <CardContent className="pt-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-['Space_Grotesk'] font-semibold text-2xl mb-2">Session Statistics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your demo usage and generation stats
                  </p>
                </div>
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <Lightning size={14} weight="fill" className="mr-1" />
                  Active Session
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-1">{demoState.iterations}</div>
                  <div className="text-sm text-muted-foreground">Total Generations</div>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <div className="text-3xl font-bold text-accent mb-1">{savedConfigs?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Saved Configs</div>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                  <div className="text-3xl font-bold text-secondary mb-1">{demoState.quality}</div>
                  <div className="text-sm text-muted-foreground">Current Quality</div>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-border/30">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                    {stylePresets[demoState.style].icon}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Style</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
