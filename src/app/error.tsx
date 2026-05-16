"use client"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF7F2', color: '#3C2415', padding: 40, fontFamily: 'serif' }}>
      <h2 style={{ color: '#C8A45C', fontSize: 24, marginBottom: 16 }}>Что-то пошло не так</h2>
      <p style={{ marginBottom: 24, textAlign: 'center', maxWidth: 400, color: '#6B4C3B' }}>Произошла ошибка при загрузке страницы. Попробуйте обновить.</p>
      <button onClick={reset} style={{ padding: '10px 28px', border: 'none', borderRadius: 24, color: 'white', background: 'linear-gradient(135deg, #C8A45C, #A68B3E)', cursor: 'pointer', fontFamily: 'serif', boxShadow: '0 2px 8px rgba(200,164,92,0.3)' }}>Попробовать снова</button>
    </div>
  )
}
