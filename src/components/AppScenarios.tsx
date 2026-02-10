import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { 
  Cube,
  VideoCamera,
  PaintBrush,
  MusicNotes,
  Code,
  House,
  Sparkle,
  Play,
  Pause,
  ArrowCounterClockwise,
  Check,
  Lightning
} from '@phosphor-icons/react'

type ScenarioState = {
  dialValue: number
  parameter: string
  isActive: boolean
  result: string
  status: 'idle' | 'processing' | 'complete'
}

type AppScenario = {
  id: string
  name: string
  icon: typeof Cube
  color: string
  description: string
  parameters: string[]
  results: string[]
  features: string[]
}

const scenarios: AppScenario[] = [
  {
    id: 'blender',
    name: 'Blender 3D',
    icon: Cube,
    color: 'from-orange-500 to-blue-500',
    description: 'Generate and manipulate 3D assets with AI-powered procedural generation',
    parameters: ['Mesh Complexity', 'Texture Detail', 'Material Shine', 'Vertex Count', 'UV Density'],
    results: ['Low-poly terrain mesh', 'Detailed character model', 'Procedural building', 'Organic sculpture', 'Mechanical parts'],
    features: [
      'Real-time modifier adjustments via dial',
      'AI texture generation from text prompts',
      'Automated UV unwrapping with quality control',
      'Procedural material creation and blending'
    ]
  },
  {
    id: 'premiere',
    name: 'Premiere Pro',
    icon: VideoCamera,
    color: 'from-purple-500 to-pink-500',
    description: 'AI-enhanced video editing with intelligent color grading and effects',
    parameters: ['Color Temperature', 'Transition Speed', 'Audio Fade', 'Effect Intensity', 'Playback Rate'],
    results: ['Cinematic color grade', 'Smooth cross dissolve', 'Dynamic zoom effect', 'Audio ducking applied', 'Speed ramp created'],
    features: [
      'Frame-accurate timeline scrubbing',
      'AI-powered auto color matching',
      'Real-time LUT generation and preview',
      'Smart audio leveling and noise reduction'
    ]
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    icon: PaintBrush,
    color: 'from-blue-500 to-cyan-500',
    description: 'Generative AI fills, texture synthesis, and intelligent selection tools',
    parameters: ['Brush Size', 'Generative Fill', 'Selection Feather', 'Layer Opacity', 'Blur Radius'],
    results: ['Background extended', 'Object removed cleanly', 'Texture synthesized', 'Smart selection made', 'Portrait enhanced'],
    features: [
      'Dial-controlled generative fill strength',
      'AI-powered object removal and inpainting',
      'Real-time brush size with pressure mapping',
      'Contextual smart selection refinement'
    ]
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    icon: VideoCamera,
    color: 'from-red-500 to-yellow-500',
    description: 'Professional color grading with AI-assisted node workflows',
    parameters: ['Primary Wheels', 'Saturation', 'Contrast Curve', 'Color Match', 'Node Strength'],
    results: ['Film look applied', 'Skin tones balanced', 'Moody grade created', 'HDR tone mapped', 'Style matched'],
    features: [
      'AI color matching across clips',
      'Dial navigation through node tree',
      'Real-time scope monitoring',
      'Preset-based LUT generation'
    ]
  },
  {
    id: 'ableton',
    name: 'Ableton Live',
    icon: MusicNotes,
    color: 'from-green-500 to-teal-500',
    description: 'MIDI composition and audio manipulation with AI melody generation',
    parameters: ['BPM Adjustment', 'Filter Cutoff', 'MIDI Velocity', 'Reverb Mix', 'Melodic Variation'],
    results: ['Chord progression generated', 'Bassline created', 'Drum pattern evolved', 'Melody harmonized', 'Mix balanced'],
    features: [
      'AI-powered melody and harmony generation',
      'Real-time effect parameter control',
      'MIDI note velocity adjustment via dial',
      'Smart quantization and groove templates'
    ]
  },
  {
    id: 'xcode',
    name: 'Xcode',
    icon: Code,
    color: 'from-blue-400 to-indigo-500',
    description: 'AI code completion, refactoring, and UI layout generation',
    parameters: ['Code Completion', 'Refactor Scope', 'UI Spacing', 'Test Coverage', 'Build Config'],
    results: ['Function completed', 'Code refactored', 'UI layout generated', 'Tests auto-written', 'Dependencies resolved'],
    features: [
      'AI-powered code suggestions and completion',
      'Dial-based code navigation and scrolling',
      'Automated UI constraint adjustment',
      'Smart refactoring and variable renaming'
    ]
  },
  {
    id: 'home',
    name: 'Home Automation',
    icon: House,
    color: 'from-amber-500 to-orange-500',
    description: 'Smart home control hub with AI-powered automation scenes',
    parameters: ['Light Brightness', 'Temperature', 'Music Volume', 'Scene Intensity', 'Security Level'],
    results: ['Movie mode activated', 'Morning routine started', 'Energy saving enabled', 'Party scene set', 'Sleep mode engaged'],
    features: [
      'Multi-device control with single dial',
      'AI-powered routine suggestions',
      'Context-aware scene activation',
      'Voice command integration'
    ]
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: PaintBrush,
    color: 'from-purple-400 to-pink-400',
    description: 'AI-assisted design with component generation and layout automation',
    parameters: ['Grid Spacing', 'Corner Radius', 'Component Scale', 'Color Palette', 'Layout Density'],
    results: ['Components generated', 'Auto-layout applied', 'Design tokens created', 'Responsive frames set', 'Variants expanded'],
    features: [
      'AI component generation from descriptions',
      'Dial-controlled layer properties',
      'Smart layout suggestion and spacing',
      'Auto-generate design system tokens'
    ]
  }
]

