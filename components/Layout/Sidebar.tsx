'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Code2, Github as GitHub, Target, Brain, BookOpen, TrendingUp, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: TrendingUp },
  { name: 'Code Review', href: '/code-review', icon: GitHub },
  { name: 'Challenges', href: '/challenges', icon: Target },
  { name: 'Debug Assistant', href: '/debug', icon: Brain },
  { name: 'Learning Paths', href: '/learning', icon: BookOpen },
  { name: 'Community', href: '/community', icon: Users },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ width: collapsed ? 64 : 256 }}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "flex h-full flex-col border-r border-slate-200 bg-white",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="rounded-lg bg-emerald-500 p-1.5">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900">DevMentor</span>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed && "px-2",
                    isActive && "bg-emerald-500 text-white hover:bg-emerald-600"
                  )}
                >
                  <Icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
                  {!collapsed && <span>{item.name}</span>}
                </Button>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 space-y-4"
        >
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Weekly Goal</span>
              <Badge variant="secondary">3/5</Badge>
            </div>
            <Progress value={60} className="h-2" />
            <p className="text-xs text-slate-600 mt-1">
              2 more challenges to go!
            </p>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-emerald-500 to-sky-400 p-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">AI Mentor</span>
            </div>
            <p className="text-xs opacity-90">
              "Great progress today! Try tackling a medium challenge next."
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}