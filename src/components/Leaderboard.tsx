import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy, 
  Medal, 
  Crown,
  Star,
  Heart,
  Download,
  TrendUp
} from '@phosphor-icons/react'

type LeaderboardEntry = {
  rank: number
  username: string
  avatar: string
  score: number
  trend: 'up' | 'down' | 'same'
  badges: string[]
}

const generateMockLeaderboard = (type: 'creators' | 'users' | 'presets'): LeaderboardEntry[] => {
  const names = [
    'DesignMaster', 'CreativePro', 'AIWizard', 'PixelPerfect', 'MotionKing',
    'StudioAce', 'VFXGuru', 'ColorMage', 'RenderQueen', 'BlendMaster',
    'EditNinja', 'CompWizard', 'LightMaster', 'SoundCraft', 'VisualArtist',
    'DigitalDreamer', 'TechSavvy', 'CinemagicPro', '3DMaster', 'UICreator'
  ]

  return names.slice(0, 10).map((name, index) => ({
    rank: index + 1,
    username: name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    score: type === 'creators' 
      ? 10000 - index * 800 
      : type === 'users'
      ? 5000 - index * 400
      : 2500 - index * 200,
    trend: index < 3 ? 'up' : index < 7 ? 'same' : 'down',
    badges: index === 0 
      ? ['🏆 Champion', '⭐ Legend'] 
      : index < 3 
      ? ['⭐ Top Contributor'] 
      : []
  }))
}

export function Leaderboard() {
  const [creators, setCreators] = useState<LeaderboardEntry[]>([])
  const [users, setUsers] = useState<LeaderboardEntry[]>([])
  const [presets, setPresets] = useState<LeaderboardEntry[]>([])
  const [activeTab, setActiveTab] = useState('creators')

  useEffect(() => {
    setCreators(generateMockLeaderboard('creators'))
    setUsers(generateMockLeaderboard('users'))
    setPresets(generateMockLeaderboard('presets'))
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={24} weight="fill" className="text-yellow-400" />
      case 2:
        return <Medal size={24} weight="fill" className="text-gray-300" />
      case 3:
        return <Medal size={24} weight="fill" className="text-orange-400" />
      default:
        return <span className="text-muted-foreground font-bold">#{rank}</span>
    }
  }

  const getTrendIcon = (trend: LeaderboardEntry['trend']) => {
    if (trend === 'up') return <TrendUp size={16} className="text-green-500" />
    if (trend === 'down') return <TrendUp size={16} className="text-red-500 rotate-180" />
    return null
  }

  const renderLeaderboard = (entries: LeaderboardEntry[], scoreLabel: string) => (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.username}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className={`glass-effect border-border/50 hover:border-primary/30 transition-all ${
            entry.rank <= 3 ? 'bg-gradient-to-r from-primary/5 to-accent/5' : ''
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 text-center">
                  {getRankIcon(entry.rank)}
                </div>
                
                <Avatar className="w-12 h-12">
                  <AvatarImage src={entry.avatar} alt={entry.username} />
                  <AvatarFallback>{entry.username.substring(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold truncate">{entry.username}</h4>
                    {getTrendIcon(entry.trend)}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {entry.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-primary">
                    {entry.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">{scoreLabel}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
            Community Leaderboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Top contributors, most active users, and popular presets in the MotionFlow AI community
          </p>
        </motion.div>

        <Card className="glass-effect border-border/50">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Trophy size={28} weight="duotone" className="text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Global Rankings</CardTitle>
              </div>
              <Badge variant="outline" className="text-sm">
                Updated Daily
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="creators" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-2 bg-card/50 glass-effect">
                <TabsTrigger value="creators" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                  <Heart className="mr-2" size={18} weight="duotone" />
                  Top Creators
                </TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                  <Star className="mr-2" size={18} weight="duotone" />
                  Most Active
                </TabsTrigger>
                <TabsTrigger value="presets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                  <Download className="mr-2" size={18} weight="duotone" />
                  Popular Presets
                </TabsTrigger>
              </TabsList>

              <TabsContent value="creators" className="mt-0">
                {renderLeaderboard(creators, 'points')}
              </TabsContent>

              <TabsContent value="users" className="mt-0">
                {renderLeaderboard(users, 'XP')}
              </TabsContent>

              <TabsContent value="presets" className="mt-0">
                {renderLeaderboard(presets, 'downloads')}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
