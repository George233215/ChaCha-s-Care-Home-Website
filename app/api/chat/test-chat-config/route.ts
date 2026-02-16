import { NextResponse } from 'next/server'

export async function GET() {
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
  const hasGeminiKey = Boolean(
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GENERATIVE_AI_API_KEY,
  )

  return NextResponse.json(
    {
      message: 'Chat config test endpoint is available.',
      gemini: {
        hasApiKey: hasGeminiKey,
        model,
      },
      sanity: {
        projectIdSet: Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      },
    },
    { status: 200 }
  )
}
