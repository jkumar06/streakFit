import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function getDaysInStreak(lastWorkoutDate: Date): number {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastWorkoutDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

// Workout utilities
export function calculateCalories(duration: number, workoutType: string): number {
  // Basic calorie calculation (can be enhanced with user weight, intensity, etc.)
  const caloriesPerMinute: Record<string, number> = {
    cardio: 10,
    strength: 8,
    flexibility: 3,
    sports: 9,
    yoga: 4,
    pilates: 5,
    hiit: 12,
    other: 6
  };
  
  return Math.round(duration * (caloriesPerMinute[workoutType] || 6));
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Local storage utilities
export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

export function setToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

// Number formatting
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
}

// Color utilities for workout types
export function getWorkoutTypeColor(type: string): string {
  const colors: Record<string, string> = {
    cardio: 'bg-red-100 text-red-800',
    strength: 'bg-blue-100 text-blue-800',
    flexibility: 'bg-green-100 text-green-800',
    sports: 'bg-purple-100 text-purple-800',
    yoga: 'bg-pink-100 text-pink-800',
    pilates: 'bg-indigo-100 text-indigo-800',
    hiit: 'bg-orange-100 text-orange-800',
    other: 'bg-gray-100 text-gray-800'
  };
  
  return colors[type] || colors.other;
}

// Achievement utilities
export function getAchievementIcon(type: string): string {
  const icons: Record<string, string> = {
    first_workout: '🎯',
    streak_7_days: '🔥',
    streak_30_days: '🏆',
    streak_100_days: '👑',
    workout_count_10: '💪',
    workout_count_50: '🏋️',
    workout_count_100: '💎',
    calories_1000: '⚡',
    calories_10000: '🌟'
  };
  
  return icons[type] || '🏅';
} 