'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/Layout/Header'
import { Sidebar } from '@/components/Layout/Sidebar'
import { ChallengeList } from '@/components/Challenges/ChallengeList'
import { useChallengeStore } from '@/lib/stores/useChallengeStore'

export default function ChallengesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { setChallenges, setCurrentChallenge } = useChallengeStore()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  const { data: challengesData, isLoading } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const response = await fetch('/api/challenges')
      if (!response.ok) throw new Error('Failed to fetch challenges')
      return response.json()
    },
    enabled: !!session,
  })

  useEffect(() => {
    if (challengesData?.challenges) {
      setChallenges(challengesData.challenges)
    }
  }, [challengesData, setChallenges])

  const handleSelectChallenge = (challenge: any) => {
    setCurrentChallenge(challenge)
    router.push(`/challenges/${challenge.id}`)
  }

  if (status === 'loading' || isLoading) {
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
          <div className="p-6">
            <ChallengeList 
              challenges={challengesData?.challenges || []}
              onSelectChallenge={handleSelectChallenge}
            />
          </div>
        </main>
      </div>
    </div>
  )
}