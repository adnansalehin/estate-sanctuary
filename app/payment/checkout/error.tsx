'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const { isDarkTheme } = useTheme()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Checkout error:', error)
  }, [error])

  return (
    <div className={cn(
      'min-h-screen flex items-center justify-center p-4',
      isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-50 text-[#024e52]'
    )}>
      <div className="text-center">
        <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="mb-4">We encountered an error while processing your payment.</p>
        <div className="space-x-4">
          <Button
            onClick={() => reset()}
            variant="outline"
          >
            Try again
          </Button>
          <Button
            onClick={() => router.push('/pricing')}
            className={isDarkTheme
              ? 'bg-white text-[#024e52] hover:bg-gray-100'
              : 'bg-[#024e52] text-white hover:bg-[#013639]'
            }
          >
            Return to pricing
          </Button>
        </div>
      </div>
    </div>
  )
} 