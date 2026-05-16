'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface Track {
  id: number
  title: string
  duration: string
  file: string // Can be local path (/music/track.mp3) or full URL (https://...supabase.co/...)
  date?: string
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [repeat, setRepeat] = useState(true)
  const [showList, setShowList] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [showVolume, setShowVolume] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load tracks on mount
  useEffect(() => {
    fetch('/api/poems?action=tracks')
      .then(res => res.json())
      .then(data => {
        if (data.tracks && data.tracks.length > 0) {
          setTracks(data.tracks)
        } else {
          // Default placeholder tracks
          setTracks([
            { id: 1, title: 'Паутинками судеб', duration: '3:42', file: '/music/track1.mp3' },
            { id: 2, title: 'Слушай тишину', duration: '4:15', file: '/music/track2.mp3' },
            { id: 3, title: 'К победе вместе все пришли!', duration: '3:58', file: '/music/track3.mp3' },
          ])
        }
        setIsLoading(false)
      })
      .catch(() => {
        setTracks([
          { id: 1, title: 'Паутинками судеб', duration: '3:42', file: '/music/track1.mp3' },
        ])
        setIsLoading(false)
      })
  }, [])

  const track = tracks[currentTrack] || { title: 'Нет треков', duration: '0:00', file: '' }

  // Handle track end - continuous playback
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => {
      const next = currentTrack + 1
      if (next < tracks.length) {
        setCurrentTrack(next)
      } else if (repeat) {
        setCurrentTrack(0)
      } else {
        setIsPlaying(false)
      }
    }
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [currentTrack, tracks.length, repeat])

  // Load audio source when track file changes (including initial load)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track.file) return
    audio.src = track.file
    if (track.file.startsWith('http')) {
      audio.crossOrigin = 'anonymous'
    } else {
      audio.removeAttribute('crossorigin')
    }
    audio.load()
  }, [track.file])

  // Play/pause when isPlaying changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !audio.src) return
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Time updates — audio element is always in DOM, so ref is always valid
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrentTime(audio.currentTime)
    const onLoaded = () => setDuration(audio.duration)
    const onDuration = () => {
      if (audio.duration && isFinite(audio.duration)) setDuration(audio.duration)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('durationchange', onDuration)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('durationchange', onDuration)
    }
  }, [])

  // Volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // Progress bar drag support
  const isDragging = useRef(false)

  const seekToPosition = useCallback((clientX: number) => {
    if (!progressRef.current || !audioRef.current || !duration) return
    const rect = progressRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.max(0, Math.min(1, x / rect.width))
    audioRef.current.currentTime = pct * duration
    setCurrentTime(pct * duration)
  }, [duration])

  const handleProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    isDragging.current = true
    seekToPosition(e.clientX)
  }, [seekToPosition])

  const handleProgressTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true
    seekToPosition(e.touches[0].clientX)
  }, [seekToPosition])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      seekToPosition(e.clientX)
    }
    const handleMouseUp = () => {
      isDragging.current = false
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleMouseMove as unknown as EventListener)
    window.addEventListener('touchend', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleMouseMove as unknown as EventListener)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [seekToPosition])

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }



  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setVolume(pct)
  }

  const playNext = () => {
    if (currentTrack < tracks.length - 1) setCurrentTrack(prev => prev + 1)
    else if (repeat) setCurrentTrack(0)
    else setIsPlaying(false)
  }

  const playPrev = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0
    } else if (currentTrack > 0) {
      setCurrentTrack(prev => prev - 1)
    } else {
      setCurrentTrack(tracks.length - 1)
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section id="music" className="relative py-20 md:py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(170deg, #F5EDE0 0%, #F0E5D2 30%, #EBDCC5 60%, #F2E8D8 100%)',
      }} />
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at 30% 30%, rgba(200, 164, 92, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(196, 139, 127, 0.06) 0%, transparent 50%)',
      }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div className="ornament mb-6">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>Мелодии души</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gold-gradient">Музыка</h2>
          <p className="font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#6B4C3B' }}>
            Стихи Юлии, обретшие мелодию в руках Юрия
          </p>
          {isPlaying && (
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full" style={{ background: 'rgba(200, 164, 92, 0.1)' }}>
              <div className="flex items-end gap-[2px] h-4">
                <div className="w-[2px] rounded-full eq-bar-1" style={{ background: '#C8A45C', height: 6 }} />
                <div className="w-[2px] rounded-full eq-bar-2" style={{ background: '#C8A45C', height: 10 }} />
                <div className="w-[2px] rounded-full eq-bar-3" style={{ background: '#C8A45C', height: 8 }} />
                <div className="w-[2px] rounded-full eq-bar-2" style={{ background: '#C48B7F', height: 12 }} />
                <div className="w-[2px] rounded-full eq-bar-1" style={{ background: '#C48B7F', height: 7 }} />
              </div>
              <span className="text-xs font-serif" style={{ color: '#A68B3E' }}>Сейчас играет</span>
            </div>
          )}
        </div>

        <audio ref={audioRef} preload="metadata" />

        {isLoading ? (
          <div className="text-center py-8">
            <p className="font-serif" style={{ color: '#8B7355' }}>Загрузка...</p>
          </div>
        ) : tracks.length === 0 ? (
          <div className="text-center py-12 card-light rounded-2xl p-8">
            <p className="font-serif text-lg mb-2" style={{ color: '#6B4C3B' }}>Песни появятся здесь совсем скоро</p>
            <p className="font-serif text-sm" style={{ color: '#8B7355' }}>Следите за обновлениями!</p>
          </div>
        ) : (
          <Card className="overflow-hidden rounded-2xl" style={{ background: 'white', border: '1px solid rgba(60,36,21,0.06)', boxShadow: '0 4px 30px rgba(60, 36, 21, 0.06), 0 1px 4px rgba(200,164,92,0.12)' }}>
            <CardContent className="p-0">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-5 md:gap-8 mb-6">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">
                    <div className="absolute inset-0 rounded-full" style={{
                      background: 'conic-gradient(from 0deg, #EDE6DD, #D4C8B8, #C8B8A0, #D4C8B8, #EDE6DD, #D4C8B8, #C8B8A0, #EDE6DD)',
                      animation: isPlaying ? 'spin-slow 4s linear infinite' : 'none',
                    }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C8A45C, #A68B3E)', boxShadow: '0 2px 8px rgba(200, 164, 92, 0.3)' }}>
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FAF7F2' }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl md:text-2xl font-bold truncate" style={{ color: '#3C2415' }}>
                      {track.title}
                    </h3>
                    <p className="font-serif text-base mt-1.5 font-medium" style={{ color: '#4A3020' }}>
                      Слова: Юлия Самойлова · Музыка: Юрий
                    </p>
                    <p className="font-serif text-sm mt-2 font-semibold" style={{ color: '#6B4C3B' }}>
                      {currentTrack + 1} из {tracks.length}
                    </p>
                  </div>
                  <div className="relative">
                    <button onClick={() => setShowVolume(!showVolume)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ color: volume > 0 ? '#6B4C3B' : '#B8A98A' }} aria-label="Громкость">
                      {volume === 0 ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                      ) : volume < 0.5 ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L7 9H5z"/></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                      )}
                    </button>
                    {showVolume && (
                      <div className="absolute top-full mt-2 right-0 bg-white rounded-xl p-3 shadow-lg" style={{ border: '1px solid rgba(60,36,21,0.08)', minWidth: '100px' }}>
                        <div className="w-20 h-3 rounded-full cursor-pointer relative" style={{ background: 'rgba(60,36,21,0.08)' }} onClick={handleVolumeClick}>
                          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${volume * 100}%`, background: 'linear-gradient(to right, #C8A45C, #C48B7F)' }} />
                          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ left: `${volume * 100}%`, marginLeft: '-6px', background: 'linear-gradient(135deg, #C8A45C, #A68B3E)', boxShadow: '0 1px 4px rgba(200, 164, 92, 0.3)' }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="progress-track mb-2" ref={progressRef} onMouseDown={handleProgressMouseDown} onTouchStart={handleProgressTouchStart}>
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between text-xs font-serif mb-6" style={{ color: '#8B7355' }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration) || track.duration}</span>
                </div>

                <div className="flex items-center justify-center gap-5 md:gap-6">
                  <button onClick={playPrev} className="transition-all hover:scale-110 active:scale-95" style={{ color: '#6B4C3B' }} aria-label="Предыдущий">
                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                  </button>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95" style={{
                    background: 'linear-gradient(135deg, #C8A45C, #A68B3E)',
                    boxShadow: isPlaying ? '0 4px 20px rgba(200, 164, 92, 0.45)' : '0 4px 16px rgba(200, 164, 92, 0.35)',
                    color: 'white',
                  }} aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}>
                    {isPlaying ? (
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    ) : (
                      <svg className="w-6 h-6 md:w-7 md:h-7 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                  <button onClick={playNext} className="transition-all hover:scale-110 active:scale-95" style={{ color: '#6B4C3B' }} aria-label="Следующий">
                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                  </button>
                </div>

                <div className="flex items-center justify-center mt-4">
                  <button onClick={() => setRepeat(!repeat)} className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-xs font-serif" style={{
                    color: repeat ? '#C8A45C' : '#B8A98A',
                    background: repeat ? 'rgba(200, 164, 92, 0.08)' : 'transparent',
                    border: `1px solid ${repeat ? 'rgba(200, 164, 92, 0.2)' : 'transparent'}`,
                  }} aria-label="Повтор">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
                    {repeat ? 'Повтор вкл' : 'Повтор выкл'}
                  </button>
                </div>
              </div>

              {tracks.length > 1 && (
                <button onClick={() => setShowList(!showList)} className="w-full py-3.5 font-serif text-sm transition-colors flex items-center justify-center gap-2" style={{
                  color: '#8B7355', borderTop: '1px solid rgba(60,36,21,0.06)',
                  background: showList ? 'rgba(200, 164, 92, 0.04)' : 'transparent',
                }}>
                  <svg className="w-4 h-4 transition-transform" style={{ transform: showList ? 'rotate(180deg)' : 'rotate(0)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {showList ? 'Скрыть список' : `Все песни (${tracks.length})`}
                </button>
              )}

              {showList && (
                <div className="max-h-72 overflow-y-auto" style={{ borderTop: '1px solid rgba(60,36,21,0.06)' }}>
                  {tracks.map((t, i) => (
                    <button key={t.id} onClick={() => { setCurrentTrack(i); setIsPlaying(true); }} className="w-full text-left px-6 py-3 flex items-center gap-3 transition-colors hover:bg-white/60" style={{
                      background: i === currentTrack ? 'rgba(200,164,92,0.08)' : 'transparent',
                      borderBottom: '1px solid rgba(60,36,21,0.03)',
                    }}>
                      <div className="w-6 text-center font-serif text-sm shrink-0" style={{ color: i === currentTrack ? '#C8A45C' : '#B8A98A' }}>
                        {i === currentTrack && isPlaying ? (
                          <div className="flex items-end justify-center gap-[2px] h-4">
                            <div className="w-[2px] rounded-full eq-bar-1" style={{ background: '#C8A45C', height: 6 }} />
                            <div className="w-[2px] rounded-full eq-bar-2" style={{ background: '#C8A45C', height: 10 }} />
                            <div className="w-[2px] rounded-full eq-bar-3" style={{ background: '#C8A45C', height: 8 }} />
                          </div>
                        ) : (
                          (i + 1).toString().padStart(2, '0')
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm truncate" style={{ color: i === currentTrack ? '#3C2415' : '#6B4C3B', fontWeight: i === currentTrack ? 600 : 400 }}>
                          {t.title}
                        </p>
                      </div>
                      <span className="font-serif text-xs shrink-0" style={{ color: '#B8A98A' }}>{t.duration}</span>
                      {i === currentTrack && (
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#C8A45C', boxShadow: '0 0 6px rgba(200, 164, 92, 0.4)' }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
