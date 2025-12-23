import { Badge } from '@/components/ui/badge'
import { LeadStatus } from '@/types/lead'

interface StatusBadgeProps {
  status: LeadStatus | null
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) {
    return <Badge variant="outline">Unknown</Badge>
  }

  const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
    New: { label: 'New', className: 'bg-blue-100 text-blue-800 border-blue-200' },
    Contacted: { label: 'Contacted', className: 'bg-gray-100 text-gray-800 border-gray-200' },
    Booked: { label: 'Booked', className: 'bg-green-100 text-green-800 border-green-200' },
    Cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 border-red-200' },
    Archived: { label: 'Archived', className: 'bg-slate-100 text-slate-800 border-slate-200' },
  }

  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

