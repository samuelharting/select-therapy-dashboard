'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Lead, LeadStatus, LeadUpdate } from '@/types/lead'

interface LeadDetailsModalProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadDetailsModal({
  lead,
  open,
  onOpenChange,
}: LeadDetailsModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<LeadUpdate>({
    patient_name: null,
    phone_number: null,
    dob: null,
    pain_reason: null,
    insurance: null,
    location: null,
    scheduling_prefs: null,
    status: 'New',
    notes: null,
  })

  useEffect(() => {
    if (lead) {
      setFormData({
        patient_name: lead.patient_name,
        phone_number: lead.phone_number,
        dob: lead.dob,
        pain_reason: lead.pain_reason,
        insurance: lead.insurance,
        location: lead.location,
        scheduling_prefs: lead.scheduling_prefs,
        status: (lead.status as LeadStatus) || 'New',
        notes: lead.notes,
      })
    }
  }, [lead])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!lead) return

    setLoading(true)
    try {
      const response = await fetch(`/api/leads/${lead.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to update lead')
      }

      // Refresh the page to update the list
      router.refresh()
      onOpenChange(false)
    } catch (error) {
      console.error('Error updating lead:', error)
      alert(error instanceof Error ? error.message : 'Failed to update lead. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
          <DialogDescription>
            Edit patient lead information and status
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status Dropdown - Key Field */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status || 'New'}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as LeadStatus })
              }
            >
              <SelectTrigger>
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

          {/* Pain Reason - Key Field */}
          <div className="space-y-2">
            <Label htmlFor="pain_reason">Pain Reason</Label>
            <Input
              id="pain_reason"
              value={formData.pain_reason || ''}
              onChange={(e) =>
                setFormData({ ...formData, pain_reason: e.target.value })
              }
              placeholder="e.g., Lower back pain, knee injury"
            />
          </div>

          {/* Scheduling Preferences - Key Field */}
          <div className="space-y-2">
            <Label htmlFor="scheduling_prefs">Scheduling Preferences / Date/Time Preference</Label>
            <Input
              id="scheduling_prefs"
              value={formData.scheduling_prefs || ''}
              onChange={(e) =>
                setFormData({ ...formData, scheduling_prefs: e.target.value })
              }
              placeholder="e.g., Friday mornings, After 2pm"
            />
          </div>

          {/* Notes - Key Field */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
              placeholder="Internal notes and comments..."
            />
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="patient_name">Patient Name</Label>
              <Input
                id="patient_name"
                value={formData.patient_name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, patient_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                value={formData.phone_number || ''}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                value={formData.dob || ''}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={formData.location || ''}
                onValueChange={(value) =>
                  setFormData({ ...formData, location: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baxter">Baxter</SelectItem>
                  <SelectItem value="Crosslake">Crosslake</SelectItem>
                  <SelectItem value="Pine River">Pine River</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance">Insurance</Label>
            <Input
              id="insurance"
              value={formData.insurance || ''}
              onChange={(e) =>
                setFormData({ ...formData, insurance: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

