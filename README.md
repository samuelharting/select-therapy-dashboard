# Select Therapy Patient Portal

A clean, professional CRM dashboard for Select Therapy clinic to manage patient leads from an AI Voice Agent.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Icons:** Lucide React
- **Hosting:** Vercel (ready for deployment)

## Features

- 🔐 **Authentication:** Email/Password login for staff
- 📊 **Dual Views:** Switch between List View (spreadsheet-style) and Board View (Kanban)
- 📝 **Lead Management:** Create, view, edit, and update lead status
- 🔔 **Webhook API:** Secure endpoint to receive leads from Make.com
- 🎨 **Clean UI:** Medical, professional design with status badges

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your Supabase project:

   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the migration file: `supabase/migrations/001_create_leads_table.sql`
   - Enable Email/Password authentication in Supabase Dashboard > Authentication > Providers

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SELECT_THERAPY_WEBHOOK_SECRET=your_secret_key_here
```

   You can find these values in your Supabase project settings:
   - Project URL: Settings > API > Project URL
   - Anon Key: Settings > API > Project API keys > anon public
   - Service Role Key: Settings > API > Project API keys > service_role (keep this secret!)

4. Create a staff user in Supabase:

   - Go to Authentication > Users in your Supabase dashboard
   - Click "Add user" and create an email/password account

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

   - You'll be redirected to `/login`
   - Sign in with the staff account you created

## Webhook Setup (Make.com)

To receive leads from your AI Voice Agent via Make.com:

1. Use the endpoint: `https://your-domain.com/api/leads`
2. Method: `POST`
3. Headers:
   - `Content-Type: application/json`
   - `x-select-therapy-key: your_secret_key_here` (must match `SELECT_THERAPY_WEBHOOK_SECRET`)
4. Body (JSON):
```json
{
  "patient_name": "John Doe",
  "phone_number": "555-1234",
  "dob": "01/15/1980",
  "pain_reason": "Lower back pain",
  "insurance": "Blue Cross",
  "location": "Baxter",
  "scheduling_prefs": "Friday mornings",
  "status": "New"
}
```

All fields are optional except they must be strings or null.

## Database Schema

The `leads` table includes:
- `id` (UUID, primary key)
- `created_at` (timestamp)
- `patient_name` (text, nullable)
- `phone_number` (text, nullable)
- `dob` (text, nullable)
- `pain_reason` (text, nullable)
- `insurance` (text, nullable)
- `location` (text, nullable) - Options: Baxter, Crosslake, Pine River
- `scheduling_prefs` (text, nullable)
- `status` (text, nullable) - Default: 'New'. Options: New, Contacted, Booked, Cancelled, Archived
- `notes` (text, nullable)

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/logout/route.ts
│   │   └── leads/route.ts (webhook endpoint)
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── ui/ (Shadcn components)
│   ├── dashboard-client.tsx
│   ├── lead-details-modal.tsx
│   ├── leads-board-view.tsx
│   ├── leads-list-view.tsx
│   ├── logout-button.tsx
│   ├── status-badge.tsx
│   └── view-switcher.tsx
├── lib/
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
├── types/
│   ├── database.ts
│   └── lead.ts
└── supabase/
    └── migrations/
        └── 001_create_leads_table.sql
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

The app is optimized for Vercel deployment with Next.js 14 App Router.

## License

Private - Select Therapy
