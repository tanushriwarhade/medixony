# 🏥 Medixony

> **Modern Healthcare Platform** — Medicine delivery, doctor consultations & medical social networking.

![Medixony Banner](https://via.placeholder.com/1200x400/0f172a/38bdf8?text=Medixony+Healthcare+Platform)

---

## ✨ Features

| Feature | Description |
|---|---|
| 💊 **Medicine Delivery** | Search, browse, and order medicines with quick delivery |
| 👨‍⚕️ **Doctor Consultations** | Book appointments with verified specialists |
| 🤝 **Medical Community** | Social feed for health tips, patient stories & peer support |
| 🤖 **AI Health Assistant** | Powered by Gemini AI for symptom checks & guidance |
| 🛒 **Smart Cart** | Prescription upload, order tracking & history |
| 👤 **User Profiles** | Health records, appointments & personalized dashboard |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/medixony.git
cd medixony

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your VITE_GEMINI_API_KEY

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in your browser.

---

## 🗂️ Project Structure

```
medixony/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Base components (Button, Card, Badge…)
│   │   ├── layout/          # Navbar, Footer, Sidebar
│   │   └── shared/          # SearchBar, CartDrawer, etc.
│   ├── pages/               # Route-level page components
│   │   ├── HomePage.tsx
│   │   ├── MedicinePage.tsx
│   │   ├── DoctorsPage.tsx
│   │   ├── CommunityPage.tsx
│   │   └── ProfilePage.tsx
│   ├── hooks/               # Custom React hooks
│   ├── context/             # React context providers (Cart, Auth, Theme)
│   ├── lib/                 # Utility functions, API clients
│   ├── types/               # TypeScript type definitions
│   ├── data/                # Mock data / constants
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **AI**: Google Gemini AI (`@google/generative-ai`)
- **State**: React Context API + custom hooks

---

## 🌍 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | ✅ Yes | Google Gemini AI API key |
| `VITE_APP_NAME` | No | App display name |
| `VITE_APP_URL` | No | Base URL |

> ⚠️ All client-side env vars **must** be prefixed with `VITE_`. See `.env.example`.

---

## 📦 Scripts

```bash
npm run dev       # Start dev server (port 5173)
npm run build     # TypeScript compile + Vite build
npm run preview   # Preview production build
npm run lint      # ESLint check
```

---

## 📄 License

MIT © 2024 Medixony. All rights reserved.
