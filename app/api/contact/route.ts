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
  submittedAt: string
  status: string
}) {
  const resendApiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL || process.env.CHATBOT_EMAIL || 'Chachacare@gmail.com'
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  if (!resendApiKey || !fromEmail) {
    throw new Error('Missing email config: RESEND_API_KEY, CONTACT_FROM_EMAIL')
  }

  const interestedLabel = interestedInMap[params.interestedIn] || 'General Inquiry'
  const safeMessage = escapeHtml(params.message).replace(/\n/g, '<br/>')
  const safeSubject = escapeHtml(params.subject)
  const safeName = `${escapeHtml(params.firstName)} ${escapeHtml(params.lastName)}`
  const safeEmail = escapeHtml(params.email)
  const safePhone = escapeHtml(params.phone || 'Not provided')
  const safeSubmittedAt = escapeHtml(params.submittedAt)
  const safeStatus = escapeHtml(params.status)

  const html = `
    <h2>New Contact Inquiry</h2>
    <p><strong>Interested In:</strong> ${interestedLabel}</p>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Phone:</strong> ${safePhone}</p>
    <p><strong>Subject:</strong> ${safeSubject}</p>
    <p><strong>Submitted At:</strong> ${safeSubmittedAt}</p>
    <p><strong>Status:</strong> ${safeStatus}</p>
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
    `Submitted At: ${params.submittedAt}`,
    `Status: ${params.status}`,
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
      subject: params.subject,
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
    const firstName = String(body.firstName || '').trim()
    const lastName = String(body.lastName || '').trim()
    const email = String(body.email || '').trim()
    const phone = String(body.phone || '').trim()
    const subject = String(body.subject || '').trim()
    const message = String(body.message || '').trim()
    const interestedIn = String(body.interestedIn || 'general')

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const interestedLabel = interestedInMap[interestedIn] || 'General Inquiry'
    const trackingSubject = `[${interestedLabel}] ${subject}`
    const submittedAt = new Date().toISOString()
    const status = 'new'

    // Submit to Sanity
    const sanityResult = await submitContact({
      firstName,
      lastName,
      email,
      phone,
      subject: trackingSubject,
      message,
      interestedIn,
    })

    const savedSubmittedAt = sanityResult?.submittedAt || submittedAt
    const savedStatus = sanityResult?.status || status

    try {
      await sendContactEmail({
        firstName,
        lastName,
        email,
        phone,
        subject: trackingSubject,
        message,
        interestedIn,
        submittedAt: savedSubmittedAt,
        status: savedStatus,
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

