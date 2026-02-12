import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  Check, 
  Clock, 
  Lightning,
  ArrowsLeftRight
} from '@phosphor-icons/react'

export function BeforeAfterComparison() {
  const [sliderValue, setSliderValue] = useState([50])

  const beforeMetrics = [
    { label: 'Menu Navigation', value: '8 clicks', icon: X, color: 'text-red-500' },
    { label: 'Tool Switching', value: '12 seconds', icon: Clock, color: 'text-red-500' },
    { label: 'Asset Creation', value: '5 minutes', icon: Clock, color: 'text-red-500' },
    { label: 'Context Loss', value: 'Frequent', icon: X, color: 'text-red-500' }
  ]

  const afterMetrics = [
    { label: 'Direct Control', value: '1 dial turn', icon: Check, color: 'text-green-500' },
    { label: 'Instant Switch', value: '< 1 second', icon: Lightning, color: 'text-green-500' },
    { label: 'AI Generation', value: '30 seconds', icon: Lightning, color: 'text-green-500' },
    { label: 'Stay in Flow', value: 'Continuous', icon: Check, color: 'text-green-500' }
  ]

  return (
    <Card className="glass-effect border-border/50 overflow-hidden">
      <CardContent className="pt-8">
        <div className="text-center mb-8">
          <h3 className="font-['Space_Grotesk'] font-semibold text-3xl mb-3">
            Before vs. After MotionFlow AI
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to compare traditional workflows with MotionFlow AI-enhanced productivity
          </p>
        </div>

        <div className="relative mb-8">
          <div className="grid md:grid-cols-2 gap-8 relative">
            <motion.div
              className="space-y-4"
              animate={{ opacity: sliderValue[0] > 50 ? 0.3 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/30">
                  <X size={14} weight="bold" className="mr-1" />
                  Traditional Workflow
                </Badge>
                <span className="text-2xl font-bold text-red-500">😓</span>
              </div>

              <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                <div className="space-y-4">
                  {beforeMetrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                      <div className="flex items-center gap-3">
                        <metric.icon size={20} weight="bold" className={metric.color} />
                        <span className="text-sm font-medium">{metric.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono">{metric.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border/30">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-red-500">~25 min</div>
                    <div className="text-xs text-muted-foreground">Average task completion time</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              animate={{ opacity: sliderValue[0] < 50 ? 0.3 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                  <Check size={14} weight="bold" className="mr-1" />
                  With MotionFlow AI
                </Badge>
                <span className="text-2xl font-bold text-green-500">🚀</span>
              </div>

              <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
                <div className="space-y-4">
                  {afterMetrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                      <div className="flex items-center gap-3">
                        <metric.icon size={20} weight="bold" className={metric.color} />
                        <span className="text-sm font-medium">{metric.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono">{metric.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border/30">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-green-500">~7 min</div>
                    <div className="text-xs text-muted-foreground">Average task completion time</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <ArrowsLeftRight size={20} weight="duotone" className="text-primary" />
            <span className="text-sm font-medium">Drag to compare</span>
          </div>
          
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={1}
            className="cursor-pointer"
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Traditional</span>
            <span className="font-mono">{sliderValue[0]}%</span>
            <span>AI-Enhanced</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                72%
              </div>
              <div className="text-sm text-muted-foreground">Time Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                3.5x
              </div>
              <div className="text-sm text-muted-foreground">Faster Completion</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                90%
              </div>
              <div className="text-sm text-muted-foreground">Less Context Switching</div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
