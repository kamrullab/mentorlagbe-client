import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Brand } from "./brand";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

export function Footer() {
  return <footer>
    <div className="container footer-grid">
      <div><Brand/><p>Confident learning starts with the right human connection.</p></div>
      <div>
        <h3>Explore</h3>
        <Link href="/">Home</Link>
        <Link href="/tuitions">Find a mentor</Link>
        <Link href="/pricing">Pro plans</Link>
        <Link href="/#how" scroll>How it works</Link>
      </div>
      <div>
        <h3>Contact</h3>
        <a href="https://www.google.com/maps/search/?api=1&query=Dhaka%2C%20Bangladesh" {...externalProps}><MapPin size={15}/>Dhaka, Bangladesh</a>
        <a href="tel:+8801700000000"><Phone size={15}/>+880 1700 000000</a>
        <a href="mailto:hello@mentorlagbe.com"><Mail size={15}/>hello@mentorlagbe.com</a>
      </div>
      <div>
        <h3>Follow</h3>
        <div className="social">
          <a href="https://x.com" aria-label="X" {...externalProps}>𝕏</a>
          <a href="https://www.facebook.com" aria-label="Facebook" {...externalProps}>f</a>
          <a href="https://www.instagram.com" aria-label="Instagram" {...externalProps}>◎</a>
          <a href="https://www.linkedin.com" aria-label="LinkedIn" {...externalProps}>in</a>
        </div>
      </div>
    </div>
    <div className="container copyright">© 2026 MentorLagbe. Built for better learning.</div>
  </footer>;
}

