import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Check } from '@phosphor-icons/react'
import { useInteractionTracker } from '@/hooks/use-interaction-tracker'

export function InteractionIndicator() {
  const { getInteractionCount } = useInteractionTracker()
  const [showPulse, setShowPulse] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)

  useEffect(() => {
    const count = getInteractionCount()
    if (count > interactionCount) {
      setShowPulse(true)
      setInteractionCount(count)
      setTimeout(() => setShowPulse(false), 2000)
    }
  }, [getInteractionCount()])

  const displayCount = getInteractionCount()

  if (displayCount === 0) return null

  return (
    <AnimatePresence>
      {displayCount >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-8 left-8 z-40"
        >
          <div className="glass-effect rounded-full px-4 py-2 border border-primary/30 flex items-center gap-2">
            <motion.div
              animate={showPulse ? {
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{ duration: 0.5 }}
            >
              <Brain size={20} weight="duotone" className="text-primary" />
            </motion.div>
            <span className="text-xs text-muted-foreground">
              AI learning from {displayCount} interactions
            </span>
            {showPulse && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check size={16} weight="bold" className="text-accent" />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
