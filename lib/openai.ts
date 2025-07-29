import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function analyzeCode(code: string, language: string, analysisType: 'security' | 'performance' | 'best-practices' = 'best-practices') {
  const prompt = `Analyze this ${language} code for ${analysisType}. Return findings as JSON with this structure:
  {
    "findings": [
      {
        "line": number,
        "severity": "critical|warning|suggestion",
        "message": "Issue description",
        "suggestion": "How to fix",
        "category": "${analysisType}"
      }
    ],
    "overallScore": number (0-100),
    "summary": "Brief overview of code quality"
  }
  
  Code:
  ${code}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.1,
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}

export async function getDebugHelp(error: string, code?: string) {
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
  })

  return response.choices[0].message.content
}

export async function getChallengeHint(challenge: string, currentCode: string, hintLevel: number) {
  const prompts = [
    `Give a very subtle hint for this coding challenge without revealing the solution: ${challenge}. Current code: ${currentCode}. Max 1 sentence.`,
    `Provide a more specific hint about the approach for: ${challenge}. Current code: ${currentCode}. Max 2 sentences.`,
    `Give a detailed hint with pseudocode for: ${challenge}. Current code: ${currentCode}.`
  ]

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompts[Math.min(hintLevel, 2)] }],
    temperature: 0.3,
  })

  return response.choices[0].message.content
}