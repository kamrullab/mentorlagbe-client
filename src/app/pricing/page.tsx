"use client";
import { Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { api } from "@/lib/api";
import { toast } from "sonner";

const plans = [
  { name: "Free", amount: "$0", text: "A focused start", items: ["Browse every approved tuition", "Apply or publish up to 2 posts", "Core dashboard tools"] },
  { name: "Pro Student", amount: "$10", role: "student" as const, text: "Move faster with priority", items: ["Unlimited applications", "Priority booking", "Saved tuitions and progress tools"] },
  { name: "Pro Tutor", amount: "$15", role: "tutor" as const, text: "Grow without limits", items: ["Unlimited tuition posts", "Verified Pro badge", "Enhanced applicant tools"] },
];

export default function Pricing() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<"student" | "tutor" | null>(null);

  async function checkout(plan: "student" | "tutor") {
    if (!user) { toast.error("Please sign in first"); router.push("/sign-in"); return; }
    if (user.role !== plan) return toast.error(`This plan is for ${plan}s. Your account is a ${user.role}.`);
    setLoading(plan);
    try {
      const result = await api<{ url: string }>("/payments/checkout", { method: "POST", body: JSON.stringify({ plan }) });
      window.location.assign(result.url);
    } catch (error) {
      toast.error((error as Error).message);
      setLoading(null);
    }
  }

  return <div className="container section pricing-page"><header className="page-hero"><span className="eyebrow">Clear, simple pricing</span><h1>Invest in momentum.</h1><p className="section-sub">Start free. Upgrade only when the extra reach matters.</p></header><div className="pricing-grid pricing-page-grid">{plans.map((plan, index) => <div className={`price-card ${index === 1 ? "featured" : ""}`} key={plan.name}><span className="pill">{plan.text}</span><h3>{plan.name}</h3><div className="amount">{plan.amount}<small>{index ? "/month" : ""}</small></div><ul>{plan.items.map(item => <li key={item}><Check size={16} /> {item}</li>)}</ul>{plan.role ? <button className="btn" disabled={loading !== null} onClick={() => checkout(plan.role)}>{loading === plan.role ? "Opening secure checkout..." : `Subscribe for ${plan.amount}`}</button> : <a className="btn ghost" href="/sign-up">Start free</a>}</div>)}</div></div>;
}
