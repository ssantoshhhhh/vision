'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Brain,
  Send,
  Code,
  AlertCircle,
  Lightbulb,
  Copy,
  Check
} from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface DebugSession {
  id: string
  error: string
  code?: string
  response: string
  timestamp: Date
}

export function DebugAssistant() {
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [sessions] = useState<DebugSession[]>([])
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    if (!error.trim()) return

    setIsLoading(true)
    setResponse('')

    try {
      const res = await fetch('/api/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error, code })
      })

      if (!res.ok) throw new Error('Failed to get debug help')

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let fullResponse = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        fullResponse += chunk
        setResponse(fullResponse)
      }
    } catch (error) {
      console.error('Debug error:', error)
      setResponse('Sorry, I encountered an error while analyzing your problem. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>AI Debug Assistant</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              GPT-4 Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Error Message or Description *
            </label>
            <Textarea
              placeholder="Paste your error message or describe the issue you're facing..."
              value={error}
              onChange={(e) => setError(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Code Context (Optional)
            </label>
            <Textarea
              placeholder="Paste the relevant code that's causing issues..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={8}
              className="resize-none font-mono text-sm"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!error.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Get Debug Help
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Response Section */}
      {(response || isLoading) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                  <span>AI Analysis</span>
                </CardTitle>
                {response && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(response)}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoading && !response ? (
                <div className="space-y-3">
                  <div className="animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm text-slate-700">
                    {response}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-sky-600" />
            <span>Debug Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-slate-900">For Better Results:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Include the full error message</li>
                <li>• Provide relevant code context</li>
                <li>• Mention your programming language</li>
                <li>• Describe what you expected vs. what happened</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-slate-900">Common Error Types:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Syntax errors and typos</li>
                <li>• Logic and algorithm issues</li>
                <li>• Runtime and performance problems</li>
                <li>• API and integration errors</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}