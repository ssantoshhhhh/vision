import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { fetchFileContent } from '@/lib/github'
import { analyzeCode } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { owner, repo, files, analysisType } = await request.json()

    const results = []
    
    for (const filePath of files) {
      try {
        const content = await fetchFileContent(session.accessToken, owner, repo, filePath)
        const language = filePath.split('.').pop() || 'text'
        
        const analysis = await analyzeCode(content, language, analysisType)
        
        results.push({
          file: filePath,
          ...analysis,
        })
      } catch (error) {
        console.error(`Error analyzing ${filePath}:`, error)
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Error in code review:', error)
    return NextResponse.json({ error: 'Failed to review code' }, { status: 500 })
  }
}