import { Loader2 } from 'lucide-react'

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-lg">Loading checkout...</p>
      </div>
    </div>
  )
} 