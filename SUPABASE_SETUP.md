# Supabase Setup Guide

## Creating the First Admin User

To create your first staff/admin user for the Select Therapy dashboard:

### Method 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Users** in the left sidebar
3. Click the **"Add user"** button (or **"Invite user"**)
4. Fill in the form:
   - **Email**: Enter the staff email address (e.g., `admin@selecttherapy.com`)
   - **Password**: Create a secure password
   - **Auto Confirm User**: Check this box to skip email confirmation
5. Click **"Create user"**

The user will now be able to log in to the dashboard at `/login` using these credentials.

### Method 2: SQL Editor (Alternative)

If you prefer using SQL:

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the following SQL (replace with your email and password):

```sql
-- Create a new user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@selecttherapy.com',  -- Change this to your email
  crypt('your_secure_password_here', gen_salt('bf')),  -- Change this to your password
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Create the user's identity
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  u.id,
  jsonb_build_object('sub', u.id::text, 'email', u.email),
  'email',
  NOW(),
  NOW(),
  NOW()
FROM auth.users u
WHERE u.email = 'admin@selecttherapy.com';  -- Change this to match your email
```

**Note**: Method 1 (Dashboard) is much simpler and recommended.

## Running the Migration

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **"New query"**
3. Copy and paste the entire contents of `supabase/migrations/001_create_leads_table.sql`
4. Click **"Run"** (or press Ctrl+Enter)
5. Verify the table was created by checking **Table Editor** > **leads**

## Verifying RLS Policies

After running the migration:

1. Go to **Authentication** > **Policies** (or **Table Editor** > **leads** > **Policies**)
2. You should see 4 policies:
   - "Allow service_role to insert leads"
   - "Allow authenticated users to select leads"
   - "Allow authenticated users to update leads"
   - "Allow authenticated users to delete leads"
   - "Allow authenticated users to insert leads"

If any are missing, re-run the migration SQL.

