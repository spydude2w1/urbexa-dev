import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-top">
          <div>
            <span className="eyebrow">VISION. PRECISION. EXECUTION.</span>
            <Link href="/contact" className="footer-invitation">
              Let’s build what’s next.
              <ArrowUpRight />
            </Link>
          </div>
          <a
            href="#main-content"
            className="back-to-top"
            aria-label="Back to top"
          >
            <ArrowUp size={21} />
          </a>
        </div>
        <div className="footer-main">
          <Link href="/" className="footer-brand">
            URBEXA<span>PROJECTS</span>
          </Link>
          <p>
            Execution-led construction.
            <br />
            Clarity, control, and long-term value.
          </p>
          <nav aria-label="Footer navigation">
            <Link href="/work">Our work</Link>
            <Link href="/process">Our process</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Urbexa Group. All rights reserved.
          </span>
          <span>BENGALURU / TAMIL NADU</span>
        </div>
      </div>
    </footer>
  );
}
