# DevMentor - AI-Powered Developer Learning Platform

A modern web application built with Next.js 13, React, and AI integration to help developers improve their coding skills through interactive challenges, AI-powered code reviews, and debugging assistance.

## 🚀 Features

- **AI Code Review**: Get instant feedback on your code with GPT-4 powered analysis
- **Interactive Challenges**: Solve coding challenges with real-time AI hints
- **Debug Assistant**: Get step-by-step debugging help with AI
- **GitHub Integration**: Connect your repositories for seamless code analysis
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Progress Tracking**: Monitor your learning progress and streaks

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, Lucide React icons
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Authentication**: NextAuth.js with GitHub OAuth
- **AI Integration**: OpenAI GPT-4
- **Code Editing**: Monaco Editor

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bolt-vision
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Optional: For full functionality
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   OPENAI_API_KEY=your-openai-api-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### GitHub OAuth Setup (Optional)
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
4. Add the Client ID and Client Secret to your `.env.local`

### OpenAI API Setup (Optional)
1. Get an API key from [OpenAI Platform](https://platform.openai.com/)
2. Add it to your `.env.local` as `OPENAI_API_KEY`

## 📁 Project Structure

```
bolt-vision/
├── app/                    # Next.js 13 App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── challenges/        # Challenges page
│   ├── code-review/       # Code review page
│   └── debug/            # Debug assistant page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Layout/           # Layout components
│   ├── Dashboard/        # Dashboard components
│   ├── Challenges/       # Challenge components
│   └── CodeReview/       # Code review components
├── lib/                  # Utility libraries
│   ├── stores/           # Zustand state stores
│   ├── auth.ts           # Authentication config
│   ├── openai.ts         # OpenAI integration
│   └── github.ts         # GitHub API integration
└── hooks/                # Custom React hooks
```

## 🎯 Current Status

✅ **Working Features:**
- Landing page with beautiful UI
- Responsive design and animations
- TypeScript configuration
- Development server setup
- Basic routing structure

🔄 **In Progress:**
- Authentication system (temporarily disabled for demo)
- AI integration features
- GitHub repository integration

## 🚀 Quick Start

The application is now running and the landing page should be accessible at `http://localhost:3000`. The page includes:

- Modern, responsive design
- Feature showcase
- Testimonials section
- Call-to-action buttons
- Smooth animations

## 🔍 Troubleshooting

If you encounter any issues:

1. **Port already in use**: Change the port in `package.json` scripts
2. **TypeScript errors**: Run `npx tsc --noEmit` to check for issues
3. **Missing dependencies**: Run `npm install` to ensure all packages are installed

## 📝 License

This project is built for educational and demonstration purposes.

---

**Built with ❤️ using Next.js, React, and modern web technologies**
