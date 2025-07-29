import { create } from 'zustand'

interface Repository {
  id: number
  name: string
  fullName: string
  description: string
  language: string
  stars: number
  url: string
  updatedAt: string
}

interface ReviewResult {
  id: string
  repositoryName: string
  branch: string
  findings: Array<{
    file: string
    line: number
    severity: 'critical' | 'warning' | 'suggestion'
    message: string
    suggestion: string
    category: 'security' | 'performance' | 'best-practices'
  }>
  overallScore: number
  reviewedAt: string
}

interface GithubState {
  repositories: Repository[]
  selectedRepository: Repository | null
  reviews: ReviewResult[]
  isLoading: boolean
  error: string | null
  setRepositories: (repos: Repository[]) => void
  setSelectedRepository: (repo: Repository | null) => void
  addReview: (review: ReviewResult) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useGithubStore = create<GithubState>()((set) => ({
  repositories: [],
  selectedRepository: null,
  reviews: [],
  isLoading: false,
  error: null,
  setRepositories: (repos) => set({ repositories: repos }),
  setSelectedRepository: (repo) => set({ selectedRepository: repo }),
  addReview: (review) => set((state) => ({ reviews: [review, ...state.reviews] })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))