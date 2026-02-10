import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MagnifyingGlass,
  Heart,
  Download,
  Star,
  Sparkle,
  Cube,
  VideoCamera,
  PaintBrush,
  MusicNotes,
  Code,
  TrendUp
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

type Preset = {
  id: string
  name: string
  author: string
  authorAvatar: string
  description: string
  category: string
  app: string
  downloads: number
  rating: number
  tags: string[]
  featured: boolean
}

const presets: Preset[] = [
  {
    id: 'cinematic-color',
    name: 'Cinematic Color Grading',
    author: 'Emily Thompson',
    authorAvatar: 'ET',
    description: 'Professional color grading preset for achieving film-like looks in seconds. Includes warm sunset, cool night, and teal-orange Hollywood styles.',
    category: 'video',
    app: 'DaVinci Resolve',
    downloads: 12847,
    rating: 4.9,
    tags: ['Color Grading', 'Film Look', 'Cinematic'],
    featured: true
  },
  {
    id: 'procedural-terrain',
    name: 'Procedural Terrain Generator',
    author: 'Marcus Rodriguez',
    authorAvatar: 'MR',
    description: 'Generate realistic terrain meshes with adjustable complexity. Perfect for game environments and landscape visualization.',
    category: '3d',
    app: 'Blender',
    downloads: 9234,
    rating: 4.8,
    tags: ['Terrain', 'Procedural', 'Game Assets'],
    featured: true
  },
  {
    id: 'portrait-enhance',
    name: 'AI Portrait Enhancement',
    author: 'Sarah Chen',
    authorAvatar: 'SC',
    description: 'One-dial portrait retouching with smart skin smoothing, eye enhancement, and color correction. Maintains natural look.',
    category: 'design',
    app: 'Photoshop',
    downloads: 15621,
    rating: 5.0,
    tags: ['Portrait', 'Retouching', 'AI Enhancement'],
    featured: true
  },
  {
    id: 'dynamic-transitions',
    name: 'Dynamic Video Transitions',
    author: 'James Park',
    authorAvatar: 'JP',
    description: 'Pack of 20 smooth transitions with adjustable timing and intensity. Includes zooms, wipes, and creative dissolves.',
    category: 'video',
    app: 'Premiere Pro',
    downloads: 18293,
    rating: 4.7,
    tags: ['Transitions', 'Effects', 'Motion'],
    featured: false
  },
  {
    id: 'pbr-materials',
    name: 'PBR Material Library',
    author: 'David Kowalski',
    authorAvatar: 'DK',
    description: 'Physically-based materials for architectural visualization. Includes concrete, wood, metal, and glass variations.',
    category: '3d',
    app: 'Blender',
    downloads: 11456,
    rating: 4.9,
    tags: ['Materials', 'PBR', 'Architecture'],
    featured: true
  },
  {
    id: 'generative-art',
    name: 'Generative Art Patterns',
    author: 'Aisha Patel',
    authorAvatar: 'AP',
    description: 'Create unique geometric patterns with AI. Control complexity, color palette, and symmetry with simple dial adjustments.',
    category: 'design',
    app: 'Illustrator',
    downloads: 7892,
    rating: 4.6,
    tags: ['Generative', 'Patterns', 'Abstract'],
    featured: false
  },
  {
    id: 'melody-harmonizer',
    name: 'AI Melody Harmonizer',
    author: 'Chris Anderson',
    authorAvatar: 'CA',
    description: 'Automatically generate harmonies and chord progressions that match your melody. Supports multiple music styles.',
    category: 'audio',
    app: 'Ableton Live',
    downloads: 6543,
    rating: 4.8,
    tags: ['Harmony', 'Composition', 'MIDI'],
    featured: false
  },
  {
    id: 'smart-layout',
    name: 'Smart Layout Assistant',
    author: 'Lisa Wu',
    authorAvatar: 'LW',
    description: 'AI-powered layout suggestions for UI/UX design. Automatically adjusts spacing, alignment, and hierarchy.',
    category: 'design',
    app: 'Figma',
    downloads: 13672,
    rating: 4.9,
    tags: ['Layout', 'UI Design', 'Auto Layout'],
    featured: true
  },
  {
    id: 'particle-systems',
    name: 'Advanced Particle Systems',
    author: 'Tom Rivera',
    authorAvatar: 'TR',
    description: 'Preset pack for complex particle effects. Includes fire, smoke, magic, and energy effects with real-time preview.',
    category: 'vfx',
    app: 'After Effects',
    downloads: 10234,
    rating: 4.7,
    tags: ['Particles', 'VFX', 'Effects'],
    featured: false
  },
  {
    id: 'code-refactor',
    name: 'Smart Code Refactoring',
    author: 'Alex Kim',
    authorAvatar: 'AK',
    description: 'AI-assisted code refactoring with variable renaming, function extraction, and pattern detection. Supports Swift and Obj-C.',
    category: 'code',
    app: 'Xcode',
    downloads: 5123,
    rating: 4.5,
    tags: ['Refactoring', 'Code Quality', 'AI'],
    featured: false
  },
  {
    id: 'lighting-presets',
    name: 'Studio Lighting Presets',
    author: 'Nina Patel',
    authorAvatar: 'NP',
    description: 'Professional 3D lighting setups for product visualization. Includes key light, fill, rim, and environmental combinations.',
    category: '3d',
    app: 'Cinema 4D',
    downloads: 8765,
    rating: 4.8,
    tags: ['Lighting', 'Product Viz', 'Studio'],
    featured: false
  },
  {
    id: 'audio-ducking',
    name: 'Intelligent Audio Ducking',
    author: 'Jake Morrison',
    authorAvatar: 'JM',
    description: 'Automatically duck music when dialogue is present. Adjustable sensitivity and recovery time for natural results.',
    category: 'audio',
    app: 'Premiere Pro',
    downloads: 9876,
    rating: 4.6,
    tags: ['Audio', 'Mixing', 'Automation'],
    featured: false
  }
]

