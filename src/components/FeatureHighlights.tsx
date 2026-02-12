import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Lightning, 
  UsersThree, 
  Sparkle,
  CirclesThreePlus,
  Globe,
  ShieldCheck,
  Infinity
} from '@phosphor-icons/react'

const highlights = [
  {
    icon: Brain,
    title: 'Contextual AI',
    description: 'Learns your workflow and adapts dial functions to match your current task',
    color: 'from-blue-500 to-cyan-500',
    stat: '40%',
    statLabel: 'Faster Tool Access'
  },
  {
    icon: Lightning,
    title: 'Instant Generation',
    description: 'Create professional assets in seconds with AI-powered creative tools',
    color: 'from-purple-500 to-pink-500',
    stat: '< 3s',
    statLabel: 'Average Generation'
  },
  {
    icon: UsersThree,
    title: 'Real-Time Collaboration',
    description: 'Multiple users control the same project simultaneously without conflicts',
    color: 'from-green-500 to-emerald-500',
    stat: '10+',
    statLabel: 'Team Members'
  },
  {
    icon: CirclesThreePlus,
    title: 'Multi-App Support',
    description: 'Seamlessly switch between 15+ creative applications with persistent profiles',
    color: 'from-orange-500 to-red-500',
    stat: '15+',
    statLabel: 'Supported Apps'
  },
  {
    icon: Globe,
    title: 'Community Ecosystem',
    description: 'Access thousands of presets and configurations shared by professionals',
    color: 'from-yellow-500 to-amber-500',
    stat: '5000+',
    statLabel: 'Shared Presets'
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Grade',
    description: 'Bank-level security with SSO, audit logs, and compliance certifications',
    color: 'from-teal-500 to-cyan-500',
    stat: '99.9%',
    statLabel: 'Uptime SLA'
  },
  {
    icon: Sparkle,
    title: 'Adaptive Learning',
    description: 'System improves continuously based on your preferences and habits',
    color: 'from-indigo-500 to-purple-500',
    stat: '∞',
    statLabel: 'Gets Smarter'
  },
  {
    icon: Infinity,
    title: 'Unlimited Generations',
    description: 'No caps or throttling - generate as many assets as your creativity demands',
    color: 'from-pink-500 to-rose-500',
    stat: '∞',
    statLabel: 'No Limits'
  }
]

export function FeatureHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {highlights.map((highlight, idx) => (
        <motion.div
          key={highlight.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05, duration: 0.4 }}
        >
          <Card className="glass-effect border-border/50 h-full hover:border-primary/50 transition-all duration-300 group cursor-pointer overflow-hidden">
            <CardContent className="pt-6 relative">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${highlight.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity rounded-full -translate-y-8 translate-x-8`} />
              
              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${highlight.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <highlight.icon size={28} weight="duotone" className="text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs bg-card/50">
                    {highlight.stat}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-['Space_Grotesk'] font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {highlight.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{highlight.statLabel}</span>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${highlight.color} bg-clip-text text-transparent`}>
                      {highlight.stat}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
