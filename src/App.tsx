import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkle, Lightning, Users, GitBranch, Cpu, PlayCircle, ArrowRight, Check, EnvelopeSimple, GithubLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { InteractiveDemo } from '@/components/InteractiveDemo'
import { AppScenarios } from '@/components/AppScenarios'
import { Testimonials } from '@/components/Testimonials'
import { CaseStudies } from '@/components/CaseStudies'
import { ROICalculator } from '@/components/ROICalculator'
import { CommunityPresets } from '@/components/CommunityPresets'
import { VideoShowcase } from '@/components/VideoShowcase'
import { Pricing } from '@/components/Pricing'
import { UserProfile } from '@/components/UserProfile'
import { QuickActions } from '@/components/QuickActions'
import { FeaturedBanner } from '@/components/FeaturedBanner'
import { WorkflowComparison } from '@/components/WorkflowComparison'
import { AIInsights } from '@/components/AIInsights'
import { LiveHardwareVisualization } from '@/components/LiveHardwareVisualization'
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts'
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard'
import { BeforeAfterComparison } from '@/components/BeforeAfterComparison'
import { CollaborationPreview } from '@/components/CollaborationPreview'
import { FeatureHighlights } from '@/components/FeatureHighlights'
import { PersonalizedRecommendations } from '@/components/PersonalizedRecommendations'
import { InteractionIndicator } from '@/components/InteractionIndicator'
import { useInteractionTracker } from '@/hooks/use-interaction-tracker'
import { ChatSupport } from '@/components/ChatSupport'

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { trackInteraction } = useInteractionTracker()

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const sectionId = entry.target.id
          if (sectionId === 'demo') trackInteraction('demo', 'interactive-demo-view')
          if (sectionId === 'videos') trackInteraction('video', 'video-showcase-view')
          if (sectionId === 'community') trackInteraction('preset', 'community-presets-view')
          if (sectionId === 'roi') trackInteraction('roi-calc', 'roi-calculator-view')
          if (sectionId === 'pricing') trackInteraction('pricing', 'pricing-view')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
      rootMargin: '0px'
    })

    const sections = ['demo', 'videos', 'community', 'roi', 'pricing']
    sections.forEach(id => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [trackInteraction])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Interest submitted! We\'ll be in touch soon.', {
      description: 'Thank you for your interest in MotionFlow AI'
    })
    
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  const features = [
    {
      icon: Sparkle,
      title: 'AI Asset Generation',
      description: 'Generate textures, effects, and elements on-the-fly using AI, controlled directly from your MX Creative Console dial.',
      details: 'Twist the dial to adjust parameters like style, complexity, and detail level. Press to confirm and instantly insert into your project.'
    },
    {
      icon: Lightning,
      title: 'Contextual Automation',
      description: 'Smart workflow detection that adapts dial functions based on your current tool and context in real-time.',
      details: 'The plugin learns your workflow patterns and automatically maps the most relevant actions to your dials and buttons.'
    },
    {
      icon: Cpu,
      title: 'Multi-App Intelligence',
      description: 'Seamlessly switch between Blender, After Effects, Premiere, DaVinci Resolve, and more with persistent, app-specific profiles.',
      details: 'Each application gets custom dial mappings that make sense for its workflow, with instant switching as you change focus.'
    },
    {
      icon: Users,
      title: 'Collaborative Presets',
      description: 'Share and download community-created dial configurations and AI prompt templates optimized for specific creative tasks.',
      details: 'Browse thousands of presets created by professional designers, or create your own and share with the community.'
    }
  ]

  const useCases = [
    {
      app: 'Video Editing',
      tools: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro'],
      mappings: [
        { action: 'Timeline Scrubbing', control: 'Left Dial', description: 'Frame-perfect navigation' },
        { action: 'Playback Speed', control: 'Center Dial', description: 'Variable speed preview' },
        { action: 'AI Color Grade', control: 'Right Dial', description: 'Generate & adjust LUTs' },
        { action: 'Quick Export', control: 'Action Ring', description: 'Preset-based renders' }
      ]
    },
    {
      app: '3D Modeling',
      tools: ['Blender', 'Cinema 4D', 'Maya'],
      mappings: [
        { action: 'Viewport Rotation', control: 'Left Dial', description: 'Smooth camera control' },
        { action: 'Modifier Strength', control: 'Center Dial', description: 'Real-time adjustments' },
        { action: 'AI Texture Gen', control: 'Right Dial', description: 'Material creation' },
        { action: 'Tool Switching', control: 'Action Ring', description: 'Instant mode changes' }
      ]
    },
    {
      app: 'Design Software',
      tools: ['Figma', 'Photoshop', 'Illustrator'],
      mappings: [
        { action: 'Zoom Control', control: 'Left Dial', description: 'Precision canvas zoom' },
        { action: 'Brush Size', control: 'Center Dial', description: 'Dynamic sizing' },
        { action: 'AI Fill/Expand', control: 'Right Dial', description: 'Generative edits' },
        { action: 'Layer Actions', control: 'Action Ring', description: 'Quick operations' }
      ]
    }
  ]

  const techSpecs = {
    sdk: ['Actions SDK Integration', 'Real-time Event Handling', 'Context-aware API', 'Profile Management System'],
    apps: ['Adobe Creative Cloud Suite', 'DaVinci Resolve Studio', 'Blender 3D', 'Cinema 4D', 'Autodesk Maya', 'Final Cut Pro', 'Affinity Designer'],
    ai: ['OpenAI DALL-E 3 Integration', 'Stable Diffusion Support', 'Custom Model Training', 'Local LLM Options'],
    hardware: ['MX Creative Console', 'MX Master 4 with Actions Ring', 'Requires USB/Bluetooth Connection', 'Windows 10+ & macOS 12+']
  }

  return (
    <div className="min-h-screen text-foreground font-['Inter']">
      <Toaster />
      <ChatSupport />
      <PersonalizedRecommendations />
      <InteractionIndicator />
      <UserProfile />
      <QuickActions />
      <FeaturedBanner />
      <KeyboardShortcuts />
      <div className="gradient-mesh fixed inset-0 -z-10" />
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent/20 blur-[120px] animate-pulse-glow"
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkle size={24} weight="duotone" className="text-primary" />
              <span className="font-['Space_Grotesk'] font-bold text-lg">MotionFlow AI</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm hover:text-primary transition-colors">
                Demo
              </button>
              <button onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm hover:text-primary transition-colors">
                Videos
              </button>
              <button onClick={() => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm hover:text-primary transition-colors">
                Community
              </button>
              <button onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm hover:text-primary transition-colors">
                ROI
              </button>
              <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm hover:text-primary transition-colors">
                Pricing
              </button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge className="mb-6 px-6 py-2 text-base bg-primary/20 text-primary border-primary/30" variant="outline">
              Logitech Actions SDK Innovation
            </Badge>
            
            <h1 className="font-['Space_Grotesk'] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6 bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
              MotionFlow AI
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Transform Your Creative Workflow with AI-Powered Physical Controls
            </p>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              An intelligent plugin for the MX Creative Console that combines tactile precision with artificial intelligence, 
              revolutionizing how creative professionals work across video editing, 3D modeling, and design applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:scale-105 text-lg px-8 py-6 font-semibold"
                onClick={() => {
                  trackInteraction('demo', 'hero-cta-demo')
                  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Try Interactive Demos
                <PlayCircle className="ml-2" weight="bold" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6"
                onClick={() => {
                  trackInteraction('roi-calc', 'hero-cta-roi')
                  document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Calculate ROI
              </Button>
          </motion.div>

          <motion.div
            className="mt-20 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="glass-effect rounded-3xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-6 items-center justify-items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-float">
                  <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center">
                    <Cpu size={48} className="text-primary" weight="duotone" />
                  </div>
                </div>
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <div className="w-32 h-32 rounded-full bg-card flex items-center justify-center">
                    <Sparkle size={64} className="text-accent" weight="duotone" />
                  </div>
                </div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                  <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center">
                    <Lightning size={48} className="text-secondary" weight="duotone" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Elevate your creative workflow with intelligent automation and AI-powered assistance
            </p>
          </motion.div>

          <FeatureHighlights />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => trackInteraction('feature', `feature-${feature.title.toLowerCase().replace(/ /g, '-')}`)}
              >
                <Card className="glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] h-full group cursor-pointer">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon size={28} weight="duotone" className="text-primary-foreground" />
                    </div>
                    <CardTitle className="font-['Space_Grotesk'] text-2xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {feature.details}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Interactive Demo
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the power of MotionFlow AI firsthand. Simulate the MX Creative Console's physical controls and watch AI generate assets in real-time.
            </p>
          </motion.div>

          <InteractiveDemo />
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Live Hardware Preview
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See a real-time simulation of the MX Creative Console in action
            </p>
          </motion.div>

          <LiveHardwareVisualization />
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <BeforeAfterComparison />
          <AIInsights />
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Team Collaboration
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Work together seamlessly with real-time synchronized controls and AI-powered conflict resolution
            </p>
          </motion.div>

          <CollaborationPreview />
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <WorkflowComparison />
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Performance Analytics
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real-time data from thousands of creative professionals worldwide
            </p>
          </motion.div>

          <AnalyticsDashboard />
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Application-Specific Scenarios
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore how MotionFlow AI adapts to each creative tool with intelligent, context-aware controls. 
              Try interactive demos for Blender, Premiere Pro, Photoshop, DaVinci Resolve, and more.
            </p>
          </motion.div>

          <AppScenarios />
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Trusted by Creative Professionals
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from industry leaders who have transformed their workflows with MotionFlow AI
            </p>
          </motion.div>

          <Testimonials />
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Real-World Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover how leading studios and agencies achieved measurable results with MotionFlow AI
            </p>
          </motion.div>

          <CaseStudies />
        </div>
      </section>

      <section id="videos" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              See It In Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Watch real professionals transform their workflows with MotionFlow AI across different creative applications
            </p>
          </motion.div>

          <VideoShowcase />
        </div>
      </section>

      <section id="community" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Community Presets
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore thousands of presets created by professional creators. Download, customize, and share your own configurations.
            </p>
          </motion.div>

          <CommunityPresets />
        </div>
      </section>

      <section id="roi" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Calculate Your ROI
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See exactly how much time and money your team could save with MotionFlow AI
            </p>
          </motion.div>

          <ROICalculator />
        </div>
      </section>

      <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Choose Your Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Flexible pricing for individuals, teams, and enterprises. Start with a free trial, upgrade anytime.
            </p>
          </motion.div>

          <Pricing />
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Use Case Demonstrations
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how MotionFlow AI adapts to different creative applications
            </p>
          </motion.div>

          <Tabs defaultValue={useCases[0].app} className="w-full" onValueChange={(value) => trackInteraction('app-scenario', `use-case-${value.toLowerCase().replace(/ /g, '-')}`)}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-auto p-2 bg-card/50 glass-effect">
              {useCases.map(useCase => (
                <TabsTrigger 
                  key={useCase.app} 
                  value={useCase.app}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 text-base"
                >
                  {useCase.app}
                </TabsTrigger>
              ))}
            </TabsList>

            {useCases.map(useCase => (
              <TabsContent key={useCase.app} value={useCase.app}>
                <Card className="glass-effect border-border/50">
                  <CardHeader>
                    <CardTitle className="font-['Space_Grotesk'] text-2xl mb-4">
                      Optimized for {useCase.app}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {useCase.tools.map(tool => (
                        <Badge key={tool} variant="secondary" className="bg-secondary/30 text-secondary-foreground">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {useCase.mappings.map(mapping => (
                        <div key={mapping.action} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <Check className="text-accent" weight="bold" size={24} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{mapping.action}</h4>
                            <p className="text-sm text-accent mb-1">{mapping.control}</p>
                            <p className="text-sm text-muted-foreground">{mapping.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Technical Specifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Built on Logitech's Actions SDK with cutting-edge AI integration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="font-['Space_Grotesk'] flex items-center gap-3 text-2xl">
                  <GitBranch className="text-primary" weight="duotone" size={32} />
                  SDK Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {techSpecs.sdk.map(spec => (
                    <li key={spec} className="flex items-start gap-3">
                      <Check className="text-primary mt-1 flex-shrink-0" weight="bold" />
                      <span className="text-foreground/90">{spec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="font-['Space_Grotesk'] flex items-center gap-3 text-2xl">
                  <Sparkle className="text-accent" weight="duotone" size={32} />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {techSpecs.ai.map(spec => (
                    <li key={spec} className="flex items-start gap-3">
                      <Check className="text-accent mt-1 flex-shrink-0" weight="bold" />
                      <span className="text-foreground/90">{spec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="font-['Space_Grotesk'] flex items-center gap-3 text-2xl">
                  <Cpu className="text-secondary" weight="duotone" size={32} />
                  Supported Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {techSpecs.apps.map(spec => (
                    <li key={spec} className="flex items-start gap-3">
                      <Check className="text-secondary mt-1 flex-shrink-0" weight="bold" />
                      <span className="text-foreground/90">{spec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-effect border-border/50">
              <CardHeader>
                <CardTitle className="font-['Space_Grotesk'] flex items-center gap-3 text-2xl">
                  <Users className="text-primary" weight="duotone" size={32} />
                  Hardware Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {techSpecs.hardware.map(spec => (
                    <li key={spec} className="flex items-start gap-3">
                      <Check className="text-primary mt-1 flex-shrink-0" weight="bold" />
                      <span className="text-foreground/90">{spec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Space_Grotesk'] font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
              Let's Collaborate
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in MotionFlow AI? Get in touch to discuss partnership opportunities and demo access.
            </p>
          </motion.div>

          <Card className="glass-effect border-border/50">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="bg-muted/30 border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@company.com"
                    required
                    className="bg-muted/30 border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your interest in MotionFlow AI..."
                    rows={5}
                    required
                    className="bg-muted/30 border-border focus:border-primary"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Interest'}
                  <ArrowRight className="ml-2" weight="bold" />
                </Button>
              </form>

              <div className="mt-12 pt-8 border-t border-border/50">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                  <a 
                    href="mailto:pitch@motionflow.ai" 
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <EnvelopeSimple size={20} weight="duotone" />
                    <span>pitch@motionflow.ai</span>
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <GithubLogo size={20} weight="duotone" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="text-sm">
            MotionFlow AI - A Logitech Actions SDK Innovation Pitch
          </p>
          <p className="text-xs mt-2">
            Built for the Logitech MX Creative Console & MX Master 4 with Actions Ring
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App