"use client"

import type { Metadata } from "next"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronDown } from "lucide-react"
import project1Img from "@/components/work/project-1.png"
import proj2 from "@/components/work/project-2.jpg"
import proj3 from "@/components/work/project-3.png"
import proj4 from "@/components/work/project-4.png"
import proj5 from "@/components/work/project-5.png"

const projects = [
  {
    id: 1,
    name: "Private Residence",
    type: "Residential",
    status: "Ongoing",
    location: "Bengaluru",
    completionYear: 2026,
    image: project1Img,
    description: "Ground-up residential construction with integrated approvals and design",
    services: ["Approvals", "Planning & Design", "Residential Construction", "Interiors"]
  },
  {
    id: 2,
    name: "Weekend Retreat",
    type: "Residential",
    status: "Completed",
    location: "Tamil Nadu",
    completionYear: 2024,
    image: proj2,
    description: "Renovation and extension with elevation development",
    services: ["Planning & Design", "Front Elevation Development", "Residential Construction"]
  },
  // {
  //   id: 3,
  //   name: "Family Compound",
  //   type: "Residential",
  //   status: "Completed",
  //   location: "Bengaluru",
  //   completionYear: 2023,
  //   image: proj3,
  //   description: "Multi-structure residential development",
  //   services: ["Cradle-to-Completion House Development"]
  // },
  // {
  //   id: 4,
  //   name: "Urban Townhouse",
  //   type: "Residential",
  //   status: "Completed",
  //   location: "Bengaluru",
  //   completionYear: 2023,
  //   image: proj4,
  //   description: "Complete residential renovation with regulatory compliance",
  //   services: ["Approvals", "Residential Construction", "Interiors"]
  // },
  // {
  //   id: 5,
  //   name: "Hillside Villa",
  //   type: "Residential",
  //   status: "Ongoing",
  //   location: "Tamil Nadu",
  //   completionYear: 2024,
  //   image: proj5,
  //   description: "Ground-up construction with elevation and interior coordination",
  //   services: ["Planning & Design", "Front Elevation Development", "Residential Construction", "Interiors"]
  // },
]

export default function WorkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [locationFilter, setLocationFilter] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === "All" || project.type === typeFilter
      const matchesStatus = statusFilter === "All" || project.status === statusFilter
      const matchesLocation = locationFilter === "All" || project.location === locationFilter
      
      return matchesSearch && matchesType && matchesStatus && matchesLocation
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return a.completionYear - b.completionYear
        case "name":
          return a.name.localeCompare(b.name)
        default: // newest
          return b.completionYear - a.completionYear
      }
    })
  }, [searchTerm, typeFilter, statusFilter, locationFilter, sortBy])

  const toggleProject = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Hero Section */}
        <header className="mb-24 md:mb-32">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground animate-settle opacity-0 mb-8">
            Our Work
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl animate-settle opacity-0 animation-delay-200">
            Selected projects delivered under defined execution scope.
          </p>
        </header>

        {/* Search & Filter Controls */}
        <section className="mb-16 md:mb-20 animate-settle opacity-0 animation-delay-300">
          <div className="bg-card/30 border border-border rounded-lg p-6 md:p-8">
            {/* Search Input */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by project name, location, or type"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                >
                  <option value="All">All Types</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                >
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                >
                  <option value="All">All Locations</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wide">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Project Name</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Project Results */}
        <section className="mb-24 md:mb-32">
          {filteredAndSortedProjects.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <p className="text-lg text-foreground mb-4">No projects match the selected criteria.</p>
              <p className="text-base text-muted-foreground">Adjust filters or search to view other work.</p>
            </div>
          ) : (
            /* Project Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredAndSortedProjects.map((project, index) => (
                <div key={project.id} className="animate-settle opacity-0" style={{ animationDelay: `${(index + 4) * 100}ms` }}>
                  <div 
                    className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-700 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(239,210,162,0.1)] cursor-pointer"
                    onClick={() => toggleProject(project.id)}
                  >
                    {/* Project Image */}
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        style={{ filter: 'brightness(0.8) contrast(1.1)' }}
                      />
                      <div className="absolute inset-0 bg-background/10" />
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-serif text-lg font-light text-foreground">{project.name}</h3>
                        <span className="text-xs text-muted-foreground">{project.completionYear}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span>{project.type}</span>
                        <span>•</span>
                        <span>{project.status}</span>
                        <span>•</span>
                        <span>{project.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <span className="text-xs text-gold tracking-wide uppercase">
                        View details
                      </span>
                    </div>
                  </div>
                  
                  {/* Expandable Panel */}
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-out ${
                      expandedProject === project.id ? 'max-h-96 mt-6' : 'max-h-0'
                    }`}
                  >
                    <div className="bg-card/50 border border-border/50 rounded-lg p-6">
                      <h4 className="font-serif text-base font-light text-foreground mb-4">Project Overview</h4>
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <div><span className="text-foreground">Location:</span> {project.location}</div>
                        <div><span className="text-foreground">Timeline:</span> {project.status} ({project.completionYear})</div>
                        <div>
                          <span className="text-foreground">Services Involved:</span>
                          <ul className="mt-2 space-y-1 ml-4">
                            {project.services.map((service, idx) => (
                              <li key={idx}>• {service}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Closing Note */}
        <section className="border-t border-border pt-16 md:pt-20">
          <div className="max-w-2xl animate-settle opacity-0 mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              This archive represents selected projects executed under defined scope and delivery frameworks.
            </p>
          </div>
          <div className="animate-settle opacity-0 animation-delay-200">
            <Link
              href="/contact"
              className="inline-block text-sm tracking-widest uppercase text-foreground/70 pb-2 transition-all duration-500 hover:text-gold"
              style={{
                borderBottom: "1px solid rgba(239, 210, 162, 0.3)",
              }}
              data-hoverable
            >
              Contact Urbexa Projects
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
