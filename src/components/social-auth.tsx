"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GoogleIcon, GitHubIcon } from "@/components/social-icons";
import { toast } from "sonner";

type Provider = "google" | "github";
type Role = "student" | "tutor";

export function SocialAuth() {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [role, setRole] = useState<Role>("student");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!provider) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setProvider(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [provider]);

  async function continueWithSocial() {
    if (!provider) return;
    setBusy(true);
    const result = await authClient.signIn.social({ provider, callbackURL: "/auth/social-complete", newUserCallbackURL: `/auth/social-complete?new=1&role=${role}` });
    if (result.error) { toast.error(result.error.message || `${provider} sign-in failed`); setBusy(false); }
  }

  const ProviderIcon = provider === "github" ? GitHubIcon : GoogleIcon;
  const providerName = provider === "github" ? "GitHub" : "Google";
  return <>
    <div className="social-auth">
      <button type="button" className="btn google-btn" onClick={() => setProvider("google")}><GoogleIcon />Google</button>
      <button type="button" className="btn google-btn" onClick={() => setProvider("github")}><GitHubIcon />GitHub</button>
    </div>
    {provider && <div className="role-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setProvider(null); }}>
      <section className="role-modal" role="dialog" aria-modal="true" aria-labelledby="social-role-title">
        <button type="button" className="role-modal-close" aria-label="Close" onClick={() => setProvider(null)}>×</button>
        <span className="eyebrow">One quick step</span>
        <h2 id="social-role-title">Choose your role</h2>
        <p>How would you like to use MentorLagbe?</p>
        <div className="role-modal-options" role="radiogroup" aria-label="Account role">
          <button type="button" role="radio" aria-checked={role === "student"} className={role === "student" ? "active" : ""} onClick={() => setRole("student")}><strong>Student</strong><span>Find and connect with mentors</span></button>
          <button type="button" role="radio" aria-checked={role === "tutor"} className={role === "tutor" ? "active" : ""} onClick={() => setRole("tutor")}><strong>Tutor</strong><span>Post tuitions and guide learners</span></button>
        </div>
        <button type="button" className="btn role-modal-continue" disabled={busy} onClick={continueWithSocial}><ProviderIcon />{busy ? "Connecting..." : `Continue with ${providerName}`}</button>
        <small>Existing accounts keep their current role.</small>
      </section>
    </div>}
  </>;
}
