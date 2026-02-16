import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    { message: 'Chat config test endpoint is available.' },
    { status: 200 }
  )
}
