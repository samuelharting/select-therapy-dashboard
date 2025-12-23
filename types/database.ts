export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          created_at: string
          patient_name: string | null
          phone_number: string | null
          dob: string | null
          pain_reason: string | null
          insurance: string | null
          location: string | null
          scheduling_prefs: string | null
          status: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          patient_name?: string | null
          phone_number?: string | null
          dob?: string | null
          pain_reason?: string | null
          insurance?: string | null
          location?: string | null
          scheduling_prefs?: string | null
          status?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          patient_name?: string | null
          phone_number?: string | null
          dob?: string | null
          pain_reason?: string | null
          insurance?: string | null
          location?: string | null
          scheduling_prefs?: string | null
          status?: string | null
          notes?: string | null
        }
      }
    }
  }
}

