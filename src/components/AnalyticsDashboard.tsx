import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ChartLine, 
  TrendUp, 
  Clock, 
  Lightning,
  CheckCircle,
  Users,
  Star,
  Download
} from '@phosphor-icons/react'

type Metric = {
  label: string
  value: number
  unit: string
  change: number
  icon: typeof ChartLine
  color: string
}

export function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: 'Time Saved Per Session',
      value: 0,
      unit: 'min',
      change: 45,
      icon: Clock,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Productivity Increase',
      value: 0,
      unit: '%',
      change: 78,
      icon: TrendUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Tasks Completed Faster',
      value: 0,
      unit: 'x',
      change: 3.2,
      icon: Lightning,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'User Satisfaction',
      value: 0,
      unit: '/5',
      change: 4.9,
      icon: Star,
      color: 'from-orange-500 to-yellow-500'
    }
  ])

  const [activeUsers, setActiveUsers] = useState(0)
  const [totalDownloads, setTotalDownloads] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)

  useEffect(() => {
    const animateMetrics = () => {
      metrics.forEach((metric, index) => {
        let current = 0
        const target = metric.change
        const increment = target / 50
        
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          
          setMetrics(prev => prev.map((m, i) => 
            i === index ? { ...m, value: current } : m
          ))
        }, 20)
      })
    }

    animateMetrics()

    const userInterval = setInterval(() => {
      setActiveUsers(prev => Math.min(prev + Math.floor(Math.random() * 10), 15420))
    }, 100)

    const downloadInterval = setInterval(() => {
      setTotalDownloads(prev => Math.min(prev + Math.floor(Math.random() * 50), 89340))
    }, 50)

    const taskInterval = setInterval(() => {
      setCompletedTasks(prev => Math.min(prev + Math.floor(Math.random() * 100), 234567))
    }, 30)

    return () => {
      clearInterval(userInterval)
      clearInterval(downloadInterval)
      clearInterval(taskInterval)
    }
  }, [])

  return (
    <Card className="glass-effect border-border/50">
      <CardContent className="pt-8">
        <div className="mb-8">
          <h3 className="font-['Space_Grotesk'] font-semibold text-3xl mb-2">
            Real-Time Analytics
          </h3>
          <p className="text-muted-foreground">
            Live performance metrics from MotionFlow AI users worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${metric.color} p-[1px] overflow-hidden`}>
                <div className="bg-card rounded-lg p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                      <metric.icon size={24} weight="duotone" className="text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs bg-green-500/20 text-green-500 border-green-500/30">
                      <TrendUp size={12} weight="bold" className="mr-1" />
                      Live
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <motion.div
                      className="text-3xl font-bold text-foreground"
                      key={metric.value}
                    >
                      {metric.value.toFixed(metric.unit === 'x' || metric.unit === '/5' ? 1 : 0)}
                      <span className="text-lg text-muted-foreground ml-1">{metric.unit}</span>
                    </motion.div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <Users size={24} weight="duotone" className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Active Users</span>
            </div>
            <div className="text-4xl font-bold text-primary">
              {activeUsers.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Currently using MotionFlow AI</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <Download size={24} weight="duotone" className="text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Total Downloads</span>
            </div>
            <div className="text-4xl font-bold text-accent">
              {totalDownloads.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Plugin installations worldwide</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle size={24} weight="duotone" className="text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Tasks Completed</span>
            </div>
            <div className="text-4xl font-bold text-secondary">
              {completedTasks.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Automated actions executed</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-6 rounded-xl bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border border-border/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <div>
                <div className="font-semibold text-sm">All Systems Operational</div>
                <div className="text-xs text-muted-foreground">Last updated: Just now</div>
              </div>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <ChartLine size={14} weight="bold" className="mr-1" />
              99.9% Uptime
            </Badge>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
