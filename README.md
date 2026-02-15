# V Kavya — Portfolio Website

> AI × Security × Full-Stack Engineer Portfolio
> Built with Next.js 14 · GSAP · Three.js · Supabase · Tailwind CSS

---

## 🚀 Quick Start (5 Steps)

### Step 1 — Clone & Install

```bash
# Create your project directory
mkdir kavya-portfolio && cd kavya-portfolio

# Copy all files from this package into the directory
# (The files are already structured for you)

# Install dependencies
npm install
```

---

### Step 2 — Set Up Supabase (Database)

1. Go to **https://app.supabase.com** → Create a new project
2. Name it `kavya-portfolio`, pick a region close to India (Mumbai/Singapore)
3. Go to **SQL Editor** → New Query
4. Paste the entire contents of `supabase/schema.sql` → Click **RUN**
5. Go to **Settings → API**
6. Copy your:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

### Step 3 — Set Up Email (Resend — FREE)

**This is what makes the contact form actually send emails to you.**

1. Go to **https://resend.com** → Sign up (free, no credit card)
2. Go to **API Keys** → **Create API Key** → Copy it
3. In `.env.local`, set: `RESEND_API_KEY=re_your_key_here`

That's it. Free tier = 100 emails/day. The form sends directly to `kavya0002u@gmail.com`.

---

### Step 4 — Configure Environment

