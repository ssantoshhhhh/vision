'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/Layout/Header'
import { Sidebar } from '@/components/Layout/Sidebar'
import { StatsGrid } from '@/components/Dashboard/StatsGrid'
import { RecentActivity } from '@/components/Dashboard/RecentActivity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp,
  Target,
  Brain,
  Calendar,
  ArrowRight
} from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

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
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    Welcome back, {session.user?.name?.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Ready to level up your coding skills today?
                  </p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1">
                  <Calendar className="mr-1 h-3 w-3" />
                  Day 7 Streak
                </Badge>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <StatsGrid />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-between"
                      onClick={() => router.push('/challenges')}
                    >
                      <div className="flex items-center">
                        <Target className="mr-2 h-4 w-4" />
                        Start Challenge
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => router.push('/code-review')}
                    >
                      <div className="flex items-center">
                        <Brain className="mr-2 h-4 w-4" />
                        Review Code
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => router.push('/debug')}
                    >
                      <div className="flex items-center">
                        <Brain className="mr-2 h-4 w-4" />
                        Debug Help
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Today's Goal */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Today's Goal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Complete 2 challenges</span>
                        <Badge variant="secondary">1/2</Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full w-1/2"></div>
                      </div>
                      <p className="text-xs text-slate-500">
                        You're halfway there! Keep it up! 🚀
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}