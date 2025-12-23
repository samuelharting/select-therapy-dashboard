-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  patient_name TEXT,
  phone_number TEXT,
  dob TEXT,
  pain_reason TEXT,
  insurance TEXT,
  location TEXT,
  scheduling_prefs TEXT,
  status TEXT DEFAULT 'New',
  notes TEXT
);

-- Create index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow service_role (API/webhook) to INSERT rows
-- Note: service_role bypasses RLS by default, but we create this policy for clarity
CREATE POLICY "Allow service_role to insert leads"
  ON leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy 2: Allow authenticated users (Staff) to SELECT, UPDATE, and DELETE rows
CREATE POLICY "Allow authenticated users to select leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- Policy 3: Allow authenticated users to INSERT (for manual lead creation)
CREATE POLICY "Allow authenticated users to insert leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
