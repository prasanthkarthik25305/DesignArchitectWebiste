# MJ Engineers & Architects — Website

Premium business website for MJ Engineers & Architects, Kakinada.

**Tech Stack:** React + Vite · TypeScript · Tailwind CSS · Express API · PostgreSQL

---

## 🖥️ Run Locally on Windows

### Step 1 — Install Prerequisites

Download and install these (one-time setup):

| Tool | Download Link | Version |
|------|--------------|---------|
| **Node.js** | https://nodejs.org (LTS version) | 18 or higher |
| **pnpm** | Run in terminal: `npm install -g pnpm` | 8 or higher |
| **Git** | https://git-scm.com/download/win | Any |

After installing Node.js, open **Command Prompt** or **PowerShell** and verify:
```
node --version
pnpm --version
```

---

### Step 2 — Download the Project

**Option A — From Replit (Download ZIP):**
1. On Replit, click the three-dot menu → **Download as ZIP**
2. Extract the ZIP to a folder, e.g. `C:\Projects\mj-engineers`
3. Open that folder in your terminal

**Option B — Via Git (if you have the repo URL):**
```
git clone <your-repo-url>
cd mj-engineers
```

---

### Step 3 — Set Up the Database

You need a PostgreSQL database. Choose one option:

#### Option A: Free Cloud Database (Recommended — No Installation)
1. Go to **https://neon.tech** and create a free account
2. Create a new project (e.g. `mj-engineers`)
3. Copy the **Connection String** — it looks like:
   ```
   postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```

#### Option B: Local PostgreSQL
1. Download from https://www.postgresql.org/download/windows/
2. Install with default settings (remember your password)
3. Open pgAdmin or psql and create a database called `mj_engineers`
4. Your connection string will be:
   ```
   postgresql://postgres:YOURPASSWORD@localhost:5432/mj_engineers
   ```

---

### Step 4 — Configure Environment Variables

In the project root folder, create a file called **`.env`** (copy from `.env.example`):

```
# In your terminal:
copy .env.example .env
```

Then open `.env` in Notepad and fill in your database URL:
```
DATABASE_URL=postgresql://your-connection-string-here
PORT=8080
NODE_ENV=development
```

Also create **`artifacts/api-server/.env`**:
```
DATABASE_URL=postgresql://your-connection-string-here
PORT=8080
NODE_ENV=development
```

---

### Step 5 — Install Dependencies

Open terminal in the project root folder and run:

```
pnpm install
```

This installs everything for the entire project at once.

---

### Step 6 — Set Up the Database Tables

```
pnpm --filter @workspace/db run push
```

This creates the required tables (contacts, etc.) in your database automatically.

---

### Step 7 — Run the Project

You need **two terminal windows** open simultaneously:

**Terminal 1 — Start the API server (backend):**
```
pnpm --filter @workspace/api-server run dev
```
→ The API will run at **http://localhost:8080**

**Terminal 2 — Start the website (frontend):**
```
pnpm --filter @workspace/mj-engineers run dev
```
→ The website will open at **http://localhost:5173**

Open your browser and go to: **http://localhost:5173**

---

## ✅ Everything Working?

| Check | URL |
|-------|-----|
| Website (Home page) | http://localhost:5173 |
| API health check | http://localhost:8080/api/healthz |
| Contact form | Fill the form on http://localhost:5173/contact |

---

## 🚀 Deploy to Production (Go Live)

### Option A — Deploy on Replit (Easiest)
1. Open this project on Replit
2. Click **Publish / Deploy** button
3. Done! Gets a `.replit.app` domain instantly

### Option B — Deploy Frontend on Vercel (Free)
1. Build the frontend:
   ```
   pnpm --filter @workspace/mj-engineers run build
   ```
2. Upload the `artifacts/mj-engineers/dist/` folder to **https://vercel.com**
3. Note: Contact form won't work without the backend. Use Replit deploy for the full stack.

### Option C — VPS / Hosting Server
1. Install Node.js and pnpm on the server
2. Clone the project, run `pnpm install`
3. Set up environment variables
4. Run `pnpm --filter @workspace/db run push` to create tables
5. Use **PM2** to keep both processes running:
   ```
   npm install -g pm2
   pm2 start "pnpm --filter @workspace/api-server run start" --name api
   pm2 start "pnpm --filter @workspace/mj-engineers run serve" --name web
   ```

---

## 📁 Project Structure

```
mj-engineers/
├── artifacts/
│   ├── mj-engineers/        ← Website (React + Vite frontend)
│   │   └── src/
│   │       ├── pages/       ← Home, About, Services, Portfolio, Pricing, Contact
│   │       ├── components/  ← Navbar, Footer, FloatingButtons
│   │       └── index.css    ← Navy + Gold theme
│   └── api-server/          ← Backend API (Express + Node.js)
│       └── src/
│           └── routes/      ← API routes (contact form, health)
├── lib/
│   ├── db/                  ← Database schema (Drizzle ORM)
│   └── api-spec/            ← OpenAPI spec
├── .env.example             ← Copy this to .env and fill in values
└── README.md                ← This file
```

---

## ❓ Common Issues on Windows

**Error: `'export' is not recognized`**
→ Already fixed. The project uses `cross-env` for cross-platform compatibility.

**Error: `pnpm: command not found`**
→ Run `npm install -g pnpm` first, then close and reopen your terminal.

**Error: `Cannot connect to database`**
→ Check that your `DATABASE_URL` in `.env` is correct. Test by pasting it into https://neon.tech query editor.

**Error: Port 8080 already in use**
→ Change `PORT=8081` in `.env` and restart.

**Website loads but contact form shows error**
→ Make sure the API server (Terminal 1) is also running.

---

## 📞 Contact

**MJ Engineers & Architects**
- Phone: +91 9177479958
- WhatsApp: +91 6302199958
- Email: mjengg7@gmail.com
- Instagram: [@mjengineers7](https://www.instagram.com/mjengineers7)
