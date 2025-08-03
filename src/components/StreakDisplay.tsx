import { StreakDisplayProps } from '@/types/workout';

export default function StreakDisplay({ currentStreak, longestStreak, className = '' }: StreakDisplayProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-slate-200 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Streak</h3>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Current Streak */}
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-2xl font-bold text-white">{currentStreak}</span>
              </div>
              {currentStreak > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-slate-700">Current Streak</p>
            <p className="text-xs text-slate-500 mt-1">
              {currentStreak === 0 ? 'Start your streak today!' : 
               currentStreak === 1 ? '1 day' : `${currentStreak} days`}
            </p>
          </div>

          {/* Longest Streak */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="text-2xl font-bold text-white">{longestStreak}</span>
            </div>
            <p className="text-sm font-medium text-slate-700">Longest Streak</p>
            <p className="text-xs text-slate-500 mt-1">
              {longestStreak === 0 ? 'No streak yet' : 
               longestStreak === 1 ? '1 day' : `${longestStreak} days`}
            </p>
          </div>
        </div>

        {/* Streak Status */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          {currentStreak === 0 ? (
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-2">Ready to start your fitness journey?</p>
              <div className="inline-flex items-center px-3 py-1 bg-slate-100 rounded-full">
                <span className="w-2 h-2 bg-slate-400 rounded-full mr-2"></span>
                <span className="text-xs font-medium text-slate-600">No active streak</span>
              </div>
            </div>
          ) : currentStreak === longestStreak ? (
            <div className="text-center">
              <p className="text-sm text-emerald-600 mb-2">🔥 New record! Keep it up!</p>
              <div className="inline-flex items-center px-3 py-1 bg-emerald-100 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-xs font-medium text-emerald-700">Personal Best</span>
              </div>
            </div>
          ) : currentStreak > 0 && currentStreak < longestStreak ? (
            <div className="text-center">
              <p className="text-sm text-blue-600 mb-2">
                {longestStreak - currentStreak} more days to beat your record!
              </p>
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-xs font-medium text-blue-700">On Fire</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Streak Milestones */}
        {currentStreak > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>7 days</span>
              <span>30 days</span>
              <span>100 days</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((currentStreak / 100) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
              <span className={currentStreak >= 7 ? 'text-emerald-600 font-medium' : ''}>🔥</span>
              <span className={currentStreak >= 30 ? 'text-emerald-600 font-medium' : ''}>🏆</span>
              <span className={currentStreak >= 100 ? 'text-emerald-600 font-medium' : ''}>👑</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 