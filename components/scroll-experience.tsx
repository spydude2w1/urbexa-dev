"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function ScrollExperience() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    elements.forEach((element) => {
      if (
        !motion.matches &&
        element.getBoundingClientRect().top > window.innerHeight
      )
        element.classList.add("reveal-ready");
      observer.observe(element);
    });
    const hero = document.querySelector<HTMLElement>("[data-parallax]");
    let frame = 0;
    const update = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${range > 0 ? Math.min(1, window.scrollY / range) : 0})`;
      if (hero)
        hero.style.transform = motion.matches
          ? "none"
          : `translate3d(0, ${Math.min(window.scrollY, window.innerHeight) * 0.16}px, 0) scale(1.06)`;
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMotionChange = () => {
      elements.forEach((el) => el.classList.add("is-revealed"));
      schedule();
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", onMotionChange);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    update();
    return () => {
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [pathname]);
  return (
    <div className="reading-progress" aria-hidden="true">
      <div ref={progressRef} />
    </div>
  );
}
