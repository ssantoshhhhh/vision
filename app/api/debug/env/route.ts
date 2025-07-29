import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    GITHUB_CLIENT_ID: !!process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: !!process.env.GITHUB_CLIENT_SECRET,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
  }

  return NextResponse.json(envCheck)
} 