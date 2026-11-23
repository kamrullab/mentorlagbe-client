"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/components/auth-provider";

type Verification = { paid: boolean; plan?: string; amount?: number; currency?: string };

export default function Success() {
  const { ready, user, refresh } = useAuth();
  const started = useRef(false);
  const [verification, setVerification] = useState<Verification | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready || !user || started.current) return;
    started.current = true;
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) { queueMicrotask(() => setError("No Stripe checkout session was provided.")); return; }
    api<Verification>(`/payments/session/${encodeURIComponent(sessionId)}`)
      .then(async result => { setVerification(result); if (result.paid) await refresh().catch(() => null); })
      .catch(reason => setError((reason as Error).message));
  }, [ready, user, refresh]);

  if (!ready) return <div className="empty"><span className="eyebrow">Secure verification</span><h1 className="section-title">Checking your payment...</h1><div className="loader" aria-label="Loading" /></div>;
  if (!user) return <div className="empty"><span className="eyebrow">Sign in required</span><h1 className="section-title">Please sign in to verify this payment.</h1><Link className="btn" href="/sign-in">Sign in</Link></div>;
  if (!verification && !error) return <div className="empty"><span className="eyebrow">Secure verification</span><h1 className="section-title">Checking your payment...</h1><div className="loader" aria-label="Loading" /></div>;
  if (error || !verification?.paid) return <div className="empty"><span className="eyebrow">Payment not verified</span><h1 className="section-title">We could not confirm this payment.</h1><p>{error || "Stripe has not marked this checkout as paid."}</p><Link className="btn" href="/pricing">Back to plans</Link></div>;
  return <div className="empty"><span className="eyebrow">Payment verified</span><h1 className="section-title">Welcome to Pro.</h1><p>Your {verification.plan} plan payment of ${((verification.amount || 0) / 100).toFixed(2)} {verification.currency?.toUpperCase()} was confirmed securely.</p><Link className="btn" href="/dashboard/profile">View your profile</Link></div>;
}
