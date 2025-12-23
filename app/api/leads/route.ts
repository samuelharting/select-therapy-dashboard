import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '@/types/database'

interface WebhookRequestBody {
  patient_name?: string
  phone_number?: string
  dob?: string | number
  pain_reason?: string
  insurance?: string
  location?: string
  scheduling_prefs?: string
  status?: string
  notes?: string
}

export async function POST(request: NextRequest) {
  try {
    // Validate secret key header FIRST (before parsing body)
    const secretKey = request.headers.get('x-select-therapy-key')
    const expectedKey = process.env.SELECT_THERAPY_WEBHOOK_SECRET

    if (!expectedKey) {
      console.error('Webhook secret key not configured in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error: Webhook secret not set' },
        { status: 500 }
      )
    }

    if (!secretKey || secretKey.trim() !== expectedKey.trim()) {
      console.error('Webhook authentication failed:', {
        provided: secretKey ? 'present' : 'missing',
        expectedLength: expectedKey.length,
      })
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing x-select-therapy-key header' },
        { status: 401 }
      )
    }

    // Parse request body with robust error handling
    let body: WebhookRequestBody | null = null
    try {
      const text = await request.text()
      
      // Check if body is empty
      if (!text || text.trim().length === 0) {
        return NextResponse.json(
          { 
            error: 'Invalid request: Request body is empty',
            details: 'Expected JSON body with at least patient_name and phone_number'
          },
          { status: 400 }
        )
      }

      // Try to parse JSON
      const parsed = JSON.parse(text)
      
      // Validate it's an object
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        return NextResponse.json(
          { 
            error: 'Invalid JSON: Expected an object',
            details: 'Request body must be a JSON object, not an array or primitive value'
          },
          { status: 400 }
        )
      }

      body = parsed as WebhookRequestBody
    } catch (error) {
      console.error('Failed to parse JSON body:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error'
      return NextResponse.json(
        { 
          error: 'Invalid JSON in request body',
          details: errorMessage,
          hint: 'Ensure the body is valid JSON and Content-Type header is application/json'
        },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!body.patient_name || typeof body.patient_name !== 'string' || body.patient_name.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'Missing required field: patient_name',
          details: 'patient_name must be a non-empty string'
        },
        { status: 400 }
      )
    }

    if (!body.phone_number || typeof body.phone_number !== 'string' || body.phone_number.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'Missing required field: phone_number',
          details: 'phone_number must be a non-empty string'
        },
        { status: 400 }
      )
    }

    // Verify environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase configuration missing')
      return NextResponse.json(
        { error: 'Server configuration error: Supabase credentials not set' },
        { status: 500 }
      )
    }

    // Create Supabase client with service role key for admin operations (bypasses RLS)
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Insert lead into database - only required fields are needed, all others are optional
    const { data, error } = await supabase
      .from('leads')
      .insert({
        patient_name: String(body.patient_name).trim(),
        phone_number: String(body.phone_number).trim(),
        // All optional fields - will be null if not provided
        dob: body.dob ? String(body.dob).trim() : null,
        pain_reason: body.pain_reason ? String(body.pain_reason).trim() : null,
        insurance: body.insurance ? String(body.insurance).trim() : null,
        location: body.location ? String(body.location).trim() : null,
        scheduling_prefs: body.scheduling_prefs ? String(body.scheduling_prefs).trim() : null,
        status: body.status ? String(body.status).trim() : 'New',
        notes: body.notes ? String(body.notes).trim() : null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to create lead in database',
          details: error.message,
          code: error.code || 'UNKNOWN'
        },
        { status: 500 }
      )
    }

    console.log('Lead created successfully:', data.id)
    return NextResponse.json(
      { 
        success: true, 
        lead_id: data.id,
        message: 'Lead created successfully'
      },
      { status: 200 }
    )
  } catch (error) {
    // Catch any unexpected errors
    console.error('Unexpected API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}
