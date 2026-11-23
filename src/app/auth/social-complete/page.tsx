"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { api } from "@/lib/api";

export default function SocialComplete() {
  const { user, ready, refresh } = useAuth();
  const router = useRouter();
  const started = useRef(false);
  const [message, setMessage] = useState("Finishing your secure sign-in...");

  useEffect(() => {
    if (!ready || started.current) return;
    started.current = true;
    if (!user) { router.replace("/sign-in"); return; }
    const params = new URLSearchParams(window.location.search);
    const role = params.get("role");
    const isNew = params.get("new") === "1";
    void (async () => {
      try {
        if (isNew && (role === "student" || role === "tutor")) {
          setMessage(`Setting up your ${role} workspace...`);
          await api("/users/me/social-role", { method: "PATCH", body: JSON.stringify({ role }) });
          const current = await refresh();
          router.replace(`/dashboard/${current.role}`);
          return;
        }
        router.replace(`/dashboard/${user.role}`);
      } catch (error) {
        setMessage((error as Error).message);
      }
    })();
  }, [ready, user, refresh, router]);

  return <main className="form-shell auth-shell"><span className="eyebrow">Account setup</span><h1>Almost there</h1><p>{message}</p><div className="loader" aria-label="Loading" /></main>;
}
