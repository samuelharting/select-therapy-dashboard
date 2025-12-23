'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Lead, LeadStatus } from '@/types/lead'
import { StatusBadge } from '@/components/status-badge'
import { LeadDetailsModal } from '@/components/lead-details-modal'
import { format } from 'date-fns'

interface LeadsListViewProps {
  leads: Lead[]
}

export function LeadsListView({ leads }: LeadsListViewProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date Received</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pain Reason</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Insurance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-slate-500 py-8">
                  No leads found
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  onClick={() => handleRowClick(lead)}
                  className="cursor-pointer hover:bg-slate-50"
                >
                  <TableCell>
                    {lead.created_at
                      ? format(new Date(lead.created_at), 'MMM d, yyyy')
                      : '-'}
                  </TableCell>
                  <TableCell className="font-medium">
                    {lead.patient_name || '-'}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={lead.status as LeadStatus | null} />
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {lead.pain_reason || '-'}
                  </TableCell>
                  <TableCell>{lead.phone_number || '-'}</TableCell>
                  <TableCell>{lead.location || '-'}</TableCell>
                  <TableCell>{lead.insurance || '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <LeadDetailsModal
        lead={selectedLead}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  )
}
