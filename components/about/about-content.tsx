"use client"

import { useState } from "react"

const materials = [
  {
    id: "structure",
    title: "Structure",
    items: [
      "Steel: JSW Neosteel, Tata Tiscon, Jindal Panther",
      "Cement: OPC 43 / OPC 53 (UltraTech or ACC)",
      "Aggregates: 20mm & 40mm stone",
      "Ready-mix concrete: AVS Ready Mix — M20, M25, or higher if required",
      "Blocks: AVS Concrete Blocks"
    ]
  },
  {
    id: "kitchen-sanitary",
    title: "Kitchen & Sanitary",
    items: [
      "Modular kitchen components",
      "Granite or quartz countertops",
      "Sanitary and CP fittings: Jaquar, Cera, Kohler"
    ]
  },
  {
    id: "doors-windows",
    title: "Doors & Windows",
    items: [
      "Doors: Premium Honne wood from Urbexa's own factory",
      "Windows: UPVC frame systems or aluminium systems"
    ]
  },
  {
    id: "painting-finishes",
    title: "Painting & Finishes",
    items: [
      "Primer: Asian Paints TruCare",
      "Exterior paints: Asian Paints Ace Exterior Emulsion or Apex Ultima"
    ]
  },
  {
    id: "flooring",
    title: "Flooring",
    items: [
      "Italian marble flooring",
      "Full-size tiles",
      "2×2 vitrified tiles with spacers",
      "Anti-skid flooring in wet areas"
    ]
  },
  {
    id: "electrical",
    title: "Electrical",
    items: [
      "Wiring: Polycab",
      "Switches, sockets, distribution boards, MCBs and RCCBs: Legrand"
    ]
  },
  {
    id: "plumbing-waterproofing",
    title: "Plumbing & Waterproofing",
    items: [
      "Pipes: Astral, Supreme, Ashirvaad",
      "Waterproofing systems: Dr. Fixit"
    ]
  }
]

export function AboutContent() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  return (
    <div className="space-y-20">
      {/* Vision Paragraph */}
      <p className="text-lg text-muted-foreground leading-relaxed animate-settle opacity-0">
        Urbexa Projects builds residential and select commercial spaces from cradle to completion.<br />
        Our vision is to eliminate fragmentation in construction by integrating approvals, planning, material specification, execution, and finishing into a single, accountable process.<br />
        Every project is approached with long-term performance in mind, where design intent, material quality, and execution discipline are aligned from the first decision to final handover.
      </p>

      {/* Materials & Build Quality Section */}
      <div className="animate-settle opacity-0 animation-delay-300">
        <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-6">
          Materials & Build Quality
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-16 max-w-2xl">
          A building is only as strong as the materials that shape it. We specify proven, high-grade materials at every layer of construction to ensure durability, safety, and long-term integrity.
        </p>

        {/* Connected Roadmap */}
        <div className="relative max-w-4xl">
          {/* Connection Lines */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            style={{ zIndex: 1 }}
          >
            {materials.slice(0, -1).map((_, index) => {
              const isActive = hoveredNode === materials[index].id || hoveredNode === materials[index + 1].id
              const startX = index % 2 === 0 ? 384 : 0
              const endX = (index + 1) % 2 === 0 ? 384 : 0
              const startY = 32 + index * 192
              const endY = 32 + (index + 1) * 192
              const midX = (startX + endX) / 2
              const midY = (startY + endY) / 2 + 40
              
              return (
                <path
                  key={index}
                  d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
                  stroke={isActive ? "rgba(239, 210, 162, 0.5)" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth="2"
                  fill="none"
                  className="transition-all duration-500"
                />
              )
            })}
          </svg>

          {/* Material Nodes */}
          <div className="relative space-y-12" style={{ zIndex: 2 }}>
            {materials.map((material, index) => (
              <div
                key={material.id}
                className={`relative animate-settle opacity-0 ${
                  index % 2 === 0 ? "ml-0" : "ml-auto max-w-md"
                }`}
                style={{ animationDelay: `${500 + index * 100}ms` }}
                onMouseEnter={() => setHoveredNode(material.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`bg-card border rounded-lg p-6 md:p-8 transition-all duration-500 max-w-md relative ${
                  hoveredNode === material.id
                    ? "border-gold/30 shadow-[0_0_20px_rgba(239,210,162,0.1)] transform translate-y-[-2px]"
                    : hoveredNode && hoveredNode !== material.id
                    ? "border-border opacity-60"
                    : "border-border"
                }`}>
                  {/* Connection Point */}
                  <div className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${
                    index % 2 === 0 ? "-right-1.5" : "-left-1.5"
                  } top-8 ${
                    hoveredNode === material.id
                      ? "bg-gold"
                      : "bg-border"
                  }`} />
                  
                  <h3 className="font-serif text-lg font-light text-foreground mb-4">
                    {material.title}
                  </h3>
                  <ul className="space-y-2">
                    {material.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
