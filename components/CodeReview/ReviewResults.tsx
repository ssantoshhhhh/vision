'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Code,
  Zap
} from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Finding {
  file: string
  line: number
  severity: 'critical' | 'warning' | 'suggestion'
  message: string
  suggestion: string
  category: 'security' | 'performance' | 'best-practices'
}

interface ReviewResultsProps {
  findings: Finding[]
  overallScore: number
  summary: string
}

const severityConfig = {
  critical: { icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  warning: { icon: AlertCircle, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  suggestion: { icon: Info, color: 'text-sky-600', bgColor: 'bg-sky-50', borderColor: 'border-sky-200' }
}

const categoryColors = {
  security: 'bg-red-100 text-red-700',
  performance: 'bg-amber-100 text-amber-700',
  'best-practices': 'bg-sky-100 text-sky-700'
}

export function ReviewResults({ findings, overallScore, summary }: ReviewResultsProps) {
  const criticalCount = findings.filter(f => f.severity === 'critical').length
  const warningCount = findings.filter(f => f.severity === 'warning').length
  const suggestionCount = findings.filter(f => f.severity === 'suggestion').length

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600'
    if (score >= 70) return 'text-sky-600'
    if (score >= 50) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <span>Code Review Complete</span>
              </span>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}
                </div>
                <div className="text-sm text-slate-600">Overall Score</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={overallScore} className="h-3" />
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>{criticalCount} Critical</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span>{warningCount} Warnings</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                  <span>{suggestionCount} Suggestions</span>
                </div>
              </div>

              <p className="text-sm text-slate-600">{summary}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Findings */}
      <div className="space-y-4">
        {findings.map((finding, index) => {
          const config = severityConfig[finding.severity]
          const Icon = config.icon

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`${config.borderColor} border-l-4`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${config.color}`} />
                      <Badge variant="outline" className={config.color}>
                        {finding.severity.toUpperCase()}
                      </Badge>
                      <Badge className={categoryColors[finding.category]}>
                        {finding.category.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500">
                      {finding.file}:{finding.line}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-700">{finding.message}</p>
                  
                  <div className={`rounded-lg p-3 ${config.bgColor}`}>
                    <div className="flex items-start space-x-2">
                      <Zap className={`h-4 w-4 mt-0.5 ${config.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">AI Suggestion:</p>
                        <p className="text-sm text-slate-700">{finding.suggestion}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Code className="mr-1 h-3 w-3" />
                      View Code
                    </Button>
                    <Button size="sm" variant="outline">
                      Apply Fix
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}