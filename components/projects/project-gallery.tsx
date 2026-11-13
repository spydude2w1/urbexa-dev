"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

type GalleryStage = {
  stage: string
  images: string[]
}

type Props = {
  stages: GalleryStage[]
  projectTitle: string
}

export function ProjectGallery({ stages, projectTitle }: Props) {
  const [selectedImage, setSelectedImage] = useState<{ stageIndex: number; imageIndex: number } | null>(null)

  const allImages = stages.flatMap(stage => stage.images)
  const currentImageIndex = selectedImage
    ? stages.slice(0, selectedImage.stageIndex).reduce((acc, stage) => acc + stage.images.length, 0) + selectedImage.imageIndex
    : -1

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      let remaining = currentImageIndex - 1
      for (let i = 0; i < stages.length; i++) {
        if (remaining < stages[i].images.length) {
          setSelectedImage({ stageIndex: i, imageIndex: remaining })
          break
        }
        remaining -= stages[i].images.length
      }
    }
  }

  const handleNext = () => {
    if (currentImageIndex < allImages.length - 1) {
      let remaining = currentImageIndex + 1
      for (let i = 0; i < stages.length; i++) {
        if (remaining < stages[i].images.length) {
          setSelectedImage({ stageIndex: i, imageIndex: remaining })
          break
        }
        remaining -= stages[i].images.length
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedImage) return
    if (e.key === "Escape") setSelectedImage(null)
    if (e.key === "ArrowLeft") handlePrevious()
    if (e.key === "ArrowRight") handleNext()
  }

  useState(() => {
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown as any)
      return () => window.removeEventListener("keydown", handleKeyDown as any)
    }
  })

  return (
    <>
      <section className="mb-20 md:mb-24">
        <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-12 animate-settle opacity-0 animation-delay-300">
          Progress Timeline
        </h2>

        <div className="space-y-16">
          {stages.map((stage, stageIndex) => (
            <div key={stageIndex} className="animate-settle opacity-0" style={{ animationDelay: `${(stageIndex + 4) * 100}ms` }}>
              <h3 className="font-serif text-xl font-light text-foreground mb-6">
                {stage.stage}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stage.images.map((image, imageIndex) => (
                  <button
                    key={imageIndex}
                    onClick={() => setSelectedImage({ stageIndex, imageIndex })}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted hover-lift group"
                    data-hoverable
                  >
                    <img
                      src={image}
                      alt={`${stage.stage} - Image ${imageIndex + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/10 group-hover:bg-background/5"
                      style={{
                        transition: "background-color var(--motion-duration-normal) var(--motion-ease-out)"
                      }} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{
            background: "rgba(12, 12, 14, 0.95)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)"
          }}
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-2 text-foreground hover:text-gold rounded-full bg-background/50 backdrop-blur-sm border border-border/50"
            style={{
              transition: "color var(--motion-duration-fast) var(--motion-ease-out)"
            }}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Navigation Arrows */}
          {currentImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-4 md:left-8 p-3 text-foreground hover:text-gold rounded-full bg-background/50 backdrop-blur-sm border border-border/50"
              style={{
                transition: "color var(--motion-duration-fast) var(--motion-ease-out)"
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {currentImageIndex < allImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 md:right-8 p-3 text-foreground hover:text-gold rounded-full bg-background/50 backdrop-blur-sm border border-border/50"
              style={{
                transition: "color var(--motion-duration-fast) var(--motion-ease-out)"
              }}
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-6xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src={allImages[currentImageIndex]}
                alt={`${stages[selectedImage.stageIndex].stage} - Image ${selectedImage.imageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {stages[selectedImage.stageIndex].stage} • {currentImageIndex + 1} of {allImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
