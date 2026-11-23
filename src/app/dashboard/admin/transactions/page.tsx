"use client";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, ReceiptText, WalletCards } from "lucide-react";
import { api } from "@/lib/api";

type Payment = {
  _id: string;
  userEmail: string;
  userName: string;
  userRole: string;
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  stripeSessionId: string;
  paymentStatus: string;
  paidAt: string;
};

export default function Page() {
  const { data = [], isLoading, isError } = useQuery({ queryKey: ["admin-transactions"], queryFn: () => api<Payment[]>("/payments/admin/all") });
  const revenue = data.reduce((total, payment) => total + payment.amount, 0);
  if (isLoading) return <div className="empty">Loading transactions...</div>;
  if (isError) return <div className="empty">Unable to load transactions.</div>;
  return <div className="admin-page"><div className="admin-page-head"><div><span className="eyebrow">Payments</span><h1 className="section-title">Transactions</h1><p>Monitor successful Stripe Sandbox subscriptions.</p></div><span className="admin-count"><ReceiptText size={17}/>{data.length} records</span></div><div className="admin-summary"><article><WalletCards/><span><small>Total revenue</small><strong>${(revenue/100).toFixed(2)}</strong></span></article><article><CreditCard/><span><small>Successful payments</small><strong>{data.filter(item=>item.paymentStatus==="paid").length}</strong></span></article></div>{!data.length?<div className="empty admin-empty">No transactions yet.</div>:<div className="admin-table-wrap"><table className="data-table admin-table"><thead><tr><th>Customer</th><th>Plan</th><th>Amount</th><th>Status</th><th>Paid</th><th>Reference</th></tr></thead><tbody>{data.map(payment=><tr key={payment._id||payment.stripeSessionId}><td><strong>{payment.userName}</strong><small>{payment.userEmail}</small></td><td><span className="pill">{payment.planName}</span><small>{payment.userRole}</small></td><td className="admin-amount">${(payment.amount/100).toFixed(2)} <small>{payment.currency.toUpperCase()}</small></td><td><span className="payment-status">{payment.paymentStatus}</span></td><td>{new Date(payment.paidAt).toLocaleDateString("en-BD",{day:"2-digit",month:"short",year:"numeric"})}</td><td><code title={payment.stripeSessionId}>{payment.stripeSessionId.slice(0,18)}…</code></td></tr>)}</tbody></table></div>}</div>;
}
