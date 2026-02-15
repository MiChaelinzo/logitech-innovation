import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Newspaper, 
  Rocket,
  Sparkle,
  Lightning,
  Users,
  TrendUp,
  Calendar,
  ArrowRight
} from '@phosphor-icons/react'

type NewsItem = {
  id: string
  title: string
  description: string
  category: 'feature' | 'update' | 'community' | 'achievement'
  date: string
  icon: typeof Rocket
  color: string
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'AI Code Generator Released',
    description: 'Generate production-ready Logitech Actions SDK code with AI assistance',
    category: 'feature',
    date: '2024-01-15',
    icon: Sparkle,
    color: 'text-primary'
  },
  {
    id: '2',
    title: 'Reached 15,000 Active Users',
    description: 'Community milestone! Thank you for your support',
    category: 'achievement',
    date: '2024-01-14',
    icon: Users,
    color: 'text-green-500'
  },
  {
    id: '3',
    title: 'Voice Commands Now Available',
    description: 'Control the platform hands-free with voice commands',
    category: 'feature',
    date: '2024-01-12',
    icon: Lightning,
    color: 'text-accent'
  },
  {
    id: '4',
    title: 'Community Presets Hit 10,000',
    description: 'Explore thousands of community-created dial configurations',
    category: 'community',
    date: '2024-01-10',
    icon: TrendUp,
    color: 'text-orange-500'
  },
  {
    id: '5',
    title: 'Performance Improvements',
    description: '40% faster load times and smoother animations',
    category: 'update',
    date: '2024-01-08',
    icon: Rocket,
    color: 'text-blue-500'
  },
  {
    id: '6',
    title: 'New Hardware Visualization',
    description: 'Real-time 3D console simulation with live feedback',
    category: 'feature',
    date: '2024-01-05',
    icon: Sparkle,
    color: 'text-primary'
  }
]

const getCategoryBadge = (category: NewsItem['category']) => {
  const styles = {
    feature: 'bg-primary/20 text-primary border-primary/30',
    update: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    community: 'bg-accent/20 text-accent border-accent/30',
    achievement: 'bg-green-500/20 text-green-400 border-green-500/30'
  }
  const labels = {
    feature: '✨ New Feature',
    update: '🔄 Update',
    community: '👥 Community',
    achievement: '🏆 Milestone'
  }
  return (
    <Badge variant="outline" className={styles[category]}>
      {labels[category]}
    </Badge>
  )
}

export function NewsUpdates() {
  const [visibleCount, setVisibleCount] = useState(3)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
            Latest Updates
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay informed about new features, community milestones, and platform improvements
          </p>
        </motion.div>

        <Card className="glass-effect border-border/50">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
                <Newspaper size={28} weight="duotone" className="text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">News Feed</CardTitle>
                <p className="text-sm text-muted-foreground">Recent announcements and updates</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {newsItems.slice(0, visibleCount).map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-6 hover:bg-muted/30 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-muted/50 group-hover:scale-110 transition-transform ${item.color}`}>
                        <Icon size={24} weight="duotone" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          {getCategoryBadge(item.category)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar size={14} />
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                      <ArrowRight
                        size={20}
                        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {visibleCount < newsItems.length && (
              <div className="p-6 border-t border-border/30">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setVisibleCount(prev => Math.min(prev + 3, newsItems.length))}
                >
                  Load More Updates
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
