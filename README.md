# ClientFlow

**ClientFlow** is a portfolio-quality full-stack SaaS CRM and client management platform for freelancers, agencies, consultants, and small service businesses. It combines sales, client relationships, project delivery, task management, invoicing, notifications, and analytics in one modern workspace.

![ClientFlow Dashboard](./public/clientflow-preview.svg)

## Why this project stands out

ClientFlow is intentionally structured like a real SaaS product rather than a static dashboard template. Authenticated users get isolated CRM data, PostgreSQL-backed CRUD workflows, connected relational records, a draggable sales pipeline, invoice PDF export, responsive analytics, automatic deadline notifications, polished loading/empty/error states, and a production-style landing/auth experience.

## Features

- Premium responsive SaaS landing page and authentication experience
- Credentials authentication with Auth.js / NextAuth
- Protected dashboard routes and per-user data isolation
- Client CRUD, search, filters, and detailed client profiles
- Kanban lead pipeline with drag-and-drop stage changes
- Won lead → client conversion workflow
- Project management with clients, budgets, progress, statuses, and deadlines
- Task management with project, priority, status, deadline filters and quick completion
- Professional itemized invoices with tax, discounts, totals, status tracking, print view, and PDF download
- Dashboard KPIs backed by real database aggregates
- Revenue, client-growth, project-status, funnel, conversion, and invoice analytics
- Global search across clients, leads, projects, tasks, and invoices
- Notification inbox with unread badge and mark-read controls
- Automatic overdue invoice, upcoming project deadline, and due-task notifications
- Profile and business settings used on invoices
- Light / dark appearance toggle
- Professional seed data and recruiter-friendly demo account

## Tech Stack

- **Next.js 16** — App Router, React Server Components, route handlers, server actions
- **React 19 + TypeScript**
- **Tailwind CSS 4**
- **PostgreSQL**
- **Prisma ORM 7** with `@prisma/adapter-pg`
- **Auth.js / NextAuth 5** credentials authentication
- **Recharts**
- **Lucide React**
- **jsPDF**
- **Zod**

## Demo credentials

After seeding the database:

```text
Email: hamzahoon02@gmail.com
Password: hamza1122
```

## Installation

### 1. Install Node.js

Use Node.js 20 or newer. Node.js 22 LTS is a good choice.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Generate a strong Auth.js secret:

```bash
npx auth secret
```

Then make sure `.env` contains:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clientflow"
AUTH_SECRET="your-generated-secret"
AUTH_TRUST_HOST="true"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Database Setup

### Option A — Local PostgreSQL with Docker

If Docker Desktop is installed:

```bash
docker compose up -d
```

This starts PostgreSQL on port `5432` with the credentials already shown in `.env.example`.

### Option B — Existing / hosted PostgreSQL

Use any PostgreSQL provider such as Neon, Supabase, Railway, Prisma Postgres, or another managed provider. Replace `DATABASE_URL` with its PostgreSQL connection string.

## Prisma migration

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Seed demo data

```bash
npm run db:seed
```

The seed creates realistic clients, leads, projects, tasks, invoices, notifications, activity, and the demo account shown above.

## Running locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Type / source check

```bash
npm run check
```

The build script also regenerates Prisma Client automatically:

```bash
npm run build
```

## Production deployment on Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Create or connect a hosted PostgreSQL database.
4. Add `DATABASE_URL`, `AUTH_SECRET`, and `AUTH_TRUST_HOST=true` in Vercel → Project Settings → Environment Variables.
5. Set `NEXT_PUBLIC_APP_URL` to your production URL if you use it in custom integrations.
6. Run your production migration against the hosted database:

```bash
npx prisma migrate deploy
```

7. Optionally seed the production/demo database:

```bash
npm run db:seed
```

8. Deploy. Vercel will run `npm run build`.

> For production teams, run `prisma migrate deploy` in CI/CD rather than running development migrations in production.

## Project Structure

```text
ClientFlow/
├── app/
│   ├── api/                 # Auth + CRUD + search/settings endpoints
│   ├── dashboard/           # Protected CRM application routes
│   ├── login/               # Authentication
│   ├── register/
│   └── page.tsx             # Public SaaS landing page
├── components/
│   └── dashboard/           # Reusable dashboard UI + managers
├── generated/               # Generated by `prisma generate` (gitignored)
├── lib/                     # Prisma, auth helpers, activity and notification logic
├── prisma/
│   ├── schema.prisma        # Relational PostgreSQL schema
│   └── seed.ts              # Professional demo dataset
├── public/
├── types/
├── .env.example
├── prisma.config.ts
└── package.json
```

## Data security model

Every CRM-owned table stores a `userId`, and API/database queries scope records to the authenticated user's ID before read/write/delete operations. This prevents one logged-in user from reading or mutating another user's ClientFlow workspace through normal application routes.

## Demo-only / intentionally incomplete features

Two items are intentionally not connected to external paid infrastructure in this portfolio release:

1. **Forgot-password email delivery** — the reset UI is included, but sending real reset links requires an email provider such as Resend or Postmark plus token storage/expiry logic.
2. **SaaS subscription payments** — Starter, Professional, and Agency pricing are marketing/demo plans only, matching the project brief. Stripe billing is a logical future improvement.

All primary CRM data workflows—authentication, database records, client/lead/project/task/invoice relationships, CRUD operations, search, dashboard data, analytics, notification reads, and invoice PDF generation—are implemented as working application features.

## Future Improvements

- OAuth providers (Google / GitHub)
- Password-reset tokens + transactional email
- Stripe subscriptions and account-level plans
- Multi-user organizations, invitations, and roles
- File attachments and object storage
- Email invoice delivery
- Recurring invoices and payment links
- Webhook / audit-log integrations
- Calendar sync
- CSV import/export
- Automated tests and CI pipeline

## Author

Built as a full-stack SaaS portfolio project designed to demonstrate modern product UI, database architecture, authentication, relational CRUD, analytics, and production-minded Next.js engineering.

If you use ClientFlow in your portfolio, replace this section with your name, GitHub profile, LinkedIn profile, and live demo URL.
