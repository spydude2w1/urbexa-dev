import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="architecture-hero" aria-labelledby="hero-heading">
      <div className="hero-image" data-parallax>
        <Image
          src="/projects/private-residence-bangalore/hero.jpg"
          alt="Warmly illuminated contemporary residential architecture at dusk"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="page-width hero-content">
        <p className="eyebrow hero-enter">
          URBEXA PROJECTS / EXECUTION-LED CONSTRUCTION
        </p>
        <h1 id="hero-heading" className="hero-enter">
          Built with vision.
          <br />
          Delivered with
          <br />
          <em>clarity.</em>
        </h1>
        <div className="hero-bottom hero-enter">
          <div>
            <p>
              From the first conversation to the final key.
              <br />
              Thoughtfully coordinated. Completely accountable.
            </p>
            <Link href="#enquiry" className="button-primary">
              Let’s build something lasting <ArrowUpRight size={19} />
            </Link>
          </div>
          <Link href="#approach" className="hero-scroll">
            <span>
              EXPLORE THE
              <br />
              URBEXA APPROACH
            </span>
            <span className="round-arrow">
              <ArrowDown size={20} />
            </span>
          </Link>
        </div>
      </div>
      <div className="hero-side-note" aria-hidden="true">
        VISION · PRECISION · EXECUTION
      </div>
      <div className="hero-image-credit">
        PRIVATE RESIDENCE / ARCHITECTURAL VISUALIZATION
      </div>
    </section>
  );
}
