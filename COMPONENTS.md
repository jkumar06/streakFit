# StreakFit Core Components

This document describes the core components created for the StreakFit workout tracking application.

## 🏗️ Component Architecture

### Core Components

1. **DailyCheckin** - Main workout completion interface
2. **StreakDisplay** - Visual streak tracking
3. **ConsistencyGrid** - GitHub-style contribution grid
4. **ProgressStatus** - Weekly/monthly progress analytics

### Supporting Infrastructure

1. **TypeScript Types** - Complete type definitions
2. **Custom Hook** - `useWorkoutData` for state management
3. **Utility Functions** - Streak calculations and data processing

## 📁 File Structure

```
src/
├── components/
│   ├── DailyCheckin.tsx      # Daily workout check-in
│   ├── StreakDisplay.tsx     # Streak visualization
│   ├── ConsistencyGrid.tsx   # Contribution grid
│   └── ProgressStatus.tsx    # Progress analytics
├── hooks/
│   └── useWorkoutData.ts     # Custom hook for data management
├── lib/
│   └── workout-utils.ts      # Utility functions
├── types/
│   └── workout.ts           # TypeScript type definitions
└── app/
    └── dashboard/
        └── page.tsx         # Dashboard page using all components
```

## 🎯 Component Details

### DailyCheckin Component

**Purpose**: Primary interface for users to mark workouts as complete.

**Features**:
- Large "Mark Workout Complete" button
- Quick completion mode
- Detailed workout form with:
  - Workout type selection
  - Duration input
  - Calories tracking
  - Notes field
- Success state when workout is completed

**Props**:
```typescript
interface DailyCheckinProps {
  onWorkoutComplete: (workout: Omit<Workout, 'id' | 'completedAt'>) => void;
  isTodayCompleted: boolean;
  isLoading?: boolean;
}
```

### StreakDisplay Component

**Purpose**: Visual representation of current and longest streaks.

**Features**:
- Current streak counter with fire icon
- Longest streak display
- Streak status indicators
- Milestone progress bar (7, 30, 100 days)
- Motivational messages based on streak status

**Props**:
```typescript
interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  className?: string;
}
```

### ConsistencyGrid Component

**Purpose**: GitHub-style contribution grid showing workout consistency over time.

**Features**:
- 365-day visual grid
- Color-coded intensity levels
- Hover tooltips with workout details
- Day-of-week labels
- Statistics summary
- Responsive design

**Props**:
```typescript
interface ConsistencyGridProps {
  data: ConsistencyDay[];
  className?: string;
}
```

### ProgressStatus Component

**Purpose**: Weekly and monthly consistency analytics.

**Features**:
- Weekly consistency percentage with progress bar
- Monthly consistency percentage with progress bar
- Overall statistics (total workouts, average per week)
- Performance insights and recommendations
- Color-coded performance levels

**Props**:
```typescript
interface ProgressStatusProps {
  stats: ProgressStats;
  className?: string;
}
```

## 🔧 Custom Hook: useWorkoutData

**Purpose**: Centralized state management for workout data with localStorage persistence.

**Features**:
- Automatic localStorage sync
- Streak calculations
- Progress statistics
- Consistency grid data generation
- CRUD operations for workouts
- Data export/import functionality

**Usage**:
```typescript
const {
  workouts,
  currentStreak,
  longestStreak,
  isLoading,
  addWorkout,
  removeWorkout,
  updateWorkout,
  isTodayCompleted,
  getProgressStats,
  getConsistencyGrid
} = useWorkoutData();
```

## 📊 Data Structure

### Local Storage Format
```typescript
{
  workouts: Array<Workout>,
  currentStreak: number,
  longestStreak: number,
  lastWorkoutDate?: string
}
```

### Workout Object
```typescript
{
  id: string,
  date: string, // ISO date
  type: WorkoutType,
  duration: number, // minutes
  calories?: number,
  notes?: string,
  completedAt: string // ISO timestamp
}
```

## 🎨 Design System

### Colors
- **Primary**: Emerald (#10b981) - Success, progress
- **Secondary**: Blue (#3b82f6) - Information, streaks
- **Accent**: Orange (#f59e0b) - Energy, motivation
- **Neutral**: Slate grays for text and backgrounds

### Components
- Consistent rounded corners (2xl)
- Subtle shadows and borders
- Smooth transitions and hover effects
- Responsive design patterns
- Accessibility considerations

## 🚀 Usage Example

```typescript
import { useWorkoutData } from '@/hooks/useWorkoutData';
import DailyCheckin from '@/components/DailyCheckin';
import StreakDisplay from '@/components/StreakDisplay';
import ConsistencyGrid from '@/components/ConsistencyGrid';
import ProgressStatus from '@/components/ProgressStatus';

export default function Dashboard() {
  const {
    workouts,
    currentStreak,
    longestStreak,
    addWorkout,
    isTodayCompleted,
    getProgressStats,
    getConsistencyGrid
  } = useWorkoutData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-8">
        <DailyCheckin
          onWorkoutComplete={addWorkout}
          isTodayCompleted={isTodayCompleted()}
        />
        <StreakDisplay
          currentStreak={currentStreak}
          longestStreak={longestStreak}
        />
      </div>
      
      <div className="lg:col-span-2 space-y-8">
        <ProgressStatus stats={getProgressStats()} />
        <ConsistencyGrid data={getConsistencyGrid()} />
      </div>
    </div>
  );
}
```

## 🔄 State Management

The application uses a custom hook (`useWorkoutData`) that:
1. Manages all workout data in React state
2. Automatically syncs with localStorage
3. Provides calculated values (streaks, progress, etc.)
4. Handles data persistence and recovery
5. Offers data export/import capabilities

## 📱 Responsive Design

All components are fully responsive and work on:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Stacked layout with mobile-optimized controls

## 🎯 Future Enhancements

Potential improvements and additions:
- Offline support with service workers
- Cloud sync capabilities
- Social features (sharing streaks)
- Advanced analytics and charts
- Workout templates and routines
- Achievement system
- Push notifications
- Dark mode support 