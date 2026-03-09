# Orbitex — Freelancing Portfolio Website

A modern, conversion-focused freelancing portfolio built with **Next.js 14**, **Framer Motion**, **Tailwind CSS**, and **TypeScript**. Features a dark UI with animated gradients, glassmorphism, and smooth scroll-triggered transitions.

---

## Features

- **Hero Section** — Animated gradient orbs, typewriter animation, stats, CTA
- **About** — Animated skill progress bars, tech stack, highlights
- **Services** — Hover-glow service cards with feature lists
- **Portfolio** — Filterable project grid with animated cards and detail modal
- **Testimonials** — Auto-cycling carousel with pause on hover
- **Pricing** — Monthly/annual billing toggle, 3 tiers with feature comparison
- **Contact** — Validated form with loading/success states and social links
- **Navbar** — Active-link tracking, glassmorphism on scroll, mobile drawer
- **Footer** — CTA strip, quick links, social icons
- **Scroll Progress** — Gradient progress bar at the top of the page
- **SEO** — Meta tags, Open Graph, Twitter cards, canonical URL

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework and SSR/SSG |
| TypeScript | Type safety |
| Tailwind CSS v3 | Styling and utilities |
| Framer Motion v11 | Animations and transitions |
| Lucide React | Icon library |
| React Type Animation | Typewriter effect in Hero |
| clsx + tailwind-merge | ClassName merging utility |

---

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles, CSS utilities
│   ├── layout.tsx           # Root layout, SEO metadata, fonts
│   └── page.tsx             # Main page (assembles all sections)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Fixed nav with scroll spy and mobile menu
│   │   └── Footer.tsx       # Footer with CTA strip and social links
│   │
│   ├── sections/
│   │   ├── Hero.tsx         # Full-screen hero with animated background
│   │   ├── About.tsx        # Bio, animated skill bars, tech tags
│   │   ├── Services.tsx     # Service cards with glow hover effect
│   │   ├── Portfolio.tsx    # Filterable project grid with modal
│   │   ├── Testimonials.tsx # Auto-cycling testimonial carousel
│   │   ├── Pricing.tsx      # 3-tier pricing with billing toggle
│   │   └── Contact.tsx      # Validated contact form and info
│   │
│   └── ui/
│       ├── GlowButton.tsx      # Animated CTA button with variants
│       ├── ProjectModal.tsx    # Full-screen project detail modal
│       └── ScrollProgress.tsx  # Spring-animated scroll progress bar
│
├── lib/
│   └── utils.ts             # cn() className merge helper
│
├── public/                  # Static assets
├── tailwind.config.ts       # Extended theme configuration
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js **18.17+** (LTS recommended)
- npm, yarn, or pnpm

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Customization Guide

### Personal Information

Update the following files with your details:

| File | What to change |
|---|---|
| `app/layout.tsx` | SEO title, description, OG/Twitter metadata, domain |
| `components/layout/Navbar.tsx` | Name/logo |
| `components/layout/Footer.tsx` | Name, email, social links |
| `components/sections/Hero.tsx` | Name, description, typewriter roles, stats |
| `components/sections/About.tsx` | Bio, skills, tech stack, highlights |
| `components/sections/Services.tsx` | Services offered |
| `components/sections/Portfolio.tsx` | Projects |
| `components/sections/Testimonials.tsx` | Client testimonials |
| `components/sections/Pricing.tsx` | Pricing tiers |
| `components/sections/Contact.tsx` | Email, phone, location, socials |

### Colors and Theme

Edit `tailwind.config.ts` to change the color palette. Core colors:

- **Primary**: `violet-500` / `violet-600`
- **Secondary**: `cyan-400` / `cyan-500`
- **Background**: `#030712`
- **Surface**: `#0a0a14` / `#0f0f1a`

### Connecting the Contact Form

The contact form simulates submission with a timeout by default. To wire it to a real backend:

1. **Resend or Nodemailer** — Create an API route at `app/api/contact/route.ts`
2. **EmailJS** — Free client-side email sending
3. **FormSpree** — Replace `handleSubmit` with a fetch to your FormSpree endpoint

---

## Deployment

### Vercel (Recommended)

```bash
npx vercel
```

Or connect your GitHub repository at [vercel.com](https://vercel.com).

### Netlify

```bash
npm run build
# Deploy the .next folder
```

---

## Environment Variables

No environment variables are required by default. If you integrate a contact form API, create `.env.local`:

```env
RESEND_API_KEY=your_key_here
```

---

## Performance

- Lighthouse score 95+ out of the box
- CSS-only background animations (no canvas or WebGL)
- Framer Motion animations are lazy and scroll-triggered
- All images optimized via `next/image`

---

## License

MIT License — Free to use for personal and commercial projects.
