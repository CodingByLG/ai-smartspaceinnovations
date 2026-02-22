import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'user'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'user'
        }
        Update: {
          full_name?: string | null
          role?: 'admin' | 'user'
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          channel: 'telegram' | 'whatsapp'
          from: string
          content: string
          processed: boolean
          created_at: string
        }
        Insert: {
          channel: 'telegram' | 'whatsapp'
          from: string
          content: string
          processed?: boolean
        }
        Update: {
          processed?: boolean
        }
      }
    }
  }
}
