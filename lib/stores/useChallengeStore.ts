import { create } from 'zustand'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  language: string
  category: string
  testCases: Array<{
    input: string
    expectedOutput: string
  }>
  starterCode: string
  solution: string
  hints: string[]
  completed: boolean
  score: number
}

interface ChallengeState {
  challenges: Challenge[]
  currentChallenge: Challenge | null
  userCode: string
  currentHint: number
  isRunning: boolean
  testResults: Array<{
    passed: boolean
    input: string
    expected: string
    actual: string
  }>
  setChallenges: (challenges: Challenge[]) => void
  setCurrentChallenge: (challenge: Challenge | null) => void
  setUserCode: (code: string) => void
  nextHint: () => void
  setRunning: (running: boolean) => void
  setTestResults: (results: any[]) => void
  completeChallenge: (score: number) => void
}

export const useChallengeStore = create<ChallengeState>()((set, get) => ({
  challenges: [],
  currentChallenge: null,
  userCode: '',
  currentHint: 0,
  isRunning: false,
  testResults: [],
  setChallenges: (challenges) => set({ challenges }),
  setCurrentChallenge: (challenge) => set({ 
    currentChallenge: challenge, 
    userCode: challenge?.starterCode || '',
    currentHint: 0,
    testResults: []
  }),
  setUserCode: (code) => set({ userCode: code }),
  nextHint: () => {
    const { currentChallenge, currentHint } = get()
    if (currentChallenge && currentHint < currentChallenge.hints.length - 1) {
      set({ currentHint: currentHint + 1 })
    }
  },
  setRunning: (running) => set({ isRunning: running }),
  setTestResults: (results) => set({ testResults: results }),
  completeChallenge: (score) => {
    const { currentChallenge, challenges } = get()
    if (currentChallenge) {
      const updatedChallenges = challenges.map(c => 
        c.id === currentChallenge.id 
          ? { ...c, completed: true, score }
          : c
      )
      set({ challenges: updatedChallenges })
    }
  },
}))