import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    const requiredFields = ['service', 'projectCategory', 'projectType', 'floors', 'location', 'plotSize', 'siteStatus', 'fullName', 'email']
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Sanitize inputs
    const sanitizedData = {
      service: String(formData.service).trim(),
      projectCategory: String(formData.projectCategory).trim(),
      projectType: String(formData.projectType).trim(),
      floors: String(formData.floors).trim(),
      location: String(formData.location).trim(),
      plotSize: String(formData.plotSize).trim(),
      builtUpArea: String(formData.builtUpArea || '').trim(),
      siteStatus: String(formData.siteStatus).trim(),
      fullName: String(formData.fullName).trim(),
      email: String(formData.email).trim(),
      phone: String(formData.phone || '').trim()
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'shivambiswal01@gmail.com'

    // Email subject
    const subject = `${sanitizedData.fullName} @ Urbexa Projects | New Project Enquiry — ${sanitizedData.service} | ${sanitizedData.location}`

    // Email body
    const emailBody = `
New Project Enquiry Details:

SERVICE SELECTED:
${sanitizedData.service}

PROJECT DETAILS:
• Category: ${sanitizedData.projectCategory}
• Type: ${sanitizedData.projectType}
• Number of floors: ${sanitizedData.floors}
• Location: ${sanitizedData.location}
• Plot size: ${sanitizedData.plotSize}
• Built-up area: ${sanitizedData.builtUpArea || 'Not specified'}
• Site status: ${sanitizedData.siteStatus}

CONTACT INFORMATION:
• Name: ${sanitizedData.fullName}
• Email: ${sanitizedData.email}
• Phone: ${sanitizedData.phone || 'Not provided'}

---
This enquiry was submitted through the Urbexa Projects website.
    `.trim()

    // Send internal email to Urbexa
    await resend.emails.send({
      from: 'Urbexa Projects <onboarding@resend.dev>',
      to: [receiverEmail],
      subject: subject,
      text: emailBody,
    })

    // Send acknowledgement email to user
    const acknowledgementBody = `Thank you for sharing your project details.

Our team will review the information and respond if further clarification is required.

Best regards,
Development Team | Urbexa Projects`

    await resend.emails.send({
      from: 'Urbexa Projects <onboarding@resend.dev>',
      to: [sanitizedData.email],
      subject: 'Project Details Received — Urbexa Projects',
      text: acknowledgementBody,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}