const categories = [
  { id: 'all', label: 'All Presets', icon: Sparkle },
  { id: 'video', label: 'Video', icon: VideoCamera },
  { id: '3d', label: '3D', icon: Cube },
  { id: 'design', label: 'Design', icon: PaintBrush },
  { id: 'audio', label: 'Audio', icon: MusicNotes },
  { id: 'vfx', label: 'VFX', icon: Star },
  { id: 'code', label: 'Code', icon: Code }
]

export function CommunityPresets() {
  const [favorites, setFavorites] = useKV<string[]>('favorite-presets', [])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'rating'>('popular')

  const toggleFavorite = (presetId: string) => {
    setFavorites((current) => {
      const currentFavs = current || []
      if (currentFavs.includes(presetId)) {
        toast.success('Removed from favorites')
        return currentFavs.filter(id => id !== presetId)
      } else {
        toast.success('Added to favorites')
        return [...currentFavs, presetId]
      }
    })
  }

  const filteredPresets = presets
    .filter(preset => {
      if (activeCategory !== 'all' && preset.category !== activeCategory) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          preset.name.toLowerCase().includes(query) ||
          preset.description.toLowerCase().includes(query) ||
          preset.tags.some(tag => tag.toLowerCase().includes(query)) ||
          preset.app.toLowerCase().includes(query)
        )
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.downloads - a.downloads
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  const featuredPresets = presets.filter(p => p.featured).slice(0, 3)
  const currentFavorites = favorites || []

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 w-full">
          <MagnifyingGlass 
            size={20} 
            weight="bold" 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            placeholder="Search presets by name, app, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/30 border-border focus:border-primary"
          />
        </div>
        
        <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)} className="w-full md:w-auto">
          <TabsList className="bg-muted/30">
            <TabsTrigger value="popular" className="text-xs">
              <TrendUp size={14} className="mr-1" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="rating" className="text-xs">
              <Star size={14} className="mr-1" />
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-xs">
              Recent
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {featuredPresets.length > 0 && searchQuery === '' && activeCategory === 'all' && (
        <div className="space-y-4">
          <h3 className="font-['Space_Grotesk'] font-semibold text-2xl flex items-center gap-2">
            <Sparkle size={24} weight="duotone" className="text-accent" />
            Featured Presets
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPresets.map((preset, idx) => (
              <motion.div
                key={preset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="glass-effect border-primary/30 hover:border-primary/50 transition-all h-full bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge className="bg-accent/20 text-accent border-accent/30">
                        Featured
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleFavorite(preset.id)}
                      >
                        <Heart 
                          size={18} 
                          weight={currentFavorites.includes(preset.id) ? 'fill' : 'regular'}
                          className={currentFavorites.includes(preset.id) ? 'text-accent' : 'text-muted-foreground'}
                        />
                      </Button>
                    </div>
                    <CardTitle className="font-['Space_Grotesk'] text-xl">
                      {preset.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {preset.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${preset.author}`} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-semibold">
                            {preset.authorAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">{preset.author}</p>
                          <p className="text-xs text-muted-foreground">{preset.app}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star size={16} weight="fill" className="text-accent" />
                          <span className="font-semibold">{preset.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Download size={16} />
                          <span>{(preset.downloads / 1000).toFixed(1)}K</span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                        <Download size={18} />
                        Download Preset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 h-auto p-2 bg-card/50 glass-effect">
          {categories.map(cat => {
            const Icon = cat.icon
            return (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 text-sm flex items-center gap-1"
              >
                <Icon size={16} weight="duotone" />
                <span className="hidden sm:inline">{cat.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          {filteredPresets.length === 0 ? (
            <Card className="glass-effect border-border/50">
              <CardContent className="py-12 text-center">
                <MagnifyingGlass size={64} weight="duotone" className="text-muted-foreground mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">No presets found</h4>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPresets.map((preset, idx) => (
                <motion.div
                  key={preset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Card className="glass-effect border-border/50 hover:border-primary/30 transition-all h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {preset.app}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleFavorite(preset.id)}
                        >
                          <Heart 
                            size={18} 
                            weight={currentFavorites.includes(preset.id) ? 'fill' : 'regular'}
                            className={currentFavorites.includes(preset.id) ? 'text-accent' : 'text-muted-foreground'}
                          />
                        </Button>
                      </div>
                      <CardTitle className="font-['Space_Grotesk'] text-lg">
                        {preset.name}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {preset.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1">
                          {preset.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${preset.author}`} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-semibold">
                              {preset.authorAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-xs flex-1">
                            <p className="font-medium">{preset.author}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Star size={14} weight="fill" className="text-accent" />
                            <span className="font-semibold">{preset.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Download size={14} />
                            <span>{(preset.downloads / 1000).toFixed(1)}K</span>
                          </div>
                        </div>

                        <Button className="w-full" variant="outline">
                          <Download size={16} />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
