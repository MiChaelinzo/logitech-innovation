import { useState, useEffect } from 'react'
import { Sparkle, TrendUp, Lightbulb, ArrowRight, X, Target } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useKV } from '@github/spark/hooks'

interface UserInteraction {
  type: 'demo' | 'video' | 'preset' | 'app-scenario' | 'feature' | 'roi-calc' | 'pricing'
  itemId: string
  timestamp: number
}

interface Recommendation {
  id: string
  title: string
  description: string
  reason: string
  action: string
  priority: 'high' | 'medium' | 'low'
  category: 'feature' | 'use-case' | 'pricing' | 'community' | 'demo'
}

export function PersonalizedRecommendations() {
  const [interactions, setInteractions] = useKV<UserInteraction[]>('user-interactions', [])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [dismissedIds, setDismissedIds] = useKV<string[]>('dismissed-recommendations', [])

  useEffect(() => {
    if ((interactions?.length || 0) >= 3 && recommendations.length === 0 && !isGenerating) {
      generateRecommendations()
    }
  }, [interactions])

  const generateRecommendations = async () => {
    setIsGenerating(true)
    try {
      const interactionSummary = (interactions || [])
        .slice(-10)
        .map(i => `${i.type}: ${i.itemId}`)
        .join(', ')

      // @ts-ignore - spark API type definition issue
      const prompt = window.spark.llmPrompt`You are an AI assistant analyzing user behavior on the MotionFlow AI landing page.

User interactions: ${interactionSummary}

Based on these interactions, generate 3-4 personalized recommendations for what the user should explore next. Return ONLY a valid JSON object (not an array) with a single property called "recommendations" that contains an array of recommendation objects.

Each recommendation must have:
- id: unique string
- title: short catchy title (max 6 words)
- description: brief description (max 15 words)
- reason: why this is relevant based on their behavior (max 12 words)
- action: CTA text (max 3 words)
- priority: 'high', 'medium', or 'low'
- category: 'feature', 'use-case', 'pricing', 'community', or 'demo'

Return format:
{
  "recommendations": [
    {
      "id": "rec-1",
      "title": "...",
      "description": "...",
      "reason": "...",
      "action": "...",
      "priority": "high",
      "category": "demo"
    }
  ]
}`

      const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      const parsed = JSON.parse(response)
      
      const recs = parsed.recommendations || []
      const activeRecs = recs.filter((rec: Recommendation) => !(dismissedIds || []).includes(rec.id))
      
      setRecommendations(activeRecs)
      setIsVisible(activeRecs.length > 0)
    } catch (error) {
      console.error('Failed to generate recommendations:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const dismissRecommendation = (id: string) => {
    setDismissedIds(prev => [...(prev || []), id])
    setRecommendations(prev => prev.filter(rec => rec.id !== id))
    if (recommendations.length <= 1) {
      setIsVisible(false)
    }
  }

  const handleAction = (rec: Recommendation) => {
    const targetMap: Record<string, string> = {
      demo: 'demo',
      pricing: 'pricing',
      community: 'community',
      'use-case': 'demo',
      feature: 'features'
    }
    
    const target = targetMap[rec.category] || 'demo'
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    dismissRecommendation(rec.id)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-accent'
      case 'medium': return 'text-primary'
      case 'low': return 'text-secondary'
      default: return 'text-muted-foreground'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Target weight="duotone" />
      case 'medium': return <TrendUp weight="duotone" />
      default: return <Lightbulb weight="duotone" />
    }
  }

  if (!isVisible || recommendations.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-6 right-6 z-40 w-[380px] max-h-[500px] overflow-y-auto"
      >
        <Card className="glass-effect border-border/50 shadow-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Sparkle className="text-primary" size={20} weight="duotone" />
                <CardTitle className="text-lg">Personalized For You</CardTitle>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsVisible(false)}
                className="h-7 w-7 p-0 -mt-1"
              >
                <X size={16} />
              </Button>
            </div>
            <CardDescription className="text-xs">
              Based on your activity, here's what we recommend exploring next
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, idx) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur" />
                  <Card className="relative bg-muted/30 border-border/30 hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`${getPriorityColor(rec.priority)} mt-0.5 flex-shrink-0`}>
                          {getPriorityIcon(rec.priority)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-sm leading-tight">{rec.title}</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => dismissRecommendation(rec.id)}
                              className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            >
                              <X size={12} />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                            {rec.description}
                          </p>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[10px] text-muted-foreground/80 italic">
                              {rec.reason}
                            </p>
                            <Button
                              size="sm"
                              onClick={() => handleAction(rec)}
                              className="h-6 px-2 text-xs bg-gradient-to-r from-primary to-accent hover:opacity-90"
                            >
                              {rec.action}
                              <ArrowRight size={12} className="ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
