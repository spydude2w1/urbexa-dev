import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { use } from "react"
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects"
import { ProjectGallery } from "@/components/projects/project-gallery"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} — Urbexa Projects`,
    description: `${project.description}. ${project.category} construction project in ${project.location}.`,
  }
}

export default function ProjectPage({ params }: Props) {
  const { slug } = use(params)
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-settle opacity-0">
          <Link
            href="/work"
            className="text-sm text-muted-foreground hover:text-gold inline-flex items-center gap-2"
            style={{
              transition: "color var(--motion-duration-normal) var(--motion-ease-out)"
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Our Work
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="mb-16 md:mb-20">
          <div className="relative aspect-[21/9] rounded-lg overflow-hidden bg-muted mb-8 animate-settle opacity-0 animation-delay-100">
            <div className="absolute inset-0 bg-gradient-to-br from-card to-muted" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-4xl">
                <div className="inline-block px-3 py-1 text-xs tracking-wide uppercase bg-background/60 backdrop-blur-sm text-foreground rounded-full border border-border/50 mb-4">
                  {project.category}
                </div>
                <h1 className="font-serif text-3xl md:text-5xl font-light text-foreground mb-4">
                  {project.title}
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.status}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Snapshot Panel */}
        <section className="mb-20 md:mb-24">
          <div className="bg-card border border-border rounded-lg p-8 md:p-10 animate-settle opacity-0 animation-delay-200">
            <h2 className="font-serif text-2xl font-light text-foreground mb-8">
              Project Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {project.plotSize && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Plot Size</p>
                  <p className="text-base text-foreground">{project.plotSize}</p>
                </div>
              )}
              {project.floors && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Floors</p>
                  <p className="text-base text-foreground">{project.floors}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Year</p>
                <p className="text-base text-foreground">{project.year}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Status</p>
                <p className="text-base text-foreground">{project.status}</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Scope Handled</p>
              <div className="flex flex-wrap gap-2">
                {project.scope.map((item, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1.5 text-xs bg-background border border-border rounded-full text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Progress Timeline Gallery */}
        {project.galleryStages && project.galleryStages.length > 0 && (
          <ProjectGallery stages={project.galleryStages} projectTitle={project.title} />
        )}

        {/* Back Link */}
        <section className="mt-20 md:mt-24 pt-12 border-t border-border">
          <Link
            href="/work"
            className="inline-block text-sm tracking-widest uppercase text-foreground/70 pb-2 hover:text-gold"
            style={{
              borderBottom: "1px solid rgba(239, 210, 162, 0.3)",
              transition: "color var(--motion-duration-normal) var(--motion-ease-out)"
            }}
            data-hoverable
          >
            View All Projects
          </Link>
        </section>
      </div>
    </div>
  )
}
