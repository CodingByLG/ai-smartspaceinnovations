import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Activity, MessageSquare, Zap, Clock, TrendingUp, Bot } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const stats = [
    { label: 'Atlas Status', value: 'Online', icon: Bot, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
    { label: 'Messages Today', value: '24', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'Active Sessions', value: '3', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { label: 'Uptime', value: '99.9%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Heartbeat', value: 'Every 30m', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
    { label: 'Cron Jobs', value: '1 Active', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 glass-dark">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <span className="text-sm font-bold text-blue-400">S</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">Mission Control</h1>
              <p className="text-xs text-muted-foreground">SmartSpace Innovations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted-foreground">Atlas Online</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white">Good morning, Luis</h2>
          <p className="text-muted-foreground mt-1">Atlas is running and monitoring your systems.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`glass rounded-2xl p-4 border ${stat.bg}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-5 h-5 ${stat.color} opacity-70`} />
              </div>
            </div>
          ))}
        </div>

        {/* Atlas Activity Feed */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" />
            Atlas Activity Feed
          </h3>
          <div className="space-y-3">
            {[
              { time: '9:47 AM', msg: 'Heartbeat check completed. All systems nominal.', type: 'success' },
              { time: '9:17 AM', msg: 'Processed 3 incoming Telegram messages.', type: 'info' },
              { time: '8:47 AM', msg: 'Heartbeat check completed. All systems nominal.', type: 'success' },
              { time: '8:30 AM', msg: 'Atlas initialized. IDENTITY.md loaded.', type: 'info' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-muted-foreground text-xs w-16 shrink-0 mt-0.5">{item.time}</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  item.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                }`} />
                <span className="text-white/70">{item.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
