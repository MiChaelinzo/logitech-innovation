import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CircleNotch, 
  Circle, 
  HandSwipeRight,
  Lightning,
  Radio,
  PushPin
} from '@phosphor-icons/react'

type DialState = {
  id: number
  label: string
  value: number
  active: boolean
  color: string
}

export function LiveHardwareVisualization() {
  const [dials, setDials] = useState<DialState[]>([
    { id: 1, label: 'Parameter A', value: 45, active: false, color: 'from-blue-500 to-cyan-500' },
    { id: 2, label: 'Parameter B', value: 70, active: false, color: 'from-purple-500 to-pink-500' },
    { id: 3, label: 'Parameter C', value: 30, active: false, color: 'from-orange-500 to-red-500' },
  ])
  
  const [isConnected, setIsConnected] = useState(true)
  const [activeAction, setActiveAction] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const randomDial = Math.floor(Math.random() * dials.length)
      const randomValue = Math.random() * 100
      
      setDials(prev => prev.map((dial, idx) => 
        idx === randomDial 
          ? { ...dial, value: randomValue, active: true }
          : { ...dial, active: false }
      ))

      if (Math.random() > 0.7) {
        const actions = ['Adjust Color', 'Modify Scale', 'Change Opacity', 'Rotate Element']
        setActiveAction(actions[Math.floor(Math.random() * actions.length)])
        setTimeout(() => setActiveAction(null), 2000)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [dials.length])

  return (
    <Card className="glass-effect border-border/50 overflow-hidden">
      <CardContent className="pt-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="font-['Space_Grotesk'] font-semibold text-2xl mb-2">
              Live Hardware Simulation
            </h3>
            <p className="text-sm text-muted-foreground">
              Real-time visualization of MX Creative Console interactions
            </p>
          </div>
          <Badge className={isConnected ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-red-500/20 text-red-500 border-red-500/30'}>
            <Radio size={12} weight="fill" className="mr-1" />
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-2xl" />
          
          <div className="relative p-8">
            <div className="bg-card/50 backdrop-blur rounded-3xl p-8 border-2 border-border/30 shadow-2xl">
              <div className="grid grid-cols-3 gap-12 mb-8">
                {dials.map((dial, idx) => (
                  <motion.div
                    key={dial.id}
                    className="flex flex-col items-center"
                    animate={dial.active ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative mb-4">
                      <motion.div
                        className={`w-32 h-32 rounded-full bg-gradient-to-br ${dial.color} p-1 shadow-lg`}
                        animate={dial.active ? {
                          boxShadow: [
                            '0 0 20px rgba(180, 83, 255, 0.3)',
                            '0 0 40px rgba(180, 83, 255, 0.6)',
                            '0 0 20px rgba(180, 83, 255, 0.3)'
                          ]
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-full h-full rounded-full bg-card flex items-center justify-center relative">
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `conic-gradient(from ${-90}deg, ${dial.active ? 'rgba(180, 83, 255, 0.3)' : 'transparent'} ${dial.value * 3.6}deg, transparent ${dial.value * 3.6}deg)`
                            }}
                          />
                          
                          <motion.div
                            className={`w-24 h-24 rounded-full bg-gradient-to-br ${dial.color} flex items-center justify-center relative z-10`}
                            style={{ rotate: (dial.value / 100) * 360 }}
                            transition={{ type: 'spring', stiffness: 100 }}
                          >
                            <div className="w-2 h-2 rounded-full bg-white absolute top-4" />
                            <CircleNotch size={40} className="text-white" weight="bold" />
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      {dial.active && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg"
                        >
                          <Lightning size={16} weight="fill" className="text-accent-foreground" />
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="text-center space-y-1">
                      <div className="text-xs font-medium text-muted-foreground">{dial.label}</div>
                      <Badge variant="outline" className="font-mono text-xs">
                        {Math.round(dial.value)}%
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-6 pt-6 border-t border-border/30">
                {[1, 2, 3, 4, 5].map((btn) => (
                  <motion.button
                    key={btn}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-muted to-muted/50 border-2 border-border hover:border-primary transition-all flex items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Circle size={8} weight="fill" className="text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {activeAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <HandSwipeRight size={20} weight="duotone" className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Active Command</div>
                <div className="text-xs text-muted-foreground">{activeAction}</div>
              </div>
              <Badge className="bg-primary/20 text-primary border-primary/30">
                <Lightning size={12} weight="fill" className="mr-1" />
                Live
              </Badge>
            </div>
          </motion.div>
        )}

        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsConnected(!isConnected)}
          >
            <Radio size={16} weight="fill" />
            {isConnected ? 'Disconnect' : 'Connect'} Device
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setDials(prev => prev.map(d => ({ ...d, value: 50 })))}
          >
            <PushPin size={16} />
            Reset All Dials
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
