"use client";
import Image from"next/image";
import Link from"next/link";
import{Menu,Moon,Sun,X}from"lucide-react";
import{useState}from"react";
import{useTheme}from"next-themes";
import{useAuth}from"./auth-provider";
import{Brand}from"./brand";

export function Navbar(){const[open,setOpen]=useState(false),{theme,setTheme}=useTheme(),{user,logout}=useAuth(),links=[["Home","/"],["Browse Tuitions","/tuitions"],["Pro Plans","/pricing"],["How it works","/#how"]];return <header className="nav-wrap"><nav className="nav container"><Brand/><button className="icon-btn menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button><div className={`nav-links ${open?"open":""}`}>{links.map(([n,h])=><Link key={n} href={h}>{n}</Link>)}<button className="icon-btn" onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label="Toggle theme">{theme==="dark"?<Sun/>:<Moon/>}</button>{user?<><span className="nav-user">{user.image?<Image src={user.image} alt="" width={30} height={30}/>:<span className="avatar-fallback">{user.name.charAt(0)}</span>}<span>{user.name}</span><span className="role-pill">{user.role}</span></span><Link href={`/dashboard/${user.role}`} className="btn small">Dashboard</Link><Link href="/dashboard/profile">Update profile</Link><button className="btn ghost small" onClick={logout}>Sign out</button></>:<><Link href="/sign-in">Sign in</Link><Link href="/sign-up" className="btn small">Join free</Link></>}</div></nav></header>}
