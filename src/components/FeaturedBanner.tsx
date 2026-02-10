import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Sparkle, Gift, TrendUp, Star } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

type Announcement = {
  id: string
  title: string
  description: string
  icon: typeof Sparkle
  color: string
  ctaText: string
  ctaLink: string
}

const announcements: Announcement[] = [
  {
    id: 'early-access',
    title: 'Early Access Program Now Open!',
    description: 'Be among the first to experience MotionFlow AI. Limited spots available.',
    icon: Sparkle,
    color: 'from-primary to-accent',
    ctaText: 'Join Beta',
    ctaLink: '#contact'
  },
  {
    id: 'featured-preset',
    title: 'New Community Preset Pack Released',
    description: '50+ professional presets from top creators, free for all users.',
    icon: Gift,
    color: 'from-accent to-secondary',
    ctaText: 'Browse Presets',
    ctaLink: '#community'
  },
  {
    id: 'success-story',
    title: '10,000+ Hours Saved by Users',
    description: 'Join thousands of creatives who have transformed their workflow.',
    icon: TrendUp,
    color: 'from-secondary to-primary',
    ctaText: 'Read Stories',
    ctaLink: '#testimonials'
  }
]

export function FeaturedBanner() {
  const [dismissedBanners, setDismissedBanners] = useKV<string[]>('dismissed-banners', [])
  const [currentIndex, setCurrentIndex] = useState(0)

  const activeBanners = announcements.filter(
    a => !(dismissedBanners || []).includes(a.id)
  )

  if (activeBanners.length === 0) return null

  const currentBanner = activeBanners[currentIndex % activeBanners.length]
  const Icon = currentBanner.icon

  const handleDismiss = () => {
    setDismissedBanners((current) => [...(current || []), currentBanner.id])
    if (currentIndex < activeBanners.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleCTA = () => {
    const element = document.querySelector(currentBanner.ctaLink)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence mode="wait">
      {activeBanners.length > 0 && (
        <motion.div
          key="banner-container"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`glass-effect border-border/50 overflow-hidden relative`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${currentBanner.color} opacity-10`} />
                <CardContent className="p-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentBanner.color} flex items-center justify-center flex-shrink-0`}
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(180, 83, 255, 0.3)',
                          '0 0 30px rgba(180, 83, 255, 0.6)',
                          '0 0 20px rgba(180, 83, 255, 0.3)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon size={24} weight="duotone" className="text-foreground" />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base mb-1 flex items-center gap-2">
                        {currentBanner.title}
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                        {currentBanner.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={handleCTA}
                        className={`bg-gradient-to-r ${currentBanner.color} hover:opacity-90 hidden sm:flex`}
                      >
                        {currentBanner.ctaText}
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={handleDismiss}
                      >
                        <X size={16} weight="bold" />
                      </Button>
                    </div>
                  </div>

                  {activeBanners.length > 1 && (
                    <div className="flex justify-center gap-1 mt-3">
                      {activeBanners.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentIndex % activeBanners.length
                              ? 'w-6 bg-primary'
                              : 'w-1.5 bg-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
