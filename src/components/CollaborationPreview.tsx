import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  UsersThree, 
  Lightning, 
  Eye,
  ChatCircle,
  Cursor,
  Sparkle
} from '@phosphor-icons/react'

type User = {
  id: number
  name: string
  color: string
  initials: string
  action: string
}

type Activity = {
  id: number
  user: User
  action: string
  timestamp: string
}

const mockUsers: User[] = [
  { id: 1, name: 'Sarah Chen', color: 'from-blue-500 to-cyan-500', initials: 'SC', action: 'Adjusting color grade' },
  { id: 2, name: 'Marcus Webb', color: 'from-purple-500 to-pink-500', initials: 'MW', action: 'Editing timeline' },
  { id: 3, name: 'Alex Rivera', color: 'from-orange-500 to-red-500', initials: 'AR', action: 'Adding effects' },
  { id: 4, name: 'Jordan Kim', color: 'from-green-500 to-emerald-500', initials: 'JK', action: 'Reviewing edits' }
]

export function CollaborationPreview() {
  const [activeUsers, setActiveUsers] = useState<User[]>([mockUsers[0]])
  const [activities, setActivities] = useState<Activity[]>([])
  const [cursors, setCursors] = useState<Array<{ user: User; x: number; y: number }>>([])

  useEffect(() => {
    const userInterval = setInterval(() => {
      setActiveUsers(prev => {
        if (prev.length < mockUsers.length && Math.random() > 0.3) {
          const nextUser = mockUsers.find(u => !prev.find(p => p.id === u.id))
          return nextUser ? [...prev, nextUser] : prev
        }
        return prev
      })
    }, 3000)

    const activityInterval = setInterval(() => {
      if (activeUsers.length > 0) {
        const randomUser = activeUsers[Math.floor(Math.random() * activeUsers.length)]
        const actions = [
          'adjusted brightness to 145%',
          'generated new texture asset',
          'rotated element 45 degrees',
          'changed color palette',
          'added motion blur effect',
          'modified keyframe timing',
          'exported preview render'
        ]
        const randomAction = actions[Math.floor(Math.random() * actions.length)]
        
        setActivities(prev => [
          {
            id: Date.now(),
            user: randomUser,
            action: randomAction,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          },
          ...prev.slice(0, 4)
        ])
      }
    }, 4000)

    const cursorInterval = setInterval(() => {
      if (activeUsers.length > 0) {
        setCursors(activeUsers.map(user => ({
          user,
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20
        })))
      }
    }, 2000)

    return () => {
      clearInterval(userInterval)
      clearInterval(activityInterval)
      clearInterval(cursorInterval)
    }
  }, [activeUsers.length])

  return (
    <Card className="glass-effect border-border/50 overflow-hidden">
      <CardContent className="pt-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-3xl mb-2 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <UsersThree size={24} weight="duotone" className="text-primary-foreground" />
                </div>
                Real-Time Collaboration
              </h3>
              <p className="text-muted-foreground">
                Multiple team members can work simultaneously with synchronized dial controls
              </p>
            </div>
            <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
              <Lightning size={12} weight="fill" className="mr-1" />
              {activeUsers.length} Active
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-2">
              <AnimatePresence>
                {activeUsers.map((user, idx) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, scale: 0, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Avatar className={`border-2 border-background bg-gradient-to-br ${user.color}`}>
                      <AvatarFallback className="bg-transparent text-white font-semibold">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <span className="text-sm text-muted-foreground">
              {activeUsers.length} {activeUsers.length === 1 ? 'person' : 'people'} editing
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <Eye size={18} weight="duotone" className="text-primary" />
              Live Activity Feed
            </div>

            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="p-4 rounded-lg bg-muted/30 border border-border/30 overflow-hidden"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className={`w-8 h-8 bg-gradient-to-br ${activity.user.color} flex-shrink-0`}>
                        <AvatarFallback className="bg-transparent text-white text-xs font-semibold">
                          {activity.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-sm">{activity.user.name}</span>
                          <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                        </div>
                        <p className="text-xs text-foreground/80 mt-1">{activity.action}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {activities.length === 0 && (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  <ChatCircle size={32} weight="duotone" className="mx-auto mb-2 opacity-50" />
                  Waiting for activity...
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <Cursor size={18} weight="duotone" className="text-accent" />
              Live Cursor Tracking
            </div>

            <div className="relative aspect-video rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                Shared Canvas Area
              </div>

              <AnimatePresence>
                {cursors.map((cursor) => (
                  <motion.div
                    key={cursor.user.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: `${cursor.x}%`,
                      y: `${cursor.y}%`
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="absolute"
                    style={{ left: 0, top: 0 }}
                  >
                    <div className="relative">
                      <Cursor 
                        size={24} 
                        weight="fill" 
                        className={`bg-gradient-to-br ${cursor.user.color} bg-clip-text text-transparent`}
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                      />
                      <div className={`absolute top-6 left-6 px-2 py-1 rounded bg-gradient-to-r ${cursor.user.color} text-white text-xs font-semibold whitespace-nowrap shadow-lg`}>
                        {cursor.user.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {activeUsers.length}
                </div>
                <div className="text-xs text-muted-foreground">Active Users</div>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 text-center">
                <div className="text-2xl font-bold text-accent mb-1">
                  {activities.length}
                </div>
                <div className="text-xs text-muted-foreground">Recent Actions</div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-border/30"
        >
          <div className="flex items-start gap-4">
            <Sparkle size={24} weight="duotone" className="text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold mb-2">AI-Powered Conflict Resolution</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When multiple users adjust the same parameter simultaneously, MotionFlow AI intelligently merges changes, 
                preventing conflicts while preserving everyone's creative intent. No more "undo wars" or overwritten work.
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
