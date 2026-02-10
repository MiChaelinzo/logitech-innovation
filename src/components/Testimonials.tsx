import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quotes } from '@phosphor-icons/react'

interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  quote: string
  tools: string[]
  timeReduction?: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Senior Motion Designer',
    company: 'Pixelated Studios',
    avatar: 'SC',
    quote: 'MotionFlow AI has completely transformed my After Effects workflow. The AI texture generation mapped to the dial lets me iterate 10x faster than browsing asset libraries. What used to take 30 minutes now takes 3.',
    tools: ['After Effects', 'Premiere Pro'],
    timeReduction: '90%'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Lead 3D Artist',
    company: 'Vertex Games',
    avatar: 'MR',
    quote: 'The context-aware automation in Blender is mind-blowing. The plugin knows when I\'m modeling vs. texturing and adjusts the dials automatically. It\'s like having a technical director sitting next to me.',
    tools: ['Blender', 'Cinema 4D'],
    timeReduction: '75%'
  },
  {
    name: 'Emily Thompson',
    role: 'Creative Director',
    company: 'Flux Agency',
    avatar: 'ET',
    quote: 'I was skeptical about hardware controls for design work, but the AI-powered color grading dial in DaVinci Resolve changed my mind instantly. One twist generates multiple professional-grade LUTs. Game changer.',
    tools: ['DaVinci Resolve', 'Final Cut Pro'],
    timeReduction: '85%'
  },
  {
    name: 'James Park',
    role: 'Freelance Illustrator',
    company: 'Self-Employed',
    avatar: 'JP',
    quote: 'The Photoshop integration with AI-powered brush dynamics has revolutionized my workflow. I can dial in the perfect brush stroke while maintaining that tactile, traditional feel. It\'s the best of both worlds.',
    tools: ['Photoshop', 'Illustrator'],
    timeReduction: '60%'
  },
  {
    name: 'Aisha Patel',
    role: 'VFX Supervisor',
    company: 'Horizon Films',
    avatar: 'AP',
    quote: 'Managing complex compositing work used to mean endless keyboard shortcuts. Now I can scrub through 8K timelines, adjust layer properties, and trigger AI effects with one hand. My team adopted it in days.',
    tools: ['After Effects', 'Nuke'],
    timeReduction: '70%'
  },
  {
    name: 'David Kowalski',
    role: 'Architectural Visualizer',
    company: 'Urban Spaces 3D',
    avatar: 'DK',
    quote: 'The AI material generation for my Blender archviz work is incredible. I twist the dial to generate seamless textures that match my scene\'s lighting. No more hunting through texture sites for hours.',
    tools: ['Blender', 'Revit'],
    timeReduction: '80%'
  }
]

export function Testimonials() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass-effect border-border/50 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
            <CardContent className="pt-6 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-14 h-14 border-2 border-primary/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.name}`} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-accent">{testimonial.company}</p>
                </div>
              </div>

              <div className="relative mb-4 flex-1">
                <Quotes size={24} weight="duotone" className="text-primary/20 absolute -top-2 -left-1" />
                <p className="text-sm text-foreground/90 leading-relaxed pl-6">
                  {testimonial.quote}
                </p>
              </div>

              <div className="space-y-3 mt-auto pt-4 border-t border-border/30">
                <div className="flex flex-wrap gap-2">
                  {testimonial.tools.map(tool => (
                    <Badge key={tool} variant="secondary" className="text-xs bg-secondary/30">
                      {tool}
                    </Badge>
                  ))}
                </div>
                {testimonial.timeReduction && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Time saved:</span>
                    <span className="font-bold text-accent">{testimonial.timeReduction}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
