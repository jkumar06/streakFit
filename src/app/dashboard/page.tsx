'use client';

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
    isLoading,
    addWorkout,
    isTodayCompleted,
    getProgressStats,
    getConsistencyGrid
  } = useWorkoutData();

  const handleWorkoutComplete = (workoutData: {
    type: string;
    duration: number;
    calories?: number;
    notes?: string;
  }) => {
    addWorkout(workoutData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-emerald-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-slate-600">Loading your fitness data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progressStats = getProgressStats();
  const consistencyGridData = getConsistencyGrid();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Track your fitness journey and maintain your streak</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Daily Checkin and Streak */}
          <div className="lg:col-span-1 space-y-8">
            <DailyCheckin
              onWorkoutComplete={handleWorkoutComplete}
              isTodayCompleted={isTodayCompleted()}
              isLoading={isLoading}
            />
            
            <StreakDisplay
              currentStreak={currentStreak}
              longestStreak={longestStreak}
            />
          </div>

          {/* Right Column - Progress and Consistency */}
          <div className="lg:col-span-2 space-y-8">
            <ProgressStatus stats={progressStats} />
            
            <ConsistencyGrid data={consistencyGridData} />
          </div>
        </div>

        {/* Recent Workouts */}
        {workouts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Workouts</h2>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Calories
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {workouts.slice(0, 10).map((workout) => (
                      <tr key={workout.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {new Date(workout.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {workout.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {workout.duration} min
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {workout.calories || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          {workout.notes || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {workouts.length === 0 && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No workouts yet</h3>
              <p className="text-slate-600 mb-6">Start your fitness journey by completing your first workout!</p>
              <button
                onClick={() => handleWorkoutComplete({
                  type: 'cardio',
                  duration: 30,
                  calories: undefined,
                  notes: ''
                })}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start Your First Workout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 