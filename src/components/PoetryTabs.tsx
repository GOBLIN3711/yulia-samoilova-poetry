'use client'

import { useState, useEffect, useCallback } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface CategoryInfo {
  label: string
  count: number
}

interface PoemEntry {
  title: string
  text: string
  date: string
  category: string
}

interface PoemsResponse {
  poems: PoemEntry[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

const CATEGORY_IDS: Record<string, string> = {
  'Духовные': 'spiritual',
  'Семейные': 'family',
  'Про природу': 'nature',
  'Про любовь': 'love',
  'Про войну и память': 'war',
  'Про Петербург': 'petersburg',
  'Жизненные': 'life',
  'Другие': 'other',
}

const SPB_PHOTO = '/spb/spb01.jpg'

function categoryToId(label: string): string {
  return CATEGORY_IDS[label] || label.toLowerCase().replace(/\s+/g, '-')
}

export default function PoetryTabs() {
  const [categories, setCategories] = useState<CategoryInfo[]>([])
  const [totalPoems, setTotalPoems] = useState(0)
  const [activeTab, setActiveTab] = useState<string>('')
  const [poemsMap, setPoemsMap] = useState<Record<string, PoemEntry[]>>({})
  const [hasMoreMap, setHasMoreMap] = useState<Record<string, boolean>>({})
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})
  const [expandedPoem, setExpandedPoem] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    fetch('/api/poems')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories || [])
        setTotalPoems(data.total || 0)
        if (data.categories && data.categories.length > 0) {
          const firstId = categoryToId(data.categories[0].label)
          setActiveTab(firstId)
        }
        setInitialLoading(false)
      })
      .catch(() => setInitialLoading(false))
  }, [])

  const fetchPoems = useCallback(async (categoryLabel: string, page: number = 1) => {
    const catId = categoryToId(categoryLabel)
    if (loadingMap[catId]) return

    setLoadingMap(prev => ({ ...prev, [catId]: true }))

    try {
      const res = await fetch(`/api/poems?category=${encodeURIComponent(categoryLabel)}&page=${page}&limit=20`)
      const data: PoemsResponse = await res.json()

      setPoemsMap(prev => ({
        ...prev,
        [catId]: page === 1 ? data.poems : [...(prev[catId] || []), ...data.poems],
      }))
      setHasMoreMap(prev => ({ ...prev, [catId]: data.hasMore }))
    } catch {
      // Silently fail
    } finally {
      setLoadingMap(prev => ({ ...prev, [catId]: false }))
    }
  }, [loadingMap])

  useEffect(() => {
    if (!activeTab) return
    const catLabel = categories.find(c => categoryToId(c.label) === activeTab)?.label
    if (catLabel && !poemsMap[activeTab]) {
      fetchPoems(catLabel, 1)
    }
  }, [activeTab, categories, fetchPoems, poemsMap])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setExpandedPoem(null)
  }

  const handleLoadMore = () => {
    const catLabel = categories.find(c => categoryToId(c.label) === activeTab)?.label
    if (!catLabel) return
    const currentCount = poemsMap[activeTab]?.length || 0
    const nextPage = Math.floor(currentCount / 20) + 1
    fetchPoems(catLabel, nextPage)
  }

  const togglePoem = (poemKey: string) => {
    setExpandedPoem(prev => (prev === poemKey ? null : poemKey))
  }

  const getLines = (text: string): string[] => text.split('\n')

  if (initialLoading) {
    return (
      <section id="poetry" className="py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="ornament mb-6">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>Творчество</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-gold-gradient">
            Стихи
          </h2>
          <div className="mt-12 animate-pulse">
            <div className="h-8 w-48 rounded mx-auto mb-4" style={{ backgroundColor: '#EDE6DD' }} />
            <div className="h-4 w-64 rounded mx-auto" style={{ backgroundColor: '#EDE6DD' }} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="poetry" className="py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content — poems */}
          <div className="flex-1 min-w-0">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="ornament mb-6">
                <span className="text-sm tracking-[0.3em] uppercase" style={{ color: '#8B7355' }}>Творчество</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-gold-gradient">
                Стихи
              </h2>
              <p className="font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#6B4C3B' }}>
                Лирика о том, что трогает сердце — от тихой природы до великой любви
              </p>
              <p className="text-sm mt-3" style={{ color: '#8B7355' }}>
                Всего {totalPoems} стихотворений
              </p>
            </div>

            {/* Mobile photo */}
            <div className="lg:hidden flex justify-center mb-8">
              <div
                className="relative rounded-xl overflow-hidden w-56"
                style={{ boxShadow: '0 4px 16px rgba(60, 36, 21, 0.1), 0 2px 6px rgba(200, 164, 92, 0.12)' }}
              >
                <Image
                  src={SPB_PHOTO}
                  alt="Санкт-Петербург"
                  width={224}
                  height={300}
                  className="w-full h-auto object-cover"
                  style={{ filter: 'sepia(0.12) saturate(0.9)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(60, 36, 21, 0.12), transparent 50%)' }} />
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-1 md:gap-2 mb-8 md:mb-10 w-full bg-transparent border-none p-0">
                {categories.map((category) => (
                  <TabsTrigger
                    key={categoryToId(category.label)}
                    value={categoryToId(category.label)}
                    className="text-sm md:text-base px-3 py-2 md:px-4 md:py-2.5 whitespace-nowrap"
                  >
                    {category.label} ({category.count})
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => {
                const catId = categoryToId(category.label)
                const poems = poemsMap[catId] || []
                const hasMore = hasMoreMap[catId]
                const isLoading = loadingMap[catId]

                return (
                  <TabsContent key={catId} value={catId}>
                    {poems.length === 0 && isLoading ? (
                      <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="card-light rounded-xl p-6 md:p-8 animate-pulse">
                            <div className="h-7 w-48 rounded mb-4" style={{ backgroundColor: '#EDE6DD' }} />
                            <div className="space-y-2">
                              <div className="h-5 w-full rounded" style={{ backgroundColor: '#EDE6DD' }} />
                              <div className="h-5 w-4/5 rounded" style={{ backgroundColor: '#EDE6DD' }} />
                              <div className="h-5 w-3/4 rounded" style={{ backgroundColor: '#EDE6DD' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : poems.length === 0 ? (
                      <p className="text-center font-serif py-8" style={{ color: '#8B7355' }}>
                        Стихотворения загружаются...
                      </p>
                    ) : (
                      <>
                        <div className="grid gap-6">
                          {poems.map((poem, index) => {
                            const poemKey = `${catId}-${index}`
                            const isExpanded = expandedPoem === poemKey
                            const allLines = getLines(poem.text)
                            const hasMoreLines = allLines.length > 4
                            const displayLines = isExpanded ? allLines : allLines.slice(0, 4)

                            return (
                              <Card
                                key={poemKey}
                                className="card-light rounded-xl overflow-hidden transition-all duration-500 cursor-pointer group"
                                onClick={() => hasMoreLines && togglePoem(poemKey)}
                              >
                                <CardContent className="p-6 md:p-8">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <h3 className="font-serif text-xl md:text-2xl mb-4 group-hover:text-gold-dark transition-colors" style={{ color: '#A68B3E' }}>
                                        {poem.title}
                                      </h3>
                                      <div className="poem-text">
                                        {displayLines.map((line, lineIndex) => (
                                          <p key={lineIndex} className={line.trim() === '' ? 'h-4' : ''}>
                                            {line}
                                          </p>
                                        ))}
                                      </div>
                                      {hasMoreLines && (
                                        <button className="mt-4 font-serif text-sm transition-colors underline underline-offset-4" style={{ color: 'rgba(200, 164, 92, 0.7)', textDecorationColor: 'rgba(200, 164, 92, 0.3)' }}>
                                          {isExpanded ? 'Свернуть' : 'Читать далее →'}
                                        </button>
                                      )}
                                    </div>
                                    {hasMoreLines && (
                                      <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all" style={{ border: '1px solid rgba(200, 164, 92, 0.2)', color: 'rgba(200, 164, 92, 0.5)' }}>
                                        <span className="text-xs">
                                          {isExpanded ? '−' : '+'}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })}
                        </div>

                        {hasMore && (
                          <div className="text-center mt-8">
                            <button
                              onClick={handleLoadMore}
                              disabled={isLoading}
                              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-serif text-sm transition-all duration-300 disabled:opacity-50"
                              style={{ border: '1px solid rgba(200, 164, 92, 0.3)', color: 'rgba(200, 164, 92, 0.8)' }}
                            >
                              {isLoading ? (
                                <>
                                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                  </svg>
                                  Загрузка...
                                </>
                              ) : (
                                'Загрузить ещё'
                              )}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>

          {/* Right sidebar — single photo */}
          <div className="hidden lg:block w-64 xl:w-72 shrink-0">
            <div className="sticky top-24">
              <div
                className="relative rounded-xl overflow-hidden"
                style={{ boxShadow: '0 4px 20px rgba(60, 36, 21, 0.12), 0 2px 6px rgba(200, 164, 92, 0.15)' }}
              >
                <Image
                  src={SPB_PHOTO}
                  alt="Санкт-Петербург"
                  width={288}
                  height={380}
                  className="w-full h-auto object-cover"
                  style={{ filter: 'sepia(0.12) saturate(0.9)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(60, 36, 21, 0.15), transparent 50%)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
