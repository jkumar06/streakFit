import { Workout, WorkoutData, StreakInfo, ConsistencyDay, ProgressStats } from '@/types/workout';

// Generate unique ID for workouts
export function generateWorkoutId(): string {
  return `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Calculate streaks from workout data
export function calculateStreaks(workouts: Workout[]): StreakInfo {
  if (workouts.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      isTodayCompleted: false,
      isYesterdayCompleted: false
    };
  }

  // Sort workouts by date (newest first)
  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Check if today and yesterday have workouts
  const isTodayCompleted = sortedWorkouts.some(w => w.date === today);
  const isYesterdayCompleted = sortedWorkouts.some(w => w.date === yesterday);

  // Calculate current streak
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastDate: string | null = null;

  // Get unique dates and sort them
  const uniqueDates = [...new Set(workouts.map(w => w.date))].sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  for (let i = 0; i < uniqueDates.length; i++) {
    const currentDate = uniqueDates[i];
    
    if (lastDate === null) {
      tempStreak = 1;
      lastDate = currentDate;
    } else {
      const daysDiff = getDaysDifference(currentDate, lastDate);
      
      if (daysDiff === 1) {
        // Consecutive day
        tempStreak++;
      } else if (daysDiff > 1) {
        // Gap in streak
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
        tempStreak = 1;
      }
      // If daysDiff === 0, it's the same day, continue
    }
    
    lastDate = currentDate;
  }

  // Check if current streak is the longest
  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
  }

  // Calculate current streak (consecutive days from today)
  if (isTodayCompleted || isYesterdayCompleted) {
    currentStreak = 0;
    let checkDate = isTodayCompleted ? today : yesterday;
    
    for (const date of uniqueDates) {
      if (date === checkDate) {
        currentStreak++;
        // Move to previous day
        const prevDate = new Date(checkDate);
        prevDate.setDate(prevDate.getDate() - 1);
        checkDate = prevDate.toISOString().split('T')[0];
      } else if (getDaysDifference(date, checkDate) > 1) {
        break;
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    lastWorkoutDate: sortedWorkouts[0]?.date,
    isTodayCompleted,
    isYesterdayCompleted
  };
}

// Calculate days difference between two dates
function getDaysDifference(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Generate consistency grid data (last 365 days)
export function generateConsistencyGrid(workouts: Workout[]): ConsistencyDay[] {
  const grid: ConsistencyDay[] = [];
  const today = new Date();
  
  // Generate data for the last 365 days
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Find workouts for this date
    const dayWorkouts = workouts.filter(w => w.date === dateString);
    const hasWorkout = dayWorkouts.length > 0;
    const workoutCount = dayWorkouts.length;
    
    // Calculate intensity based on total duration
    const totalDuration = dayWorkouts.reduce((sum, w) => sum + w.duration, 0);
    let intensity: 'low' | 'medium' | 'high' = 'low';
    
    if (totalDuration >= 60) intensity = 'high';
    else if (totalDuration >= 30) intensity = 'medium';
    
    grid.push({
      date: dateString,
      hasWorkout,
      workoutCount,
      intensity
    });
  }
  
  return grid;
}

// Calculate progress statistics
export function calculateProgressStats(workouts: Workout[]): ProgressStats {
  if (workouts.length === 0) {
    return {
      weeklyConsistency: 0,
      monthlyConsistency: 0,
      totalWorkouts: 0,
      averageWorkoutsPerWeek: 0,
      currentWeekWorkouts: 0,
      currentMonthWorkouts: 0
    };
  }

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
  
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // Calculate current week and month workouts
  const currentWeekWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= weekStart && workoutDate <= today;
  }).length;
  
  const currentMonthWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= monthStart && workoutDate <= today;
  }).length;
  
  // Calculate weekly consistency (workouts this week / 7 days)
  const weeklyConsistency = Math.round((currentWeekWorkouts / 7) * 100);
  
  // Calculate monthly consistency (workouts this month / days in month)
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const monthlyConsistency = Math.round((currentMonthWorkouts / daysInMonth) * 100);
  
  // Calculate average workouts per week (total workouts / weeks since first workout)
  const firstWorkoutDate = new Date(Math.min(...workouts.map(w => new Date(w.date).getTime())));
  const weeksSinceStart = Math.max(1, Math.ceil((today.getTime() - firstWorkoutDate.getTime()) / (7 * 24 * 60 * 60 * 1000)));
  const averageWorkoutsPerWeek = Math.round((workouts.length / weeksSinceStart) * 10) / 10;
  
  return {
    weeklyConsistency,
    monthlyConsistency,
    totalWorkouts: workouts.length,
    averageWorkoutsPerWeek,
    currentWeekWorkouts,
    currentMonthWorkouts
  };
}

// Format date for display
export function formatDate(date: string): string {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (d.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (d.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

// Get workout type display name
export function getWorkoutTypeDisplayName(type: string): string {
  const displayNames: Record<string, string> = {
    cardio: 'Cardio',
    strength: 'Strength Training',
    flexibility: 'Flexibility',
    sports: 'Sports',
    yoga: 'Yoga',
    pilates: 'Pilates',
    hiit: 'HIIT',
    other: 'Other'
  };
  
  return displayNames[type] || 'Other';
}

// Get workout type color
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