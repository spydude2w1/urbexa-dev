export type Project = {
  slug: string
  title: string
  location: string
  category: "Residential" | "Commercial"
  plotSize?: string
  floors?: string
  year: string
  status: "Completed" | "Ongoing"
  scope: string[]
  description: string
  heroImage: string
  galleryStages?: {
    stage: string
    images: string[]
  }[]
}

export const projects: Project[] = [
  {
    slug: "private-residence-bangalore",
    title: "Private Residence",
    location: "Sarjapur, Bengaluru",
    category: "Residential",
    plotSize: "30x60 sqft",
    floors: "G+3",
    year: "2026",
    status: "Ongoing",
    scope: ["Approvals", "Planning & Design", "Residential Construction", "Interiors", "Turnkey House Construction"],
    description: "Ground-up residential construction with integrated approvals and design",
    heroImage: "/projects/private-residence-bangalore/hero.jpg",
    galleryStages: [
      {
        stage: "Site Condition",
        images: ["/projects/private-residence-bangalore/gallery/01-site.jpg"]
      },
      {
        stage: "Foundation",
        images: ["/projects/private-residence-bangalore/gallery/02-foundation.jpg"]
      },
      {
        stage: "Structural Frame",
        images: ["/projects/private-residence-bangalore/gallery/03-structure.jpg"]
      }
    ]
  },
  {
    slug: "weekend-retreat-tamil-nadu",
    title: "Weekend Retreat",
    location: "Tamil Nadu",
    category: "Residential",
    plotSize: "27 dismils",
    floors: "G+1",
    year: "2024",
    status: "Completed",
    scope: ["Planning & Design", "Front Elevation Development", "Residential Construction"],
    description: "Renovation and extension with elevation development",
    heroImage: "/projects/weekend-retreat-tamil-nadu/hero.svg",
    galleryStages: [
      {
        stage: "Existing Structure",
        images: ["/projects/weekend-retreat-tamil-nadu/gallery/01-existing.svg"]
      },
      {
        stage: "Renovation Work",
        images: ["/projects/weekend-retreat-tamil-nadu/gallery/02-renovation.svg"]
      },
      {
        stage: "Final Elevation",
        images: ["/projects/weekend-retreat-tamil-nadu/gallery/03-elevation.svg"]
      }
    ]
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map(p => p.slug)
}
