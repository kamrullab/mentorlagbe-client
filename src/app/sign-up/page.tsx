"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { SocialAuth } from "@/components/social-auth";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignUp() {
  const { user, ready } = useAuth();
  const router = useRouter();
  useEffect(() => { window.scrollTo(0,0); if (ready && user) router.replace(`/dashboard/${user.role}`); }, [ready, user, router]);
  async function submit(form: FormData) { const values = Object.fromEntries(form); try { const result = await authClient.signUp.email({ name: String(values.name), email: String(values.email), password: String(values.password), role: String(values.role) } as Parameters<typeof authClient.signUp.email>[0]); if (result.error) throw new Error(result.error.message || "Registration failed"); toast.success("Account created. Please sign in."); router.replace("/sign-in"); } catch (e) { toast.error((e as Error).message); } }
  if (!ready || user) return <div className="empty">Opening your dashboard...</div>;
  return <form className="form-shell auth-shell" action={submit}><span className="eyebrow">Join the community</span><h1>Create account</h1><p>Continue with Google, GitHub or create your account with email.</p><SocialAuth /><div className="auth-divider"><span>or create with email</span></div><div className="form-group"><label>Full name</label><input className="input" required minLength={2} name="name" autoComplete="name" /></div><div className="form-group"><label>Email</label><input className="input" required type="email" name="email" autoComplete="email" /></div><div className="form-group"><label>Password</label><input className="input" required minLength={8} type="password" name="password" autoComplete="new-password" /></div><div className="form-group"><label>I am a</label><select name="role"><option value="student">Student</option><option value="tutor">Tutor</option></select></div><button className="btn">Join MentorLagbe</button><p>Already registered? <Link href="/sign-in" style={{ color: "var(--teal)" }}>Sign in</Link></p></form>;
}
