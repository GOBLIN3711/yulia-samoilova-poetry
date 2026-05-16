'use client'

import { useState, useEffect, useCallback } from 'react'

const CATEGORIES = [
  'Духовные',
  'Семейные',
  'Про природу',
  'Про любовь',
  'Про войну и память',
  'Про Петербург',
  'Жизненные',
  'Другие',
]

interface Poem {
  id: number
  title: string
  text: string
  url?: string
  date: string
  category: string
  order_index?: number
}

interface PoemManagerProps {
  token: string
}

export default function PoemManager({ token }: PoemManagerProps) {
  const [poems, setPoems] = useState<Poem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  // Form state
  const [showForm, setShowForm] = useState(false)
  const [formTitle, setFormTitle] = useState('')
  const [formText, setFormText] = useState('')
  const [formCategory, setFormCategory] = useState('Жизненные')
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0])
  const [formSubmitting, setFormSubmitting] = useState(false)

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editCategory, setEditCategory] = useState('')

  const limit = 15

  const loadPoems = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', page.toString())
      params.set('limit', limit.toString())
      if (category) params.set('category', category)
      if (search) params.set('search', search)

      const res = await fetch(`/api/admin/poems?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setPoems(data.poems || [])
        setTotal(data.total || 0)
      }
    } catch { }
    setLoading(false)
  }, [token, page, category, search])

  useEffect(() => {
    loadPoems()
  }, [loadPoems])

  useEffect(() => {
    setPage(1)
  }, [category, search])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim() || !formText.trim()) return
    setFormSubmitting(true)

    try {
      const res = await fetch('/api/admin/poems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formTitle.trim(),
          text: formText.trim(),
          category: formCategory,
          date: formDate,
        }),
      })

      if (res.ok) {
        setFormTitle('')
        setFormText('')
        setFormCategory('Жизненные')
        setFormDate(new Date().toISOString().split('T')[0])
        setShowForm(false)
        loadPoems()
      }
    } catch { }
    setFormSubmitting(false)
  }

  const handleUpdate = async (id: number) => {
    if (!editCategory) return

    try {
      const res = await fetch('/api/admin/poems', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id, category: editCategory }),
      })

      if (res.ok) {
        setEditingId(null)
        setEditCategory('')
        loadPoems()
      }
    } catch { }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить это стихотворение?')) return

    try {
      const res = await fetch(`/api/admin/poems?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (res.ok) {
        loadPoems()
      }
    } catch { }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Поиск по названию или тексту..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm w-full sm:w-64"
            style={{
              border: '1px solid rgba(60,36,21,0.12)',
              background: '#FAF7F2',
              color: '#3C2415',
              outline: 'none',
              minHeight: '44px',
            }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm"
            style={{
              border: '1px solid rgba(60,36,21,0.12)',
              background: '#FAF7F2',
              color: '#3C2415',
              outline: 'none',
              minHeight: '44px',
            }}
          >
            <option value="">Все категории</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 rounded-xl font-serif text-sm text-white shrink-0"
          style={{
            background: 'linear-gradient(135deg, #C8A45C, #A68B3E)',
            boxShadow: '0 2px 8px rgba(200,164,92,0.3)',
            minHeight: '44px',
          }}
        >
          {showForm ? 'Закрыть' : '+ Добавить стих'}
        </button>
      </div>

      {/* New poem form */}
      {showForm && (
        <div className="rounded-2xl p-6" style={{ background: 'white', border: '1px solid rgba(60,36,21,0.06)', boxShadow: '0 2px 12px rgba(60,36,21,0.04)' }}>
          <h3 className="font-display text-lg font-semibold mb-4" style={{ color: '#3C2415' }}>
            Новое стихотворение
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#6B4C3B' }}>Название</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm"
                  style={{
                    border: '1px solid rgba(60,36,21,0.12)',
                    background: '#FAF7F2',
                    color: '#3C2415',
                    outline: 'none',
                    minHeight: '44px',
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#6B4C3B' }}>Дата</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm"
                    style={{
                      border: '1px solid rgba(60,36,21,0.12)',
                      background: '#FAF7F2',
                      color: '#3C2415',
                      outline: 'none',
                      minHeight: '44px',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#6B4C3B' }}>Категория</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm"
                    style={{
                      border: '1px solid rgba(60,36,21,0.12)',
                      background: '#FAF7F2',
                      color: '#3C2415',
                      outline: 'none',
                      minHeight: '44px',
                    }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#6B4C3B' }}>Текст</label>
              <textarea
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                required
                rows={8}
                className="w-full px-4 py-3 rounded-xl text-sm resize-none"
                style={{
                  border: '1px solid rgba(60,36,21,0.12)',
                  background: '#FAF7F2',
                  color: '#3C2415',
                  outline: 'none',
                  fontFamily: 'var(--font-serif)',
                  lineHeight: '1.8',
                }}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-serif"
                style={{ color: '#6B4C3B', border: '1px solid rgba(60,36,21,0.1)', minHeight: '44px' }}
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={formSubmitting}
                className="px-5 py-2.5 rounded-xl text-sm font-serif text-white"
                style={{
                  background: formSubmitting ? 'rgba(200,164,92,0.5)' : 'linear-gradient(135deg, #C8A45C, #A68B3E)',
                  boxShadow: '0 2px 8px rgba(200,164,92,0.3)',
                  minHeight: '44px',
                }}
              >
                {formSubmitting ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Info bar */}
      <div className="flex items-center justify-between text-sm" style={{ color: '#8B7355' }}>
        <span className="font-serif">
          {total} стихотворений
          {category && <> в категории &laquo;{category}&raquo;</>}
        </span>
        {totalPages > 1 && (
          <span className="font-serif">Страница {page} из {totalPages}</span>
        )}
      </div>

      {/* Poems list */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid rgba(200,164,92,0.2)', borderTopColor: '#C8A45C' }} />
            <p className="mt-3 font-serif text-sm" style={{ color: '#8B7355' }}>Загрузка...</p>
          </div>
        ) : poems.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-serif" style={{ color: '#8B7355' }}>Стихотворения не найдены</p>
          </div>
        ) : (
          poems.map((poem) => (
            <div
              key={poem.id}
              className="rounded-2xl p-4 sm:p-5"
              style={{ background: 'white', border: '1px solid rgba(60,36,21,0.06)', boxShadow: '0 1px 6px rgba(60,36,21,0.03)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h4 className="font-serif text-base font-semibold truncate" style={{ color: '#3C2415' }}>
                      {poem.title}
                    </h4>
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full shrink-0"
                      style={{ background: 'rgba(200,164,92,0.1)', color: '#A68B3E' }}
                    >
                      {poem.category || 'Другие'}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: '#B8A98A' }}>
                    {poem.date || 'Без даты'}
                    {poem.url && (
                      <>
                        {' · '}
                        <a href={poem.url} target="_blank" rel="noopener noreferrer" style={{ color: '#A68B3E' }}>
                          Стихи.ру ↗
                        </a>
                      </>
                    )}
                  </p>
                  <p className="font-serif text-sm leading-relaxed line-clamp-3" style={{ color: '#6B4C3B' }}>
                    {poem.text.slice(0, 200)}{poem.text.length > 200 ? '...' : ''}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {editingId === poem.id ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="px-2 py-1.5 rounded-lg text-xs"
                        style={{
                          border: '1px solid rgba(200,164,92,0.3)',
                          background: '#FAF7F2',
                          color: '#3C2415',
                          outline: 'none',
                        }}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleUpdate(poem.id)}
                        className="text-xs px-2.5 py-1.5 rounded-lg"
                        style={{ color: '#7B9E7B', background: 'rgba(123,158,123,0.1)', minHeight: '32px' }}
                      >
                        OK
                      </button>
                      <button
                        onClick={() => { setEditingId(null); setEditCategory('') }}
                        className="text-xs px-2.5 py-1.5 rounded-lg"
                        style={{ color: '#8B7355', minHeight: '32px' }}
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => { setEditingId(poem.id); setEditCategory(poem.category || 'Другие') }}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#8B7355' }}
                        title="Изменить категорию"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(poem.id)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#C47A5A' }}
                        title="Удалить"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-4 py-2 rounded-xl text-sm font-serif"
            style={{
              color: page <= 1 ? '#B8A98A' : '#6B4C3B',
              border: '1px solid rgba(60,36,21,0.1)',
              opacity: page <= 1 ? 0.5 : 1,
              minHeight: '44px',
            }}
          >
            ← Назад
          </button>
          <span className="px-4 py-2 font-serif text-sm" style={{ color: '#8B7355' }}>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-xl text-sm font-serif"
            style={{
              color: page >= totalPages ? '#B8A98A' : '#6B4C3B',
              border: '1px solid rgba(60,36,21,0.1)',
              opacity: page >= totalPages ? 0.5 : 1,
              minHeight: '44px',
            }}
          >
            Далее →
          </button>
        </div>
      )}
    </div>
  )
}
