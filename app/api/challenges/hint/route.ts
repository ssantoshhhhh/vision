import { NextRequest, NextResponse } from 'next/server'
import { getChallengeHint } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { challenge, currentCode, hintLevel } = await request.json()

    const hint = await getChallengeHint(challenge, currentCode, hintLevel)
    
    return NextResponse.json({ hint })
  } catch (error) {
    console.error('Error getting hint:', error)
    return NextResponse.json({ error: 'Failed to get hint' }, { status: 500 })
  }
}