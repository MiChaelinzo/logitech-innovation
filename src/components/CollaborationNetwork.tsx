import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Graph,
  Users,
  Lightning
} from '@phosphor-icons/react'

type Node = {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  name: string
  color: string
  connections: number
}

type Connection = {
  from: string
  to: string
  strength: number
}

export function CollaborationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const [activeUsers, setActiveUsers] = useState(0)
  const [activeConnections, setActiveConnections] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    const userNames = [
      'Alex', 'Blake', 'Casey', 'Drew', 'Eden', 'Finn', 'Gray',
      'Harper', 'Indigo', 'Jules', 'Kay', 'Lane', 'Morgan'
    ]

    const colors = [
      '#75BEDA', '#B47FD4', '#F26B8A', '#F4A261', '#90E0B6',
      '#FFB4A2', '#A2D2FF', '#CDB4DB', '#FFC8DD'
    ]

    nodesRef.current = userNames.map((name, i) => ({
      id: name,
      x: width / 2 + Math.cos((i / userNames.length) * Math.PI * 2) * 150,
      y: height / 2 + Math.sin((i / userNames.length) * Math.PI * 2) * 150,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      name,
      color: colors[i % colors.length],
      connections: 0
    }))

    connectionsRef.current = []
    for (let i = 0; i < userNames.length; i++) {
      const numConnections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < numConnections; j++) {
        const targetIdx = Math.floor(Math.random() * userNames.length)
        if (targetIdx !== i) {
          connectionsRef.current.push({
            from: userNames[i],
            to: userNames[targetIdx],
            strength: Math.random() * 0.5 + 0.5
          })
        }
      }
    }

    nodesRef.current.forEach(node => {
      node.connections = connectionsRef.current.filter(
        c => c.from === node.id || c.to === node.id
      ).length
    })

    setActiveUsers(userNames.length)
    setActiveConnections(connectionsRef.current.length)

    const applyForces = () => {
      const nodes = nodesRef.current
      const centerX = width / 2
      const centerY = height / 2
      const centerForce = 0.01
      const repulsionForce = 1000
      const damping = 0.95

      nodes.forEach(node => {
        const dx = centerX - node.x
        const dy = centerY - node.y
        node.vx += dx * centerForce
        node.vy += dy * centerForce

        nodes.forEach(other => {
          if (node.id === other.id) return
          const dx = other.x - node.x
          const dy = other.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100 && dist > 0) {
            const force = repulsionForce / (dist * dist)
            node.vx -= (dx / dist) * force
            node.vy -= (dy / dist) * force
          }
        })

        node.vx *= damping
        node.vy *= damping

        node.x += node.vx
        node.y += node.vy

        const margin = 40
        if (node.x < margin) node.x = margin
        if (node.x > width - margin) node.x = width - margin
        if (node.y < margin) node.y = margin
        if (node.y > height - margin) node.y = height - margin
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      applyForces()

      connectionsRef.current.forEach(conn => {
        const fromNode = nodesRef.current.find(n => n.id === conn.from)
        const toNode = nodesRef.current.find(n => n.id === conn.to)
        if (!fromNode || !toNode) return

        const gradient = ctx.createLinearGradient(
          fromNode.x, fromNode.y, toNode.x, toNode.y
        )
        gradient.addColorStop(0, fromNode.color + '40')
        gradient.addColorStop(1, toNode.color + '40')

        ctx.strokeStyle = gradient
        ctx.lineWidth = conn.strength * 2
        ctx.setLineDash([5, 5])
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.stroke()
        ctx.setLineDash([])
      })

      nodesRef.current.forEach(node => {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20)
        gradient.addColorStop(0, node.color)
        gradient.addColorStop(1, node.color + '80')

        ctx.fillStyle = gradient
        ctx.strokeStyle = node.color
        ctx.lineWidth = 3
        ctx.shadowColor = node.color
        ctx.shadowBlur = 15
        ctx.beginPath()
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.shadowBlur = 0

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 12px Inter'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.name.substring(0, 1), node.x, node.y)

        if (node.connections > 0) {
          ctx.fillStyle = node.color
          ctx.font = '10px Inter'
          ctx.fillText(node.connections.toString(), node.x + 15, node.y - 15)
        }
      })

      animationFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

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
            Live Collaboration Network
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how teams connect and collaborate in real-time across the MotionFlow AI platform
          </p>
        </motion.div>

        <Card className="glass-effect border-border/50">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Graph size={28} weight="duotone" className="text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Network Visualization</CardTitle>
                  <CardDescription>Real-time collaboration connections</CardDescription>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-primary" weight="duotone" />
                    <span className="text-2xl font-bold text-primary">{activeUsers}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <Lightning size={20} className="text-accent" weight="duotone" />
                    <span className="text-2xl font-bold text-accent">{activeConnections}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Connections</div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative bg-gradient-to-br from-background to-muted/30 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                width={900}
                height={500}
                className="w-full h-auto"
                style={{ maxWidth: '900px', maxHeight: '500px' }}
              />
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 animate-pulse bg-green-500/20 text-green-400 border-green-500/30"
              >
                Live
              </Badge>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold mb-1">85%</div>
                <div className="text-xs text-muted-foreground">Team Efficiency</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold mb-1">12ms</div>
                <div className="text-xs text-muted-foreground">Sync Latency</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold mb-1">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
