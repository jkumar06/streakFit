'use client';

import { useState, useEffect, useCallback } from 'react';
import { Workout, WorkoutData, WorkoutType } from '@/types/workout';
import { calculateStreaks, generateWorkoutId, calculateProgressStats, generateConsistencyGrid } from '@/lib/workout-utils';

const STORAGE_KEY = 'streakfit_workout_data';

// Default workout data structure
const defaultWorkoutData: WorkoutData = {
  workouts: [],
  currentStreak: 0,
  longestStreak: 0
};

export function useWorkoutData() {
  const [workoutData, setWorkoutData] = useState<WorkoutData>(defaultWorkoutData);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setWorkoutData(parsed);
        }
      } catch (error) {
        console.error('Error loading workout data:', error);
        setWorkoutData(defaultWorkoutData);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage
  const saveData = useCallback((data: WorkoutData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving workout data:', error);
    }
  }, []);

  // Add a new workout
  const addWorkout = useCallback((workoutData: {
    type: WorkoutType;
    duration: number;
    calories?: number;
    notes?: string;
  }) => {
    const newWorkout: Workout = {
      id: generateWorkoutId(),
      date: new Date().toISOString().split('T')[0],
      type: workoutData.type,
      duration: workoutData.duration,
      calories: workoutData.calories,
      notes: workoutData.notes,
      completedAt: new Date().toISOString()
    };

    setWorkoutData(prevData => {
      const updatedWorkouts = [...prevData.workouts, newWorkout];
      const streakInfo = calculateStreaks(updatedWorkouts);
      
      const newData: WorkoutData = {
        workouts: updatedWorkouts,
        currentStreak: streakInfo.currentStreak,
        longestStreak: streakInfo.longestStreak,
        lastWorkoutDate: streakInfo.lastWorkoutDate
      };

      saveData(newData);
      return newData;
    });
  }, [saveData]);

  // Remove a workout
  const removeWorkout = useCallback((workoutId: string) => {
    setWorkoutData(prevData => {
      const updatedWorkouts = prevData.workouts.filter(w => w.id !== workoutId);
      const streakInfo = calculateStreaks(updatedWorkouts);
      
      const newData: WorkoutData = {
        workouts: updatedWorkouts,
        currentStreak: streakInfo.currentStreak,
        longestStreak: streakInfo.longestStreak,
        lastWorkoutDate: streakInfo.lastWorkoutDate
      };

      saveData(newData);
      return newData;
    });
  }, [saveData]);

  // Update a workout
  const updateWorkout = useCallback((workoutId: string, updates: Partial<Workout>) => {
    setWorkoutData(prevData => {
      const updatedWorkouts = prevData.workouts.map(w => 
        w.id === workoutId ? { ...w, ...updates } : w
      );
      const streakInfo = calculateStreaks(updatedWorkouts);
      
      const newData: WorkoutData = {
        workouts: updatedWorkouts,
        currentStreak: streakInfo.currentStreak,
        longestStreak: streakInfo.longestStreak,
        lastWorkoutDate: streakInfo.lastWorkoutDate
      };

      saveData(newData);
      return newData;
    });
  }, [saveData]);

  // Get workouts for a specific date
  const getWorkoutsForDate = useCallback((date: string) => {
    return workoutData.workouts.filter(w => w.date === date);
  }, [workoutData.workouts]);

  // Check if a date has workouts
  const hasWorkoutOnDate = useCallback((date: string) => {
    return workoutData.workouts.some(w => w.date === date);
  }, [workoutData.workouts]);

  // Get today's workouts
  const getTodayWorkouts = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return getWorkoutsForDate(today);
  }, [getWorkoutsForDate]);

  // Check if today has workouts
  const isTodayCompleted = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return hasWorkoutOnDate(today);
  }, [hasWorkoutOnDate]);

  // Get streak information
  const getStreakInfo = useCallback(() => {
    return calculateStreaks(workoutData.workouts);
  }, [workoutData.workouts]);

  // Get progress statistics
  const getProgressStats = useCallback(() => {
    return calculateProgressStats(workoutData.workouts);
  }, [workoutData.workouts]);

  // Get consistency grid data
  const getConsistencyGrid = useCallback(() => {
    return generateConsistencyGrid(workoutData.workouts);
  }, [workoutData.workouts]);

  // Clear all data
  const clearAllData = useCallback(() => {
    setWorkoutData(defaultWorkoutData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Export data
  const exportData = useCallback(() => {
    return JSON.stringify(workoutData, null, 2);
  }, [workoutData]);

  // Import data
  const importData = useCallback((dataString: string) => {
    try {
      const importedData = JSON.parse(dataString);
      if (importedData.workouts && Array.isArray(importedData.workouts)) {
        const streakInfo = calculateStreaks(importedData.workouts);
        const newData: WorkoutData = {
          workouts: importedData.workouts,
          currentStreak: streakInfo.currentStreak,
          longestStreak: streakInfo.longestStreak,
          lastWorkoutDate: streakInfo.lastWorkoutDate
        };
        
        setWorkoutData(newData);
        saveData(newData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }, [saveData]);

  return {
    // Data
    workouts: workoutData.workouts,
    currentStreak: workoutData.currentStreak,
    longestStreak: workoutData.longestStreak,
    isLoading,
    
    // Actions
    addWorkout,
    removeWorkout,
    updateWorkout,
    clearAllData,
    exportData,
    importData,
    
    // Queries
    getWorkoutsForDate,
    hasWorkoutOnDate,
    getTodayWorkouts,
    isTodayCompleted,
    getStreakInfo,
    getProgressStats,
    getConsistencyGrid
  };
} 