import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { 
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Check,
} fr
  Lightning,
  tradit
  Sparkle,

  Mouse,
  Keyboard,
  GameController
  { name: 'Preset Library', tr

]
const timeComp
    task: 'Color Grading 10 Cli
    motionflow: 12,
  },
 

  },
    task: 'Apply Effects to Timeline',
    motionflow: 8,
  },
    task: 'Adjust 20 Layer Properties',
    motionflow: 7,
  },
  { name: 'Preset Library', traditional: 'Limited', motionflow: 'Community-Driven', advantage: 'motionflow' },
  { name: 'Tactile Feedback', traditional: false, motionflow: true, advantage: 'motionflow' },
  { name: 'Parameter Precision', traditional: 'Mouse only', motionflow: 'Dial + Mouse', advantage: 'motionflow' },
  { name: 'Workflow Speed', traditional: '100%', motionflow: '170%', advantage: 'motionflow' }
]

const timeComparisons = [
  {
    task: 'Color Grading 10 Clips',
    traditional: 45,
    motionflow: 12,
    description: 'Real-time dial control + AI matching'
  },
  {
    task: 'Generate 5 Texture Assets',
    traditional: 120,
    motionflow: 8,
    description: 'AI generation vs manual creation'
  },
  {
    task: 'Apply Effects to Timeline',
    traditional: 30,
    motionflow: 8,
    description: 'Preset activation vs manual adjustment'
  },
  {
    task: 'Adjust 20 Layer Properties',
    traditional: 25,
    motionflow: 7,
    description: 'Dial control vs mouse clicking'
  },
  {
            </CardHeader>
    traditional: 5,
                  
    description: 'Context-aware profile switching'
   
]

export function WorkflowComparison() {
  const [activeView, setActiveView] = useState<'side-by-side' | 'animation'>('side-by-side')
  const [animationStep, setAnimationStep] = useState(0)

  const startAnimation = () => {
                       
    const interval = setInterval(() => {
      setAnimationStep(prev => {
        if (prev >= 4) {
                          {typeof
          return 0
         
        return prev + 1
        
    }, 1500)
   

  const traditionalSteps = [
    'Open menu',
    'Click through options',
    'Adjust with mouse',
                </tab
    'Repeat for each item'


  const motionflowSteps = [
    'Rotate dial',
              </CardHeader>
    'Apply to all',
    'Done!'
  ]

  return (
                      <Badge cl
      <div className="text-center">
        <Badge className="mb-4 px-4 py-2 bg-accent/20 text-accent border-accent/30">
          <Target size={16} weight="fill" className="mr-2" />
          See the Difference
        </Badge>
        <h3 className="font-['Space_Grotesk'] font-semibold text-3xl mb-3">
          Traditional vs MotionFlow AI
        </h3>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Compare how professional workflows transform with AI-powered physical controls
        </p>
            

      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as typeof activeView)} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-card/50 glass-effect">
          <TabsTrigger value="side-by-side">Feature Comparison</TabsTrigger>
          <TabsTrigger value="animation">Workflow Animation</TabsTrigger>
                   

        <TabsContent value="side-by-side" className="mt-8 space-y-8">
          <Card className="glass-effect border-border/50">
            <CardHeader>
              <CardTitle className="font-['Space_Grotesk'] text-2xl">Feature Comparison</CardTitle>
            </Card>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold">Feature</th>
                      <th className="text-center py-4 px-4 font-semibold">
                        <div className="flex flex-col items-center gap-2">
                          <Mouse size={24} weight="duotone" className="text-muted-foreground" />
                          <span>Traditional</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 font-semibold">
                        <div className="flex flex-col items-center gap-2">
                          <Sparkle size={24} weight="duotone" className="text-primary" />
                      <motion.div
                        </div>
                        tra
                    </tr>
                  </thead>
                  <tbody>
                    {workflowComparisons.map((feature, idx) => (
                      <motion.tr
                        key={feature.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                      >
                        <td className="py-4 px-4 font-medium">{feature.name}</td>
                        <td className="py-4 px-4 text-center">
                          {typeof feature.traditional === 'boolean' ? (
                            feature.traditional ? (
                              <Check size={20} weight="bold" className="text-primary mx-auto" />
                            ) : (
                              <X size={20} weight="bold" className="text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-muted-foreground">{feature.traditional}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {typeof feature.motionflow === 'boolean' ? (
                            feature.motionflow ? (
                              <Check size={20} weight="bold" className="text-accent mx-auto" />
                            ) : (
                              <X size={20} weight="bold" className="text-muted-foreground mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-semibold text-accent">{feature.motionflow}</span>
                          )}
                        </td>
                      </motion.tr>

                  </tbody>
                </table>
              </div>
                  <div cla
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="font-['Space_Grotesk'] text-xl flex items-center gap-2">
                  <Clock size={24} weight="duotone" className="text-primary" />
                  Time Savings Breakdown
                </CardTitle>
                           
              <CardContent className="space-y-4">
                {timeComparisons.map((comparison, idx) => (
                  <motion.div
                    key={comparison.task}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{comparison.task}</span>
                      <Badge className="bg-accent/20 text-accent border-accent/30">
                        {Math.round(((comparison.traditional - comparison.motionflow) / comparison.traditional) * 100)}% faster
}
                    </div>

                      <div className="flex-1 h-8 bg-muted/30 rounded-lg relative overflow-hidden">

                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="h-full bg-muted-foreground/40 flex items-center justify-end pr-2"
                        >
                          <span className="text-xs font-mono text-foreground">{comparison.traditional}m</span>
                        </motion.div>

                      <div className="flex-1 h-8 bg-muted/30 rounded-lg relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(comparison.motionflow / comparison.traditional) * 100}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary to-accent flex items-center justify-end pr-2"
                        >
                          <span className="text-xs font-mono text-primary-foreground">{comparison.motionflow}m</span>
                        </motion.div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{comparison.description}</p>
                  </motion.div>



                  <div className="flex items-center justify-between text-lg font-semibold">

                    <div className="flex gap-3">
                      <span className="text-muted-foreground line-through">
                        {timeComparisons.reduce((acc, c) => acc + c.traditional, 0)}m
                      </span>
                      <span className="text-accent">
                        {timeComparisons.reduce((acc, c) => acc + c.motionflow, 0)}m
                      </span>

                  </div>
                  <Badge className="w-full justify-center mt-2 py-2 bg-accent/20 text-accent border-accent/30">
                    <Lightning size={16} weight="fill" className="mr-2" />
                    Save {timeComparisons.reduce((acc, c) => acc + c.traditional, 0) - timeComparisons.reduce((acc, c) => acc + c.motionflow, 0)} minutes per session
                  </Badge>

              </CardContent>


            <Card className="glass-effect border-border/50 bg-gradient-to-br from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="font-['Space_Grotesk'] text-xl">Why Physical Controls Matter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">

                    {

                      title: 'Tactile Precision',
                      description: 'Physical dials provide fine-grained control impossible with a mouse or keyboard alone'
                    },

                      icon: Lightning,

                      description: 'Build intuitive workflows that become second nature, reducing cognitive load'

                    {

                      title: 'AI Enhancement',
                      description: 'Combine the precision of physical control with the power of AI generation'
                    },

                      icon: Target,

                      description: 'Smart detection adapts controls to your current tool and task automatically'

                  ].map((benefit, idx) => {

                    return (

                        key={benefit.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border/30"

                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Icon size={20} weight="duotone" className="text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground">{benefit.description}</p>
                        </div>
                      </motion.div>
                    )

                </div>

            </Card>

        </TabsContent>

        <TabsContent value="animation" className="mt-8">

            <CardHeader>
              <CardTitle className="font-['Space_Grotesk'] text-2xl">Workflow Animation</CardTitle>
              <p className="text-sm text-muted-foreground">
                Watch how tasks are completed with traditional methods vs MotionFlow AI
              </p>

            <CardContent className="space-y-8">

                <Button

                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"

                >
                  <Lightning size={20} weight="fill" />
                  Start Comparison Animation

              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">

                    <h3 className="font-['Space_Grotesk'] font-semibold text-xl">Traditional Workflow</h3>

                  
                  <div className="space-y-2">
                    {traditionalSteps.map((step, idx) => (

                        key={idx}
                        className="p-4 rounded-lg border border-border/30 bg-muted/20"
                        animate={{
                          backgroundColor: animationStep === idx ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                          scale: animationStep === idx ? 1.02 : 1

                        transition={{ duration: 0.3 }}

                        <div className="flex items-center gap-3">

                            animationStep > idx ? 'bg-primary/30 text-primary' : 
                            animationStep === idx ? 'bg-primary text-primary-foreground' : 
                            'bg-muted text-muted-foreground'

                            {animationStep > idx ? <Check size={16} weight="bold" /> : idx + 1}

                          <span className={animationStep >= idx ? 'font-medium' : 'text-muted-foreground'}>
                            {step}
                          </span>
                        </div>
                      </motion.div>



                  <div className="p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Time:</p>
                    <p className="text-2xl font-bold">~45 seconds</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkle size={32} weight="duotone" className="text-primary" />
                    <h3 className="font-['Space_Grotesk'] font-semibold text-xl text-primary">MotionFlow AI</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {motionflowSteps.map((step, idx) => (
                      <motion.div

                        className="p-4 rounded-lg border border-primary/30 bg-primary/5"
                        animate={{
                          backgroundColor: animationStep === idx ? 'rgba(76, 201, 240, 0.2)' : 'rgba(76, 201, 240, 0.05)',

                        }}

                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            animationStep > idx ? 'bg-accent/30 text-accent' : 
                            animationStep === idx ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground' : 
                            'bg-muted text-muted-foreground'
                          }`}>
                            {animationStep > idx ? <Check size={16} weight="bold" /> : idx + 1}
                          </div>
                          <span className={animationStep >= idx ? 'font-medium' : 'text-muted-foreground'}>
                            {step}
                          </span>
                        </div>

                    ))}


                  <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-accent/30 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Time:</p>
                    <p className="text-2xl font-bold text-accent">~8 seconds</p>
                    <Badge className="mt-2 bg-accent/20 text-accent border-accent/30">
                      <Lightning size={14} weight="fill" className="mr-1" />
                      5.6x Faster
                    </Badge>
                  </div>

              </div>

          </Card>

      </Tabs>

  )

