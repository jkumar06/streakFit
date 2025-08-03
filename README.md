# StreakFit - Workout Consistency Tracker

A modern, intuitive web application for tracking workout consistency and building lasting fitness habits. Built with Next.js, TypeScript, and Tailwind CSS.

## 🏃‍♂️ Features

- **Streak Tracking**: Monitor your workout consistency with visual streak counters
- **Progress Analytics**: Detailed charts and statistics to track your fitness journey
- **Smart Reminders**: Never miss a workout with intelligent scheduling
- **Achievement System**: Unlock badges and milestones as you progress
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, fitness-themed design with smooth animations

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Utilities**: clsx, tailwind-merge
- **Development**: ESLint, PostCSS

## 📁 Project Structure

```
streakfit/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout with header/footer
│   │   ├── page.tsx         # Homepage with hero section
│   │   └── globals.css      # Global styles and animations
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── HeroSection.tsx  # Homepage hero section
│   │   └── Footer.tsx       # Site footer
│   ├── lib/                 # Utility functions
│   │   └── utils.ts         # Helper functions and utilities
│   └── types/               # TypeScript type definitions
│       └── index.ts         # Application types and interfaces
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd streakfit
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: Emerald (#10b981) - Success, progress, fitness
- **Secondary**: Blue (#3b82f6) - Trust, reliability
- **Accent**: Amber (#f59e0b) - Energy, motivation
- **Neutral**: Slate grays for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- Responsive navigation with mobile menu
- Hero section with animated background elements
- Feature cards with icons
- Call-to-action buttons with hover effects

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🔧 Customization

### Adding New Components
1. Create a new file in `src/components/`
2. Export as default React component
3. Import and use in your pages

### Styling
- Use Tailwind CSS classes for styling
- Custom animations defined in `globals.css`
- Component-specific styles can be added inline

### Types
- Add new interfaces in `src/types/index.ts`
- Import and use throughout the application

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Google Fonts for the Inter font family
- The fitness community for inspiration

---

**Built with ❤️ for fitness enthusiasts everywhere**
