# SDC Portal

A comprehensive **Student Disciplinary Committee (SDC) Portal** for managing student discipline, cases, punishments, and administrative workflows in educational institutions.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan?logo=tailwindcss)

---

## ✨ Features

### 📋 Case Management

- Create, track, and manage disciplinary cases
- Case status workflow (pending, in-progress, resolved)
- Detailed case history and audit logs

### 👥 Student Records

- Comprehensive student profiles
- Disciplinary history tracking
- Student search and filtering

### ⚖️ Punishment Tracker

- Record and manage punishments
- Punishment recommendations
- Status tracking and metrics dashboard

### 🔔 Notifications & Alerts

- Real-time notification system
- Custom alert creation
- Upcoming hearings calendar

### 👤 User Management

- Role-based access control
- User profiles and settings
- Session logging and audit trails

### 📊 Dashboard & Analytics

- Overview metrics and statistics
- Recent activity feed
- Visual data representations with charts

---

## 🛠️ Tech Stack

| Category     | Technology                |
| ------------ | ------------------------- |
| Framework    | Next.js 16.1 (App Router) |
| Language     | TypeScript 5              |
| UI Library   | React 19                  |
| Styling      | TailwindCSS 3.4           |
| Components   | Radix UI Primitives       |
| Backend/Auth | Supabase                  |
| Forms        | React Hook Form + Zod     |
| Charts       | Recharts                  |
| Animations   | Framer Motion             |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aul-developers/SDC-portal.git
   cd SDC-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 📁 Project Structure

```
SDC-portal/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard routes
│   │   ├── alerts/         # Alert management
│   │   ├── approvals/      # Approval workflows
│   │   ├── audit-logs/     # Audit logging
│   │   ├── cases/          # Case management
│   │   ├── notifications/  # Notifications
│   │   ├── offences/       # Offence records
│   │   ├── profile/        # User profile
│   │   ├── punishments/    # Punishment tracker
│   │   ├── session-logs/   # Session logs
│   │   ├── settings/       # Settings
│   │   ├── students/       # Student records
│   │   └── users/          # User management
│   ├── auth/               # Authentication pages
│   └── context/            # React Context providers
├── actions/                # Server actions
├── components/             # Reusable UI components
├── lib/                    # Utility functions
├── service/                # API service layer
├── styles/                 # Global styles
└── utils/                  # Helper utilities
```

---

## 🔧 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## 👥 Contributors

- **Nedu2022** - Chinedu Nwabuokei
- **Adeleye-Adeola** - Adeleye Adeola
- **KeshiEmmanuel** - Keshi C. Emmanuel
- **Skol-Chie** - Skol

---

## 📄 License

This project is private and proprietary to AUL Developers.

---

<p align="center">
  Made with ❤️ by <strong>AUL Developers</strong>
</p>
