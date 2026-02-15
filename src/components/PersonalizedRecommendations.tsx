import { useState, useEffect } from 'react'
import { Sparkle, TrendUp, Lightbulb, ArrowRight, X, Target } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { useKV } from '@github/spark/hooks'

interface UserInteraction {
  type: 'demo' | 'video' | 'preset' | 'app-scenario' | 'roi-calc' | 'pricing' | 'feature'
  itemId: string
  timestamp: number
  duration?: number
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
    if (interactions && interactions.length >= 3 && recommendations.length === 0 && !isGenerating) {
      generateRecommendations()
    }
  }, [interactions])

  const generateRecommendations = async () => {
    setIsGenerating(true)
    try {
      const interactionSummary = interactions
        ? interactions.slice(-10).map(i => `${i.type}: ${i.itemId}`).join(', ')
        : 'No interactions yet'

      const promptText = `You are an AI assistant analyzing user behavior on the MotionFlow AI landing page.

User interactions: ${interactionSummary}

Generate 3-4 personalized recommendations that:
1. Are relevant to what they've explored
2. Have a clear reason based on their behavior
3. Guide them toward the most relevant next steps
4. Consider their stage in the buyer journey

Return a JSON object with a single property "recommendations" containing an array of recommendation objects. Each object should have:
- id: unique identifier (string)
- title: short title (string)
- description: brief description (string)
- reason: why this is recommended based on their activity (string)
- action: call-to-action text (string)
- priority: "high", "medium", or "low" (string)
- category: "feature", "use-case", "pricing", "community", or "demo" (string)

Example format:
{
  "recommendations": [
    {
      "id": "rec-1",
      "title": "Try the Blender 3D Demo",
      "description": "Experience real-time 3D modeling controls with AI texture generation",
      "reason": "You've shown interest in video editing tools, and many users transition to 3D workflows",
      "action": "Explore Blender Demo",
      "priority": "high",
      "category": "demo"
    }
  ]
}`

      const response = await window.spark.llm(promptText, 'gpt-4o-mini', true)
      const parsed = JSON.parse(response)
      
      const newRecommendations = parsed.recommendations
        .filter((rec: Recommendation) => !(dismissedIds || []).includes(rec.id))
        .slice(0, 3)
      
      setRecommendations(newRecommendations)
      setIsVisible(newRecommendations.length > 0)
    } catch (error) {
      console.error('Failed to generate recommendations:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const dismissRecommendation = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id))
    setDismissedIds(current => [...(current || []), id])
    
    if (recommendations.length <= 1) {
      setIsVisible(false)
    }
  }

  const handleAction = (rec: Recommendation) => {
    const sectionMap: Record<string, string> = {
      'demo': 'demo',
      'use-case': 'features',
      'pricing': 'pricing',
      'community': 'community',
      'feature': 'features'
    }
    
    const sectionId = sectionMap[rec.category] || 'features'
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
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
      case 'high': return Target
      case 'medium': return TrendUp
      case 'low': return Lightbulb
      default: return Sparkle
    }
  }

  if (!isVisible || recommendations.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-8 right-8 z-40 max-w-md"
    >
      <Card className="glass-effect border-primary/30 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkle size={18} weight="duotone" className="text-primary-foreground" />
              </div>
              <CardTitle className="text-lg font-['Space_Grotesk']">
                For You
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>
          <CardDescription className="text-xs">
            Based on your interests
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <AnimatePresence mode="popLayout">
            {recommendations.map((rec, index) => {
              const PriorityIcon = getPriorityIcon(rec.priority)

              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-all">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissRecommendation(rec.id)}
                      className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </Button>
                    
                    <div className="flex items-start gap-3 mb-2">
                      <PriorityIcon size={20} className={getPriorityColor(rec.priority)} weight="duotone" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{rec.title}</h4>
                        <Badge variant="outline" className="text-xs mb-2 bg-muted/30">
                          {rec.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      {rec.description}
                    </p>
                    
                    <p className="text-xs text-foreground/70 mb-3 italic">
                      💡 {rec.reason}
                    </p>
                    
                    <Button
                      size="sm"
                      onClick={() => handleAction(rec)}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 h-8 text-xs"
                    >
                      {rec.action}
                      <ArrowRight size={14} className="ml-1" weight="bold" />
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          
          {isGenerating && (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Analyzing your interests...
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function trackInteraction(type: UserInteraction['type'], itemId: string, duration?: number) {
  const existingInteractions = JSON.parse(localStorage.getItem('user-interactions') || '[]')
  
  const newInteraction = {
    type,
    itemId,
    timestamp: Date.now(),
    duration
  }
  
  const updatedInteractions = [...existingInteractions, newInteraction]
  localStorage.setItem('user-interactions', JSON.stringify(updatedInteractions))
  
  window.dispatchEvent(new CustomEvent('interaction-tracked', { detail: newInteraction }))
}
