'use client'

import { useState, useEffect } from 'react'

interface Track {
  id: number
  title: string
  duration: string
  file: string
  storage_path?: string
  date: string
}

interface TrackManagerProps {
  token: string
}

export default function TrackManager({ token }: TrackManagerProps) {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editFile, setEditFile] = useState('')

  const loadTracks = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/tracks', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setTracks(data.tracks || [])
      }
    } catch { }
    setLoading(false)
  }

  useEffect(() => {
    loadTracks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadProgress(`Загрузка: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} МБ)...`)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', file.name.replace('.mp3', '').replace(/_/g, ' '))

      const res = await fetch('/api/admin/tracks', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      })

      if (res.ok) {
        setUploadProgress(`${file.name} загружен успешно!`)
        loadTracks()
      } else {
        setUploadProgress('Ошибка загрузки')
      }
    } catch {
      setUploadProgress('Ошибка соединения')
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(''), 4000)
      if (e.target) e.target.value = ''
    }
  }

  const handleDelete = async (track: Track) => {
    if (!confirm(`Удалить трек "${track.title}"?`)) return

    try {
      const res = await fetch('/api/admin/tracks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          file: track.file,
          id: track.id,
          storage_path: track.storage_path,
        }),
      })

      if (res.ok) {
        loadTracks()
      }
    } catch { }
  }

  const handleRename = async (id: number) => {
    if (!editTitle.trim()) return

    try {
      const res = await fetch('/api/admin/tracks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ file: editFile, title: editTitle.trim(), id }),
      })

      if (res.ok) {
        setEditingId(null)
        setEditTitle('')
        setEditFile('')
        loadTracks()
      }
    } catch { }
  }

  return (
    <div className="space-y-6">
      {/* Upload section */}
      <div className="rounded-2xl p-6" style={{ background: 'white', border: '1px solid rgba(60,36,21,0.06)', boxShadow: '0 2px 12px rgba(60,36,21,0.04)' }}>
        <h3 className="font-display text-lg font-semibold mb-2" style={{ color: '#3C2415' }}>
          Загрузить песню
        </h3>
        <p className="font-serif text-sm mb-4" style={{ color: '#8B7355' }}>
          Поддерживаются MP3 файлы любого размера. Название берётся из имени файла.
        </p>

        <label
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-serif text-sm cursor-pointer transition-all"
          style={{
            background: uploading ? 'rgba(200,164,92,0.1)' : 'linear-gradient(135deg, #C8A45C, #A68B3E)',
            color: uploading ? '#C8A45C' : 'white',
            boxShadow: '0 2px 8px rgba(200,164,92,0.3)',
            minHeight: '44px',
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {uploading ? 'Загрузка...' : 'Выбрать MP3 файл'}
          <input
            type="file"
            accept=".mp3,audio/mpeg"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {uploadProgress && (
          <p className="mt-3 font-serif text-sm" style={{ color: '#A68B3E' }}>
            {uploadProgress}
          </p>
        )}
      </div>

      {/* Tracks count */}
      <div className="text-sm font-serif" style={{ color: '#8B7355' }}>
        {tracks.length} треков
      </div>

      {/* Tracks list */}
      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid rgba(200,164,92,0.2)', borderTopColor: '#C8A45C' }} />
            <p className="mt-3 font-serif text-sm" style={{ color: '#8B7355' }}>Загрузка...</p>
          </div>
        ) : tracks.length === 0 ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'white', border: '1px solid rgba(60,36,21,0.06)' }}>
            <p className="font-serif" style={{ color: '#8B7355' }}>
              Пока нет загруженных треков. Загрузите первый MP3 файл выше.
            </p>
          </div>
        ) : (
          tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: 'white', border: '1px solid rgba(60,36,21,0.06)', boxShadow: '0 1px 6px rgba(60,36,21,0.03)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(200,164,92,0.1)' }}
              >
                <svg className="w-5 h-5" style={{ color: '#C8A45C' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>

              {editingId === track.id ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg text-sm"
                    style={{ border: '1px solid rgba(200,164,92,0.3)', background: '#FAF7F2', color: '#3C2415', outline: 'none' }}
                    onKeyDown={(e) => e.key === 'Enter' && handleRename(track.id)}
                    autoFocus
                  />
                  <button
                    onClick={() => handleRename(track.id)}
                    className="text-xs px-3 py-2 rounded-lg"
                    style={{ color: '#7B9E7B', background: 'rgba(123,158,123,0.1)', minHeight: '36px' }}
                  >
                    OK
                  </button>
                  <button
                    onClick={() => { setEditingId(null); setEditTitle(''); setEditFile('') }}
                    className="text-xs px-3 py-2 rounded-lg"
                    style={{ color: '#8B7355', minHeight: '36px' }}
                  >
                    X
                  </button>
                </div>
              ) : (
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm font-medium truncate" style={{ color: '#3C2415' }}>
                    {track.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#B8A98A' }}>
                    {track.date} · {track.duration}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => { setEditingId(track.id); setEditTitle(track.title); setEditFile(track.file) }}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: '#8B7355' }}
                  title="Переименовать"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(track)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: '#C47A5A' }}
                  title="Удалить"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
