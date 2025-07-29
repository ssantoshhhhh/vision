import { NextRequest, NextResponse } from 'next/server'
import { getDebugHelp } from '@/lib/openai'
import { openai } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { error, code } = await request.json()

    const prompt = `Explain this error and provide solutions: ${error}
    ${code ? `\nCode context:\n${code}` : ''}
    
    Provide a response with:
    1. Clear explanation of the error
    2. 3 specific solutions with code examples  
    3. Best practices to prevent similar issues`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      stream: true,
    })

    // Create a readable stream from the response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || ''
          if (text) {
            controller.enqueue(new TextEncoder().encode(text))
          }
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Error in debug assistant:', error)
    return NextResponse.json({ error: 'Failed to get debug help' }, { status: 500 })
  }
}