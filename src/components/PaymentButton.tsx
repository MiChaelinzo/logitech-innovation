import { Button } from '@/components/ui/button'
import { CurrencyDollar, ArrowRight } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface PaymentButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  amount?: number
  planName?: string
  fullWidth?: boolean
}

export function PaymentButton({ 
  variant = 'default', 
  size = 'default',
  className = '',
  amount,
  planName,
  fullWidth = false
}: PaymentButtonProps) {
  
  const handlePayment = () => {
    const description = planName 
      ? `Processing payment for ${planName}${amount ? ` - $${amount}` : ''}` 
      : 'Redirecting to secure PayPal payment'
    
    toast.success('Redirecting to PayPal', {
      description
    })
    
    setTimeout(() => {
      window.open('https://paypal.me/michaelinzo77', '_blank')
    }, 1000)
  }

  return (
    <Button 
      variant={variant}
      size={size}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={handlePayment}
    >
      <CurrencyDollar size={18} weight="bold" className="mr-2" />
      {amount ? `Pay $${amount}` : 'Proceed to Payment'}
      <ArrowRight size={16} className="ml-2" weight="bold" />
    </Button>
  )
}
