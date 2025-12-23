# Quick Start Checklist

## ✅ Pre-Installation Check

All required Shadcn/UI components are already installed. You don't need to run any component installation commands.

**Installed Components:**
- ✅ badge
- ✅ button
- ✅ card
- ✅ dialog
- ✅ input
- ✅ label
- ✅ select
- ✅ table
- ✅ tabs
- ✅ textarea

## 🚀 Setup Steps (In Order)

### 1. Create Supabase Project
- [ ] Go to [supabase.com](https://supabase.com) and sign up/login
- [ ] Create a new project (free tier is fine)
- [ ] Wait for project to finish initializing

### 2. Run Database Migration
- [ ] Open Supabase Dashboard > SQL Editor
- [ ] Copy contents of `supabase/migrations/001_create_leads_table.sql`
- [ ] Paste and click "Run"
- [ ] Verify table exists in Table Editor

### 3. Enable Email Auth
- [ ] Go to Authentication > Providers
- [ ] Ensure Email is enabled
- [ ] Disable email confirmations (for easier testing)

### 4. Get API Keys
- [ ] Go to Settings (gear icon) > API
- [ ] Copy Project URL
- [ ] Copy `anon` public key
- [ ] Copy `service_role` key (keep secret!)

### 5. Create .env.local
- [ ] Create `.env.local` file in project root
- [ ] Add all 4 environment variables (see SETUP_GUIDE.md for template)
- [ ] Save the file

### 6. Create Staff User
- [ ] Go to Authentication > Users
- [ ] Click "Add user"
- [ ] Enter email and password
- [ ] ✅ Check "Auto Confirm User"
- [ ] Click "Create user"

### 7. Start the App
- [ ] Run: `npm run dev`
- [ ] Open: http://localhost:3000
- [ ] Log in with your staff credentials
- [ ] Verify dashboard loads

## 🎯 You're Done!

If you see the dashboard with "Patient Leads" heading, everything is working!

## 📝 Important Files Created

- `supabase/migrations/001_create_leads_table.sql` - Database schema
- `app/api/leads/route.ts` - Webhook endpoint
- `app/dashboard/page.tsx` - Main dashboard
- `components/lead-details-modal.tsx` - Lead editor
- `SETUP_GUIDE.md` - Detailed setup instructions
- `SUPABASE_SETUP.md` - User creation guide

## 🔗 Next Steps

1. Test the webhook endpoint (see SETUP_GUIDE.md Step 8)
2. Deploy to Vercel when ready
3. Configure Make.com to use your webhook URL

