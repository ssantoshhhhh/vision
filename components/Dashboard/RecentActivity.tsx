'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Target,
  GitBranch,
  Brain,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'challenge',
    title: 'Completed "Two Sum" Challenge',
    description: 'Solved in 5 minutes with optimal solution',
    time: '2 hours ago',
    score: 95,
    icon: Target,
    color: 'text-emerald-600'
  },
  {
    id: 2,
    type: 'review',
    title: 'Code Review: React Dashboard',
    description: '3 suggestions applied, security improved',
    time: '4 hours ago',
    score: 88,
    icon: GitBranch,
    color: 'text-sky-600'
  },
  {
    id: 3,
    type: 'debug',
    title: 'Debug Session: useState Hook Error',
    description: 'AI identified closure issue in useEffect',
    time: '1 day ago',
    score: null,
    icon: Brain,
    color: 'text-purple-600'
  },
  {
    id: 4,
    type: 'challenge',
    title: 'Attempted "Binary Tree Traversal"',
    description: 'Partial solution, needs optimization',
    time: '2 days ago',
    score: 72,
    icon: Target,
    color: 'text-amber-600'
  },
  {
    id: 5,
    type: 'review',
    title: 'Code Review: Express API',
    description: '2 critical security issues found',
    time: '3 days ago',
    score: 65,
    icon: GitBranch,
    color: 'text-red-600'
  }
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-slate-600" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="rounded-full bg-slate-100 p-2">
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {activity.title}
                    </p>
                    {activity.score && (
                      <Badge 
                        variant="outline"
                        className={
                          activity.score >= 90 ? 'border-emerald-500 text-emerald-700' :
                          activity.score >= 80 ? 'border-sky-500 text-sky-700' :
                          activity.score >= 70 ? 'border-amber-500 text-amber-700' :
                          'border-red-500 text-red-700'
                        }
                      >
                        {activity.score}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}