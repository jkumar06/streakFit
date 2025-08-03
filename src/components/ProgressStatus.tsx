import { ProgressStatusProps } from '@/types/workout';

export default function ProgressStatus({ stats, className = '' }: ProgressStatusProps) {
  const {
    weeklyConsistency,
    monthlyConsistency,
    totalWorkouts,
    averageWorkoutsPerWeek,
    currentWeekWorkouts,
    currentMonthWorkouts
  } = stats;

  // Get consistency level and color
  const getConsistencyLevel = (percentage: number) => {
    if (percentage >= 80) return { level: 'Excellent', color: 'text-emerald-600', bgColor: 'bg-emerald-100' };
    if (percentage >= 60) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (percentage >= 40) return { level: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Needs Work', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const weeklyLevel = getConsistencyLevel(weeklyConsistency);
  const monthlyLevel = getConsistencyLevel(monthlyConsistency);

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-slate-200 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Progress Status</h3>
      
      <div className="space-y-6">
        {/* Weekly Consistency */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-slate-700">Weekly Consistency</h4>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${weeklyLevel.bgColor} ${weeklyLevel.color}`}>
              {weeklyLevel.level}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(weeklyConsistency, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-slate-900">{weeklyConsistency}%</div>
              <div className="text-xs text-slate-500">{currentWeekWorkouts}/7 days</div>
            </div>
          </div>
        </div>

        {/* Monthly Consistency */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-slate-700">Monthly Consistency</h4>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${monthlyLevel.bgColor} ${monthlyLevel.color}`}>
              {monthlyLevel.level}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(monthlyConsistency, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-slate-900">{monthlyConsistency}%</div>
              <div className="text-xs text-slate-500">{currentMonthWorkouts} workouts</div>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="pt-4 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{totalWorkouts}</div>
              <div className="text-sm text-slate-600">Total Workouts</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{averageWorkoutsPerWeek}</div>
              <div className="text-sm text-slate-600">Avg/Week</div>
            </div>
          </div>
        </div>

        {/* Progress Insights */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Insights</h4>
          <div className="space-y-2">
            {weeklyConsistency >= 80 ? (
              <div className="flex items-center text-sm text-emerald-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Amazing weekly consistency! Keep up the great work.
              </div>
            ) : weeklyConsistency >= 60 ? (
              <div className="flex items-center text-sm text-blue-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Good progress! Try to add 1-2 more workouts this week.
              </div>
            ) : (
              <div className="flex items-center text-sm text-yellow-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                You can do better! Aim for at least 4 workouts this week.
              </div>
            )}

            {monthlyConsistency >= 70 ? (
              <div className="flex items-center text-sm text-emerald-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Excellent monthly consistency! You're building great habits.
              </div>
            ) : (
              <div className="flex items-center text-sm text-blue-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Keep pushing! Consistency is key to long-term success.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 