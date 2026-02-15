import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { 
  Cube,
  ArrowsClockwise,
  Eye,
  Pause,
  Play
} from '@phosphor-icons/react'

export function Interactive3DPreview() {
  const [isRotating, setIsRotating] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [dialValue, setDialValue] = useState(50)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const rotationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    const draw3DConsole = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width / 2, height / 2)
      
      const baseRotation = isRotating ? rotationRef.current : rotationRef.current % (Math.PI * 2)
      
      ctx.shadowColor = 'rgba(117, 190, 218, 0.5)'
      ctx.shadowBlur = 20
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 10

      const consoleWidth = 200
      const consoleHeight = 80
      const consoleDepth = 40

      const perspective = 0.6
      
      const topPoints = [
        [-consoleWidth/2, -consoleHeight/2],
        [consoleWidth/2, -consoleHeight/2],
        [consoleWidth/2 + consoleDepth * Math.cos(baseRotation) * perspective, 
         -consoleHeight/2 + consoleDepth * Math.sin(baseRotation) * perspective],
        [-consoleWidth/2 + consoleDepth * Math.cos(baseRotation) * perspective,
         -consoleHeight/2 + consoleDepth * Math.sin(baseRotation) * perspective]
      ]

      ctx.fillStyle = 'rgba(34, 40, 49, 0.9)'
      ctx.strokeStyle = 'rgba(117, 190, 218, 0.5)'
      ctx.lineWidth = 2
      
      ctx.beginPath()
      ctx.moveTo(topPoints[0][0], topPoints[0][1])
      topPoints.forEach(point => ctx.lineTo(point[0], point[1]))
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      const frontPoints = [
        [-consoleWidth/2, -consoleHeight/2],
        [consoleWidth/2, -consoleHeight/2],
        [consoleWidth/2, consoleHeight/2],
        [-consoleWidth/2, consoleHeight/2]
      ]

      ctx.fillStyle = 'rgba(28, 32, 38, 0.95)'
      ctx.strokeStyle = 'rgba(117, 190, 218, 0.6)'
      
      ctx.beginPath()
      ctx.moveTo(frontPoints[0][0], frontPoints[0][1])
      frontPoints.forEach(point => ctx.lineTo(point[0], point[1]))
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      const dial1X = -80
      const dial2X = 0
      const dial3X = 80
      const dialY = 0
      const dialRadius = 25

      const drawDial = (x: number, y: number, rotation: number, isActive: boolean) => {
        ctx.save()
        ctx.translate(x, y)
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, dialRadius)
        gradient.addColorStop(0, isActive ? 'rgba(117, 190, 218, 0.3)' : 'rgba(56, 68, 77, 0.8)')
        gradient.addColorStop(1, isActive ? 'rgba(117, 190, 218, 0.1)' : 'rgba(34, 40, 49, 0.9)')
        
        ctx.fillStyle = gradient
        ctx.strokeStyle = isActive ? 'rgba(117, 190, 218, 1)' : 'rgba(117, 190, 218, 0.4)'
        ctx.lineWidth = isActive ? 3 : 2
        
        ctx.beginPath()
        ctx.arc(0, 0, dialRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.rotate(rotation)
        ctx.strokeStyle = isActive ? 'rgba(117, 190, 218, 1)' : 'rgba(117, 190, 218, 0.6)'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(dialRadius - 5, 0)
        ctx.stroke()

        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 / 8) * i
          ctx.rotate(angle)
          ctx.fillStyle = 'rgba(117, 190, 218, 0.3)'
          ctx.fillRect(dialRadius - 8, -1, 4, 2)
          ctx.rotate(-angle)
        }
        
        ctx.restore()
      }

      drawDial(dial1X, dialY, baseRotation * 0.5, false)
      drawDial(dial2X, dialY, (dialValue / 100) * Math.PI * 2, true)
      drawDial(dial3X, dialY, baseRotation * -0.7, false)

      ctx.restore()

      if (isRotating) {
        rotationRef.current += 0.01 * rotationSpeed
      }

      animationFrameRef.current = requestAnimationFrame(draw3DConsole)
    }

    draw3DConsole()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRotating, rotationSpeed, dialValue])

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
          <Badge className="mb-6 px-6 py-2 text-base bg-primary/20 text-primary border-primary/30" variant="outline">
            3D Hardware Preview
          </Badge>
          <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
            Interactive Console
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real-time 3D visualization of the MX Creative Console with interactive controls
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent">
                      <Cube size={28} weight="duotone" className="text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">3D Console View</CardTitle>
                      <CardDescription>Interactive hardware visualization</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="animate-pulse">
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    style={{ maxWidth: '600px', maxHeight: '400px' }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Rotation</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsRotating(!isRotating)}
                    >
                      {isRotating ? (
                        <>
                          <Pause size={16} className="mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play size={16} className="mr-2" />
                          Play
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Speed</span>
                      <span>{rotationSpeed.toFixed(1)}x</span>
                    </div>
                    <Slider
                      value={[rotationSpeed]}
                      onValueChange={([value]) => setRotationSpeed(value)}
                      min={0.1}
                      max={3}
                      step={0.1}
                      disabled={!isRotating}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Center Dial</span>
                    <Badge variant="secondary">{dialValue}%</Badge>
                  </div>
                  
                  <Slider
                    value={[dialValue]}
                    onValueChange={([value]) => setDialValue(value)}
                    min={0}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground">
                    Adjust the slider to control the center dial rotation
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    rotationRef.current = 0
                    setDialValue(50)
                    setRotationSpeed(1)
                  }}
                >
                  <ArrowsClockwise size={16} className="mr-2" />
                  Reset View
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Eye className="text-primary flex-shrink-0 mt-1" size={20} weight="duotone" />
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">Interactive Preview</p>
                    <p className="text-muted-foreground">
                      This 3D visualization shows the MX Creative Console with real-time dial animations. 
                      The center dial responds to your slider input, demonstrating the tactile precision of the hardware.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
