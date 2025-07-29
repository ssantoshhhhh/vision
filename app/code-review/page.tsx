'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Header } from '@/components/Layout/Header'
import { Sidebar } from '@/components/Layout/Sidebar'
import { ReviewResults } from '@/components/CodeReview/ReviewResults'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Github as GitHub, Search, Play, GitBranch, Star, Clock, AlertTriangle } from 'lucide-react'
import { useGithubStore } from '@/lib/stores/useGithubStore'

export default function CodeReviewPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { 
    repositories, 
    selectedRepository, 
    reviews,
    isLoading,
    setRepositories, 
    setSelectedRepository,
    addReview,
    setLoading 
  } = useGithubStore()
  
  const [selectedFiles, setSelectedFiles] = useState<string[]>(['src/App.tsx', 'src/components/Button.tsx'])
  const [analysisType, setAnalysisType] = useState<'security' | 'performance' | 'best-practices'>('best-practices')
  const [reviewResult, setReviewResult] = useState<any>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  const { data: reposData } = useQuery({
    queryKey: ['github-repositories'],
    queryFn: async () => {
      const response = await fetch('/api/github/repositories')
      if (!response.ok) throw new Error('Failed to fetch repositories')
      return response.json()
    },
    enabled: !!session,
  })

  useEffect(() => {
    if (reposData?.repositories) {
      setRepositories(reposData.repositories)
    }
  }, [reposData, setRepositories])

  const handleStartReview = async () => {
    if (!selectedRepository) return

    setLoading(true)
    try {
      const [owner, repo] = selectedRepository.fullName.split('/')
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner,
          repo,
          files: selectedFiles,
          analysisType
        })
      })

      if (!response.ok) throw new Error('Review failed')
      
      const result = await response.json()
      
      // Combine results into a single review
      const combinedFindings = result.results.flatMap((r: any) => 
        r.findings?.map((f: any) => ({ ...f, file: r.file })) || []
      )
      
      const averageScore = result.results.reduce((acc: number, r: any) => 
        acc + (r.overallScore || 0), 0) / result.results.length

      const reviewData = {
        id: Date.now().toString(),
        repositoryName: selectedRepository.fullName,
        branch: 'main',
        findings: combinedFindings,
        overallScore: Math.round(averageScore),
        reviewedAt: new Date().toISOString(),
        summary: `Analyzed ${selectedFiles.length} files for ${analysisType.replace('-', ' ')} issues.`
      }

      setReviewResult(reviewData)
      addReview(reviewData)
    } catch (error) {
      console.error('Review error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Repository Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GitHub className="h-5 w-5 text-slate-600" />
                  <span>AI Code Review</span>
                  <Badge variant="secondary" className="bg-sky-100 text-sky-700">
                    GPT-4 Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Repository</label>
                    <Select
                      value={selectedRepository?.id.toString() || ''}
                      onValueChange={(value) => {
                        const repo = repositories.find(r => r.id.toString() === value)
                        setSelectedRepository(repo || null)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select repository" />
                      </SelectTrigger>
                      <SelectContent>
                        {repositories.map((repo) => (
                          <SelectItem key={repo.id} value={repo.id.toString()}>
                            <div className="flex items-center space-x-2">
                              <span>{repo.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {repo.language}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Analysis Type</label>
                    <Select value={analysisType} onValueChange={(value: any) => setAnalysisType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Security Issues</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="best-practices">Best Practices</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button 
                      onClick={handleStartReview}
                      disabled={!selectedRepository || isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Review
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {selectedRepository && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">{selectedRepository.name}</h3>
                        <p className="text-sm text-slate-600">{selectedRepository.description}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>{selectedRepository.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(selectedRepository.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Review Results */}
            {reviewResult && (
              <ReviewResults
                findings={reviewResult.findings}
                overallScore={reviewResult.overallScore}
                summary={reviewResult.summary}
              />
            )}

            {/* Recent Reviews */}
            {reviews.length > 0 && !reviewResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GitBranch className="h-5 w-5 text-sky-600" />
                    <span>Recent Reviews</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reviews.slice(0, 5).map((review) => (
                      <div key={review.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-slate-900">{review.repositoryName}</h4>
                          <p className="text-sm text-slate-600">
                            {review.findings.length} issues found • {new Date(review.reviewedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={
                              review.overallScore >= 90 ? 'bg-emerald-100 text-emerald-700' :
                              review.overallScore >= 70 ? 'bg-sky-100 text-sky-700' :
                              'bg-red-100 text-red-700'
                            }
                          >
                            {review.overallScore}% Score
                          </Badge>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}