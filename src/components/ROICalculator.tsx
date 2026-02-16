import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Calculator, 
  TrendUp, 
  Clock, 
  CurrencyDollar,
  Users,
  Download,
  Sparkle
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { PaymentButton } from '@/components/PaymentButton'

type ROIData = {
  teamSize: number
  hourlyRate: number
  hoursPerWeek: number
  toolCategory: string
  efficiencyGain: number
}

const toolCategories = [
  { value: 'video', label: 'Video Editing', efficiency: 73 },
  { value: '3d', label: '3D Modeling', efficiency: 75 },
  { value: 'design', label: 'Design Software', efficiency: 65 },
  { value: 'vfx', label: 'VFX & Compositing', efficiency: 70 },
  { value: 'audio', label: 'Audio Production', efficiency: 60 },
  { value: 'mixed', label: 'Mixed Workflow', efficiency: 68 }
]

export function ROICalculator() {
  const [savedCalculations, setSavedCalculations] = useKV<ROIData[]>('roi-calculations', [])
  
  const [teamSize, setTeamSize] = useState<number>(10)
  const [hourlyRate, setHourlyRate] = useState<number>(75)
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40)
  const [toolCategory, setToolCategory] = useState<string>('video')
  
  const [results, setResults] = useState({
    timeSavedPerWeek: 0,
    costSavedPerMonth: 0,
    costSavedPerYear: 0,
    additionalCapacity: 0,
    efficiencyGain: 73
  })

  useEffect(() => {
    const category = toolCategories.find(c => c.value === toolCategory)
    const efficiencyGain = category?.efficiency || 70
    
    const timeSavedPerPerson = (hoursPerWeek * (efficiencyGain / 100))
    const timeSavedPerWeek = timeSavedPerPerson * teamSize
    const costSavedPerMonth = timeSavedPerWeek * hourlyRate * 4
    const costSavedPerYear = costSavedPerMonth * 12
    const additionalCapacity = (timeSavedPerWeek / hoursPerWeek) * 100

    setResults({
      timeSavedPerWeek: Math.round(timeSavedPerWeek),
      costSavedPerMonth: Math.round(costSavedPerMonth),
      costSavedPerYear: Math.round(costSavedPerYear),
      additionalCapacity: Math.round(additionalCapacity),
      efficiencyGain
    })
  }, [teamSize, hourlyRate, hoursPerWeek, toolCategory])

  const handleSaveCalculation = () => {
    const newCalculation: ROIData = {
      teamSize,
      hourlyRate,
      hoursPerWeek,
      toolCategory,
      efficiencyGain: results.efficiencyGain
    }
    
    setSavedCalculations((current) => [newCalculation, ...(current || []).slice(0, 4)])
  }

  const loadCalculation = (calc: ROIData) => {
    setTeamSize(calc.teamSize)
    setHourlyRate(calc.hourlyRate)
    setHoursPerWeek(calc.hoursPerWeek)
    setToolCategory(calc.toolCategory)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle className="font-['Space_Grotesk'] text-2xl flex items-center gap-3">
              <Calculator size={32} weight="duotone" className="text-primary" />
              Calculate Your ROI
            </CardTitle>
            <CardDescription>
              See how much time and money your team could save with MotionFlow AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="team-size">Team Size</Label>
              <Input
                id="team-size"
                type="number"
                min="1"
                max="1000"
                value={teamSize}
                onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-muted/30 border-border focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                Number of creative professionals on your team
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourly-rate">Average Hourly Rate ($)</Label>
              <Input
                id="hourly-rate"
                type="number"
                min="1"
                max="500"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-muted/30 border-border focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                Average cost per hour for your team members
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours-week">Hours per Week</Label>
              <Input
                id="hours-week"
                type="number"
                min="1"
                max="80"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-muted/30 border-border focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                Average billable hours per person per week
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tool-category">Primary Tool Category</Label>
              <Select value={toolCategory} onValueChange={setToolCategory}>
                <SelectTrigger id="tool-category" className="bg-muted/30 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {toolCategories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label} ({cat.efficiency}% efficiency gain)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Based on real customer data from similar workflows
              </p>
            </div>

            <Button 
              onClick={handleSaveCalculation}
              variant="outline" 
              className="w-full"
            >
              <Download size={18} />
              Save This Calculation
            </Button>
          </CardContent>
        </Card>

        {savedCalculations && savedCalculations.length > 0 && (
          <Card className="glass-effect border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Saved Calculations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {savedCalculations.map((calc, idx) => (
                <button
                  key={idx}
                  onClick={() => loadCalculation(calc)}
                  className="w-full p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-left border border-border/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold">{calc.teamSize} people</span>
                      <span className="text-muted-foreground"> • ${calc.hourlyRate}/hr • </span>
                      <span className="text-muted-foreground">
                        {toolCategories.find(c => c.value === calc.toolCategory)?.label}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card className="glass-effect border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="font-['Space_Grotesk'] text-2xl flex items-center gap-3">
              <TrendUp size={32} weight="duotone" className="text-accent" />
              Your Projected Savings
            </CardTitle>
            <CardDescription>
              Based on verified results from {results.efficiencyGain}% average efficiency gain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="bg-card/50 border-primary/30">
                <CardContent className="pt-6 text-center">
                  <Clock size={32} weight="duotone" className="text-primary mx-auto mb-2" />
                  <motion.div 
                    className="text-3xl font-bold text-primary mb-1"
                    key={results.timeSavedPerWeek}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {results.timeSavedPerWeek}
                  </motion.div>
                  <div className="text-xs text-muted-foreground">
                    Hours Saved/Week
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-accent/30">
                <CardContent className="pt-6 text-center">
                  <CurrencyDollar size={32} weight="duotone" className="text-accent mx-auto mb-2" />
                  <motion.div 
                    className="text-3xl font-bold text-accent mb-1"
                    key={results.costSavedPerMonth}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ${(results.costSavedPerMonth / 1000).toFixed(1)}K
                  </motion.div>
                  <div className="text-xs text-muted-foreground">
                    Saved Per Month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-secondary/30">
                <CardContent className="pt-6 text-center">
                  <Users size={32} weight="duotone" className="text-secondary mx-auto mb-2" />
                  <motion.div 
                    className="text-3xl font-bold text-secondary mb-1"
                    key={results.additionalCapacity}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    +{results.additionalCapacity}%
                  </motion.div>
                  <div className="text-xs text-muted-foreground">
                    Extra Capacity
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-primary/30">
                <CardContent className="pt-6 text-center">
                  <Sparkle size={32} weight="duotone" className="text-primary mx-auto mb-2" />
                  <motion.div 
                    className="text-3xl font-bold text-primary mb-1"
                    key={results.costSavedPerYear}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ${(results.costSavedPerYear / 1000).toFixed(0)}K
                  </motion.div>
                  <div className="text-xs text-muted-foreground">
                    Annual Savings
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30">
              <h4 className="font-semibold text-lg mb-3">Investment Breakdown</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">MotionFlow AI License (est.)</span>
                  <span className="font-semibold">${teamSize * 49}/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Annual Cost</span>
                  <span className="font-semibold">${teamSize * 49 * 12}/year</span>
                </div>
                <div className="h-px bg-border/50 my-2" />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Net Annual Savings</span>
                  <span className="font-bold text-accent">
                    ${((results.costSavedPerYear - (teamSize * 49 * 12)) / 1000).toFixed(0)}K
                  </span>
                </div>
                <Badge className="w-full justify-center bg-accent/20 text-accent border-accent/30 py-2">
                  {((results.costSavedPerYear / (teamSize * 49 * 12))).toFixed(1)}x ROI
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <PaymentButton 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6"
                size="lg"
                fullWidth
                planName="MotionFlow AI"
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  window.location.href = 'mailto:michaelinzo77@gmail.com?subject=ROI Report Request&body=Please send me the full ROI report'
                }}
              >
                <Download size={18} />
                Request Full ROI Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
