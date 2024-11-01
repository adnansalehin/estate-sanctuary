'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export default function PaymentSuccess() {
  const router = useRouter()
  const { isDarkTheme } = useTheme()

  useEffect(() => {
    // You could verify the payment status here
  }, [])

  return (
    <div className={cn(
      'min-h-screen flex items-center justify-center',
      isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-50 text-[#024e52]'
    )}>
      <div className="text-center">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-8">Thank you for your subscription. You now have access to all Pro features.</p>
        <Button
          onClick={() => router.push('/demo')}
          className={isDarkTheme
            ? 'bg-white text-[#024e52] hover:bg-gray-100'
            : 'bg-[#024e52] text-white hover:bg-[#013639]'
          }
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
} 