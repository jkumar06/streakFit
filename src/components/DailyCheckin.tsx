'use client';

import { useState } from 'react';
import { DailyCheckinProps, WorkoutType } from '@/types/workout';
import { getWorkoutTypeDisplayName, getWorkoutTypeColor } from '@/lib/workout-utils';

export default function DailyCheckin({ onWorkoutComplete, isTodayCompleted, isLoading = false }: DailyCheckinProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'cardio' as WorkoutType,
    duration: 30,
    calories: undefined as number | undefined,
    notes: ''
  });

  const workoutTypes: WorkoutType[] = [
    'cardio', 'strength', 'flexibility', 'sports', 'yoga', 'pilates', 'hiit', 'other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onWorkoutComplete(formData);
    setShowForm(false);
    setFormData({
      type: 'cardio',
      duration: 30,
      calories: undefined,
      notes: ''
    });
  };

  const handleQuickComplete = () => {
    onWorkoutComplete({
      type: 'cardio',
      duration: 30,
      calories: undefined,
      notes: ''
    });
  };

  if (isTodayCompleted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Workout Complete!</h3>
          <p className="text-slate-600 mb-6">Great job! You've completed your workout for today.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Add Another Workout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
      {!showForm ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Daily Check-in</h3>
          <p className="text-slate-600 mb-6">Mark your workout as complete to maintain your streak!</p>
          
          <div className="space-y-4">
            <button
              onClick={handleQuickComplete}
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Mark Workout Complete'
              )}
            </button>
            
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Add Detailed Workout
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Workout Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as WorkoutType }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {workoutTypes.map(type => (
                <option key={type} value={type}>
                  {getWorkoutTypeDisplayName(type)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="480"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Calories Burned (optional)
            </label>
            <input
              type="number"
              min="0"
              value={formData.calories || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, calories: e.target.value ? parseInt(e.target.value) : undefined }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Leave empty to auto-calculate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="How was your workout?"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Saving...' : 'Save Workout'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 