"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { SocialAuth } from "@/components/social-auth";
import { toast } from "sonner";

export default function SignIn() {
  const { login, user, ready } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (ready && user) router.replace(`/dashboard/${user.role}`); }, [ready, user, router]);
  async function submit(form: FormData) { setBusy(true); try { const current = await login(String(form.get("email")), String(form.get("password"))); toast.success(`Welcome back, ${current.name}`); const params=new URLSearchParams(window.location.search),next=params.get("next"),plan=params.get("plan"),destination=next?.startsWith("/")&&!next.startsWith("//")?`${next}${plan?`?plan=${encodeURIComponent(plan)}`:""}`:`/dashboard/${current.role}`;router.replace(destination); } catch (e) { toast.error((e as Error).message); } finally { setBusy(false); } }
  if (!ready || user) return <div className="empty">Opening your dashboard...</div>;
  return <form className="form-shell auth-shell" action={submit}><span className="eyebrow">Welcome back</span><h1>Sign in</h1><p>Continue your learning journey.</p><SocialAuth /><div className="auth-divider"><span>or use email</span></div><div className="form-group"><label>Email</label><input className="input" required type="email" name="email" autoComplete="email" /></div><div className="form-group"><label>Password</label><input className="input" required minLength={8} type="password" name="password" autoComplete="current-password" /></div><button disabled={busy} className="btn">{busy ? "Signing in..." : "Sign in"}</button><p>New here? <Link href="/sign-up" style={{ color: "var(--teal)" }}>Create an account</Link></p></form>;
}
