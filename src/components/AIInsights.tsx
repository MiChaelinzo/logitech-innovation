import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, Sparkle, TrendUp, Lightbulb, ArrowRight } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

type Insight = {
  title: string
  description: string
  impact: string
  icon: 'productivity' | 'creativity' | 'efficiency' | 'learning'
}

const insightIcons = {
  productivity: TrendUp,
  creativity: Sparkle,
  efficiency: Brain,
  learning: Lightbulb
}

export function AIInsights() {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const insights: Insight[] = [
    {
      title: 'Contextual Workflow Optimization',
      description: 'MotionFlow AI analyzes your current project context and automatically suggests the most relevant dial mappings. When editing a color-heavy scene, color grading controls take priority. Working with audio? Gain and EQ controls become instantly accessible.',
      impact: '40% faster tool access',
      icon: 'efficiency'
    },
    {
      title: 'Predictive Action Preloading',
      description: 'Machine learning algorithms study your editing patterns to predict which tools you\'ll need next. Before you even reach for a control, the system has pre-loaded relevant assets and configurations, eliminating micro-delays that compound over long sessions.',
      impact: '2-3 hours saved weekly',
      icon: 'productivity'
    },
    {
      title: 'Creative Momentum Preservation',
      description: 'Traditional workflows interrupt creative flow with menu navigation and tool switching. Physical dial controls paired with AI assistance keep you in the zone - your hands stay on the hardware while AI handles the complexity behind the scenes.',
      impact: '3x longer focus sessions',
      icon: 'creativity'
    },
    {
      title: 'Adaptive Learning System',
      description: 'The more you use MotionFlow AI, the smarter it becomes. The system builds a personalized profile of your style, frequently-used tools, and preferences. Within a week, it feels like an extension of your creative instincts.',
      impact: 'Improves continuously',
      icon: 'learning'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [insights.length])

  const generateNewInsight = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setCurrentInsight((prev) => (prev + 1) % insights.length)
    setIsGenerating(false)
  }

  const insight = insights[currentInsight]
  const Icon = insightIcons[insight.icon]

  return (
    <Card className="glass-effect border-border/50 overflow-hidden">
      <CardContent className="pt-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain size={24} weight="duotone" className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-xl">AI Insights</h3>
              <p className="text-sm text-muted-foreground">How AI enhances your workflow</p>
            </div>
          </div>
          <div className="flex gap-2">
            {insights.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentInsight(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentInsight ? 'bg-primary w-8' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentInsight}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${
                insight.icon === 'productivity' ? 'from-blue-500 to-cyan-500' :
                insight.icon === 'creativity' ? 'from-purple-500 to-pink-500' :
                insight.icon === 'efficiency' ? 'from-green-500 to-emerald-500' :
                'from-orange-500 to-yellow-500'
              } flex items-center justify-center flex-shrink-0`}>
                <Icon size={28} weight="duotone" className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-['Space_Grotesk'] font-semibold text-lg mb-2">{insight.title}</h4>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  {insight.description}
                </p>
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <TrendUp size={14} weight="bold" className="mr-1" />
                  {insight.impact}
                </Badge>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/30">
              <Button
                onClick={generateNewInsight}
                variant="outline"
                className="flex-1"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkle size={16} weight="duotone" />
                    </motion.div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkle size={16} weight="duotone" />
                    Next Insight
                  </>
                )}
              </Button>
              <Button
                onClick={() => setCurrentInsight((currentInsight + 1) % insights.length)}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <ArrowRight size={16} weight="bold" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
