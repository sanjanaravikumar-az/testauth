import { useEffect, useState } from 'react'
import { confirmSignUp } from 'aws-amplify/auth'

export default function VerifyPage() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    verify()
  }, [])

  async function verify() {
    try {
      const params = new URLSearchParams(window.location.search)
      const encoded = params.get('data')
      const code = params.get('code')

      if (!encoded || !code) {
        setStatus('error')
        setErrorMsg('Missing verification data or code in URL.')
        return
      }

      const decoded = JSON.parse(atob(encoded))
      const { userName, redirectUrl } = decoded

      await confirmSignUp({ username: userName, confirmationCode: code })

      setStatus('success')
      // Redirect after a short delay so user sees the success message
      setTimeout(() => {
        window.location.href = redirectUrl || '/'
      }, 2000)
    } catch (err: unknown) {
      const message = (err as Error).message
      // Already confirmed is still a success
      if (message?.includes('Current status is CONFIRMED')) {
        setStatus('success')
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      } else {
        setStatus('error')
        setErrorMsg(message || 'Verification failed.')
      }
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Email Verification</h1>
        {status === 'verifying' && <p>Verifying your email…</p>}
        {status === 'success' && (
          <p style={{ color: 'green' }}>Email verified. Redirecting…</p>
        )}
        {status === 'error' && (
          <div className="auth-error" role="alert">{errorMsg}</div>
        )}
      </div>
    </div>
  )
}
