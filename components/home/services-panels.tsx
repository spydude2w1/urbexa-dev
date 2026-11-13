"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SpotlightCard from "@/components/react-bits/SpotlightCard";

type Service = { title: string; label: string; text: string; tags: string[] };

export function ServicesPanels({ services }: { services: Service[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="service-0"
      className="services-panels"
    >
      {services.map((service, i) => (
        <SpotlightCard
          key={service.label}
          className="service-spotlight"
          spotlightColor="var(--gold)"
          intensity={0.09}
          borderGlow={0.3}
          proximity={0}
          flare={false}
        >
          <AccordionItem value={`service-${i}`} className="service-panel">
            <AccordionTrigger className="service-trigger">
              <span className="service-number">0{i + 1}</span>
              <span className="service-title">{service.label}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="service-content">
                <h4>{service.title}</h4>
                <div>
                  <p>{service.text}</p>
                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>
                        <Check size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link className="text-link" href="/services">
                    Explore our services <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </SpotlightCard>
      ))}
    </Accordion>
  );
}
