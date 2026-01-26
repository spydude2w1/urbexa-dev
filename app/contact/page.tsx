"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

type FormData = {
  service: string
  projectCategory: string
  projectType: string
  floors: string
  location: string
  plotSize: string
  builtUpArea: string
  siteStatus: string
  fullName: string
  email: string
  phone: string
}

const services = [
  "Cradle-to-Completion House Development",
  "Residential Construction", 
  "Commercial Construction",
  "Approvals & Regulatory",
  "Architectural Planning & Design",
  "Front Elevation Development"
]

const residentialTypes = [
  "Independent house",
  "Villa / Duplex", 
  "Apartment building",
  "Renovation / Extension"
]

const commercialTypes = [
  "Office building",
  "Retail / Mixed-use",
  "Institutional / Utility building"
]

const siteStatuses = [
  "Vacant plot",
  "Existing structure",
  "Under planning", 
  "Under construction"
]

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState<FormData>({
    service: "",
    projectCategory: "",
    projectType: "",
    floors: "",
    location: "",
    plotSize: "",
    builtUpArea: "",
    siteStatus: "",
    fullName: "",
    email: "",
    phone: ""
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError("")
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        // Auto scroll to top on successful submission
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError("Something went wrong. Please try again or contact us directly.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.service !== ""
      case 2: return formData.projectCategory !== "" && formData.projectType !== "" && formData.floors !== ""
      case 3: return formData.location !== "" && formData.plotSize !== "" && formData.siteStatus !== ""
      case 4: return formData.fullName !== "" && formData.email !== ""
      default: return false
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center animate-settle opacity-0">
          <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-8">
            Thank You
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your project details have been received. Our team will review the information and respond at the earliest.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <header className="mb-16 md:mb-20">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6 animate-settle opacity-0">
            Project Enquiry
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl animate-settle opacity-0 animation-delay-200">
            Share basic project details to get started. This helps us to understand scope and respond appropriately.
          </p>
        </header>

        {/* Contact Details Section */}
        <section className="mb-12 animate-settle opacity-0 animation-delay-300">
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <h2 className="font-serif text-xl font-light text-foreground mb-6">
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="mailto:enquire@urbexagroup.in"
                className="flex flex-col transition-colors duration-300 hover:text-gold"
              >
                <span className="text-sm text-muted-foreground mb-1">Email</span>
                <span className="text-base text-foreground">enquire@urbexagroup.in</span>
              </a>
              <a
                href="https://wa.me/919945356557"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col transition-colors duration-300 hover:text-gold"
              >
                <span className="text-sm text-muted-foreground mb-1">Phone / WhatsApp</span>
                <span className="text-base text-foreground">+91 9945356557</span>
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mb-12 animate-settle opacity-0 animation-delay-400">
          <div className="h-px bg-border" />
        </div>

        {/* Progress Indicator */}
        <div className="mb-12 animate-settle opacity-0 animation-delay-500">
          <div className="flex items-center justify-between max-w-md">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-300 ${
                  step <= currentStep ? 'bg-gold text-background' : 'bg-border text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 4 && <div className={`w-16 h-px ml-4 transition-colors duration-300 ${
                  step < currentStep ? 'bg-gold' : 'bg-border'
                }`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-12 animate-settle opacity-0 animation-delay-600">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-light text-foreground mb-8">
                Select Primary Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <label key={service} className="cursor-pointer">
                    <input
                      type="radio"
                      name="service"
                      value={service}
                      checked={formData.service === service}
                      onChange={(e) => updateFormData('service', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 border rounded-lg transition-all duration-300 ${
                      formData.service === service 
                        ? 'border-gold bg-gold/5' 
                        : 'border-border hover:border-gold/30'
                    }`}>
                      <span className="text-sm text-foreground">{service}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Project Type & Scale */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <h2 className="font-serif text-xl font-light text-foreground">
                Project Type & Scale
              </h2>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-4">Project Category</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Residential', 'Commercial'].map((category) => (
                    <label key={category} className="cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={formData.projectCategory === category}
                        onChange={(e) => {
                          updateFormData('projectCategory', e.target.value)
                          updateFormData('projectType', '')
                        }}
                        className="sr-only"
                      />
                      <div className={`p-4 border rounded-lg text-center transition-all duration-300 ${
                        formData.projectCategory === category 
                          ? 'border-gold bg-gold/5' 
                          : 'border-border hover:border-gold/30'
                      }`}>
                        <span className="text-sm text-foreground">{category}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {formData.projectCategory && (
                <div>
                  <label className="block text-sm text-muted-foreground mb-4">Project Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(formData.projectCategory === 'Residential' ? residentialTypes : commercialTypes).map((type) => (
                      <label key={type} className="cursor-pointer">
                        <input
                          type="radio"
                          name="projectType"
                          value={type}
                          checked={formData.projectType === type}
                          onChange={(e) => updateFormData('projectType', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`p-4 border rounded-lg transition-all duration-300 ${
                          formData.projectType === type 
                            ? 'border-gold bg-gold/5' 
                            : 'border-border hover:border-gold/30'
                        }`}>
                          <span className="text-sm text-foreground">{type}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Number of floors (excluding basement)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.floors}
                  onChange={(e) => updateFormData('floors', e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                  placeholder="e.g., 2"
                />
                <p className="text-xs text-muted-foreground mt-2">Example: G+1 = 2 floors</p>
              </div>
            </div>
          )}

          {/* Step 3: Site Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-light text-foreground mb-8">
                Site Details
              </h2>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Project Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                  placeholder="City / Area"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Approximate Plot Size</label>
                <input
                  type="text"
                  value={formData.plotSize}
                  onChange={(e) => updateFormData('plotSize', e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                  placeholder="e.g., 30x40 ft or 1200 sq ft"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Expected Built-up Area (Optional)</label>
                <input
                  type="text"
                  value={formData.builtUpArea}
                  onChange={(e) => updateFormData('builtUpArea', e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                  placeholder="e.g., 2500 sq ft"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-4">Current Site Status</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {siteStatuses.map((status) => (
                    <label key={status} className="cursor-pointer">
                      <input
                        type="radio"
                        name="siteStatus"
                        value={status}
                        checked={formData.siteStatus === status}
                        onChange={(e) => updateFormData('siteStatus', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 border rounded-lg transition-all duration-300 ${
                        formData.siteStatus === status 
                          ? 'border-gold bg-gold/5' 
                          : 'border-border hover:border-gold/30'
                      }`}>
                        <span className="text-sm text-foreground">{status}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-light text-foreground mb-8">
                Contact Details
              </h2>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Phone Number (Optional but recommended)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold/30 transition-colors duration-300"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                currentStep === 1 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <ChevronLeft size={16} />
              <span className="text-sm">Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  canProceed() 
                    ? 'bg-gold text-background hover:bg-gold/90' 
                    : 'opacity-50 cursor-not-allowed bg-muted'
                }`}
              >
                <span className="text-sm">Next</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className={`px-8 py-3 rounded-lg transition-all duration-300 ${
                  canProceed() && !isSubmitting
                    ? 'bg-gold text-background hover:bg-gold/90' 
                    : 'opacity-50 cursor-not-allowed bg-muted'
                }`}
              >
                <span className="text-sm">
                  {isSubmitting ? 'Submitting...' : 'Request Project Review'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}