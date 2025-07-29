'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Target,
  Search,
  Filter,
  Clock,
  Trophy,
  CheckCircle,
  PlayCircle
} from 'lucide-react'
import { useChallengeStore } from '@/lib/stores/useChallengeStore'

const difficultyColors = {
  easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  hard: 'bg-red-100 text-red-700 border-red-200'
}

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  language: string
  category: string
  completed: boolean
  score: number
}

interface ChallengeListProps {
  challenges: Challenge[]
  onSelectChallenge: (challenge: Challenge) => void
}

export function ChallengeList({ challenges, onSelectChallenge }: ChallengeListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === 'all' || challenge.difficulty === difficultyFilter
    const matchesCategory = categoryFilter === 'all' || challenge.category === categoryFilter
    
    return matchesSearch && matchesDifficulty && matchesCategory
  })

  const categories = Array.from(new Set(challenges.map(c => c.category)))

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-emerald-600" />
            <span>Coding Challenges</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={difficultyColors[challenge.difficulty]}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {challenge.language}
                    </Badge>
                  </div>
                  {challenge.completed && (
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  )}
                </div>
                <CardTitle className="text-lg group-hover:text-emerald-600 transition-colors">
                  {challenge.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600 line-clamp-2">
                  {challenge.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="capitalize">{challenge.category}</span>
                  {challenge.completed && (
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-3 w-3" />
                      <span>{challenge.score}%</span>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full"
                  onClick={() => onSelectChallenge(challenge)}
                  variant={challenge.completed ? "outline" : "default"}
                >
                  {challenge.completed ? (
                    <>
                      <Trophy className="mr-2 h-4 w-4" />
                      Retry Challenge
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start Challenge
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No challenges found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}
    </div>
  )
}