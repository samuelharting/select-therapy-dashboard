'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Lead, LeadStatus } from '@/types/lead'
import { LeadDetailsModal } from '@/components/lead-details-modal'
import { useRouter } from 'next/navigation'

interface LeadsBoardViewProps {
  leads: Lead[]
}

const statusColumns: LeadStatus[] = ['New', 'Contacted', 'Booked', 'Cancelled']

export function LeadsBoardView({ leads }: LeadsBoardViewProps) {
  const router = useRouter()
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsModalOpen(true)
  }

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      router.refresh()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status. Please try again.')
    }
  }

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter((lead) => lead.status === status)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusColumns.map((status) => {
          const statusLeads = getLeadsByStatus(status)
          return (
            <div key={status} className="flex flex-col">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-slate-700">
                    {status} ({statusLeads.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {statusLeads.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-4">
                      No leads
                    </p>
                  ) : (
                    statusLeads.map((lead) => (
                      <Card
                        key={lead.id}
                        className="p-3 cursor-pointer hover:bg-slate-50 transition-colors"
                        onClick={() => handleCardClick(lead)}
                      >
                        <div className="space-y-2">
                          <div>
                            <h4 className="font-medium text-sm">
                              {lead.patient_name || 'Unnamed'}
                            </h4>
                          </div>
                          {lead.pain_reason && (
                            <p className="text-xs text-slate-600 line-clamp-2">
                              {lead.pain_reason}
                            </p>
                          )}
                          {lead.scheduling_prefs && (
                            <p className="text-xs text-slate-500">
                              📅 {lead.scheduling_prefs}
                            </p>
                          )}
                          <div className="pt-2 border-t">
                            <Select
                              value={lead.status || 'New'}
                              onValueChange={(value) =>
                                handleStatusChange(lead.id, value as LeadStatus)
                              }
                              onClick={(e) => e.stopPropagation()}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="New">New</SelectItem>
                                <SelectItem value="Contacted">Contacted</SelectItem>
                                <SelectItem value="Booked">Booked</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                <SelectItem value="Archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
      <LeadDetailsModal
        lead={selectedLead}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  )
}

