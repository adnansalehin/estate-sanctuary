'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type VerificationResultProps = {
  result: {
    success: boolean
    message: string
  }
}

export function VerificationResult({ result }: VerificationResultProps) {
  const { isDarkTheme } = useTheme()

  return (
    <div className={`min-h-screen pt-24 flex items-center justify-center transition-colors duration-300 ${
      isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-50 text-[#024e52]'
    }`}>
      <div className={`max-w-md w-full mx-auto p-8 rounded-lg ${
        isDarkTheme ? 'bg-[#013639]' : 'bg-white'
      }`}>
        <div className="text-center">
          {result.success ? (
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
          ) : (
            <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          )}
          <h1 className="text-2xl font-bold mb-4">
            {result.success ? 'Email Verified!' : 'Verification Failed'}
          </h1>
          <p className="mb-8">{result.message}</p>
          <Link href="/">
            <Button className={isDarkTheme 
              ? 'bg-white text-[#024e52] hover:bg-gray-100' 
              : 'bg-[#024e52] text-white hover:bg-[#013639]'
            }>
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 