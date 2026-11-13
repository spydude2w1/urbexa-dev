"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const stages = [
  {
    title: "Define the possibilities.",
    label: "Definition",
    text: "We begin with your intent, the realities of the site, and the scope of the project. Clarity comes before commitments.",
    detail: "Site understanding / Scope / Project brief",
  },
  {
    title: "Give your vision a plan.",
    label: "Planning",
    text: "Plans, elevations, approvals, and specifications come together around a coordinated approach to execution.",
    detail: "Floor plans / Elevations / Approval coordination",
  },
  {
    title: "Build with purpose.",
    label: "Execution",
    text: "Civil works, material decisions, and specialist trades are coordinated within the agreed scope, with clear transitions between phases.",
    detail: "Structure / Materials / Trade coordination",
  },
  {
    title: "Bring the details together.",
    label: "Finishing",
    text: "Interiors and finishing works connect the architectural intent to the experience of the completed space.",
    detail: "Interiors / Finishes / Quality checks",
  },
  {
    title: "Make room for what’s next.",
    label: "Handover",
    text: "Final checks and project documentation bring the construction journey to a considered close. Your next chapter begins.",
    detail: "Final review / Documentation / Handover",
  },
];

export function ProcessJourney() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.stage));
        });
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: 0 },
    );
    root.current
      ?.querySelectorAll("[data-stage]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <section id="journey" ref={root} className="journey section-pad">
      <div className="page-width">
        <div className="section-label" data-reveal>
          <span>03 / THE BUILDING JOURNEY</span>
          <span>ONE CONTINUOUS PROCESS</span>
        </div>
        <div className="journey-layout">
          <div className="journey-sticky">
            <h2>
              Every stage.
              <br />
              <em>One direction.</em>
            </h2>
            <p>
              From an idea with potential
              <br />
              to a place with purpose.
            </p>
            <div className="blueprint" aria-hidden="true">
              <svg viewBox="0 0 400 330" fill="none">
                <defs>
                  <pattern
                    id="blueprint-grid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M24 0H0V24"
                      stroke="currentColor"
                      strokeOpacity=".08"
                    />
                  </pattern>
                </defs>
                <rect width="400" height="330" fill="url(#blueprint-grid)" />
                <g stroke="currentColor" strokeWidth="1">
                  <path
                    d="M40 250 200 290 360 210M200 290V45M200 45 60 92 200 135 340 85 200 45Z"
                    opacity=".25"
                  />
                  {[0, 1, 2, 3, 4].map((i) => (
                    <g
                      key={i}
                      className={
                        i <= active
                          ? "blueprint-level active"
                          : "blueprint-level"
                      }
                      style={{ transform: `translateY(${-i * 35}px)` }}
                    >
                      <path d="m60 222 140 43 140-50-140-40-140 47Z" />
                      <path d="M60 222v-30m280 23v-30m-140 80v-30" />
                    </g>
                  ))}
                  <path
                    d="M25 250V90m-5 0h10m-10 160h10M60 277l130 40"
                    opacity=".35"
                  />
                </g>
              </svg>
              <div className="blueprint-caption">
                <span>THE URBEXA FRAMEWORK</span>
                <span>0{active + 1} / 05</span>
              </div>
            </div>
            <nav className="journey-dots" aria-label="Construction stages">
              {stages.map((stage, i) => (
                <a
                  key={stage.label}
                  href={`#stage-${i}`}
                  aria-label={`Stage ${i + 1}: ${stage.label}`}
                  aria-current={active === i ? "step" : undefined}
                  className={active === i ? "active" : ""}
                />
              ))}
            </nav>
          </div>
          <div className="journey-cards">
            {stages.map((stage, i) => (
              <article
                key={stage.label}
                id={`stage-${i}`}
                data-stage={i}
                className={`journey-card ${active === i ? "active" : ""}`}
              >
                <div className="journey-card-top">
                  <span className="stage-number">0{i + 1}</span>
                  <span className="eyebrow">{stage.label}</span>
                  <span className="stage-indicator" />
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                <div className="stage-detail">{stage.detail}</div>
              </article>
            ))}
            <Link href="/process" className="text-link">
              A closer look at our process <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
