'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  TrendingUp,
  Target,
  Code2,
  Clock,
  Trophy,
  GitBranch,
  Brain,
  Zap
} from 'lucide-react'

const stats = [
  {
    title: 'Challenges Completed',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: Target,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100'
  },
  {
    title: 'Code Reviews',
    value: '8',
    change: '+4',
    trend: 'up',
    icon: GitBranch,
    color: 'text-sky-600',
    bgColor: 'bg-sky-100'
  },
  {
    title: 'Current Streak',
    value: '7 days',
    change: 'Best: 12',
    trend: 'neutral',
    icon: Zap,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100'
  },
  {
    title: 'Total Score',
    value: '2,840',
    change: '+340',
    trend: 'up',
    icon: Trophy,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }
]

const skillProgress = [
  { skill: 'JavaScript', progress: 85, level: 'Advanced' },
  { skill: 'React', progress: 72, level: 'Intermediate' },
  { skill: 'Node.js', progress: 68, level: 'Intermediate' },
  { skill: 'TypeScript', progress: 45, level: 'Beginner' }
]

export function StatsGrid() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="flex items-center space-x-1 text-xs text-slate-600">
                    <span className={
                      stat.trend === 'up' ? 'text-emerald-600' :
                      stat.trend === 'down' ? 'text-red-600' :
                      'text-slate-600'
                    }>
                      {stat.change}
                    </span>
                    <span>from last week</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-emerald-600" />
              <span>Skill Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillProgress.map((skill, index) => (
              <motion.div
                key={skill.skill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {skill.skill}
                  </span>
                  <Badge 
                    variant="outline"
                    className={
                      skill.level === 'Advanced' ? 'border-emerald-500 text-emerald-700' :
                      skill.level === 'Intermediate' ? 'border-sky-500 text-sky-700' :
                      'border-amber-500 text-amber-700'
                    }
                  >
                    {skill.level}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={skill.progress} className="flex-1" />
                  <span className="text-xs text-slate-600 w-10 text-right">
                    {skill.progress}%
                  </span>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}