# Complete Setup Guide for Select Therapy Dashboard

Follow these steps in order to get your dashboard up and running.

## Step 1: Create a Supabase Project

1. **Go to Supabase**: Visit [https://supabase.com](https://supabase.com)
2. **Sign up or Log in**: Create a free account if you don't have one
3. **Create New Project**:
   - Click the **"New Project"** button
   - Fill in the details:
     - **Name**: `select-therapy-dashboard` (or any name you prefer)
     - **Database Password**: Create a strong password (save this somewhere safe!)
     - **Region**: Choose the closest region to you
     - **Pricing Plan**: Free tier is fine for now
   - Click **"Create new project"**
4. **Wait for Setup**: This takes 1-2 minutes. Wait until you see "Project is ready"

## Step 2: Run the Database Migration

1. **Open SQL Editor**:
   - In your Supabase project dashboard, click **"SQL Editor"** in the left sidebar
   - Click **"New query"** button

2. **Copy the Migration**:
   - Open the file `supabase/migrations/001_create_leads_table.sql` in your code editor
   - Copy the **entire contents** of the file

3. **Paste and Run**:
   - Paste the SQL into the Supabase SQL Editor
   - Click the **"Run"** button (or press `Ctrl+Enter` / `Cmd+Enter`)
   - You should see a success message: "Success. No rows returned"

4. **Verify the Table**:
   - Click **"Table Editor"** in the left sidebar
   - You should see a table called `leads` with all the columns

## Step 3: Enable Email/Password Authentication

1. **Go to Authentication Settings**:
   - Click **"Authentication"** in the left sidebar
   - Click **"Providers"** (or it might be under "Settings")

2. **Enable Email Provider**:
   - Find **"Email"** in the list of providers
   - Make sure it's **enabled** (toggle should be ON)
   - **Disable Email Confirmations** (for easier testing):
     - Scroll down to **"Email Auth"** settings
     - Find **"Confirm email"** or **"Enable email confirmations"**
     - Turn this **OFF** (uncheck it) - This allows users to log in immediately without email confirmation
   - Click **"Save"** if there's a save button

## Step 4: Get Your Supabase Credentials

1. **Go to Project Settings**:
   - Click the **gear icon** (⚙️) in the bottom left of the sidebar
   - Click **"API"** in the settings menu

2. **Copy Your Credentials**:
   You'll need these three values:
   
   - **Project URL**: 
     - Look for **"Project URL"** or **"URL"**
     - Copy this value (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   
   - **anon public key**:
     - Look for **"Project API keys"**
     - Find the key labeled **"anon"** or **"public"**
     - Click the eye icon to reveal it, then copy it
     - This is a long string starting with `eyJ...`
   
   - **service_role key**:
     - In the same **"Project API keys"** section
     - Find the key labeled **"service_role"** or **"service_role secret"**
     - Click the eye icon to reveal it, then copy it
     - ⚠️ **WARNING**: Keep this secret! Never commit it to GitHub
     - This is also a long string starting with `eyJ...`

## Step 5: Create Environment Variables File

1. **Create `.env.local` file**:
   - In your project root folder (`select-therapy-dashboard`), create a new file named `.env.local`
   - **Important**: Make sure it's named exactly `.env.local` (with the dot at the start)

2. **Add Your Credentials**:
   Open `.env.local` and paste this template, then fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SELECT_THERAPY_WEBHOOK_SECRET=your_random_secret_key_here
```

   **Example** (replace with your actual values):
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTIzNDU2NywiZXhwIjoxOTYwODEwNTY3fQ.example
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQ1MjM0NTY3LCJleHAiOjE5NjA4MTA1Njd9.example
SELECT_THERAPY_WEBHOOK_SECRET=my_super_secret_key_12345
```

   **For the webhook secret**: Create any random string (e.g., `select_therapy_2024_secure_key`). This is what Make.com will use to authenticate.

3. **Save the file**: Make sure to save `.env.local`

## Step 6: Create Your First Staff User

1. **Go to Authentication**:
   - In Supabase dashboard, click **"Authentication"** in the left sidebar
   - Click **"Users"** (should be the default tab)

2. **Add User**:
   - Click the **"Add user"** button (or **"Invite user"**)
   - Fill in:
     - **Email**: `admin@selecttherapy.com` (or your preferred email)
     - **Password**: Create a secure password
     - **Auto Confirm User**: ✅ **Check this box** (so you can log in immediately)
   - Click **"Create user"** (or **"Send invitation"**)

3. **Verify User Created**:
   - You should see the new user in the users list
   - The email should be confirmed (green checkmark)

## Step 7: Test the Application

1. **Start the Development Server**:
   - Open your terminal in the project folder
   - Run:
   ```bash
   npm run dev
   ```
   - Wait for it to say: `✓ Ready in X seconds`
   - You should see: `- Local: http://localhost:3000`

2. **Open the Application**:
   - Open your browser
   - Go to: `http://localhost:3000`
   - You should be automatically redirected to `/login`

3. **Log In**:
   - Enter the email you created in Step 6
   - Enter the password you created
   - Click **"Sign In"**
   - You should be redirected to `/dashboard`

4. **Verify Dashboard Works**:
   - You should see "Select Therapy Patient Portal" header
   - You should see "Patient Leads" heading
   - The table/board should be empty (no leads yet - that's normal!)

## Step 8: Test the Webhook (Optional)

To test that Make.com can send leads:

1. **Get Your Webhook URL**:
   - For local testing: `http://localhost:3000/api/leads`
   - For production: `https://your-domain.com/api/leads`

2. **Test with curl** (in terminal):
   ```bash
   curl -X POST http://localhost:3000/api/leads \
     -H "Content-Type: application/json" \
     -H "x-select-therapy-key: your_secret_key_here" \
     -d '{
       "patient_name": "Test Patient",
       "phone_number": "555-1234",
       "pain_reason": "Lower back pain",
       "insurance": "Blue Cross",
       "location": "Baxter",
       "scheduling_prefs": "Friday mornings"
     }'
   ```

3. **Check Dashboard**:
   - Refresh your dashboard
   - You should see the new lead appear!

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file has the correct keys
- Make sure there are no extra spaces or quotes
- Restart the dev server after changing `.env.local`

### "Unauthorized" when logging in
- Make sure Email/Password auth is enabled in Supabase
- Check that the user exists in Supabase Authentication > Users
- Make sure "Auto Confirm User" was checked when creating the user

### "Table doesn't exist" error
- Make sure you ran the migration SQL in Step 2
- Check Table Editor in Supabase to verify the `leads` table exists

### Webhook returns 401
- Check that the `x-select-therapy-key` header matches `SELECT_THERAPY_WEBHOOK_SECRET` in `.env.local`
- Make sure there are no extra spaces in the secret key

### Can't see leads in dashboard
- Make sure you're logged in
- Check the browser console for errors (F12)
- Verify the leads table has data in Supabase Table Editor

## Next Steps

Once everything is working:
1. **Deploy to Vercel**: Follow Vercel's deployment guide
2. **Update Webhook URL**: Point Make.com to your production URL
3. **Add More Users**: Create additional staff accounts in Supabase

## Need Help?

If you get stuck:
- Check the browser console (F12) for error messages
- Check the terminal where `npm run dev` is running for server errors
- Verify all environment variables are set correctly
- Make sure Supabase project is active and not paused

