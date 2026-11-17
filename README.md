# MentorLagbe Client

Next.js 16 App Router frontend for MentorLagbe, a role-based tuition and mentorship marketplace.

**Live site:** https://mentorlagbe.vercel.app

## Features

- Responsive original landing page, tuition discovery, server search/filter, details and applications
- Student, tutor and admin dashboards
- JWT session restoration, role-aware navigation and protected dashboard layout
- Monthly Stripe Sandbox Pro subscriptions, direct ImgBB uploads, light/dark theme, loading and error states
- Same-origin production API proxy for reliable BetterAuth cookies and session restoration

## Local setup

1. Copy `.env.example` to `.env.local` and configure the API and ImgBB values.
2. Run `npm install` then `npm run dev`.
3. Run `npm run lint && npm run build` before deployment.

## Production environment

- `NEXT_PUBLIC_API_URL=https://mentorlagbe-serverbd.vercel.app/api`
- `NEXT_PUBLIC_IMGBB_API_KEY=<your ImgBB API key>`

The API URL is used by the Next.js rewrite and browser requests stay on the frontend origin. Configure the values for Production, Preview and Development in Vercel, then redeploy after changing them.

## Main packages

Next.js, React, BetterAuth, TanStack Query, Sonner, next-themes, Lucide React, Tailwind CSS and Zod.

Admin and quick-test credentials are configured privately and should be supplied in the assignment submission form, not committed to a public repository. Never commit `.env.local`.
