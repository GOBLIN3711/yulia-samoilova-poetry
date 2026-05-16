'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Review {
  name: string
  date: string
  message: string
}

const INITIAL_REVIEWS: Review[] = [
  {
    name: 'Анна М.',
    date: '2025-03-15',
    message: 'Чудесные стихи! Каждый раз нахожу в них что-то новое. Особенно люблю стихи о Петербурге — будто прогуливаюсь по родным улицам.',
  },
  {
    name: 'Дмитрий К.',
    date: '2025-02-28',
    message: 'Очень искренняя и светлая поэзия. Спасибо Юлии за такие тёплые слова о семье и любви.',
  },
  {
    name: 'Елена В.',
    date: '2025-01-10',
    message: 'Прекрасная лирика, которая касается сердца. Petersburg через ваши стихи — это особенный город.',
  },
]

export default function FeedbackForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !message.trim()) return

    setIsSubmitting(true)

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      })

      const newReview: Review = {
        name: name.trim(),
        date: new Date().toISOString().split('T')[0],
        message: message.trim(),
      }

      setReviews(prev => [newReview, ...prev])
      setName('')
      setEmail('')
      setMessage('')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 4000)
    } catch {
      // Silently fail — still add to local state
      const newReview: Review = {
        name: name.trim(),
        date: new Date().toISOString().split('T')[0],
        message: message.trim(),
      }
      setReviews(prev => [newReview, ...prev])
      setName('')
      setEmail('')
      setMessage('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <section id="feedback" className="py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="ornament mb-6">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>Обратная связь</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-gold-gradient">
            Отзывы и пожелания
          </h2>
          <p className="font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#6B4C3B' }}>
            Ваши слова — лучшая награда для поэта
          </p>
        </div>

        {/* Form Card */}
        <div className="card-light rounded-2xl p-6 md:p-8 lg:p-10 mb-12">
          {showSuccess && (
            <div className="mb-6 p-4 rounded-xl text-center font-serif" style={{ backgroundColor: 'rgba(200, 164, 92, 0.1)', color: '#A68B3E', border: '1px solid rgba(200, 164, 92, 0.2)' }}>
              Спасибо за ваш отзыв! ♥
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="feedback-name" className="block text-sm font-medium mb-2" style={{ color: '#6B4C3B', fontFamily: 'var(--font-serif)' }}>
                Ваше имя <span style={{ color: '#C8A45C' }}>*</span>
              </label>
              <Input
                id="feedback-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как вас зовут?"
                required
                className="input-light min-h-[44px] text-base"
                style={{ color: '#3C2415' }}
              />
            </div>

            <div>
              <label htmlFor="feedback-email" className="block text-sm font-medium mb-2" style={{ color: '#6B4C3B', fontFamily: 'var(--font-serif)' }}>
                Email <span style={{ color: '#8B7355' }}>(необязательно)</span>
              </label>
              <Input
                id="feedback-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-light min-h-[44px] text-base"
                style={{ color: '#3C2415' }}
              />
            </div>

            <div>
              <label htmlFor="feedback-message" className="block text-sm font-medium mb-2" style={{ color: '#6B4C3B', fontFamily: 'var(--font-serif)' }}>
                Ваш отзыв <span style={{ color: '#C8A45C' }}>*</span>
              </label>
              <Textarea
                id="feedback-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Поделитесь своими впечатлениями..."
                required
                rows={4}
                className="input-light text-base resize-none"
                style={{ color: '#3C2415', minHeight: '100px' }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="btn-gold w-full py-3 px-8 text-base font-serif tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ minHeight: '48px' }}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Отправка...
                </span>
              ) : (
                'Отправить отзыв'
              )}
            </button>
          </form>
        </div>

        {/* Existing Reviews */}
        <div className="space-y-6">
          <h3 className="font-display text-xl md:text-2xl text-center mb-8" style={{ color: '#3C2415' }}>
            Отзывы читателей
          </h3>
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <div key={`${review.date}-${i}`} className="card-light rounded-xl p-5 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-base font-semibold" style={{ color: '#3C2415' }}>
                    {review.name}
                  </span>
                  <span className="text-xs font-serif" style={{ color: '#8B7355' }}>
                    {formatDate(review.date)}
                  </span>
                </div>
                <p className="font-serif text-base leading-relaxed" style={{ color: '#6B4C3B' }}>
                  {review.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
