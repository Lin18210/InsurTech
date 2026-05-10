# 🛡️ InsurTech — Full-Stack Insurance Management Platform

A modern, full-stack insurance management web application built with **React** and **Node.js/Express**, powered by **Supabase** as the backend database. InsurTech enables customers to browse insurance products, purchase policies, file claims, and track their coverage — all from a clean, responsive UI with dark mode and multi-language support.

---

## ✨ Features

### 👤 Customer Portal
- **Authentication** — Secure sign-up and login via Supabase Auth
- **Insurance Products** — Browse and compare available insurance plans
- **Premium Calculator** — Interactive tool to estimate insurance premiums
- **Checkout Flow** — Step-by-step policy purchase experience
- **Customer Dashboard** — View active policies, transactions, and financial summaries with charts
- **Claims Center** — Submit and track insurance claims with supporting documents
- **User Profile** — Manage personal account information

### 🔐 Admin Panel
- **Admin Dashboard** — Platform-wide analytics and overview
- **Claims Management** — Review, approve, or reject submitted claims with admin notes
- **Policy Manager** — Create and manage insurance policies

### 🌐 General
- **Multi-language Support** — Internationalization via `LanguageContext`
- **Dark / Light Mode** — System-aware theme toggle
- **Responsive Design** — Mobile-friendly layout across all pages
- **Contact Form** — Email integration via Nodemailer
- **PDF Export** — Generate policy/report PDFs using `jsPDF` + `jsPDF-AutoTable`
- **Excel Export** — Export data to `.xlsx` using the `xlsx` library
- **Data Visualizations** — Recharts-powered charts in dashboards

---

## 🗂️ Project Structure

```
InsurTech/
├── Frontend/                  # React + Vite application
│   └── src/
│       ├── components/        # Reusable UI components (Navbar, Footer, PremiumCalculator, etc.)
│       ├── context/           # Global state (AuthContext, ThemeContext, LanguageContext)
│       ├── pages/
│       │   ├── Auth/          # Login & Register pages
│       │   ├── Admin/         # Admin Dashboard, Claims Dashboard, Policy Manager
│       │   ├── Checkout/      # Multi-step checkout flow
│       │   ├── Home.jsx
│       │   ├── Products.jsx
│       │   ├── ClaimsCenter.jsx
│       │   ├── Dashboard.jsx
│       │   ├── AboutUs.jsx
│       │   ├── Contact.jsx
│       │   └── UserProfile.jsx
│       ├── services/          # API service layer
│       ├── lib/               # Supabase client & utility libs
│       └── utils/             # Helper functions
│
└── Backend/                   # Node.js + Express REST API
    ├── controllers/           # Business logic
    │   ├── authController.js
    │   ├── claimsController.js
    │   ├── insuranceController.js
    │   ├── financeController.js
    │   └── emailController.js
    ├── routes/                # API route definitions
    ├── config/                # Supabase configuration
    ├── utils/                 # Backend helpers
    └── server.js              # Express app entry point
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **PDF Generation** | jsPDF + jsPDF-AutoTable |
| **Excel Export** | xlsx |
| **Date Utilities** | date-fns |
| **Backend** | Node.js + Express 5 |
| **Database & Auth** | Supabase (PostgreSQL) |
| **Email** | Nodemailer (Gmail SMTP) |
| **Dev Server** | Nodemon |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- A [Supabase](https://supabase.com) project (free tier works)
- Gmail account with an **App Password** for email (if using email features)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/InsurTech.git
cd InsurTech
```

---

### 2. Set up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Fill in your values:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Server
PORT=5000

# Email (Nodemailer / Gmail SMTP)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Start the backend server:

```bash
npm start
# or for development with hot reload:
npx nodemon server.js
```

The API will be available at `http://localhost:5000`.

---

### 3. Set up the Frontend

```bash
cd ../Frontend
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

Fill in your values:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend API
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/...` | Authentication (via Supabase) |
| `GET` | `/api/insurance/products` | Fetch all insurance products |
| `GET` | `/api/insurance/...` | Insurance management |
| `POST` | `/api/claims` | Submit a new claim |
| `GET` | `/api/claims/:userId` | Get claims for a user |
| `GET` | `/api/claims/all` | Get all claims (admin) |
| `PATCH` | `/api/claims/:id` | Update claim status (admin) |
| `GET` | `/api/finance/...` | Financial data & transactions |
| `POST` | `/api/email/send` | Send email via Nodemailer |
| `GET` | `/api/debug/status` | Database health check |

---

## 🗄️ Database (Supabase)

The application uses the following main tables in Supabase:

| Table | Description |
|---|---|
| `profiles` | User profile data (linked to Supabase Auth) |
| `policies` | Available insurance policies |
| `subscriptions` | User policy subscriptions |
| `claims` | Submitted insurance claims |
| `transactions` | Payment transaction records |

> **Note:** Set up Row Level Security (RLS) policies in Supabase to protect user data. Admin users require a special role — see `setAdminRole.js` in the Backend root.

---

## 🌍 Deployment

### Frontend — Vercel / Netlify
1. Push the `Frontend/` folder to a Git repository
2. Connect to Vercel or Netlify and set the root directory to `Frontend/`
3. Add all `VITE_*` environment variables in the hosting dashboard
4. Build command: `npm run build` | Output directory: `dist`

### Backend — Render
1. Push the `Backend/` folder to a Git repository
2. Create a new **Web Service** on [Render](https://render.com)
3. Set the **Start Command** to `node server.js`
4. Add all environment variables in the Render dashboard
5. Update `VITE_API_URL` in the frontend `.env` to point to the Render URL

---

## 📸 Pages Overview

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/products` | Insurance Products | Public |
| `/about` | About Us | Public |
| `/contact` | Contact | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/dashboard` | Customer Dashboard | Authenticated |
| `/claims` | Claims Center | Authenticated |
| `/checkout` | Checkout Flow | Authenticated |
| `/profile` | User Profile | Authenticated |
| `/admin` | Admin Dashboard | Admin only |
| `/admin/claims` | Claims Management | Admin only |
| `/admin/policies` | Policy Manager | Admin only |

---

## 📄 License

This project is for educational and portfolio purposes.

---

> Built with ❤️ using React, Node.js, and Supabase.
