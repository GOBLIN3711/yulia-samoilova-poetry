'use client'

import { useState, useEffect } from 'react'
import PoemManager from '@/components/admin/PoemManager'
import TrackManager from '@/components/admin/TrackManager'

type Tab = 'poems' | 'tracks'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [isAuth, setIsAuth] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('poems')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (data.success) {
        setToken(data.token)
        setIsAuth(true)
        localStorage.setItem('admin_token', data.token)
      } else {
        setError(data.error || 'Ошибка входа')
      }
    } catch {
      setError('Ошибка соединения')
    }
  }

  // Check for saved token on mount
  useEffect(() => {
    const saved = localStorage.getItem('admin_token')
    if (saved) {
      try {
        const decoded = JSON.parse(Buffer.from(saved, 'base64').toString())
        if (decoded.auth === true && decoded.exp > Date.now()) {
          setToken(saved)
          setIsAuth(true)
        } else {
          localStorage.removeItem('admin_token')
        }
      } catch {
        localStorage.removeItem('admin_token')
      }
    }
  }, [])

  // Login screen
  if (!isAuth) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(135deg, #F5F0EB, #EDE4D5)' }}
      >
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold mb-2" style={{ color: '#3C2415' }}>
              Админ-панель
            </h1>
            <p className="font-serif text-sm" style={{ color: '#8B7355' }}>
              Управление сайтом Юлии Самойловой
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-2xl p-8"
            style={{ background: 'white', boxShadow: '0 4px 24px rgba(60,36,21,0.08)' }}
          >
            <label className="block text-sm font-medium mb-2" style={{ color: '#6B4C3B' }}>
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 rounded-xl text-base"
              style={{
                border: '1px solid rgba(60,36,21,0.12)',
                background: '#FAF7F2',
                color: '#3C2415',
                outline: 'none',
                minHeight: '48px',
              }}
            />
            {error && (
              <p className="mt-2 text-sm" style={{ color: '#C47A5A' }}>{error}</p>
            )}
            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl font-serif text-base"
              style={{
                background: 'linear-gradient(135deg, #C8A45C, #A68B3E)',
                color: 'white',
                boxShadow: '0 2px 8px rgba(200,164,92,0.3)',
                minHeight: '48px',
              }}
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen" style={{ background: '#FAF7F2' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 py-3 px-4"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(60,36,21,0.06)',
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold" style={{ color: '#3C2415' }}>
              Админ-панель
            </h1>
            <p className="text-xs font-serif" style={{ color: '#8B7355' }}>
              Управление контентом
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="font-serif text-sm px-3 py-1.5 rounded-lg hidden sm:block"
              style={{ color: '#6B4C3B', border: '1px solid rgba(60,36,21,0.1)' }}
            >
              На сайт
            </a>
            <button
              onClick={() => {
                setIsAuth(false)
                setToken('')
                localStorage.removeItem('admin_token')
              }}
              className="font-serif text-sm px-3 py-1.5 rounded-lg"
              style={{ color: '#C47A5A', border: '1px solid rgba(196,122,90,0.2)' }}
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tab switcher */}
        <div
          className="flex rounded-xl p-1 mb-8"
          style={{ background: 'rgba(243, 237, 227, 0.7)', border: '1px solid rgba(60,36,21,0.06)' }}
        >
          <button
            onClick={() => setActiveTab('poems')}
            className="flex-1 py-2.5 rounded-lg font-serif text-sm font-medium transition-all"
            style={{
              background: activeTab === 'poems' ? 'linear-gradient(135deg, rgba(200,164,92,0.12), rgba(196,139,127,0.08))' : 'transparent',
              color: activeTab === 'poems' ? '#A68B3E' : '#6B4C3B',
              boxShadow: activeTab === 'poems' ? '0 2px 8px rgba(200,164,92,0.1)' : 'none',
              minHeight: '44px',
            }}
          >
            Стихи
          </button>
          <button
            onClick={() => setActiveTab('tracks')}
            className="flex-1 py-2.5 rounded-lg font-serif text-sm font-medium transition-all"
            style={{
              background: activeTab === 'tracks' ? 'linear-gradient(135deg, rgba(200,164,92,0.12), rgba(196,139,127,0.08))' : 'transparent',
              color: activeTab === 'tracks' ? '#A68B3E' : '#6B4C3B',
              boxShadow: activeTab === 'tracks' ? '0 2px 8px rgba(200,164,92,0.1)' : 'none',
              minHeight: '44px',
            }}
          >
            Музыка
          </button>
        </div>

        {/* Tab content */}
        {activeTab === 'poems' && <PoemManager token={token} />}
        {activeTab === 'tracks' && <TrackManager token={token} />}
      </main>
    </div>
  )
}
