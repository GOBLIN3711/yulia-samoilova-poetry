"use client"

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="ru"><body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF7F2', color: '#3C2415', padding: 40, fontFamily: 'serif', margin: 0 }}>
      <h2 style={{ color: '#C8A45C', fontSize: 24, marginBottom: 16 }}>Ошибка загрузки</h2>
      <p style={{ marginBottom: 24, textAlign: 'center', maxWidth: 400, color: '#6B4C3B' }}>Сайт временно недоступен.</p>
      <button onClick={reset} style={{ padding: '10px 28px', border: 'none', borderRadius: 24, color: 'white', background: 'linear-gradient(135deg, #C8A45C, #A68B3E)', cursor: 'pointer', fontFamily: 'serif' }}>Обновить</button>
    </body></html>
  )
}