```bash
# Copy the example env file
cp .env.example .env.local

# Open .env.local and fill in:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

### Step 4 — Run Locally

```bash
npm run dev
# Open http://localhost:3000
```

---

### Step 5 — Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# When prompted:
# - Link to existing project? No → create new
# - Set root directory: ./
# - Set build command: npm run build

# Add environment variables in Vercel dashboard:
# vercel.com → Your Project → Settings → Environment Variables
# Add: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 📁 Project Structure

```
kavya-portfolio/
│
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout with metadata + providers
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles + CSS variables
│   ├── about/page.tsx            # About page
│   ├── contact/page.tsx          # Contact page (with form)
│   ├── experiments/page.tsx      # Interactive lab/demos
│   └── work/
│       ├── page.tsx              # All projects page
│       └── [slug]/
│           ├── page.tsx          # Project route (SSG)
│           └── ProjectCaseStudy.tsx  # Client case study component
│
├── components/
│   ├── Navbar.tsx                # Navigation with mode toggles
│   ├── CustomCursor.tsx          # Animated cursor
│   ├── ModeSelector.tsx          # Recruiter/Dev/Curious modal
│   ├── Providers.tsx             # Global providers + FPS/DB tracking
│   ├── SystemStatusPanel.tsx     # Floating status widget
│   ├── three/
│   │   └── HeroOrb.tsx           # Three.js 3D animated orb
│   └── sections/
│       ├── HeroSection.tsx       # Hero with typewriter + 3D orb
│       ├── ProjectsSection.tsx   # Featured projects (Mission cards)
│       ├── ExperienceTimeline.tsx # Interactive experience timeline
│       ├── SkillsAchievements.tsx # Skills grid + achievement counters
│       └── CTASection.tsx        # Call to action
│
├── lib/
│   ├── store.ts                  # Zustand global state
│   ├── supabase.ts               # Supabase client + queries
│   └── data.ts                   # All portfolio data (edit this!)
│
├── supabase/
│   └── schema.sql                # Run this in Supabase SQL editor
│
├── public/
│   └── resume.pdf                # ← PUT YOUR RESUME HERE
│
├── next.config.js                # Security headers + Next.js config
├── tailwind.config.js            # Theme, colors, animations
├── tsconfig.json                 # TypeScript config
├── .env.example                  # Environment variable template
└── .gitignore                    # Git ignore rules
```

---

## ✏️ Customizing Your Data

All your personal data is in **`lib/data.ts`**. Edit this file to update:

- `personalInfo` — name, email, bio, LinkedIn, GitHub
- `experiences` — work history with thought process + security notes
- `projects` — projects with full case study data
- `skills` — skill categories and tech stack
- `achievements` — metrics and numbers
- `certifications` — your certifications

---

## 🎛️ Unique Features

### 🧠 Thought Process Mode
Click **THINK** in the navbar to reveal design reasoning inline on every project and experience card. Shows the *why* behind every architectural decision.

### 🛡️ Security Mode
Click **SEC** in the navbar to switch to threat view:
- Attack surfaces visualized
- Security measures listed per project
- Intentional omissions explained
- Contact form security breakdown

### 🌗 Adaptive Mode
Click **SELECT MODE** to choose:
- **Recruiter** → See outcomes and leadership
- **Developer** → See architecture and tradeoffs
- **Curious** → See visual stories and experiments

### 📊 System Status Panel
Floating widget (bottom-right) shows live:
- Backend connectivity
- Supabase DB latency (real-time)
- Frame rate (FPS)
- Security headers status
- Zero tracking scripts confirmation

### 🖱️ Custom Cursor
Animated plasma-colored cursor that reacts to hover states and switches to ember/red in security mode.

---

## 🔐 Security Features Built-In

| Feature | Implementation |
|---------|---------------|
| Security Headers | `X-Frame-Options`, `CSP`, `HSTS`, `XSS Protection` via `next.config.js` |
| Form Protection | Honeypot field + timing check to block bots |
| Row-Level Security | Supabase RLS — anon can only INSERT, not SELECT |
| No Raw IPs | IP hashing before any storage |
| Input Validation | Client + server-side email regex + length checks |
| Data Minimization | Only essential fields collected and stored |
| Secure Key Storage | API keys only in environment variables |

---

## 🎨 Design System

**Colors:**
- `plasma` (#00f5d4) — Primary accent
- `ember` (#ff4d6d) — Security/alerts
- `gold` (#ffd166) — Highlights
- `electric-blue` (#4cc9f0) — Secondary accent

**Fonts:**
- Display: **Syne** (headings)
- Body: **DM Sans** (body text)
- Mono: **JetBrains Mono** (code, labels)

---

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| 3D Graphics | Three.js + React Three Fiber |
| Animation | GSAP + Framer Motion |
| State | Zustand |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Language | TypeScript |

---

## 🔧 Troubleshooting

**Three.js not rendering:**
→ The HeroOrb uses `dynamic()` with `ssr: false` — it only renders client-side. This is intentional.

**Supabase connection failing:**
→ Check your `.env.local` has the correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
→ Ensure the schema has been run in your Supabase SQL editor.

**Type errors:**
→ Run `npm install` to ensure all `@types/*` packages are installed.

**Build failing:**
→ Ensure all environment variables are set in Vercel dashboard.

---

## 📊 Analytics Setup (Free)

### Google Analytics 4
1. Go to [analytics.google.com](https://analytics.google.com) → Create property
2. Get your Measurement ID `G-XXXXXXXXXX`
3. Add to `.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

### Microsoft Clarity (heatmaps + session recordings)
1. Go to [clarity.microsoft.com](https://clarity.microsoft.com) → New project
2. Get your Project ID (10 chars)
3. Add to `.env.local`: `NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx`

Both load automatically — no code changes needed.

---

Place your photo at:
```
public/kavya.png
```
The About page and Hero section will automatically display it. Recommended: 400×400px, JPG or PNG.

---

## 🥚 Easter Eggs (5 Hidden)

| Egg | How to Trigger | Rarity |
|-----|---------------|--------|
| 🎮 Konami Code | Press ↑↑↓↓←→←→BA on keyboard | LEGENDARY |
| 🛡️ CTF Flag | Type `ctf` or `flag` anywhere | RARE |
| ☁️ Cloud Wizard | Type `gcp` on keyboard | EPIC |
| 🦉 Night Owl | Visit between midnight and 5AM | UNCOMMON |
| ⚡ Speed Reader | Scroll to bottom of page in under 10 seconds | RARE |

A counter in the bottom-left shows how many eggs you've found.

---

## 🚀 Go Live Checklist

- [ ] Filled `lib/data.ts` with your actual data
- [ ] Placed `resume.pdf` in `public/`
- [ ] Ran `supabase/schema.sql` in Supabase
- [ ] Created `.env.local` with real keys
- [ ] `npm run dev` works locally
- [ ] Deployed to Vercel with env vars set
- [ ] Custom domain configured (optional)
- [ ] Security headers verified at https://securityheaders.com

---

Built with 💙 for V Kavya
