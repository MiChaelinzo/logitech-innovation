import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendUp, 
  Clock, 
  Users, 
  ChartBar,
  ArrowRight,
  CheckCircle,
  Sparkle,
  Quotes
} from '@phosphor-icons/react'

interface CaseStudy {
  id: string
  company: string
  industry: string
  size: string
  challenge: string
  solution: string
  implementation: string[]
  results: {
    metric: string
    value: string
    icon: typeof TrendUp
  }[]
  testimonial: {
    quote: string
    author: string
    role: string
  }
  tools: string[]
  bgGradient: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 'vfx-studio',
    company: 'Horizon Films',
    industry: 'VFX & Post-Production',
    size: '85 Artists',
    challenge: 'High-end VFX studio struggling with slow iteration times on complex compositing work. Artists spent 40% of their time navigating menus and adjusting parameters, leading to burnout and missed deadlines.',
    solution: 'Deployed MotionFlow AI across all workstations with custom profiles for After Effects, Nuke, and DaVinci Resolve. Mapped frequently-used compositing controls to dials and implemented AI-powered effect generation.',
    implementation: [
      'Custom dial profiles for each application',
      'Team training sessions over 2 weeks',
      'AI texture library generation for common VFX needs',
      'Collaborative preset sharing system',
      'Integration with existing pipeline tools'
    ],
    results: [
      { metric: 'Faster Iteration', value: '73%', icon: Clock },
      { metric: 'Project Capacity', value: '+45%', icon: TrendUp },
      { metric: 'Artist Satisfaction', value: '92%', icon: Users },
      { metric: 'Tool Switch Time', value: '-85%', icon: ChartBar }
    ],
    testimonial: {
      quote: 'MotionFlow AI gave us back hours every day. Our artists can focus on creativity instead of fighting with interfaces. We\'ve taken on 40% more projects without hiring.',
      author: 'Aisha Patel',
      role: 'VFX Supervisor'
    },
    tools: ['After Effects', 'Nuke', 'DaVinci Resolve'],
    bgGradient: 'from-purple-500/10 to-pink-500/10'
  },
  {
    id: 'game-studio',
    company: 'Vertex Games',
    industry: '3D Game Development',
    size: '120 Developers',
    challenge: 'AAA game studio needed to accelerate asset creation for an open-world game. Traditional 3D modeling workflows were too slow, and outsourcing was expensive and inconsistent.',
    solution: 'Integrated MotionFlow AI into Blender and Maya pipelines. Leveraged AI texture generation and contextual dial controls for rapid asset iteration. Created studio-wide preset library.',
    implementation: [
      'Pipeline integration with asset management',
      'Custom AI training on game art style',
      'Dial-based sculpting and UV mapping',
      'Automated LOD generation workflows',
      'Cross-team preset synchronization'
    ],
    results: [
      { metric: 'Asset Production', value: '+156%', icon: TrendUp },
      { metric: 'Outsourcing Costs', value: '-68%', icon: ChartBar },
      { metric: 'Iteration Speed', value: '5.2x', icon: Clock },
      { metric: 'Quality Score', value: '94/100', icon: Sparkle }
    ],
    testimonial: {
      quote: 'We cut our asset production time in half while improving quality. The AI texture generation alone saved us hundreds of thousands in outsourcing costs.',
      author: 'Marcus Rodriguez',
      role: 'Lead 3D Artist'
    },
    tools: ['Blender', 'Maya', 'Cinema 4D'],
    bgGradient: 'from-blue-500/10 to-cyan-500/10'
  },
  {
    id: 'design-agency',
    company: 'Flux Agency',
    industry: 'Advertising & Design',
    size: '45 Creatives',
    challenge: 'Fast-paced agency juggling multiple client projects simultaneously. Designers wasted time context-switching between tools and searching for assets. Client revisions were time-consuming.',
    solution: 'Rolled out MotionFlow AI for Photoshop, Illustrator, and video editing suite. Implemented AI-powered design variations and smart dial controls for rapid client iterations.',
    implementation: [
      'Multi-app profile switching',
      'AI-generated design variations',
      'Client brand preset libraries',
      'Real-time collaboration features',
      'Automated revision workflows'
    ],
    results: [
      { metric: 'Client Capacity', value: '+89%', icon: TrendUp },
      { metric: 'Revision Time', value: '-76%', icon: Clock },
      { metric: 'Billable Hours', value: '+$340K', icon: ChartBar },
      { metric: 'Client Retention', value: '96%', icon: Users }
    ],
    testimonial: {
      quote: 'Our designers love it. We\'re delivering projects faster, iterating more, and our clients are thrilled. The ROI was immediate and substantial.',
      author: 'Emily Thompson',
      role: 'Creative Director'
    },
    tools: ['Photoshop', 'Illustrator', 'Premiere Pro'],
    bgGradient: 'from-orange-500/10 to-red-500/10'
  },
  {
    id: 'archviz',
    company: 'Urban Spaces 3D',
    industry: 'Architectural Visualization',
    size: '22 Visualizers',
    challenge: 'Architectural visualization firm needed to produce more renders for real estate clients while maintaining photorealistic quality. Material creation and scene setup were bottlenecks.',
    solution: 'Implemented MotionFlow AI for Blender with focus on AI material generation and lighting workflows. Trained custom models on architectural photography for consistent style.',
    implementation: [
      'AI material library for archviz',
      'Custom lighting preset system',
      'Dial-based camera control',
      'Automated rendering workflows',
      'Client review integration'
    ],
    results: [
      { metric: 'Render Output', value: '+215%', icon: TrendUp },
      { metric: 'Material Creation', value: '-82%', icon: Clock },
      { metric: 'Revenue Growth', value: '+178%', icon: ChartBar },
      { metric: 'Client Projects', value: '3.1x', icon: Users }
    ],
    testimonial: {
      quote: 'The AI material generation is magical. What used to take hours now takes minutes. We tripled our project capacity without hiring anyone.',
      author: 'David Kowalski',
      role: 'Founder & Lead Visualizer'
    },
    tools: ['Blender', 'Revit', 'Photoshop'],
    bgGradient: 'from-green-500/10 to-emerald-500/10'
  }
]

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<string>(caseStudies[0].id)
  const currentCase = caseStudies.find(c => c.id === selectedCase) || caseStudies[0]

  return (
    <div className="space-y-8">
      <Tabs value={selectedCase} onValueChange={setSelectedCase} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-2 bg-card/50 glass-effect">
          {caseStudies.map(study => (
            <TabsTrigger 
              key={study.id}
              value={study.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 px-4 text-sm flex flex-col items-start gap-1"
            >
              <span className="font-semibold">{study.company}</span>
              <span className="text-xs opacity-80">{study.industry}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          {caseStudies.map(study => (
            <TabsContent key={study.id} value={study.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`glass-effect border-border/50 bg-gradient-to-br ${study.bgGradient}`}>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div>
                        <CardTitle className="font-['Space_Grotesk'] text-3xl mb-2">
                          {study.company}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {study.industry} • {study.size}
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {study.tools.map(tool => (
                          <Badge key={tool} variant="secondary" className="bg-secondary/40">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <ChartBar className="text-destructive" weight="duotone" size={24} />
                            The Challenge
                          </h4>
                          <p className="text-foreground/80 leading-relaxed">
                            {study.challenge}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Sparkle className="text-accent" weight="duotone" size={24} />
                            The Solution
                          </h4>
                          <p className="text-foreground/80 leading-relaxed">
                            {study.solution}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <CheckCircle className="text-primary" weight="duotone" size={24} />
                            Implementation
                          </h4>
                          <ul className="space-y-2">
                            {study.implementation.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <ArrowRight className="text-primary mt-1 flex-shrink-0" size={16} weight="bold" />
                                <span className="text-sm text-foreground/80">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <TrendUp className="text-accent" weight="duotone" size={24} />
                            Results & Impact
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {study.results.map((result, idx) => (
                              <motion.div
                                key={result.metric}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                              >
                                <Card className="bg-card/50 border-border/30 hover:border-accent/50 transition-all">
                                  <CardContent className="pt-6 text-center">
                                    <result.icon size={32} weight="duotone" className="text-accent mx-auto mb-2" />
                                    <div className="text-3xl font-bold text-accent mb-1">
                                      {result.value}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {result.metric}
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <Card className="bg-muted/30 border-border/30">
                          <CardContent className="pt-6">
                            <Quotes size={32} weight="duotone" className="text-primary/30 mb-3" />
                            <p className="text-foreground/90 leading-relaxed mb-4 italic">
                              "{study.testimonial.quote}"
                            </p>
                            <div className="border-t border-border/30 pt-4">
                              <p className="font-semibold text-foreground">
                                {study.testimonial.author}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {study.testimonial.role}
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all"
                          size="lg"
                        >
                          Download Full Case Study
                          <ArrowRight className="ml-2" weight="bold" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </AnimatePresence>
      </Tabs>
    </div>
  )
}
