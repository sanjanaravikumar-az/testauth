import { useState, useEffect, FormEvent } from 'react'
import {
  signIn,
  signUp,
  confirmSignUp,
  signOut,
  getCurrentUser,
  confirmSignIn,
  type SignInOutput,
} from 'aws-amplify/auth'
import VerifyPage from './VerifyPage'
import './App.css'

type AuthView = 'signIn' | 'signUp' | 'confirmSignUp' | 'customChallenge' | 'authenticated'

function App() {
  // Simple path-based routing — render VerifyPage on /verify
  if (window.location.pathname === '/verify') {
    return <VerifyPage />
  }
  const [view, setView] = useState<AuthView>('signIn')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmCode, setConfirmCode] = useState('')
  const [challengeAnswer, setChallengeAnswer] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    checkCurrentUser()
  }, [])

  async function checkCurrentUser() {
    try {
      const user = await getCurrentUser()
      if (user) {
        setUserEmail(user.signInDetails?.loginId ?? user.username)
        setView('authenticated')
      }
    } catch {
      // not signed in
    }
  }

  async function handleSignUp(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      })
      setView('confirmSignUp')
    } catch (err: unknown) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirmSignUp(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await confirmSignUp({ username: email, confirmationCode: confirmCode })
      setView('signIn')
    } catch (err: unknown) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignIn(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result: SignInOutput = await signIn({
        username: email,
        password,
        options: { authFlowType: 'CUSTOM_WITH_SRP' },
      })

      if (result.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE') {
        setView('customChallenge')
      } else if (result.isSignedIn) {
        setUserEmail(email)
        setView('authenticated')
      }
    } catch (err: unknown) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCustomChallenge(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await confirmSignIn({ challengeResponse: challengeAnswer })
      if (result.isSignedIn) {
        setUserEmail(email)
        setView('authenticated')
      }
    } catch (err: unknown) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    await signOut()
    setEmail('')
    setPassword('')
    setChallengeAnswer('')
    setConfirmCode('')
    setError('')
    setUserEmail('')
    setView('signIn')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">testauth</h1>

        {error && <div className="auth-error" role="alert">{error}</div>}

        {view === 'signIn' && (
          <form onSubmit={handleSignIn}>
            <label htmlFor="signin-email">Email</label>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            <label htmlFor="signin-password">Password</label>
            <input
              id="signin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
            <p className="auth-switch">
              No account?{' '}
              <button type="button" className="link-btn" onClick={() => { setError(''); setView('signUp') }}>
                Sign Up
              </button>
            </p>
          </form>
        )}

        {view === 'signUp' && (
          <form onSubmit={handleSignUp}>
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 characters"
              required
              autoComplete="new-password"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Creating account…' : 'Sign Up'}
            </button>
            <p className="auth-switch">
              Already have an account?{' '}
              <button type="button" className="link-btn" onClick={() => { setError(''); setView('signIn') }}>
                Sign In
              </button>
            </p>
          </form>
        )}

        {view === 'confirmSignUp' && (
          <form onSubmit={handleConfirmSignUp}>
            <p className="auth-info">Check your email for a verification code.</p>
            <label htmlFor="confirm-code">Confirmation Code</label>
            <input
              id="confirm-code"
              type="text"
              value={confirmCode}
              onChange={(e) => setConfirmCode(e.target.value)}
              placeholder="Enter code"
              required
              autoComplete="one-time-code"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Verifying…' : 'Confirm'}
            </button>
          </form>
        )}

        {view === 'customChallenge' && (
          <form onSubmit={handleCustomChallenge}>
            <p className="auth-info">Please answer the security challenge to continue.</p>
            <label htmlFor="challenge-answer">Challenge Answer</label>
            <input
              id="challenge-answer"
              type="text"
              value={challengeAnswer}
              onChange={(e) => setChallengeAnswer(e.target.value)}
              placeholder="Enter answer"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Verifying…' : 'Submit'}
            </button>
          </form>
        )}

        {view === 'authenticated' && (
          <div className="auth-welcome">
            <p>Welcome, {userEmail}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
