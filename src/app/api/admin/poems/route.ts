import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, supabase, isSupabaseConfigured } from '@/lib/supabase'
import { promises as fs } from 'fs'
import path from 'path'
import poems from '@/data/poems.json'

// Auth verification
function verifyAuth(request: Request): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return false
  try {
    const token = authHeader.slice(7)
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    return decoded.auth === true && decoded.exp > Date.now()
  } catch {
    return false
  }
}

interface PoemRecord {
  id: number
  title: string
  text: string
  date: string
  category: string
  url: string
  order_index: number
}

// GET - list poems with pagination, search, and category filter
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || ''
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)

    // Try Supabase
    if (isSupabaseConfigured) {
      let query = supabaseAdmin
        .from('poems')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false, nullsFirst: false })

      if (category) {
        query = query.eq('category', category)
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,text.ilike.%${search}%`)
      }

      const from = (page - 1) * limit
      const to = from + limit - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (!error && data) {
        const poems = data.map((p) => ({
          id: p.id,
          title: p.title,
          text: p.text,
          url: p.url || '',
          date: p.date || '',
          category: p.category || 'Другие',
          order_index: p.order_index || 0,
        }))

        return NextResponse.json({
          poems,
          total: count || 0,
          page,
          limit,
          hasMore: (count || 0) > to + 1,
        })
      }
    }

    // Fallback: local JSON
    let filtered = [...poems] as PoemRecord[]

    if (category) {
      filtered = filtered.filter(p => (p.category || 'Другие') === category)
    }

    if (search) {
      const lowerSearch = search.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(lowerSearch) ||
        p.text.toLowerCase().includes(lowerSearch)
      )
    }

    filtered.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

    const start = (page - 1) * limit
    const end = start + limit
    const paginated = filtered.slice(start, end)

    return NextResponse.json({
      poems: paginated,
      total: filtered.length,
      page,
      limit,
      hasMore: end < filtered.length,
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка чтения' }, { status: 500 })
  }
}

// POST - create a new poem
export async function POST(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
  }

  try {
    const { title, text, date, category, url } = await request.json()

    if (!title || !text) {
      return NextResponse.json({ error: 'Название и текст обязательны' }, { status: 400 })
    }

    // Try Supabase
    if (isSupabaseConfigured) {
      // Get max order_index
      const { data: maxData } = await supabaseAdmin
        .from('poems')
        .select('order_index')
        .order('order_index', { ascending: false })
        .limit(1)

      const nextOrder = (maxData?.[0]?.order_index || 0) + 1

      const { data, error } = await supabaseAdmin
        .from('poems')
        .insert({
          title,
          text,
          date: date || null,
          category: category || 'Другие',
          url: url || null,
          order_index: nextOrder,
        })
        .select()
        .single()

      if (!error && data) {
        return NextResponse.json({ success: true, poem: data })
      }
    }

    // Fallback: add to local JSON
    const poemsPath = path.join(process.cwd(), 'src', 'data', 'poems.json')
    const currentPoems: PoemRecord[] = JSON.parse(await fs.readFile(poemsPath, 'utf-8'))

    const newPoem: PoemRecord = {
      id: currentPoems.length > 0 ? Math.max(...currentPoems.map(p => p.id)) + 1 : 0,
      title,
      text,
      date: date || new Date().toISOString().split('T')[0],
      category: category || 'Другие',
      url: url || '',
      order_index: currentPoems.length,
    }

    currentPoems.push(newPoem)
    await fs.writeFile(poemsPath, JSON.stringify(currentPoems, null, 2), 'utf-8')

    return NextResponse.json({ success: true, poem: newPoem })
  } catch {
    return NextResponse.json({ error: 'Ошибка создания стихотворения' }, { status: 500 })
  }
}

// PUT - update a poem
export async function PUT(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
  }

  try {
    const { id, title, text, category, date } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID не указан' }, { status: 400 })
    }

    // Try Supabase
    if (isSupabaseConfigured) {
      const updates: Record<string, string | null> = {}
      if (title) updates.title = title
      if (text) updates.text = text
      if (category) updates.category = category
      if (date !== undefined) updates.date = date || null

      const { error } = await supabaseAdmin
        .from('poems')
        .update(updates)
        .eq('id', id)

      if (!error) {
        return NextResponse.json({ success: true })
      }
    }

    // Fallback: update local JSON
    const poemsPath = path.join(process.cwd(), 'src', 'data', 'poems.json')
    const currentPoems: PoemRecord[] = JSON.parse(await fs.readFile(poemsPath, 'utf-8'))

    const poem = currentPoems.find(p => p.id === id)
    if (poem) {
      if (title) poem.title = title
      if (text) poem.text = text
      if (category) poem.category = category
      if (date) poem.date = date

      await fs.writeFile(poemsPath, JSON.stringify(currentPoems, null, 2), 'utf-8')
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Стихотворение не найдено' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Ошибка обновления' }, { status: 500 })
  }
}

// DELETE - delete a poem
export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0', 10)

    if (!id) {
      return NextResponse.json({ error: 'ID не указан' }, { status: 400 })
    }

    // Try Supabase
    if (isSupabaseConfigured) {
      const { error } = await supabaseAdmin
        .from('poems')
        .delete()
        .eq('id', id)

      if (!error) {
        return NextResponse.json({ success: true })
      }
    }

    // Fallback: delete from local JSON
    const poemsPath = path.join(process.cwd(), 'src', 'data', 'poems.json')
    const currentPoems: PoemRecord[] = JSON.parse(await fs.readFile(poemsPath, 'utf-8'))
    const filtered = currentPoems.filter(p => p.id !== id)

    if (filtered.length < currentPoems.length) {
      await fs.writeFile(poemsPath, JSON.stringify(filtered, null, 2), 'utf-8')
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Стихотворение не найдено' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Ошибка удаления' }, { status: 500 })
  }
}
