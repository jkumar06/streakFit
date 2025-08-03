// Workout data structure
export interface Workout {
  id: string;
  date: string; // ISO date string
  type: WorkoutType;
  duration: number; // in minutes
  calories?: number;
  notes?: string;
  completedAt: string; // ISO timestamp
}

export type WorkoutType = 
  | 'cardio'
  | 'strength'
  | 'flexibility'
  | 'sports'
  | 'yoga'
  | 'pilates'
  | 'hiit'
  | 'other';

// Local storage data structure
export interface WorkoutData {
  workouts: Workout[];
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate?: string; // ISO date string
}

// Streak calculation result
export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate?: string;
  isTodayCompleted: boolean;
  isYesterdayCompleted: boolean;
}

// Consistency data for grid
export interface ConsistencyDay {
  date: string;
  hasWorkout: boolean;
  workoutCount: number;
  intensity: 'low' | 'medium' | 'high'; // based on duration/calories
}

// Progress statistics
export interface ProgressStats {
  weeklyConsistency: number; // percentage
  monthlyConsistency: number; // percentage
  totalWorkouts: number;
  averageWorkoutsPerWeek: number;
  currentWeekWorkouts: number;
  currentMonthWorkouts: number;
}

// Component props
export interface DailyCheckinProps {
  onWorkoutComplete: (workout: Omit<Workout, 'id' | 'completedAt'>) => void;
  isTodayCompleted: boolean;
  isLoading?: boolean;
}

export interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  className?: string;
}

export interface ConsistencyGridProps {
  data: ConsistencyDay[];
  className?: string;
}

export interface ProgressStatusProps {
  stats: ProgressStats;
  className?: string;
} 