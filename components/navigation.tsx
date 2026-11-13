"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/approvals", label: "Approvals" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="nav-inner" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="Urbexa Projects home">
          <Image
            src="/images/bk-icon.png"
            width={38}
            height={38}
            alt=""
            priority
          />
          <span>
            URBEXA<small>PROJECTS</small>
          </span>
        </Link>
        <div className="desktop-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link href="/contact" className="nav-cta">
          Start a project <ArrowUpRight size={16} />
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu-trigger"
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </Button>
          </SheetTrigger>
          <SheetContent className="mobile-navigation">
            <SheetTitle>Urbexa Projects</SheetTitle>
            <SheetDescription>
              Considered construction. From vision to handover.
            </SheetDescription>
            <nav aria-label="Mobile navigation">
              {[
                ...navItems,
                { href: "/process", label: "Our Process" },
                { href: "/contact", label: "Contact" },
              ].map((item, i) => (
                <Link
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <span>0{i + 1}</span>
                  {item.label}
                  <ArrowUpRight size={18} />
                </Link>
              ))}
            </nav>
            <a href="tel:+919945356557" className="text-link">
              +91 99453 56557
            </a>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
