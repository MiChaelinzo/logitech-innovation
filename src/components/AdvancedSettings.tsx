import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  GearSix, 
  Palette, 
  SpeakerHigh, 
  Eye,
  Cpu,
  Download,
  Upload,
  Trash,
  Check,
  X
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

type Settings = {
  animations: boolean
  soundEffects: boolean
  reducedMotion: boolean
  highContrast: boolean
  autoSave: boolean
  aiQuality: 'draft' | 'standard' | 'high' | 'ultra'
  hapticFeedback: boolean
  analyticsTracking: boolean
  volume: number
  brightness: number
  particleEffects: boolean
  backgroundEffects: boolean
}

const defaultSettings: Settings = {
  animations: true,
  soundEffects: true,
  reducedMotion: false,
  highContrast: false,
  autoSave: true,
  aiQuality: 'standard',
  hapticFeedback: true,
  analyticsTracking: true,
  volume: 70,
  brightness: 100,
  particleEffects: true,
  backgroundEffects: true
}

export function AdvancedSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useKV<Settings>('advanced-settings', defaultSettings)
  const [hasChanges, setHasChanges] = useState(false)

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev!, [key]: value }))
    setHasChanges(true)
  }

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'motionflow-settings.json'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Settings exported successfully')
  }

  const importSettings = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const importedSettings = JSON.parse(event.target?.result as string)
            setSettings(importedSettings)
            toast.success('Settings imported successfully')
            setHasChanges(false)
          } catch (error) {
            toast.error('Failed to import settings')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    toast.success('Settings reset to defaults')
    setHasChanges(false)
  }

  const saveChanges = () => {
    toast.success('Settings saved successfully')
    setHasChanges(false)
  }

  return (
    <>
      <motion.div
        className="fixed bottom-24 right-4 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-effect border border-secondary/30 hover:border-secondary/60 transition-all w-14 h-14 p-0 rounded-full"
          size="lg"
        >
          <GearSix size={24} weight="duotone" className="text-secondary" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-hidden"
            >
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-secondary to-accent">
                        <GearSix size={28} weight="duotone" className="text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Advanced Settings</CardTitle>
                        <CardDescription>Customize your MotionFlow AI experience</CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="rounded-full"
                    >
                      <X size={20} />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto custom-scrollbar pr-4">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Eye className="text-primary" size={20} weight="duotone" />
                      <h3 className="font-semibold text-lg">Visual Settings</h3>
                    </div>
                    <div className="space-y-4 bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Animations</Label>
                          <p className="text-xs text-muted-foreground">Enable smooth animations throughout the app</p>
                        </div>
                        <Switch
                          checked={settings?.animations}
                          onCheckedChange={(checked) => updateSetting('animations', checked)}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Reduced Motion</Label>
                          <p className="text-xs text-muted-foreground">Minimize motion for accessibility</p>
                        </div>
                        <Switch
                          checked={settings?.reducedMotion}
                          onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>High Contrast</Label>
                          <p className="text-xs text-muted-foreground">Increase contrast for better visibility</p>
                        </div>
                        <Switch
                          checked={settings?.highContrast}
                          onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Particle Effects</Label>
                          <p className="text-xs text-muted-foreground">Show decorative particle animations</p>
                        </div>
                        <Switch
                          checked={settings?.particleEffects}
                          onCheckedChange={(checked) => updateSetting('particleEffects', checked)}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Background Effects</Label>
                          <p className="text-xs text-muted-foreground">Show animated background gradients</p>
                        </div>
                        <Switch
                          checked={settings?.backgroundEffects}
                          onCheckedChange={(checked) => updateSetting('backgroundEffects', checked)}
                        />
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <Label>Brightness: {settings?.brightness}%</Label>
                        <Slider
                          value={[settings?.brightness || 100]}
                          onValueChange={([value]) => updateSetting('brightness', value)}
                          min={50}
                          max={150}
                          step={10}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <SpeakerHigh className="text-accent" size={20} weight="duotone" />
                      <h3 className="font-semibold text-lg">Audio Settings</h3>
                    </div>
                    <div className="space-y-4 bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Sound Effects</Label>
                          <p className="text-xs text-muted-foreground">Play audio feedback for interactions</p>
                        </div>
                        <Switch
                          checked={settings?.soundEffects}
                          onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Haptic Feedback</Label>
                          <p className="text-xs text-muted-foreground">Vibration feedback on supported devices</p>
                        </div>
                        <Switch
                          checked={settings?.hapticFeedback}
                          onCheckedChange={(checked) => updateSetting('hapticFeedback', checked)}
                        />
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <Label>Volume: {settings?.volume}%</Label>
                        <Slider
                          value={[settings?.volume || 70]}
                          onValueChange={([value]) => updateSetting('volume', value)}
                          min={0}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Cpu className="text-secondary" size={20} weight="duotone" />
                      <h3 className="font-semibold text-lg">Performance Settings</h3>
                    </div>
                    <div className="space-y-4 bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Auto Save</Label>
                          <p className="text-xs text-muted-foreground">Automatically save your work</p>
                        </div>
                        <Switch
                          checked={settings?.autoSave}
                          onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Analytics Tracking</Label>
                          <p className="text-xs text-muted-foreground">Help improve the app with usage data</p>
                        </div>
                        <Switch
                          checked={settings?.analyticsTracking}
                          onCheckedChange={(checked) => updateSetting('analyticsTracking', checked)}
                        />
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <Label>AI Generation Quality</Label>
                        <Select
                          value={settings?.aiQuality}
                          onValueChange={(value: Settings['aiQuality']) => updateSetting('aiQuality', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft (Fastest)</SelectItem>
                            <SelectItem value="standard">Standard (Balanced)</SelectItem>
                            <SelectItem value="high">High (Better Quality)</SelectItem>
                            <SelectItem value="ultra">Ultra (Best Quality)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Higher quality takes longer to process
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportSettings}
                      className="flex-1 min-w-[150px]"
                    >
                      <Download size={16} className="mr-2" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={importSettings}
                      className="flex-1 min-w-[150px]"
                    >
                      <Upload size={16} className="mr-2" />
                      Import
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetSettings}
                      className="flex-1 min-w-[150px]"
                    >
                      <Trash size={16} className="mr-2" />
                      Reset
                    </Button>
                  </div>

                  {hasChanges && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <Button
                        onClick={saveChanges}
                        className="flex-1 bg-gradient-to-r from-primary to-accent"
                      >
                        <Check size={16} className="mr-2" />
                        Save Changes
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
