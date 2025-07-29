'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Code2,
  Brain,
  Target,
  GitBranch,
  Zap,
  Users,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: GitBranch,
    title: 'AI Code Review',
    description: 'Get instant feedback on your code with AI-powered analysis for security, performance, and best practices.',
    color: 'text-sky-600',
    bgColor: 'bg-sky-100'
  },
  {
    icon: Target,
    title: 'Interactive Challenges',
    description: 'Solve coding challenges with real-time AI hints and personalized difficulty adjustment.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100'
  },
  {
    icon: Brain,
    title: 'Debug Assistant',
    description: 'Get step-by-step debugging help with AI that understands your error messages and code context.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Users,
    title: 'Learning Paths',
    description: 'Follow personalized curriculum based on your skill level and career goals.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Frontend Developer',
    content: 'DevMentor\'s AI code review caught security issues I would have missed. It\'s like having a senior developer always available.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Full Stack Engineer',
    content: 'The debugging assistant saved me hours on a React state issue. The explanations are clear and actionable.',
    rating: 5
  },
  {
    name: 'Elena Rodriguez',
    role: 'Backend Developer',
    content: 'Interactive challenges with AI hints helped me level up my algorithm skills faster than any other platform.',
    rating: 5
  }
]

export default function LandingPage() {
  const handleSignIn = () => {
    // For now, just show an alert. In production, this would trigger GitHub OAuth
    alert('GitHub OAuth integration would be configured here. Please set up your environment variables.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="rounded-lg bg-emerald-500 p-2">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">DevMentor</h1>
                <p className="text-xs text-slate-500">AI-Powered Learning</p>
              </div>
            </div>
            <Button onClick={handleSignIn} className="bg-emerald-600 hover:bg-emerald-700">
              <GitBranch className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              <Zap className="mr-1 h-3 w-3" />
              Powered by GPT-4
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Level Up Your Coding
              <span className="block text-emerald-600">with AI Mentorship</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Get instant expert guidance, personalized challenges, and real-time feedback 
              to accelerate your development skills like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleSignIn}
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3"
              >
                <GitBranch className="mr-2 h-5 w-5" />
                Start Learning Free
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Watch Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive tools powered by cutting-edge AI to transform your coding journey
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className={`rounded-lg p-3 ${feature.bgColor} mb-4 w-fit`}>
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how DevMentor is helping developers at all levels improve their skills
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-sky-400">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Coding Skills?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are accelerating their growth with AI-powered mentorship
            </p>
            <Button 
              size="lg" 
              onClick={handleSignIn}
              className="bg-white text-emerald-600 hover:bg-slate-50 text-lg px-8 py-3"
            >
              <GitBranch className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="rounded-lg bg-emerald-500 p-2">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">DevMentor</span>
          </div>
          <p className="text-slate-400 mb-4">
            AI-powered platform for accelerated developer learning
          </p>
          <p className="text-slate-500 text-sm">
            © 2025 DevMentor. Built with Next.js, OpenAI, and ❤️
          </p>
        </div>
      </footer>
    </div>
  )
}