import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Plus, 
  X,
  Heart,
  Calculator,
  Play,
  BookmarkSimple,
  ArrowUp,
  Share
} from '@phosphor-icons/react'

type QuickAction = {
  id: string
  label: string
  icon: typeof Plus
  onClick: () => void
  color: string
}

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useState(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const actions: QuickAction[] = [
    {
      id: 'demo',
      label: 'Try Demo',
      icon: Play,
      onClick: () => {
        document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
        setIsOpen(false)
      },
      color: 'text-primary'
    },
    {
      id: 'favorites',
      label: 'My Favorites',
      icon: Heart,
      onClick: () => {
        document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })
        setIsOpen(false)
      },
      color: 'text-accent'
    },
    {
      id: 'calculator',
      label: 'ROI Calculator',
      icon: Calculator,
      onClick: () => {
        document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })
        setIsOpen(false)
      },
      color: 'text-secondary'
    },
    {
      id: 'share',
      label: 'Share Page',
      icon: Share,
      onClick: () => {
        if (navigator.share) {
          navigator.share({
            title: 'MotionFlow AI',
            text: 'Check out MotionFlow AI - AI-powered physical controls for creative workflows!',
            url: window.location.href
          })
        }
        setIsOpen(false)
      },
      color: 'text-primary'
    }
  ]

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-2"
            >
              {actions.map((action, index) => {
                const Icon = action.icon
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      onClick={action.onClick}
                      className="glass-effect border border-border/50 hover:border-primary/50 shadow-lg h-12 px-4 gap-3"
                      variant="secondary"
                    >
                      <Icon size={20} className={action.color} weight="duotone" />
                      <span className="font-medium">{action.label}</span>
                    </Button>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showScrollTop && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                onClick={scrollToTop}
                size="icon"
                className="glass-effect border border-border/50 hover:border-accent/50 shadow-lg w-12 h-12 rounded-full bg-accent/10"
                variant="secondary"
              >
                <ArrowUp size={20} className="text-accent" weight="bold" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent hover:opacity-90 shadow-lg border-2 border-primary/30"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <X size={24} weight="bold" />
              ) : (
                <Plus size={24} weight="bold" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </>
  )
}
