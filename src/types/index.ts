// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Workout types
export interface Workout {
  id: string;
  userId: string;
  type: WorkoutType;
  duration: number; // in minutes
  calories?: number;
  notes?: string;
  completedAt: Date;
  createdAt: Date;
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

// Streak types
export interface Streak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate?: Date;
  startDate: Date;
  updatedAt: Date;
}

// Goal types
export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Stats types
export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number; // in minutes
  totalCalories: number;
  averageWorkoutsPerWeek: number;
  currentStreak: number;
  longestStreak: number;
  favoriteWorkoutType: WorkoutType;
  weeklyProgress: WeeklyProgress[];
}

export interface WeeklyProgress {
  week: string; // ISO week string
  workouts: number;
  duration: number;
  calories: number;
}

// Achievement types
export interface Achievement {
  id: string;
  userId: string;
  type: AchievementType;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export type AchievementType = 
  | 'first_workout'
  | 'streak_7_days'
  | 'streak_30_days'
  | 'streak_100_days'
  | 'workout_count_10'
  | 'workout_count_50'
  | 'workout_count_100'
  | 'calories_1000'
  | 'calories_10000';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface WorkoutForm {
  type: WorkoutType;
  duration: number;
  calories?: number;
  notes?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
} 