export function AppScenarios() {
  const [activeTab, setActiveTab] = useState(scenarios[0].id)
  const [scenarioStates, setScenarioStates] = useState<Record<string, ScenarioState>>(
    Object.fromEntries(
      scenarios.map(s => [
        s.id,
        {
          dialValue: 50,
          parameter: s.parameters[0],
          isActive: false,
          result: '',
          status: 'idle' as const
        }
      ])
    )
  )

  const activeScenario = scenarios.find(s => s.id === activeTab)!
  const state = scenarioStates[activeTab]

  const handleDialChange = (value: number[]) => {
    const newValue = value[0]
    const paramIndex = Math.floor((newValue / 100) * (activeScenario.parameters.length - 1))
    
    setScenarioStates(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        dialValue: newValue,
        parameter: activeScenario.parameters[paramIndex]
      }
    }))
  }

  const handleActivate = () => {
    setScenarioStates(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        isActive: true,
        status: 'processing'
      }
    }))

    setTimeout(() => {
      const resultIndex = Math.floor((state.dialValue / 100) * (activeScenario.results.length - 1))
      setScenarioStates(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          status: 'complete',
          result: activeScenario.results[resultIndex]
        }
      }))
    }, 1500)

    setTimeout(() => {
      setScenarioStates(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          isActive: false,
          status: 'idle'
        }
      }))
    }, 4000)
  }

  const handleReset = () => {
    setScenarioStates(prev => ({
      ...prev,
      [activeTab]: {
        dialValue: 50,
        parameter: activeScenario.parameters[0],
        isActive: false,
        result: '',
        status: 'idle'
      }
    }))
  }

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 h-auto p-2 bg-card/50 glass-effect gap-2">
          {scenarios.map(scenario => {
            const Icon = scenario.icon
            return (
              <TabsTrigger
                key={scenario.id}
                value={scenario.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 text-sm flex flex-col items-center gap-1"
              >
                <Icon size={20} weight="duotone" />
                <span className="hidden sm:inline">{scenario.name.split(' ')[0]}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {scenarios.map(scenario => {
          const Icon = scenario.icon
          const currentState = scenarioStates[scenario.id]
          
          return (
            <TabsContent key={scenario.id} value={scenario.id} className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Card className="glass-effect border-border/50">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${scenario.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={28} weight="duotone" className="text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="font-['Space_Grotesk'] text-2xl mb-2">
                            {scenario.name}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {scenario.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Active Parameter</span>
                          <Badge variant="secondary" className="font-mono">
                            {currentState.parameter}
                          </Badge>
                        </div>
                        
                        <div className="relative">
                          <Slider
                            value={[currentState.dialValue]}
                            onValueChange={handleDialChange}
                            max={100}
                            step={1}
                            className="cursor-pointer"
                            disabled={currentState.status === 'processing'}
                          />
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>Min</span>
                            <span className="font-mono">{currentState.dialValue}%</span>
                            <span>Max</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <Lightning size={16} weight="duotone" className="text-primary" />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {scenario.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                              <Check size={16} className="text-primary mt-0.5 flex-shrink-0" weight="bold" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleActivate}
                          className={`flex-1 bg-gradient-to-r ${scenario.color} hover:opacity-90 text-white`}
                          disabled={currentState.status === 'processing'}
                        >
                          {currentState.status === 'processing' ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Sparkle size={18} weight="duotone" />
                              </motion.div>
                              Processing
                            </>
                          ) : (
                            <>
                              <Play size={18} weight="fill" />
                              Activate
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          disabled={currentState.status === 'processing'}
                        >
                          <ArrowCounterClockwise size={18} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="glass-effect border-border/50 min-h-[400px] flex items-center justify-center">
                    <CardContent className="pt-8 w-full">
                      <AnimatePresence mode="wait">
                        {currentState.status === 'processing' ? (
                          <motion.div
                            key="processing"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center space-y-6 py-12"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${scenario.color} p-1`}
                            >
                              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                                <Sparkle size={48} className="text-primary" weight="duotone" />
                              </div>
                            </motion.div>
                            <div>
                              <h4 className="text-2xl font-semibold mb-2">AI Processing</h4>
                              <p className="text-muted-foreground">
                                Generating with {currentState.parameter}
                              </p>
                            </div>
                            <div className="flex justify-center gap-2">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${scenario.color}`}
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
                        ) : currentState.status === 'complete' && currentState.result ? (
                          <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="space-y-6 py-8"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", duration: 0.6 }}
                              className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${scenario.color} flex items-center justify-center`}
                            >
                              <Check size={48} className="text-white" weight="bold" />
                            </motion.div>
                            
                            <div className="text-center space-y-2">
                              <h4 className="text-2xl font-semibold">Success!</h4>
                              <div className="p-4 rounded-lg bg-muted/30 border border-border/30 max-w-md mx-auto">
                                <p className="text-foreground/90 font-medium">
                                  {currentState.result}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                                <div className="text-2xl font-bold text-primary mb-1">1.5s</div>
                                <div className="text-xs text-muted-foreground">Process Time</div>
                              </div>
                              <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                                <div className="text-2xl font-bold text-accent mb-1">{currentState.dialValue}%</div>
                                <div className="text-xs text-muted-foreground">Parameter</div>
                              </div>
                              <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                                <div className="text-2xl font-bold text-secondary mb-1">AI</div>
                                <div className="text-xs text-muted-foreground">Enhanced</div>
                              </div>
                            </div>

                            <Button 
                              className={`w-full bg-gradient-to-r ${scenario.color} hover:opacity-90 text-white`}
                            >
                              Apply to {scenario.name}
                            </Button>
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
                              className={`w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br ${scenario.color} opacity-20 flex items-center justify-center border border-border/30`}
                            >
                              <Icon size={64} className="text-white" weight="duotone" />
                            </motion.div>
                            <div className="space-y-2">
                              <h4 className="text-2xl font-semibold">Ready to Start</h4>
                              <p className="text-muted-foreground max-w-md mx-auto">
                                Adjust the dial to control {currentState.parameter.toLowerCase()}, then click Activate to process with AI
                              </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                              {scenario.parameters.slice(0, 3).map((param) => (
                                <Badge key={param} variant="outline" className="text-xs">
                                  {param}
                                </Badge>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>

                  <Card className="glass-effect border-border/50 bg-card/30">
                    <CardContent className="pt-6">
                      <h4 className="text-sm font-semibold mb-3">Available Parameters</h4>
                      <div className="flex flex-wrap gap-2">
                        {scenario.parameters.map((param) => (
                          <Badge
                            key={param}
                            variant={currentState.parameter === param ? "default" : "outline"}
                            className={currentState.parameter === param ? `bg-gradient-to-r ${scenario.color} text-white border-0` : ''}
                          >
                            {param}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
