'use client'

import { useState } from 'react'
import { ViewSwitcher } from '@/components/view-switcher'
import { LeadsListView } from '@/components/leads-list-view'
import { LeadsBoardView } from '@/components/leads-board-view'
import { Lead } from '@/types/lead'

interface DashboardClientProps {
  initialLeads: Lead[]
}

export function DashboardClient({ initialLeads }: DashboardClientProps) {
  const [view, setView] = useState<'list' | 'board'>('list')

  return (
    <div className="space-y-6">
      <ViewSwitcher value={view} onValueChange={(v) => setView(v as 'list' | 'board')} />
      {view === 'list' ? (
        <LeadsListView leads={initialLeads} />
      ) : (
        <LeadsBoardView leads={initialLeads} />
      )}
    </div>
  )
}

