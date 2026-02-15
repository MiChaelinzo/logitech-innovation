import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader
import { Button } from '@/components/ui/button'
import { 
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Trophy,
  Code,
  Users,
  Lightbulb,
  GitBranch,
  Rocket,
  Calendar,
  Clock,
  Check,
  Star
} from '@phosphor-icons/react'

export function HackathonInfo() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date('2024-12-31T23:59:59').getTime()
    
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const criteria = [
    {
      title: 'Innovation & Creativity',
      description: 'Novel use of Logitech Actions SDK with AI integration',
      weight: '30%',
      icon: Lightbulb
    },
    {
      title: 'Technical Implementation',
      description: 'Code quality, SDK integration, and AI capabilities',
      weight: '25%',
      icon: Code
    },
    {
      title: 'User Experience',
      description: 'Intuitive design, responsiveness, and accessibility',
      weight: '25%',
      icon: Users
    },
    {
      title: 'Real-World Impact',
      description: 'Practical value and market potential',
      weight: '20%',
      icon: Rocket
    '
   

    'Interactive har

    <section className="py-32 px-4 sm:px-6 lg
        <motion.div
          whileInView={{ opacity: 1, y: 
          transition={{ duration: 0.6 }}
        >
            Logitech Actions SDK Hack
   

          
        </motion.div>
        <div className="grid lg:grid-cols
            initial
            viewport={{ once: true }}
          >
              <CardHeader>
                  <div className="p-3 ro
                  </div>
         
                  </div>
              </CardHeader>
                {f
                    key={feature}
                    whileInView=
               
                  >
                    <span className="text-sm">{feature}</span>
              
            </Card>

            initial={{ opacity: 0, x: 20 }}
            viewport=
          >
              <CardHeader>
                  <div className="p-3
                  </div>
           
                  </div>
              </CardHeader
                {criteria.map((criterion, index) => {
                  return (
                      key={criterion.title}
                      wh
                      t
                    >
                        <div className="flex items-center gap-3">
                        
                      
                      <p cl
                  )
              </CardContent>
          </motion.div>

          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
            <CardContent className="p-8">
                <div>
                   
                      Technical Stack
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-effect border-border/50 h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-accent to-secondary">
                    <Star size={28} weight="duotone" className="text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Judging Criteria</CardTitle>
                    <CardDescription>How this project excels</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {criteria.map((criterion, index) => {
                  const Icon = criterion.icon
                  return (
                    <motion.div
                      key={criterion.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Icon className="text-accent" size={24} weight="duotone" />
                          <h4 className="font-semibold">{criterion.title}</h4>
                        </div>
                        <Badge variant="secondary">{criterion.weight}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground ml-9">{criterion.description}</p>
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-effect border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <GitBranch className="text-primary" size={32} weight="duotone" />
                    <h3 className="font-['Space_Grotesk'] font-semibold text-2xl">
                      Technical Stack
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">Logitech Actions SDK</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">React + TypeScript</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">OpenAI GPT-4</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">Framer Motion</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">Shadcn UI</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">Tailwind CSS</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">Three.js</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">D3.js</Badge>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="text-primary" size={16} weight="bold" />
                      <span>Full SDK Integration with Actions Ring support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-primary" size={16} weight="bold" />
                      <span>AI-powered features using OpenAI API</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-primary" size={16} weight="bold" />
                      <span>Persistent state with KV storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-primary" size={16} weight="bold" />
                      <span>Real-time collaboration simulation</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                    <Calendar className="mx-auto mb-4 text-primary" size={48} weight="duotone" />
                    <h4 className="font-['Space_Grotesk'] font-semibold text-xl mb-2">
                      Submission Status
                    </h4>
                    <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">
                      Active Submission
                    </Badge>
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{timeLeft.days}</div>
                        <div className="text-xs text-muted-foreground mt-1">Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{timeLeft.hours}</div>
                        <div className="text-xs text-muted-foreground mt-1">Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{timeLeft.minutes}</div>
                        <div className="text-xs text-muted-foreground mt-1">Mins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{timeLeft.seconds}</div>
                        <div className="text-xs text-muted-foreground mt-1">Secs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">Logitech Actions SDK</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">React + TypeScript</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">OpenAI GPT-4</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">Framer Motion</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">Shadcn UI</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">Tailwind CSS</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">Three.js</Badge>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">D3.js</Badge>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="text-primary" size={16} weight="bold" />
                      <span>Full SDK Integration with Actions Ring support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-primary" size={16} weight="bold" />
                      <span>AI-powered features using OpenAI API</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-primary" size={16} weight="bold" />
                      <span>Persistent state with KV storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="text-primary" size={16} weight="bold" />
                      <span>Real-time collaboration simulation</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                    <Calendar className="mx-auto mb-4 text-primary" size={48} weight="duotone" />
                    <h4 className="font-['Space_Grotesk'] font-semibold text-xl mb-2">
                      Submission Status
                    </h4>
                    <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">
                      Active Submission
                    </Badge>
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{timeLeft.days}</div>
                        <div className="text-xs text-muted-foreground mt-1">Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{timeLeft.hours}</div>
                        <div className="text-xs text-muted-foreground mt-1">Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{timeLeft.minutes}</div>
                        <div className="text-xs text-muted-foreground mt-1">Mins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{timeLeft.seconds}</div>
                        <div className="text-xs text-muted-foreground mt-1">Secs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
