import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  githubUsername: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  preferredLanguages: string[]
  learningGoals: string[]
  completedChallenges: number
  totalScore: number
}

interface UserState {
  profile: UserProfile | null
  isAuthenticated: boolean
  currentStreak: number
  weeklyProgress: number
  setProfile: (profile: UserProfile) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  incrementStreak: () => void
  updateWeeklyProgress: (progress: number) => void
  signOut: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      isAuthenticated: false,
      currentStreak: 0,
      weeklyProgress: 0,
      setProfile: (profile) => set({ profile, isAuthenticated: true }),
      updateProfile: (updates) => {
        const currentProfile = get().profile
        if (currentProfile) {
          set({ profile: { ...currentProfile, ...updates } })
        }
      },
      incrementStreak: () => set((state) => ({ currentStreak: state.currentStreak + 1 })),
      updateWeeklyProgress: (progress) => set({ weeklyProgress: progress }),
      signOut: () => set({ profile: null, isAuthenticated: false, currentStreak: 0, weeklyProgress: 0 }),
    }),
    {
      name: 'user-store',
    }
  )
)