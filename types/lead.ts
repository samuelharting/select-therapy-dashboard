export type LeadStatus = 'New' | 'Contacted' | 'Booked' | 'Cancelled' | 'Archived'

export interface Lead {
  id: string
  created_at: string
  patient_name: string | null
  phone_number: string | null
  dob: string | null
  pain_reason: string | null
  insurance: string | null
  location: string | null
  scheduling_prefs: string | null
  status: LeadStatus | null
  notes: string | null
}

export interface LeadInsert {
  patient_name?: string | null
  phone_number?: string | null
  dob?: string | null
  pain_reason?: string | null
  insurance?: string | null
  location?: string | null
  scheduling_prefs?: string | null
  status?: LeadStatus | null
  notes?: string | null
}

export interface LeadUpdate {
  patient_name?: string | null
  phone_number?: string | null
  dob?: string | null
  pain_reason?: string | null
  insurance?: string | null
  location?: string | null
  scheduling_prefs?: string | null
  status?: LeadStatus | null
  notes?: string | null
}

