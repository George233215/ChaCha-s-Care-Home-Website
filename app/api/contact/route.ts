import { submitContact } from '@/lib/sanity'
import { NextRequest, NextResponse } from 'next/server'

const interestedInMap: Record<string, string> = {
  general: 'General Inquiry',
  resident: 'Resident Inquiry',
  service: 'Service Information',
  partnership: 'Partnership',
  other: 'Other',
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function sendContactEmail(params: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  interestedIn: string
}) {
  const resendApiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  if (!resendApiKey || !toEmail || !fromEmail) {
    throw new Error('Missing email config: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL')
  }

  const interestedLabel = interestedInMap[params.interestedIn] || 'General Inquiry'
  const emailSubject = `[${interestedLabel}] ${params.subject}`
  const safeMessage = escapeHtml(params.message).replace(/\n/g, '<br/>')
  const safeSubject = escapeHtml(params.subject)
  const safeName = `${escapeHtml(params.firstName)} ${escapeHtml(params.lastName)}`
  const safeEmail = escapeHtml(params.email)
  const safePhone = escapeHtml(params.phone || 'Not provided')

  const html = `
    <h2>New Contact Inquiry</h2>
    <p><strong>Interested In:</strong> ${interestedLabel}</p>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Phone:</strong> ${safePhone}</p>
    <p><strong>Subject:</strong> ${safeSubject}</p>
    <p><strong>Message:</strong></p>
    <p>${safeMessage}</p>
  `

  const text = [
    'New Contact Inquiry',
    `Interested In: ${interestedLabel}`,
    `Name: ${params.firstName} ${params.lastName}`,
    `Email: ${params.email}`,
    `Phone: ${params.phone || 'Not provided'}`,
    `Subject: ${params.subject}`,
    '',
    'Message:',
    params.message,
  ].join('\n')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: params.email,
      subject: emailSubject,
      html,
      text,
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Email send failed (${response.status}): ${details}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const interestedIn = body.interestedIn || 'general'
    const interestedLabel = interestedInMap[interestedIn] || 'General Inquiry'
    const trackingSubject = `[${interestedLabel}] ${body.subject}`

    // Submit to Sanity
    const sanityResult = await submitContact({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || '',
      subject: trackingSubject,
      message: body.message,
      interestedIn,
    })

    try {
      await sendContactEmail({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone || '',
        subject: body.subject,
        message: body.message,
        interestedIn,
      })
    } catch (emailError) {
      console.error('Contact email error:', emailError)
      return NextResponse.json(
        {
          message: 'Inquiry saved, but email notification failed.',
          saved: true,
          emailed: false,
          result: sanityResult,
        },
        { status: 202 }
      )
    }

    return NextResponse.json(
      {
        message: 'Inquiry submitted successfully.',
        saved: true,
        emailed: true,
        result: sanityResult,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
