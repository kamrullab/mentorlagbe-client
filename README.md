# MentorLagbe Client

Next.js 16 App Router frontend for MentorLagbe, a role-based tuition and mentorship marketplace.

## Features

- Responsive original landing page, tuition discovery, server search/filter, details and applications
- Student, tutor and admin dashboards
- JWT session restoration, role-aware navigation and protected dashboard layout
- Stripe Pro checkout, ImgBB upload utility, light/dark theme, loading and error states

## Local setup

1. Copy `.env.example` to `.env.local` and configure the API and ImgBB values.
2. Run `npm install` then `npm run dev`.
3. Run `npm run lint && npm run build` before deployment.

The live URL and test credentials should be added after production deployment. Never commit `.env.local`.
