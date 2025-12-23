import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id } = params

    // Build update object with only provided fields
    const updateData: Record<string, string | null> = {}
    
    if (body.patient_name !== undefined) updateData.patient_name = body.patient_name ?? null
    if (body.phone_number !== undefined) updateData.phone_number = body.phone_number ?? null
    if (body.dob !== undefined) updateData.dob = body.dob ?? null
    if (body.pain_reason !== undefined) updateData.pain_reason = body.pain_reason ?? null
    if (body.insurance !== undefined) updateData.insurance = body.insurance ?? null
    if (body.location !== undefined) updateData.location = body.location ?? null
    if (body.scheduling_prefs !== undefined) updateData.scheduling_prefs = body.scheduling_prefs ?? null
    if (body.status !== undefined) updateData.status = body.status ?? null
    if (body.notes !== undefined) updateData.notes = body.notes ?? null

    // FIX: Cast the PAYLOAD to any, not the chain.
    // This works because 'any' is valid even if the method expects 'never'.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await supabase
      .from('leads')
      .update(updateData as any)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update lead', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
