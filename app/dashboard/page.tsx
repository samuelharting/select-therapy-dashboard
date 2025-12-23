import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardClient } from '@/components/dashboard-client'
import { Lead } from '@/types/lead'

async function getLeads(): Promise<Lead[]> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect if not logged in
  if (!user) {
    redirect('/login')
  }

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }

  return (data as Lead[]) || []
}

export default async function DashboardPage() {
  const leads = await getLeads()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-900">Patient Leads</h2>
      </div>
      <DashboardClient initialLeads={leads} />
    </div>
  )
}
