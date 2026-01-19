# SDC Frontend (Student Disciplinary Committee)

A comprehensive student disciplinary management portal built for Anchor University.

## Overview

The SDC Frontend is a Next.js application designed to manage student disciplinary cases, punishments, offences, and user roles (Super Admin, Board Member, Viewer). It features a robust dashboard, case tracking, and secure authentication via Supabase.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS, Shadcn UI
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **State Management:** React Context, Server Actions
- **Icons:** Lucide React

## Project Structure

The project follows a modular architecture:

- `actions/`: Server actions for data mutations and fetching.
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components organized by feature.
  - `auth/`: Authentication forms and logic.
  - `common/`: General components (Clock, UserAvatar).
  - `dashboard/`: Dashboard-specific widgets.
  - `layout/`: App layout components (Sidebar, TopNav).
  - `providers/`: Context providers (Theme, Toast).
  - `ui/`: Core UI primitives (Buttons, Inputs).
- `lib/` & `utils/`: Helper functions and configurations.

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd SDC-FRONTEND
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file with your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Features

- **Dashboard:** Real-time metrics and activity feed.
- **Case Management:** Create, update, and track disciplinary cases.
- **Punishment Tracker:** Log and monitor student punishments.
- **Offence Directory:** Manage standardized offences and penalties.
- **Role-Based Access Control:** Secure access for Admins, Members, and Viewers.
