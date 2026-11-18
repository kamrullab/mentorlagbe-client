"use client";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/lib/api";
import type { PageResult, Tuition } from "@/lib/types";

export function TuitionGrid({ featured = false, query = "" }: { featured?: boolean; query?: string }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tuitions", featured, query, page],
    queryFn: () => api<Tuition[] | PageResult>(featured ? "/tuitions/featured" : `/tuitions?${query}&page=${page}`),
  });
  if (isLoading) return <div className="cards" aria-label="Loading tuitions">{[1, 2, 3].map(i => <div key={i} className="tuition-card skeleton" />)}</div>;
  if (isError) return <div className="empty">Could not load tuitions. Please try again shortly.</div>;
  const items = Array.isArray(data) ? data : data?.items || [];
  const pagination = Array.isArray(data) ? null : data?.pagination;
  if (!items.length) return <div className="empty">No matching tuitions found.</div>;
  const pageNumbers = pagination ? Array.from({ length: pagination.pages }, (_, i) => i + 1).filter(n => n === 1 || n === pagination.pages || Math.abs(n - page) <= 1) : [];
  return <>
    <div className="cards">{items.map(t => <article className="tuition-card" key={t._id}>
      <Image className="card-image" src={t.bannerImage} alt={`${t.title} tuition with ${t.tutorName}`} width={520} height={300} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw" />
      <div className="card-body"><div className="card-meta"><span className="pill">{t.subject}</span><span>{t.mode}</span></div><h3>{t.title}</h3><p>{t.classLevel} · {t.daysPerWeek} days/week</p><div className="card-foot"><div><small>With {t.tutorName}</small><div className="price">৳{t.monthlyFee.toLocaleString()}<small>/mo</small></div></div><Link href={`/tuitions/${t._id}`} className="btn small" aria-label={`View details for ${t.title}`}>View details</Link></div></div>
    </article>)}</div>
    {pagination && pagination.pages > 1 ? <nav className="pagination" aria-label="Tuition pagination">
      <button className="btn ghost small" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
      {pageNumbers.map((n, i) => <span key={n} className="page-slot">{i > 0 && n - pageNumbers[i - 1]! > 1 ? <span className="page-ellipsis">...</span> : null}<button aria-current={n === page ? "page" : undefined} className={`page-number ${n === page ? "active" : ""}`} onClick={() => setPage(n)}>{n}</button></span>)}
      <button className="btn ghost small" disabled={page === pagination.pages} onClick={() => setPage(p => p + 1)}>Next</button>
    </nav> : null}
  </>;
}
