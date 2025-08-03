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
    if (percentage >= 80) return { 
      level: 'Excellent', 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-100',
      gradient: 'from-emerald-500 to-emerald-600',
      icon: '🏆',
      message: 'Outstanding performance!'
    };
    if (percentage >= 60) return { 
      level: 'Good', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100',
      gradient: 'from-blue-500 to-blue-600',
      icon: '👍',
      message: 'Great progress!'
    };
    if (percentage >= 40) return { 
      level: 'Fair', 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100',
      gradient: 'from-yellow-500 to-yellow-600',
      icon: '📈',
      message: 'Keep improving!'
    };
    return { 
      level: 'Needs Work', 
      color: 'text-red-600', 
      bgColor: 'bg-red-100',
      gradient: 'from-red-500 to-red-600',
      icon: '💪',
      message: 'Time to step up!'
    };
  };

  const weeklyLevel = getConsistencyLevel(weeklyConsistency);
  const monthlyLevel = getConsistencyLevel(monthlyConsistency);

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 -m-6 mb-6 p-6 rounded-t-2xl border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Progress Status</h3>
            <p className="text-sm text-slate-600">Your fitness journey overview</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Weekly Consistency */}
        <div className="group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">W</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-800">Weekly Consistency</h4>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${weeklyLevel.bgColor} ${weeklyLevel.color} shadow-sm transform group-hover:scale-105 transition-transform duration-200`}>
              {weeklyLevel.icon} {weeklyLevel.level}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="w-full bg-slate-200 rounded-full h-4 shadow-inner overflow-hidden">
                <div 
                  className={`bg-gradient-to-r ${weeklyLevel.gradient} h-4 rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden`}
                  style={{ width: `${Math.min(weeklyConsistency, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                {weeklyConsistency}%
              </div>
              <div className="text-xs text-slate-500 font-medium">{currentWeekWorkouts}/7 days</div>
            </div>
          </div>
        </div>

        {/* Monthly Consistency */}
        <div className="group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-800">Monthly Consistency</h4>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${monthlyLevel.bgColor} ${monthlyLevel.color} shadow-sm transform group-hover:scale-105 transition-transform duration-200`}>
              {monthlyLevel.icon} {monthlyLevel.level}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="w-full bg-slate-200 rounded-full h-4 shadow-inner overflow-hidden">
                <div 
                  className={`bg-gradient-to-r ${monthlyLevel.gradient} h-4 rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden`}
                  style={{ width: `${Math.min(monthlyConsistency, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {monthlyConsistency}%
              </div>
              <div className="text-xs text-slate-500 font-medium">{currentMonthWorkouts} workouts</div>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="pt-6 border-t border-slate-100">
          <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Overall Statistics
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="group text-center p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors duration-200">
                {totalWorkouts}
              </div>
              <div className="text-sm text-slate-600 font-medium">Total Workouts</div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto mt-2 rounded-full"></div>
            </div>
            <div className="group text-center p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                {averageWorkoutsPerWeek}
              </div>
              <div className="text-sm text-slate-600 font-medium">Avg/Week</div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-2 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Progress Insights */}
        <div className="pt-6 border-t border-slate-100">
          <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Smart Insights
          </h4>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200 hover:shadow-md transition-all duration-200">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-emerald-800">{weeklyLevel.message}</div>
                <div className="text-xs text-emerald-600 mt-1">
                  {weeklyConsistency >= 80 ? 'You\'re crushing your fitness goals!' : 
                   weeklyConsistency >= 60 ? 'Try to add 1-2 more workouts this week.' : 
                   'Aim for at least 4 workouts this week to see better results.'}
                </div>
              </div>
            </div>

            <div className="flex items-start p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-200">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-blue-800">{monthlyLevel.message}</div>
                <div className="text-xs text-blue-600 mt-1">
                  {monthlyConsistency >= 70 ? 'You\'re building excellent long-term habits!' : 
                   'Consistency is key to long-term fitness success.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-center p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
            <div className="text-lg text-slate-600 italic mb-1">
              "The only bad workout is the one that didn't happen."
            </div>
            <div className="text-xs text-slate-500">Keep pushing forward! 💪</div>
          </div>
        </div>
      </div>
    </div>
  );
} 