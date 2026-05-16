import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { supabaseAdmin, supabase, isSupabaseConfigured } from '@/lib/supabase'

// Session token check
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

const MUSIC_DIR = path.join(process.cwd(), 'public', 'music')
const TRACKS_FILE = path.join(process.cwd(), 'src', 'data', 'tracks.json')

interface Track {
  id: number
  title: string
  duration: string
  file: string
  date: string
}

// GET - list all tracks
export async function GET(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
  }

  try {
    // Try Supabase first
    if (isSupabaseConfigured) {
      const { data, error } = await supabaseAdmin
        .from('tracks')
        .select('*')
        .order('created_at', { ascending: true })

      if (!error && data) {
        const tracks = data.map((t) => ({
          id: t.id,
          title: t.title,
          duration: t.duration || '0:00',
          file: t.file_url || '',
          storage_path: t.storage_path || '',
          date: t.created_at?.split('T')[0] || '',
        }))
        return NextResponse.json({ tracks })
      }
    }

    // Fallback to local files
    await fs.mkdir(MUSIC_DIR, { recursive: true })
    let tracks: Track[] = []
    try {
      const data = await fs.readFile(TRACKS_FILE, 'utf-8')
      tracks = JSON.parse(data)
    } catch {
      tracks = []
    }

    const files = await fs.readdir(MUSIC_DIR)
    const mp3Files = files.filter(f => f.endsWith('.mp3'))

    for (const file of mp3Files) {
      if (!tracks.find(t => t.file === `/music/${file}`)) {
        tracks.push({
          id: Date.now() + Math.random(),
          title: file.replace('.mp3', '').replace(/_/g, ' '),
          duration: '0:00',
          file: `/music/${file}`,
          date: new Date().toISOString().split('T')[0],
        })
      }
    }

    tracks = tracks.filter(t => {
      const filename = t.file.replace('/music/', '')
      return mp3Files.includes(filename)
    })

    await fs.writeFile(TRACKS_FILE, JSON.stringify(tracks, null, 2), 'utf-8')
    return NextResponse.json({ tracks })
  } catch {
    return NextResponse.json({ error: 'Ошибка чтения' }, { status: 500 })
  }
}

// POST - upload a new track
export async function POST(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const title = formData.get('title') as string | null

    if (!file) {
      return NextResponse.json({ error: 'Файл не выбран' }, { status: 400 })
    }

    // Try Supabase Storage first
    if (isSupabaseConfigured) {
      const safeName = file.name.replace(/[^a-zA-Zа-яА-Я0-9._-]/g, '_')
      const storagePath = `music/${Date.now()}_${safeName}`
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { error: uploadError } = await supabaseAdmin.storage
        .from('music')
        .upload(storagePath, buffer, {
          contentType: file.type || 'audio/mpeg',
          upsert: false,
        })

      if (uploadError) {
        console.error('Supabase upload error:', uploadError.message)
        // Fall through to local
      } else {
        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
          .from('music')
          .getPublicUrl(storagePath)

        const fileUrl = urlData.publicUrl

        // Save to tracks table
        const { data: trackData, error: dbError } = await supabaseAdmin
          .from('tracks')
          .insert({
            title: title || safeName.replace('.mp3', '').replace(/_/g, ' '),
            duration: '0:00',
            file_url: fileUrl,
            storage_path: storagePath,
          })
          .select()
          .single()

        if (!dbError && trackData) {
          return NextResponse.json({
            success: true,
            track: {
              id: trackData.id,
              title: trackData.title,
              duration: trackData.duration,
              file: trackData.file_url,
              storage_path: trackData.storage_path,
              date: trackData.created_at?.split('T')[0] || '',
            },
          })
        }
      }
    }

    // Fallback: local file system
    const safeName = file.name.replace(/[^a-zA-Zа-яА-Я0-9._-]/g, '_')
    const filePath = path.join(MUSIC_DIR, safeName)
    const bytes = await file.arrayBuffer()
    await fs.writeFile(filePath, Buffer.from(bytes))

    let tracks: Track[] = []
    try {
      const data = await fs.readFile(TRACKS_FILE, 'utf-8')
      tracks = JSON.parse(data)
    } catch { }

    const newTrack: Track = {
      id: Date.now(),
      title: title || safeName.replace('.mp3', '').replace(/_/g, ' '),
      duration: '0:00',
      file: `/music/${safeName}`,
      date: new Date().toISOString().split('T')[0],
    }

    tracks.push(newTrack)
    await fs.writeFile(TRACKS_FILE, JSON.stringify(tracks, null, 2), 'utf-8')

    return NextResponse.json({ success: true, track: newTrack })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Ошибка загрузки файла' }, { status: 500 })
  }
}

// DELETE - remove a track
export async function DELETE(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { file, id, storage_path } = body

    if (isSupabaseConfigured) {
      // Try Supabase first
      if (storage_path) {
        await supabaseAdmin.storage
          .from('music')
          .remove([storage_path])
      }

      if (id) {
        await supabaseAdmin.from('tracks').delete().eq('id', id)
        return NextResponse.json({ success: true })
      }
    }

    // Fallback: local file
    const filePath = file
    if (!filePath) {
      return NextResponse.json({ error: 'Файл не указан' }, { status: 400 })
    }

    const filename = filePath.replace('/music/', '')
    const fullFilePath = path.join(MUSIC_DIR, filename)

    try {
      await fs.unlink(fullFilePath)
    } catch { /* file might not exist */ }

    let tracks: Track[] = []
    try {
      const data = await fs.readFile(TRACKS_FILE, 'utf-8')
      tracks = JSON.parse(data)
    } catch { }

    tracks = tracks.filter(t => t.file !== filePath)
    await fs.writeFile(TRACKS_FILE, JSON.stringify(tracks, null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Ошибка удаления' }, { status: 500 })
  }
}

// PUT - rename a track
export async function PUT(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
  }

  try {
    const { file, title, id } = await request.json()
    if (!title) {
      return NextResponse.json({ error: 'Название не указано' }, { status: 400 })
    }

    // Try Supabase first
    if (isSupabaseConfigured && id) {
      const { error } = await supabaseAdmin
        .from('tracks')
        .update({ title })
        .eq('id', id)

      if (!error) {
        return NextResponse.json({ success: true })
      }
    }

    // Fallback: local JSON
    if (!file) {
      return NextResponse.json({ error: 'Файл не указан' }, { status: 400 })
    }

    let tracks: Track[] = []
    try {
      const data = await fs.readFile(TRACKS_FILE, 'utf-8')
      tracks = JSON.parse(data)
    } catch { }

    const track = tracks.find(t => t.file === file)
    if (track) {
      track.title = title
      await fs.writeFile(TRACKS_FILE, JSON.stringify(tracks, null, 2), 'utf-8')
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Ошибка обновления' }, { status: 500 })
  }
}
