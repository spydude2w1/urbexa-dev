import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ServicesPanels } from "@/components/home/services-panels";
import { HeroSection } from "@/components/home/hero-section";
import { ProcessJourney } from "@/components/home/process-journey";
import { EnquiryForm } from "@/components/enquiry-form";

const services = [
  {
    title: "From first idea to final key.",
    label: "Cradle-to-completion",
    text: "One coordinated team for approvals, planning, construction, interiors, and handover. A continuous process with clearly defined responsibility.",
    tags: [
      "Single accountability",
      "Coordinated delivery",
      "Complete lifecycle",
    ],
  },
  {
    title: "A stronger start for your project.",
    label: "Planning & approvals",
    text: "Architectural planning, statutory approvals, and front elevation development aligned with the realities of your site and the way you want to live.",
    tags: [
      "Architectural planning",
      "Regulatory coordination",
      "Elevation design",
    ],
  },
  {
    title: "Every detail, built with intent.",
    label: "Construction & execution",
    text: "Residential and select commercial construction, with civil works, materials, and specialist trades managed within a defined execution scope.",
    tags: ["Residential", "Select commercial", "Trade coordination"],
  },
];

export default function HomePage() {
  return (
    <div className="immersive-home">
      <HeroSection />
      <div className="credentials-strip">
        <span>
          <i /> Bengaluru & select Tamil Nadu regions
        </span>
        <span>Residential & commercial</span>
        <span>
          From approvals to handover <ArrowDown size={14} />
        </span>
      </div>
      <section id="approach" className="manifesto section-pad">
        <div className="page-width">
          <div className="section-label" data-reveal>
            <span>01 / THE APPROACH</span>
            <span>LESS FRAGMENTATION. MORE CLARITY.</span>
          </div>
          <div className="manifesto-grid">
            <h2 data-reveal>
              A remarkable home.
              <br />A considered process.
              <br />
              <em>One accountable team.</em>
            </h2>
            <div className="manifesto-copy" data-reveal>
              <span className="small-cross" aria-hidden="true">
                +
              </span>
              <p>
                Building a home is a deeply personal undertaking. Managing it
                shouldn’t mean navigating disconnected vendors, unclear scope,
                and endless handovers.
              </p>
              <p>
                We connect planning, approvals, design, and construction into
                one continuous journey. So every decision moves your project
                forward.
              </p>
              <Link href="/about" className="text-link">
                Meet Urbexa Projects <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
          <div className="principles">
            {[
              [
                "01",
                "Clarity before commitment",
                "Site realities, scope, and expectations established from the outset.",
              ],
              [
                "02",
                "Coordination at every stage",
                "Design decisions connected to materials, trades, and execution.",
              ],
              [
                "03",
                "Value beyond handover",
                "Thoughtful finishing, documented checks, and lasting relationships.",
              ],
            ].map(([n, title, body]) => (
              <div key={n} data-reveal>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="expertise" className="expertise section-pad">
        <div className="page-width">
          <div className="section-label" data-reveal>
            <span>02 / OUR EXPERTISE</span>
            <span>CONNECTED BY DESIGN</span>
          </div>
          <div className="section-heading" data-reveal>
            <h2>
              The whole picture.
              <br />
              <em>Every moving part.</em>
            </h2>
            <p>
              Engage us for a defined scope or the entire journey. The same
              considered approach, at every scale.
            </p>
          </div>
          <ServicesPanels services={services} />
        </div>
      </section>
      <ProcessJourney />
      <section id="selected-work" className="selected-work section-pad">
        <div className="page-width">
          <div className="section-label" data-reveal>
            <span>04 / SELECTED WORK</span>
            <span>IDEAS TAKING SHAPE</span>
          </div>
          <div className="section-heading" data-reveal>
            <h2>
              Considered on paper.
              <br />
              <em>Compelling in form.</em>
            </h2>
            <Link href="/work" className="text-link">
              View our work <ArrowUpRight size={18} />
            </Link>
          </div>
          <Link
            href="/projects/private-residence-bangalore"
            className="featured-project"
            data-reveal
          >
            <div className="project-visual">
              <Image
                src="/projects/private-residence-bangalore/hero.jpg"
                alt="Architectural visualization of the Private Residence in Sarjapur, Bengaluru"
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
              />
              <span className="project-status">
                <i /> Ongoing project
              </span>
              <span className="project-open">
                <ArrowUpRight size={28} />
              </span>
              <span className="project-caption">
                Architectural visualization
              </span>
            </div>
            <div className="project-info">
              <div>
                <span className="eyebrow">RESIDENTIAL / BENGALURU</span>
                <h3>Private Residence</h3>
              </div>
              <p>
                Planning. Approvals. Construction.
                <br />
                <span>Sarjapur, Bengaluru · 2026</span>
              </p>
            </div>
          </Link>
        </div>
      </section>
      <section className="commitment section-pad">
        <div className="page-width commitment-grid">
          <div data-reveal>
            <span className="eyebrow">BUILT AROUND YOU</span>
            <h2>
              Your vision deserves
              <br />
              <em>a clear way forward.</em>
            </h2>
          </div>
          <div data-reveal>
            <p>
              For first-time landowners, families creating a long-term home, and
              NRIs building in India. We bring structure to the decisions that
              matter.
            </p>
            <div className="region-tags">
              <span>Bengaluru</span>
              <span>Select Tamil Nadu regions</span>
            </div>
            <Link href="/faq" className="text-link">
              Questions before you build? <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section id="enquiry" className="enquiry-section section-pad">
        <div className="page-width enquiry-layout">
          <div className="enquiry-intro" data-reveal>
            <span className="eyebrow">05 / THE NEXT CHAPTER</span>
            <h2>
              Great spaces begin
              <br />
              with a <em>conversation.</em>
            </h2>
            <p>
              Tell us what you have in mind. A few details will help us
              understand your site, your ambitions, and where we can help.
            </p>
            <div className="enquiry-note">
              <span>01—05</span>
              <p>
                Five simple steps.
                <br />
                One considered starting point.
              </p>
            </div>
            <a className="text-link" href="tel:+919945356557">
              Prefer to talk? +91 99453 56557 <ArrowUpRight size={17} />
            </a>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
