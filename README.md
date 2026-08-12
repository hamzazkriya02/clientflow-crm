# 🚀 ClientFlow 

A modern, full-stack **CRM & Client Management Platform** built for freelancers, agencies, developers, and service-based businesses.

ClientFlow HQ helps manage the complete client journey — from capturing leads and converting them into clients to managing projects, tasks, invoices, notifications, and business analytics — all from one centralized workspace.

---

## 🌐 Live Demo

**Live Application:**  
https://clientflowhq.vercel.app

**GitHub Repository:**  
https://github.com/hamzazkriya02/clientflow-crm

---

## ✨ Features

### 📊 Dashboard

- Business overview
- Revenue statistics
- Sales pipeline statistics
- Client overview
- Project statistics
- Task overview
- Recent activities
- Quick access to CRM modules

### 👥 Client Management

- Add new clients
- View client profiles
- Search clients
- Filter client records
- Store company information
- Store email and phone details
- Store country and address
- Client status management
- Delete client records
- Connect clients with projects and invoices

### 🎯 Lead Management

Kanban-style sales pipeline with stages:

- New
- Contacted
- Qualified
- Proposal
- Negotiation
- Won
- Lost

Additional functionality:

- Create leads
- Delete leads
- Drag & drop leads between stages
- Track estimated deal value
- Track lead source
- Set follow-up dates
- Add lead notes
- Convert Won leads directly into clients
- Calculate total pipeline value

### 📁 Project Management

- Create projects
- Assign projects to clients
- Internal projects
- Project budgets
- Start dates
- Deadlines
- Project descriptions
- Project status management
- Progress tracking
- Search projects
- Edit projects
- Delete projects
- Deadline indicators

Project statuses include:

- Planning
- In Progress
- Review
- Completed
- On Hold

### ✅ Task Management

- Create tasks
- Project-linked tasks
- General tasks
- Task descriptions
- Due dates
- Priority levels
- Status management
- Search tasks
- Filter by project
- Filter by status
- Filter by priority
- Mark tasks completed
- Delete tasks
- Overdue task tracking

Priority levels:

- Low
- Medium
- High
- Urgent

### 🧾 Invoice Management

- Create professional invoices
- Assign invoices to clients
- Multiple invoice line items
- Quantity management
- Unit pricing
- Automatic subtotal calculation
- Tax calculation
- Discount support
- Total calculation
- Due dates
- Invoice notes
- Invoice status management
- Print invoices
- Download invoices as PDF
- Business details on invoices

Invoice statuses:

- Draft
- Sent
- Paid
- Overdue
- Cancelled

### 📈 Analytics

Business analytics dashboard including:

- Paid revenue
- Pipeline value
- Lead conversion rate
- Project completion rate
- Revenue trends
- New client trends
- Invoice status overview
- Sales funnel visualization
- Business performance statistics

### 🔔 Notifications

- Activity notifications
- Unread notification counter
- Notification badge
- Mark individual notifications as read
- Mark all notifications as read
- Links to related CRM records
- Dark-mode optimized notification UI

### ⚙️ Settings

#### Profile

- Update full name
- Update email
- Update phone
- Profile image URL
- Instant UI updates after saving

#### Business

- Business name
- Business email
- Business phone
- Business website
- Business address
- Business logo
- Invoice business information

#### Appearance

- Light Mode
- Dark Mode
- Persistent theme preference

---

## 🌙 Dark Mode

ClientFlow HQ includes a fully designed dark interface.

The dark theme covers:

- Dashboard
- Navigation
- Search
- Clients
- Leads
- Projects
- Tasks
- Invoices
- Analytics
- Notifications
- Settings

Theme preference is stored locally in the browser and persists between sessions.

---

## 📱 Responsive Design

ClientFlow HQ is fully responsive and tested across:

- Desktop
- Laptop
- Tablet
- Mobile devices

The application includes responsive navigation, cards, tables, forms, modals, and dashboard layouts.

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- Next.js Route Handlers
- Prisma ORM

### Database

- PostgreSQL
- Neon

### Authentication

- Auth.js / NextAuth

### Deployment

- Vercel

### Development Tools

- Git
- GitHub
- npm
- VS Code

---

## 🔄 CRM Workflow

```text
Lead
  ↓
Sales Pipeline
  ↓
Won Lead
  ↓
Convert to Client
  ↓
Client
  ↓
Project
  ↓
Tasks
  ↓
Invoice
  ↓
Payment
  ↓
Revenue & Analytics
```

---

## 📂 Project Structure

```text
ClientFlow/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── login/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── dashboard/
│
├── lib/
│   ├── activity.ts
│   ├── prisma.ts
│   └── utils.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── generated/
├── public/
│
├── auth.ts
├── prisma.config.ts
├── package.json
├── .gitignore
└── README.md
```

---

## 💻 Local Development

### 1. Clone Repository

```bash
git clone https://github.com/hamzazkriya02/clientflow-crm.git
```

### 2. Open Project

```bash
cd clientflow-crm
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_postgresql_connection_string"
AUTH_SECRET="your_auth_secret"
AUTH_TRUST_HOST="true"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> ⚠️ Never commit your real `.env` file, database password, or authentication secrets to GitHub.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Apply Database Migrations

```bash
npx prisma migrate deploy
```

### 7. Run Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Start the production application:

```bash
npm start
```

---

## 🔐 Environment Variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL / Neon database connection |
| `AUTH_SECRET` | Authentication signing secret |
| `AUTH_TRUST_HOST` | Enables trusted deployment host |
| `NEXT_PUBLIC_APP_URL` | Application base URL |

Production application URL:

```env
NEXT_PUBLIC_APP_URL="https://clientflowhq.vercel.app"
```

---

## 📸 Screenshots

### Dashboard

_Add ClientFlow dashboard screenshot here._

### Lead Pipeline

_Add Kanban lead pipeline screenshot here._

### Client Management

_Add client management screenshot here._

### Projects

_Add project management screenshot here._

### Tasks

_Add task management screenshot here._

### Invoices

_Add invoice screenshot here._

### Analytics

_Add analytics dashboard screenshot here._

### Dark Mode

_Add dark mode screenshot here._

---

## 🔒 Security

ClientFlow HQ includes:

- Authentication-protected dashboard
- User-scoped CRM records
- Server-side database operations
- Environment-based secrets
- `.env` excluded from Git
- PostgreSQL production database
- Secure Vercel environment configuration

Sensitive information such as database credentials and authentication secrets should never be committed to the repository.

---

## 🚀 Deployment

The production application is deployed using **Vercel** with a **Neon PostgreSQL** database.

Production URL:

https://clientflowhq.vercel.app

GitHub pushes to the production branch can be used to deploy future updates.

---

## 🗺️ Future Improvements

Potential future additions:

- Team workspaces
- Multiple team members
- Role-based access control
- Email invoice delivery
- File attachments
- Recurring invoices
- Online payment integration
- Calendar integration
- Advanced reporting
- Data export
- Custom sales pipelines
- Automated client reminders
- Email notifications
- Activity exports

---

## 👨‍💻 Author

### Muhammad Hamza

**Full-Stack Developer**

GitHub:  
https://github.com/hamzazkriya02

Live Project:  
https://clientflowhq.vercel.app

---

## ⭐ Support

If you find ClientFlow HQ useful or interesting, consider giving the repository a **star ⭐**.

---

## 📄 License

This project was created for portfolio, learning, demonstration, and development purposes.

---

**Built with Next.js, TypeScript, Prisma, PostgreSQL and Vercel.**
