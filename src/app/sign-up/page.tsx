"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { GoogleIcon, GitHubIcon } from "@/components/social-icons";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignUp() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [socialRole, setSocialRole] = useState<"student" | "tutor">("student");
  useEffect(() => { if (ready && user) router.replace(`/dashboard/${user.role}`); }, [ready, user, router]);
  async function submit(form: FormData) { const values = Object.fromEntries(form); try { const result = await authClient.signUp.email({ name: String(values.name), email: String(values.email), password: String(values.password), role: String(values.role) } as Parameters<typeof authClient.signUp.email>[0]); if (result.error) throw new Error(result.error.message || "Registration failed"); toast.success("Account created. Please sign in."); router.replace("/sign-in"); } catch (e) { toast.error((e as Error).message); } }
  async function social(provider: "google" | "github") { const result = await authClient.signIn.social({ provider, callbackURL: "/auth/social-complete", newUserCallbackURL: `/auth/social-complete?new=1&role=${socialRole}` }); if (result.error) toast.error(result.error.message || `${provider} sign-up failed`); }
  if (!ready || user) return <div className="empty">Opening your dashboard...</div>;
  return <form className="form-shell auth-shell" action={submit}><span className="eyebrow">Join the community</span><h1>Create account</h1><p>Choose your role, then continue with Google, GitHub or email.</p><div className="social-role-picker" role="group" aria-label="Choose account role"><button type="button" aria-pressed={socialRole==="student"} className={socialRole==="student"?"active":""} onClick={()=>setSocialRole("student")}>Student</button><button type="button" aria-pressed={socialRole==="tutor"} className={socialRole==="tutor"?"active":""} onClick={()=>setSocialRole("tutor")}>Tutor</button></div><div className="social-auth"><button type="button" className="btn google-btn" onClick={() => social("google")}><GoogleIcon />Google</button><button type="button" className="btn google-btn" onClick={() => social("github")}><GitHubIcon />GitHub</button></div><div className="auth-divider"><span>or create with email</span></div><div className="form-group"><label>Full name</label><input className="input" required minLength={2} name="name" autoComplete="name" /></div><div className="form-group"><label>Email</label><input className="input" required type="email" name="email" autoComplete="email" /></div><div className="form-group"><label>Password</label><input className="input" required minLength={8} type="password" name="password" autoComplete="new-password" /></div><div className="form-group"><label>I am a</label><select name="role" value={socialRole} onChange={event=>setSocialRole(event.target.value as "student"|"tutor")}><option value="student">Student</option><option value="tutor">Tutor</option></select></div><button className="btn">Join MentorLagbe</button><p>Already registered? <Link href="/sign-in" style={{ color: "var(--teal)" }}>Sign in</Link></p></form>;
}
