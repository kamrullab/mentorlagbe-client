<div align="center">

# 🎓 MentorLagbe

### Smart Tuition & Mentorship Platform

[![Live Site](https://img.shields.io/badge/Live_Site-0B7A6C?style=for-the-badge&logo=vercel&logoColor=white)](https://mentorlagbe.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-111111?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-5B4BFF?style=for-the-badge&logo=auth0&logoColor=white)](https://www.better-auth.com/)
[![Stripe](https://img.shields.io/badge/Stripe_Sandbox-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Demo Admin](https://img.shields.io/badge/Demo_Admin-Ready-F2B84B?style=for-the-badge&logo=shield&logoColor=142C2A)](https://mentorlagbe.vercel.app/sign-in)

**Find trusted tutors, publish tuition opportunities, manage applications, and grow through personalized mentorship.**

[🌐 Visit Live Website](https://mentorlagbe.vercel.app) · [⚙️ Server Repository](https://github.com/kamrullab/mentorlagbe-server)

</div>

---

## ✨ Overview

MentorLagbe is a production-ready, role-based EdTech marketplace connecting Students, Tutors, and Admins. Students can discover and apply for approved tuition listings, Tutors can publish and manage learning opportunities, and Admins can moderate the complete platform.

## 🔑 Quick Demo Access

Use this public evaluation account to explore the complete Admin Dashboard. The permanent Super Admin account remains private and protected.

| Access | Value |
|---|---|
| **Login page** | [Open MentorLagbe Sign In](https://mentorlagbe.vercel.app/sign-in) |
| **Email** | `demo@kamrul.us` |
| **Password** | `MentorDemo#2026!` |
| **Role** | Admin |
| **Plan** | Pro |

> [!NOTE]
> This is a public demonstration account for assignment review. Please do not store personal information in it.

## 🚀 Key Features

- Student, Tutor, and Admin authentication with BetterAuth and JWT
- Responsive role-based dashboards and protected navigation
- Server-side tuition search, filtering, and pagination
- Student applications, saved tuitions, reviews, and ratings
- Numbered server-side pagination and accepted-student review eligibility
- Tutor tuition CRUD, applicant management, and free-plan quota
- Admin user management, tuition moderation, revenue, and transactions
- Direct profile and banner image uploads through ImgBB
- Monthly Stripe Sandbox Pro subscriptions
- Light and dark themes, toast notifications, loading states, and error pages
- Optional Google sign-in and sign-up through BetterAuth
- Reliable Vercel integration through a same-origin API proxy

## 💳 Stripe Sandbox Demo

> [!IMPORTANT]
> The following card is a Stripe test card. Never enter a real card on the demo checkout.

| Checkout field | Test value |
|---|---|
| Card number | `4242 4242 4242 4242` |
| Expiry date | `12 / 30` |
| CVC | `123` |
| Cardholder name | `Kamrul Hossain` |

Student Pro costs **$10/month** and Tutor Pro costs **$15/month** in Stripe Sandbox mode.

## 🧰 Technology

| Area | Tools |
|---|---|
| Framework | Next.js 16 App Router, React 19 |
| Language | TypeScript |
| Authentication | BetterAuth, JWT |
| Data fetching | TanStack Query |
| Styling | Tailwind CSS, custom responsive CSS, next-themes |
| UI feedback | Sonner, Lucide React |
| Media and payments | ImgBB, Stripe Sandbox |
| Validation | Zod |

## 🏃 Local Setup

```bash
git clone https://github.com/kamrullab/mentorlagbe-client.git
cd mentorlagbe-client
npm install
```

Copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Run the application:

```bash
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

## 🌍 Production Configuration

```env
NEXT_PUBLIC_API_URL=https://mentorlagbe-serverbd.vercel.app/api
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Configure the variables in Vercel and redeploy after any environment change. Admin and quick-test account credentials should be supplied privately in the assignment submission form, never committed to a public repository.

Google OAuth secrets belong only in the server project. The client does not require or expose a Google client secret.

## 🔗 Project Links

- **Live site:** https://mentorlagbe.vercel.app
- **Client repository:** https://github.com/kamrullab/mentorlagbe-client
- **Server repository:** https://github.com/kamrullab/mentorlagbe-server
- **API health:** https://mentorlagbe-serverbd.vercel.app/api/health

---

<div align="center">

Built with care for better learning connections.

</div>
