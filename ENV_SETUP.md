# Environment Variables Setup

## Create .env.local File

Since `.env.local` is a protected file, you need to create it manually:

1. **Create the file** in your project root directory (`select-therapy-dashboard`)
2. **Name it exactly**: `.env.local` (with the dot at the beginning)
3. **Copy and paste** the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mrpxceiugwjqjhozlxxr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_ElEapA-TkQP70baHv1zeEA_XALIjSRT
SUPABASE_SERVICE_ROLE_KEY=sb_secret_AcJoEDKCgHrAvwhP1CyfGQ_JH8YPXgb
SELECT_THERAPY_WEBHOOK_SECRET=ClinicPass2025!
```

4. **Save the file**

## Verification Checklist

✅ **API Webhook Route** (`app/api/leads/route.ts`):
- Validates `x-select-therapy-key` header against `SELECT_THERAPY_WEBHOOK_SECRET`
- Uses `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS for Make.com webhooks
- Correctly handles authentication and data insertion

✅ **Frontend Client** (`lib/supabase/client.ts`):
- Uses `NEXT_PUBLIC_SUPABASE_URL`
- Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`

✅ **Server Client** (`lib/supabase/server.ts`):
- Uses `NEXT_PUBLIC_SUPABASE_URL`
- Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Properly handles cookies for authentication

✅ **Middleware** (`middleware.ts` & `lib/supabase/middleware.ts`):
- Protects `/dashboard` routes
- Redirects unauthenticated users to `/login`
- Allows access to `/login` without authentication

## After Creating .env.local

Run these commands to restart the development server:

```bash
# Stop the current server (Ctrl+C if running)

# Restart the development server
npm run dev
```

The environment variables will be loaded automatically when Next.js starts.

