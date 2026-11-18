"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck, Star } from "lucide-react";
import { api } from "@/lib/api";
import type { Tuition } from "@/lib/types";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

type Review = { studentEmail: string; studentName: string; rating: number; feedback: string; createdAt: string };
type Application = { tuitionId: string; status: "pending" | "accepted" | "rejected" };
type DetailedTuition = Tuition & { reviews?: Review[] };

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: t, isLoading } = useQuery({ queryKey: ["tuition", id], queryFn: () => api<DetailedTuition>(`/tuitions/${id}`) });
  const { data: saved = [] } = useQuery({ queryKey: ["saved"], queryFn: () => api<Tuition[]>("/users/me/saved"), enabled: user?.role === "student" });
  const { data: applications = [] } = useQuery({ queryKey: ["student-applications"], queryFn: () => api<Application[]>("/applications/student/mine"), enabled: user?.role === "student" });
  const isSaved = saved.some(item => item._id === id);
  const currentApplication = applications.find(item => item.tuitionId === id);
  const accepted = currentApplication?.status === "accepted";
  const reviewed = t?.reviews?.some(item => item.studentEmail === user?.email);

  async function apply(form: FormData) { try { await api(`/applications/${id}`, { method: "POST", body: JSON.stringify(Object.fromEntries(form)) }); toast.success("Application submitted"); qc.invalidateQueries({ queryKey: ["student-applications"] }); } catch (e) { toast.error((e as Error).message); } }
  async function save() { try { const result = await api<{ saved: boolean }>(`/users/me/saved/${id}`, { method: "PATCH" }); toast.success(result.saved ? "Added to saved tuitions" : "Removed from saved tuitions"); qc.invalidateQueries({ queryKey: ["saved"] }); } catch (e) { toast.error((e as Error).message); } }
  async function review(form: FormData) { try { await api(`/tuitions/${id}/reviews`, { method: "POST", body: JSON.stringify({ rating: Number(form.get("rating")), feedback: form.get("feedback") }) }); toast.success("Review published"); qc.invalidateQueries({ queryKey: ["tuition", id] }); } catch (e) { toast.error((e as Error).message); } }

  if (isLoading || !t) return <div className="container empty">Loading tuition...</div>;
  const average = t.reviews?.length ? t.reviews.reduce((sum, item) => sum + item.rating, 0) / t.reviews.length : 0;
  return <div className="container section tuition-details">
    <div className="hero-grid"><div><span className="pill">{t.subject} · {t.mode}</span><h1 className="section-title">{t.title}</h1><p className="hero-copy">{t.description}</p><div className="stats detail-stats"><div className="stat"><b>Class level</b><p>{t.classLevel}</p></div><div className="stat"><b>Schedule</b><p>{t.daysPerWeek} days/week</p></div><div className="stat"><b>Location</b><p>{t.location}</p></div><div className="stat"><b>Monthly fee</b><p>৳{t.monthlyFee.toLocaleString()}</p></div></div></div>
      <div><Image className="detail-image" src={t.bannerImage} alt={t.title} width={650} height={430} /><div className="price-card tutor-card"><div className="mentor-summary"><div><span className="eyebrow">Your mentor</span><h3>{t.tutorName}</h3><p>{t.tutorEmail}</p></div>{user?.role === "student" ? <button type="button" className="btn ghost save-button" onClick={save}>{isSaved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}{isSaved ? "Saved" : "Save"}</button> : null}</div>{user?.role === "student" ? currentApplication ? <div className={`application-state ${currentApplication.status}`}><strong>Application {currentApplication.status}</strong><p>{currentApplication.status === "pending" ? "Your request was sent to the tutor. You can track or cancel it from My Applications." : currentApplication.status === "accepted" ? "Great news! The tutor accepted your application." : "This application was not accepted. You can explore other mentors."}</p></div> : <form className="application-form" action={apply}><div className="application-intro"><strong>Apply for this tuition</strong><p>Tell the mentor how to contact you and when you are available.</p></div><div className="form-group"><label htmlFor="studentPhone">Phone number</label><input id="studentPhone" required name="studentPhone" className="input" type="tel" inputMode="tel" autoComplete="tel" pattern="(?:\+?88)?01[3-9]\d{8}" placeholder="Example: 01712345678"/><small>Use an active Bangladesh mobile number.</small></div><div className="form-group"><label htmlFor="preferredSchedule">Preferred schedule</label><select id="preferredSchedule" required name="preferredSchedule" defaultValue=""><option value="" disabled>Select your available time</option><option>Weekday mornings</option><option>Weekday afternoons</option><option>Weekday evenings</option><option>Weekend mornings</option><option>Weekend afternoons</option><option>Weekend evenings</option><option>Flexible - discuss with tutor</option></select></div><div className="form-group"><label htmlFor="studentNote">Learning goal</label><textarea id="studentNote" required minLength={20} maxLength={500} name="studentNote" placeholder="Example: I need help strengthening algebra concepts and preparing for my HSC exam." rows={4}/><small>Write at least 20 characters about the support you need.</small></div><button className="btn application-submit">Send application</button></form> : <p className="section-sub">{user ? "Only student accounts can apply." : "Sign in as a student to apply."}</p>}</div></div>
    </div>
    <section className="section reviews-section"><div className="section-head"><div><span className="eyebrow">Verified experiences</span><h2 className="section-title">Student feedback</h2></div>{average ? <div className="rating-summary"><Star fill="currentColor" /> <strong>{average.toFixed(1)}</strong><span>{t.reviews!.length} review{t.reviews!.length === 1 ? "" : "s"}</span></div> : null}</div>
      {user?.role === "student" && accepted && !reviewed ? <form className="price-card review-form" action={review}><select required name="rating" defaultValue=""><option value="" disabled>Choose a rating</option>{[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} stars</option>)}</select><textarea required minLength={10} name="feedback" rows={3} placeholder="Share your learning experience" /><button className="btn">Submit review</button></form> : null}
      {user?.role === "student" && !accepted ? <p className="review-notice">Reviews unlock after your application is accepted.</p> : null}
      <div className="cards">{t.reviews?.length ? t.reviews.map(r => <article className="quote review-card" key={`${r.studentEmail}-${r.createdAt}`}><div className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div><b>{r.studentName}</b><p>{r.feedback}</p></article>) : <p className="section-sub">No reviews yet.</p>}</div>
    </section>
  </div>;
}
