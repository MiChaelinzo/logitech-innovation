import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Trophy,
  Star,
  Heart,
  Download,
  Calculator,
  Sparkle,
  Medal,
  Target,
  FireSimple,
  User,
  SignOut
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

type Achievement = {
  id: string
  title: string
  description: string
  icon: typeof Trophy
  unlocked: boolean
  progress: number
  maxProgress: number
}

type UserStats = {
  presetsDownloaded: number
  presetsSaved: number
  demosCompleted: number
  calculationsRun: number
  daysActive: number
  level: number
  xp: number
}

export function UserProfile() {
  const [userInfo, setUserInfo] = useState<{ login: string; avatarUrl: string; isOwner: boolean } | null>(null)
  const [userStats, setUserStats] = useKV<UserStats>('user-stats', {
    presetsDownloaded: 0,
    presetsSaved: 0,
    demosCompleted: 0,
    calculationsRun: 0,
    daysActive: 1,
    level: 1,
    xp: 0
  })
  const [achievements, setAchievements] = useKV<Achievement[]>('user-achievements', [])
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await window.spark.user()
        setUserInfo(user)
      } catch (error) {
        console.error('Failed to load user:', error)
      }
    }
    loadUser()
  }, [])

  useEffect(() => {
    if (userStats) {
      const baseAchievements: Achievement[] = [
        {
          id: 'first-demo',
          title: 'First Steps',
          description: 'Complete your first interactive demo',
          icon: Sparkle,
          unlocked: userStats.demosCompleted >= 1,
          progress: Math.min(userStats.demosCompleted, 1),
          maxProgress: 1
        },
        {
          id: 'demo-master',
          title: 'Demo Master',
          description: 'Complete 10 interactive demos',
          icon: Target,
          unlocked: userStats.demosCompleted >= 10,
          progress: Math.min(userStats.demosCompleted, 10),
          maxProgress: 10
        },
        {
          id: 'preset-collector',
          title: 'Preset Collector',
          description: 'Save 5 community presets',
          icon: Heart,
          unlocked: userStats.presetsSaved >= 5,
          progress: Math.min(userStats.presetsSaved, 5),
          maxProgress: 5
        },
        {
          id: 'power-user',
          title: 'Power User',
          description: 'Save 25 presets',
          icon: FireSimple,
          unlocked: userStats.presetsSaved >= 25,
          progress: Math.min(userStats.presetsSaved, 25),
          maxProgress: 25
        },
        {
          id: 'calculator-novice',
          title: 'ROI Explorer',
          description: 'Run your first ROI calculation',
          icon: Calculator,
          unlocked: userStats.calculationsRun >= 1,
          progress: Math.min(userStats.calculationsRun, 1),
          maxProgress: 1
        },
        {
          id: 'dedicated',
          title: 'Dedicated Explorer',
          description: 'Visit the site for 7 days',
          icon: Medal,
          unlocked: userStats.daysActive >= 7,
          progress: Math.min(userStats.daysActive, 7),
          maxProgress: 7
        }
      ]
      setAchievements(baseAchievements)
    }
  }, [userStats, setAchievements])

  const calculateLevel = (xp: number) => {
    return Math.floor(Math.sqrt(xp / 100)) + 1
  }

  const xpForNextLevel = (level: number) => {
    return level * level * 100
  }

  if (!userInfo) return null

  const currentLevel = calculateLevel(userStats?.xp || 0)
  const nextLevelXP = xpForNextLevel(currentLevel)
  const currentLevelXP = xpForNextLevel(currentLevel - 1)
  const progressToNextLevel = ((userStats?.xp || 0) - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100

  const unlockedCount = achievements?.filter(a => a.unlocked).length || 0

  return (
    <>
      <motion.div
        className="fixed top-20 right-4 z-40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => setShowProfile(!showProfile)}
          className="glass-effect border border-primary/30 hover:border-primary/60 transition-all"
          size="lg"
        >
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage src={userInfo.avatarUrl} alt={userInfo.login} />
            <AvatarFallback>{userInfo.login.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{userInfo.login}</span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-32 bg-background/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfile(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="glass-effect border-border/50 overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]">
                <CardHeader className="relative pb-16 bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 border-4 border-card">
                        <AvatarImage src={userInfo.avatarUrl} alt={userInfo.login} />
                        <AvatarFallback>{userInfo.login.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl">{userInfo.login}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          Level {currentLevel}
                        </Badge>
                        {userInfo.isOwner && (
                          <Badge variant="default" className="mt-1 ml-2 bg-accent">
                            Owner
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span>{userStats?.xp || 0} XP</span>
                      <span>{nextLevelXP} XP</span>
                    </div>
                    <Progress value={progressToNextLevel} className="h-2" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-6 flex-1 min-h-0">
                  <div className="overflow-y-auto h-full pr-2 space-y-6 custom-scrollbar"
                    style={{ maxHeight: 'calc(100vh - 24rem)' }}>
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Trophy className="text-primary" weight="duotone" />
                        Statistics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <StatCard
                          icon={Sparkle}
                          label="Demos Completed"
                          value={userStats?.demosCompleted || 0}
                          color="text-primary"
                        />
                        <StatCard
                          icon={Heart}
                          label="Presets Saved"
                          value={userStats?.presetsSaved || 0}
                          color="text-accent"
                        />
                        <StatCard
                          icon={Calculator}
                          label="Calculations"
                          value={userStats?.calculationsRun || 0}
                          color="text-secondary"
                        />
                        <StatCard
                          icon={FireSimple}
                          label="Days Active"
                          value={userStats?.daysActive || 0}
                          color="text-orange-500"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Medal className="text-accent" weight="duotone" />
                          Achievements
                        </span>
                        <Badge variant="outline">{unlockedCount}/{achievements?.length || 0}</Badge>
                      </h3>
                      <div className="space-y-3">
                        {achievements?.map((achievement) => (
                          <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowProfile(false)}
                    >
                      Close
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: typeof Trophy; label: string; value: number; color: string }) {
  return (
    <div className="bg-muted/30 rounded-lg p-4 flex flex-col items-center text-center">
      <Icon className={`${color} mb-2`} size={24} weight="duotone" />
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = achievement.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-lg border transition-all ${
        achievement.unlocked
          ? 'bg-primary/10 border-primary/30'
          : 'bg-muted/20 border-border/30 opacity-60'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-primary/20' : 'bg-muted/30'}`}>
          <Icon
            size={20}
            weight="duotone"
            className={achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm">{achievement.title}</h4>
            {achievement.unlocked && (
              <Star className="text-accent flex-shrink-0 ml-2" size={16} weight="fill" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
          {!achievement.unlocked && (
            <Progress
              value={(achievement.progress / achievement.maxProgress) * 100}
              className="h-1"
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}
