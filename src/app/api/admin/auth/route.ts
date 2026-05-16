import { NextResponse } from 'next/server'

// Admin password hash - can be overridden via env variable
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '06c093e950a448c7d12680e7c346cddac97b2c5b694cb2b893b6b2e993c6abfd'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Пароль не указан' }, { status: 400 })
    }

    // Hash the provided password
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    if (hashHex === ADMIN_PASSWORD_HASH) {
      // Generate a session token (valid for 24 hours)
      const token = Buffer.from(JSON.stringify({
        auth: true,
        exp: Date.now() + 24 * 60 * 60 * 1000
      })).toString('base64')

      return NextResponse.json({ success: true, token })
    }

    return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
