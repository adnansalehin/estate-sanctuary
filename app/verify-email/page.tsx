import { verifyEmail } from '@/app/actions/email'
import { VerificationResult } from '@/app/verify-email/components'

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  const result = await verifyEmail(searchParams.token)
  return <VerificationResult result={result} />
}