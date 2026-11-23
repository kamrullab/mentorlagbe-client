"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, Menu, Moon, Sun, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "./auth-provider";
import { Brand } from "./brand";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const links = [["Home", "/"], ["Browse Tuitions", "/tuitions"], ["Pro Plans", "/pricing"], ["How it works", "/#how"]];

  useEffect(() => {
    function close(event: MouseEvent) { if (!profileRef.current?.contains(event.target as Node)) setProfileOpen(false); }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") setProfileOpen(false); }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", escape); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function closeMenus() { setOpen(false); setProfileOpen(false); }
  return <header className="nav-wrap"><nav className="nav container">
    <Brand />
    <button className="icon-btn menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    <div className={`nav-links ${open ? "open" : ""}`}>
      {links.map(([name, href]) => <Link key={name} href={href} onClick={closeMenus}>{name}</Link>)}
      <button className="icon-btn theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">{theme === "dark" ? <Sun /> : <Moon />}</button>
      {user ? <div className="profile-menu" ref={profileRef}>
        <button className="nav-user" type="button" aria-expanded={profileOpen} aria-haspopup="menu" onClick={() => setProfileOpen(!profileOpen)}>
          {user.image ? <Image src={user.image} alt={`${user.name} profile`} width={38} height={38} /> : <span className="avatar-fallback">{user.name.charAt(0)}</span>}
          <span className="nav-user-copy"><b>{user.name}</b><small>{user.role} · {user.plan}</small></span><ChevronDown className="profile-chevron" />
        </button>
        {profileOpen ? <div className="profile-popover" role="menu">
          <div className="profile-popover-head">{user.image ? <Image src={user.image} alt="" width={50} height={50} /> : <span className="avatar-fallback large">{user.name.charAt(0)}</span>}<div><strong>{user.name}</strong><span>{user.email}</span></div></div>
          <div className="profile-facts"><span><small>Role</small><b>{user.role}</b></span><span><small>Plan</small><b>{user.plan}</b></span></div>
          <Link href={`/dashboard/${user.role}`} onClick={closeMenus}><UserRound size={16} />Dashboard</Link>
          <Link href="/dashboard/profile" onClick={closeMenus}><UserRound size={16} />View and update profile</Link>
          <button type="button" onClick={() => { closeMenus(); logout(); }}><LogOut size={16} />Sign out</button>
        </div> : null}
      </div> : <><Link href="/sign-in" onClick={closeMenus}>Sign in</Link><Link href="/sign-up" className="btn small" onClick={closeMenus}>Join free</Link></>}
    </div>
  </nav></header>;
}
