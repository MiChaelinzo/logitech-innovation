import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Command, 
  Keyboard, 
  ArrowsOut,
  X
} from '@phosphor-icons/react'

type Shortcut = {
  keys: string[]
  action: string
  category: 'navigation' | 'demo' | 'general'
}

const shortcuts: Shortcut[] = [
  { keys: ['?'], action: 'Toggle this help panel', category: 'general' },
  { keys: ['Esc'], action: 'Close modals and dialogs', category: 'general' },
  { keys: ['h', 'Home'], action: 'Scroll to top / Hero section', category: 'navigation' },
  { keys: ['d'], action: 'Jump to Interactive Demo', category: 'navigation' },
  { keys: ['v'], action: 'Jump to Video Showcase', category: 'navigation' },
  { keys: ['c'], action: 'Jump to Community Presets', category: 'navigation' },
  { keys: ['r'], action: 'Jump to ROI Calculator', category: 'navigation' },
  { keys: ['p'], action: 'Jump to Pricing section', category: 'navigation' },
  { keys: ['Space'], action: 'Play/Pause demo simulation', category: 'demo' },
  { keys: ['g'], action: 'Generate AI asset', category: 'demo' },
  { keys: ['↑', '↓'], action: 'Adjust dial value', category: 'demo' },
  { keys: ['Cmd', 'K'], action: 'Quick search (coming soon)', category: 'general' },
]

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  const categoryColors = {
    navigation: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
    demo: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
    general: 'bg-green-500/20 text-green-500 border-green-500/30'
  }

  const categories = {
    navigation: 'Navigation',
    demo: 'Demo Controls',
    general: 'General'
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-2xl bg-gradient-to-br from-primary to-accent hover:opacity-90"
          size="icon"
        >
          <Keyboard size={24} weight="duotone" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl z-50"
            >
              <Card className="glass-effect border-border/50 h-full md:h-auto overflow-auto">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-['Space_Grotesk'] text-3xl mb-2 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <Command size={24} weight="duotone" className="text-primary-foreground" />
                        </div>
                        Keyboard Shortcuts
                      </CardTitle>
                      <CardDescription className="text-base">
                        Navigate and control the demo faster with keyboard commands
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="rounded-full"
                    >
                      <X size={20} />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {Object.entries(categories).map(([categoryKey, categoryLabel]) => {
                    const categoryShortcuts = shortcuts.filter(s => s.category === categoryKey)
                    
                    return (
                      <div key={categoryKey} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge className={categoryColors[categoryKey as keyof typeof categoryColors]}>
                            {categoryLabel}
                          </Badge>
                          <div className="h-px flex-1 bg-border/30" />
                        </div>

                        <div className="grid gap-2">
                          {categoryShortcuts.map((shortcut, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/30"
                            >
                              <span className="text-sm text-foreground/90">{shortcut.action}</span>
                              <div className="flex gap-2">
                                {shortcut.keys.map((key, keyIdx) => (
                                  <div key={keyIdx} className="flex items-center gap-1">
                                    <kbd className="px-3 py-1.5 text-xs font-semibold text-foreground bg-card border border-border rounded-md shadow-sm min-w-[2rem] text-center">
                                      {key}
                                    </kbd>
                                    {keyIdx < shortcut.keys.length - 1 && shortcut.keys.length > 1 && key.length > 1 && (
                                      <span className="text-muted-foreground">+</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )
                  })}

                  <div className="pt-4 border-t border-border/30">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <ArrowsOut size={24} weight="duotone" className="text-primary flex-shrink-0" />
                      <p className="text-sm text-foreground/80">
                        <strong className="text-primary">Pro Tip:</strong> Press <kbd className="px-2 py-1 text-xs bg-card border border-border rounded mx-1">?</kbd> anytime to toggle this shortcuts panel
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
