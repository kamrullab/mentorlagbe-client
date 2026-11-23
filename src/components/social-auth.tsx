"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, GraduationCap, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { GoogleIcon, GitHubIcon } from "@/components/social-icons";
import { toast } from "sonner";

type Provider = "google" | "github";
type Role = "student" | "tutor";

export function SocialAuth() {
  const chooseRole = usePathname() === "/sign-up";
  const [provider, setProvider] = useState<Provider | null>(null);
  const [role, setRole] = useState<Role>("student");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!provider) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setProvider(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [provider]);

  async function startSocial(selectedProvider: Provider, selectedRole?: Role) {
    setBusy(true);
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    const plan = params.get("plan");
    const loginCallback = next?.startsWith("/") && !next.startsWith("//") ? `${next}${plan ? `?plan=${encodeURIComponent(plan)}` : ""}` : "/auth/social-complete";
    const result = await authClient.signIn.social({
      provider: selectedProvider,
      callbackURL: loginCallback,
      ...(selectedRole ? { newUserCallbackURL: `/auth/social-complete?new=1&role=${selectedRole}`, requestSignUp: true } : {}),
    });
    if (result.error) { toast.error(result.error.message || `${selectedProvider} sign-in failed`); setBusy(false); }
  }

  async function continueWithSocial() {
    if (!provider) return;
    await startSocial(provider, role);
  }

  const ProviderIcon = provider === "github" ? GitHubIcon : GoogleIcon;
  const providerName = provider === "github" ? "GitHub" : "Google";
  return <>
    <div className="social-auth">
      <button type="button" className="btn google-btn" disabled={busy} onClick={() => setProvider("google")}><GoogleIcon />Google</button>
      <button type="button" className="btn google-btn" disabled={busy} onClick={() => setProvider("github")}><GitHubIcon />GitHub</button>
    </div>
    {provider && <div className="role-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setProvider(null); }}>
      <section className="role-modal" role="dialog" aria-modal="true" aria-labelledby="social-role-title">
        <button type="button" className="role-modal-close" aria-label="Close" onClick={() => setProvider(null)}><X size={19}/></button>
        <span className="eyebrow">{chooseRole ? "One quick step" : "Confirm your account"}</span>
        <h2 id="social-role-title">{chooseRole ? "Choose your role" : "Continue as"}</h2>
        <p>{chooseRole ? "How would you like to use MentorLagbe?" : "Select the account type you expect to sign in with."}</p>
        <div className="role-modal-options" role="radiogroup" aria-label="Account role">
          <button type="button" role="radio" aria-checked={role === "student"} className={role === "student" ? "active" : ""} onClick={() => setRole("student")}><GraduationCap/><strong>Student</strong><span>Find and connect with mentors</span></button>
          <button type="button" role="radio" aria-checked={role === "tutor"} className={role === "tutor" ? "active" : ""} onClick={() => setRole("tutor")}><BookOpen/><strong>Tutor</strong><span>Post tuitions and guide learners</span></button>
        </div>
        <button type="button" className="btn role-modal-continue" disabled={busy} onClick={continueWithSocial}><ProviderIcon />{busy ? "Connecting..." : `Continue with ${providerName}`}</button>
        <small>{chooseRole ? "Choose carefully. This becomes your new account role." : "We verify your saved role after sign-in. Existing roles cannot be changed here."}</small>
      </section>
    </div>}
  </>;
}
