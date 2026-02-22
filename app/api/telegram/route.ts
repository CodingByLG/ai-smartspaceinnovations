import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message = body?.message

    if (!message) {
      return NextResponse.json({ ok: true })
    }

    const from = message?.from?.username || message?.from?.id?.toString() || 'unknown'
    const content = message?.text || '[non-text message]'
    const chatId = message?.chat?.id

    // Store message in Supabase
    await supabase.from('messages').insert({
      channel: 'telegram',
      from,
      content,
      processed: false,
    })

    console.log(`[Telegram] Message from ${from}: ${content}`)

    return NextResponse.json({ ok: true, chatId })
  } catch (error) {
    console.error('[Telegram webhook error]', error)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Telegram webhook active', timestamp: new Date().toISOString() })
}
