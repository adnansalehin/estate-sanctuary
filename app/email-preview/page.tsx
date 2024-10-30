import { generateWelcomeEmail } from '@/emails/welcome-template'
import { redirect } from 'next/navigation'

export default function EmailPreviewPage() {
  // Prevent access in production
  if (process.env.NODE_ENV === 'production') {
    redirect('/')
  }

  const previewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=preview-token-12345`
  
  return (
    <div className="p-4">
      <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
        ⚠️ Development Preview Only
      </div>
      <div 
        dangerouslySetInnerHTML={{ 
          __html: generateWelcomeEmail(previewUrl) 
        }} 
      />
    </div>
  )
} 