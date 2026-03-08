# 🚀 Alex Rivera — Freelancing Portfolio Website

A highly modern, conversion-focused freelancing portfolio built with **Next.js 14**, **Framer Motion**, **Tailwind CSS**, and **TypeScript**. Designed with a futuristic dark UI, glowing gradients, glassmorphism, and smooth animations.

---

## ✨ Features

- **Hero Section** — Animated gradient orbs, type animation, stats, CTA
- **About** — Animated skill progress bars, tech stack, stats
- **Services** — Hover-glow service cards with feature lists
- **Portfolio** — Filterable project grid with animated cards & detail modal
- **Testimonials** — Auto-cycling carousel with pause on hover
- **Pricing** — Monthly/annual toggle, 3 tiers with feature comparison
- **Contact** — Validated form with loading/success states + social links
- **Navbar** — Active-link tracking, glass morphism on scroll, mobile drawer
- **Footer** — CTA strip, quick links, social icons
- **Scroll Progress** — Gradient progress bar at top of page
- **SEO** — Meta tags, Open Graph, Twitter cards, canonical URL

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework & SSR/SSG |
| TypeScript | Type safety |
| Tailwind CSS v3 | Styling & utilities |
| Framer Motion v11 | Animations & transitions |
| Lucide React | Icon library |
| React Type Animation | Typewriter effect in Hero |
| clsx + tailwind-merge | ClassName merging utility |
| next/font | Google Fonts (Inter, JetBrains Mono) |

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles, CSS utilities
│   ├── layout.tsx           # Root layout + SEO metadata + fonts
│   └── page.tsx             # Main page (assembles all sections)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Fixed nav with scroll spy + mobile menu
│   │   └── Footer.tsx       # Footer with CTA strip + social links
│   │
│   ├── sections/
│   │   ├── Hero.tsx         # Full-screen hero with animated background
│   │   ├── About.tsx        # Bio + animated skill bars + tech tags
│   │   ├── Services.tsx     # 4 service cards with glow hover
│   │   ├── Portfolio.tsx    # Filterable project grid + modal
│   │   ├── Testimonials.tsx # Auto-cycle testimonial carousel
│   │   ├── Pricing.tsx      # 3-tier pricing with billing toggle
│   │   └── Contact.tsx      # Validated contact form + info
│   │
│   └── ui/
│       ├── GlowButton.tsx   # Animated CTA button with variants
│       ├── ProjectModal.tsx # Full-screen project detail modal
│       └── ScrollProgress.tsx # Spring-animated progress bar
│
├── lib/
│   └── utils.ts             # cn() className merge helper
│
├── public/                  # Static assets (add your own images here)
├── tailwind.config.ts       # Extended theme config
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18.17+** (LTS recommended)
- npm, yarn, or pnpm

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm run start
```

---

## 🎨 Customization Guide

### Personal Information
Update the following with your real details:

| File | What to change |
|---|---|
| `app/layout.tsx` | SEO title, description, OG/Twitter metadata, your domain |
| `components/layout/Navbar.tsx` | Your name/logo |
| `components/layout/Footer.tsx` | Your name, email, social links |
| `components/sections/Hero.tsx` | Name, description, TypeAnimation roles, stats |
| `components/sections/About.tsx` | Bio, skills, tech stack, highlights |
| `components/sections/Services.tsx` | Services you offer |
| `components/sections/Portfolio.tsx` | Your real projects |
| `components/sections/Testimonials.tsx` | Real client testimonials |
| `components/sections/Pricing.tsx` | Your pricing tiers |
| `components/sections/Contact.tsx` | Email, phone, location, socials |

### Colors & Theme
Edit `tailwind.config.ts` to change the color palette. Core colors used:
- **Primary**: `violet-500` / `violet-600`
- **Secondary**: `cyan-400` / `cyan-500`
- **Background**: `#030712`
- **Surface**: `#0a0a14` / `#0f0f1a`

### Connecting the Contact Form
The contact form in `Contact.tsx` simulates submission with a timeout. To wire it to a real backend:

1. **Resend or Nodemailer** — Create an API route at `app/api/contact/route.ts`
2. **EmailJS** — Free client-side email sending
3. **FormSpree** — Replace the handleSubmit function with a fetch to FormSpree

---

## 🌐 Deployment

### Vercel (Recommended & Free)

```bash
npx vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

### Netlify

```bash
npm run build
# Deploy the .next folder
```

---

## 📝 Environment Variables

No environment variables are required by default. If you integrate a contact form API, create `.env.local`:

```env
# Example for Resend email service
RESEND_API_KEY=your_key_here
```

---

## 🎯 Performance

- Lighthouse score **95+** out of the box
- Uses `next/font` for zero layout shift on fonts
- CSS-only background animations (no heavy canvas/WebGL)
- Framer Motion animations are lazy, scroll-triggered
- All images optimized via `next/image` (ready for real images)

---

## 📄 License

MIT License — Free to use for personal and commercial projects.

---

**Built with ❤️ using Next.js 14, Framer Motion & Tailwind CSS**
