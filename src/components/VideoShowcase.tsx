import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { 
  Play,
  X,
  ArrowRight,
  VideoCamera,
  Clock,
  Eye
} from '@phosphor-icons/react'

type Video = {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  category: string
  featured: boolean
}

const videos: Video[] = [
  {
    id: 'blender-workflow',
    title: '3D Modeling Workflow in Blender',
    description: 'Watch a professional 3D artist create a detailed environment using MotionFlow AI\'s dial controls and AI texture generation.',
    thumbnail: '🎨',
    duration: '4:32',
    views: '28K',
    category: '3D Modeling',
    featured: true
  },
  {
    id: 'color-grading',
    title: 'Real-time Color Grading Demo',
    description: 'See how DaVinci Resolve colorists achieve cinematic looks in seconds with AI-powered LUT generation.',
    thumbnail: '🎬',
    duration: '3:45',
    views: '42K',
    category: 'Video Editing',
    featured: true
  },
  {
    id: 'photoshop-retouching',
    title: 'Portrait Retouching Masterclass',
    description: 'Professional photographer demonstrates one-dial portrait enhancement with natural-looking results.',
    thumbnail: '📸',
    duration: '5:12',
    views: '35K',
    category: 'Design',
    featured: true
  },
  {
    id: 'vfx-compositing',
    title: 'VFX Compositing Speed Run',
    description: 'Watch a VFX supervisor complete a complex composite 73% faster using contextual dial controls.',
    thumbnail: '✨',
    duration: '6:20',
    views: '19K',
    category: 'VFX',
    featured: false
  },
  {
    id: 'audio-production',
    title: 'Music Production Workflow',
    description: 'See how electronic music producers use AI melody generation and MIDI control via the Creative Console.',
    thumbnail: '🎵',
    duration: '7:15',
    views: '15K',
    category: 'Audio',
    featured: false
  },
  {
    id: 'ui-design',
    title: 'UI Design & Prototyping',
    description: 'UI/UX designer creates a complete mobile app interface using Figma with AI-powered layout assistance.',
    thumbnail: '📱',
    duration: '4:55',
    views: '22K',
    category: 'Design',
    featured: false
  }
]

export function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
    setIsPlaying(false)
  }

  const handleClose = () => {
    setSelectedVideo(null)
    setIsPlaying(false)
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card 
              className="glass-effect border-border/50 hover:border-primary/50 transition-all cursor-pointer group overflow-hidden h-full"
              onClick={() => handleVideoClick(video)}
            >
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 3, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                
                <div className="relative z-10 text-8xl">
                  {video.thumbnail}
                </div>

                <motion.div 
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
                  >
                    <Play size={32} weight="fill" className="text-white ml-1" />
                  </motion.div>
                </motion.div>

                <div className="absolute top-3 left-3 flex gap-2">
                  {video.featured && (
                    <Badge className="bg-accent/90 text-accent-foreground border-0">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-black/60 text-white border-0">
                    <Clock size={12} className="mr-1" />
                    {video.duration}
                  </Badge>
                </div>

                <div className="absolute bottom-3 right-3">
                  <Badge variant="secondary" className="bg-black/60 text-white border-0">
                    <Eye size={12} className="mr-1" />
                    {video.views}
                  </Badge>
                </div>
              </div>

              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {video.category}
                    </Badge>
                    <h3 className="font-['Space_Grotesk'] font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  >
                    <Play size={16} weight="fill" />
                    Watch Demo
                    <ArrowRight size={16} className="ml-auto" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-4xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-['Space_Grotesk'] text-2xl flex items-center gap-3">
              <VideoCamera size={28} weight="duotone" className="text-primary" />
              {selectedVideo?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedVideo?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="thumbnail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <div className="text-9xl mb-6">
                      {selectedVideo?.thumbnail}
                    </div>
                    <Button
                      size="lg"
                      onClick={handlePlay}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      <Play size={24} weight="fill" />
                      Play Video
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="player"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/90"
                  >
                    <div className="text-center space-y-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1"
                      >
                        <div className="w-full h-full rounded-full bg-card" />
                      </motion.div>
                      <p className="text-white text-lg">Video player simulation</p>
                      <p className="text-white/60 text-sm">
                        In production, this would show the actual video content
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-muted-foreground" />
                  <span>{selectedVideo?.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Eye size={16} className="text-muted-foreground" />
                  <span>{selectedVideo?.views} views</span>
                </div>
                <Badge variant="outline">{selectedVideo?.category}</Badge>
              </div>
              
              <Button variant="outline" onClick={handleClose}>
                <X size={16} />
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
