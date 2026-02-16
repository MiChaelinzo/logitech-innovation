import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { 
  Check,
  X,
  Sparkle,
  Lightning,
  Crown,
  ArrowRight,
  CurrencyDollar,
  EnvelopeSimple
} from '@phosphor-icons/react'

type PricingTier = {
  id: string
  name: string
  description: string
  icon: typeof Sparkle
  priceMonthly: number
  priceYearly: number
  popular: boolean
  features: {
    name: string
    included: boolean
    detail?: string
  }[]
  cta: string
  color: string
}

const tiers: PricingTier[] = [
  {
    id: 'solo',
    name: 'Solo Creator',
    description: 'Perfect for freelancers and individual creators',
    icon: Sparkle,
    priceMonthly: 49,
    priceYearly: 470,
    popular: false,
    features: [
      { name: 'Single User License', included: true },
      { name: 'Up to 3 Applications', included: true },
      { name: 'AI Asset Generation', included: true, detail: '100 generations/month' },
      { name: 'Community Presets', included: true },
      { name: 'Basic Support', included: true },
      { name: 'Cloud Sync', included: true },
      { name: 'Custom AI Training', included: false },
      { name: 'Priority Support', included: false },
      { name: 'Team Collaboration', included: false },
      { name: 'Advanced Analytics', included: false }
    ],
    cta: 'Start Free Trial',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For power users and small teams',
    icon: Lightning,
    priceMonthly: 99,
    priceYearly: 950,
    popular: true,
    features: [
      { name: 'Up to 5 User Licenses', included: true },
      { name: 'Unlimited Applications', included: true },
      { name: 'AI Asset Generation', included: true, detail: 'Unlimited generations' },
      { name: 'Community Presets', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Cloud Sync', included: true },
      { name: 'Custom AI Training', included: true, detail: 'Train on your style' },
      { name: 'Team Collaboration', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'API Access', included: false }
    ],
    cta: 'Start Free Trial',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large teams and studios',
    icon: Crown,
    priceMonthly: 0,
    priceYearly: 0,
    popular: false,
    features: [
      { name: 'Unlimited User Licenses', included: true },
      { name: 'Unlimited Applications', included: true },
      { name: 'AI Asset Generation', included: true, detail: 'Unlimited + priority queue' },
      { name: 'Community Presets', included: true },
      { name: 'Dedicated Support', included: true, detail: '24/7 priority' },
      { name: 'Cloud Sync', included: true },
      { name: 'Custom AI Training', included: true, detail: 'Dedicated models' },
      { name: 'Team Collaboration', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'API Access', included: true }
    ],
    cta: 'Contact Sales',
    color: 'from-orange-500 to-red-500'
  }
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  const handlePayment = (tier: PricingTier) => {
    if (tier.id === 'enterprise') {
      window.location.href = 'mailto:michaelinzo77@gmail.com?subject=MotionFlow AI Enterprise Inquiry'
    } else {
      const price = isYearly ? tier.priceYearly : tier.priceMonthly
      const billingPeriod = isYearly ? 'yearly' : 'monthly'
      
      toast.success(`Redirecting to PayPal for ${tier.name} plan`, {
        description: `$${price}/${billingPeriod} - Secure payment processing`
      })
      
      setTimeout(() => {
        window.open('https://paypal.me/michaelinzo77', '_blank')
      }, 1500)
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-4">
          <Label htmlFor="billing-toggle" className={!isYearly ? 'font-semibold' : 'text-muted-foreground'}>
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label htmlFor="billing-toggle" className={isYearly ? 'font-semibold' : 'text-muted-foreground'}>
            Yearly
          </Label>
          {isYearly && (
            <Badge className="bg-accent/20 text-accent border-accent/30">
              Save 20%
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {tiers.map((tier, idx) => {
          const Icon = tier.icon
          const price = isYearly ? tier.priceYearly : tier.priceMonthly
          const isCustom = tier.id === 'enterprise'

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={tier.popular ? 'lg:-mt-4' : ''}
            >
              <Card 
                className={`glass-effect h-full flex flex-col relative ${
                  tier.popular 
                    ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5 lg:scale-105' 
                    : 'border-border/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                    <Icon size={32} weight="duotone" className="text-white" />
                  </div>
                  
                  <CardTitle className="font-['Space_Grotesk'] text-2xl mb-2">
                    {tier.name}
                  </CardTitle>
                  
                  <CardDescription className="text-sm">
                    {tier.description}
                  </CardDescription>

                  <div className="mt-6">
                    {isCustom ? (
                      <div>
                        <div className="text-4xl font-bold mb-2">Custom</div>
                        <div className="text-sm text-muted-foreground">
                          Tailored to your needs
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-5xl font-bold">${price}</span>
                          <span className="text-muted-foreground">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        </div>
                        {isYearly && (
                          <div className="text-sm text-muted-foreground mt-2">
                            ${(price / 12).toFixed(0)}/month billed annually
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature.name} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check size={20} className="text-primary mt-0.5 flex-shrink-0" weight="bold" />
                        ) : (
                          <X size={20} className="text-muted-foreground/30 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <span className={feature.included ? 'text-foreground' : 'text-muted-foreground/50'}>
                            {feature.name}
                          </span>
                          {feature.detail && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {feature.detail}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    size="lg"
                    className={
                      tier.popular 
                        ? `bg-gradient-to-r ${tier.color} hover:opacity-90 text-white w-full`
                        : 'w-full'
                    }
                    variant={tier.popular ? 'default' : 'outline'}
                    onClick={() => handlePayment(tier)}
                  >
                    {tier.cta}
                    <ArrowRight size={18} className="ml-2" weight="bold" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card className="glass-effect border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="pt-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">14 Days</div>
              <div className="text-sm text-muted-foreground">Free trial period</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">No CC</div>
              <div className="text-sm text-muted-foreground">Credit card not required</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">Cancel</div>
              <div className="text-sm text-muted-foreground">Anytime, no questions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-primary/50 bg-gradient-to-br from-primary/10 to-accent/10">
        <CardContent className="pt-8">
          <div className="text-center space-y-4">
            <h3 className="font-['Space_Grotesk'] text-2xl font-semibold">Secure Payment Processing</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All subscriptions are processed securely through PayPal. After selecting your plan, 
              you'll be redirected to complete your payment safely and securely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a 
                href="https://paypal.me/michaelinzo77" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold"
              >
                <CurrencyDollar size={24} weight="duotone" />
                <span>PayPal: paypal.me/michaelinzo77</span>
              </a>
              <span className="text-muted-foreground">•</span>
              <a 
                href="mailto:michaelinzo77@gmail.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <EnvelopeSimple size={20} weight="duotone" />
                <span>michaelinzo77@gmail.com</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
