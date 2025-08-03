'use client';

import { useState } from 'react';
import { ConsistencyGridProps, ConsistencyDay } from '@/types/workout';
import { formatDate } from '@/lib/workout-utils';

export default function ConsistencyGrid({ data, className = '' }: ConsistencyGridProps) {
  const [hoveredDay, setHoveredDay] = useState<ConsistencyDay | null>(null);

  // Group data by weeks (7 days each)
  const weeks: ConsistencyDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  // Get color based on intensity
  const getDayColor = (day: ConsistencyDay) => {
    if (!day.hasWorkout) return 'bg-slate-100';
    
    switch (day.intensity) {
      case 'high':
        return 'bg-emerald-600';
      case 'medium':
        return 'bg-emerald-400';
      case 'low':
        return 'bg-emerald-200';
      default:
        return 'bg-emerald-300';
    }
  };

  // Get tooltip content
  const getTooltipContent = (day: ConsistencyDay) => {
    const date = formatDate(day.date);
    if (!day.hasWorkout) {
      return `${date}: No workout`;
    }
    
    const intensityText = day.intensity === 'high' ? 'High intensity' : 
                         day.intensity === 'medium' ? 'Medium intensity' : 'Low intensity';
    const workoutText = day.workoutCount === 1 ? '1 workout' : `${day.workoutCount} workouts`;
    
    return `${date}: ${workoutText} (${intensityText})`;
  };

  // Get day labels
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-slate-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Consistency Grid</h3>
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <span>Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-slate-100 rounded-sm"></div>
            <div className="w-3 h-3 bg-emerald-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {/* Day labels */}
          <div className="flex flex-col space-y-1 mr-2">
            {dayLabels.map((day, index) => (
              <div key={day} className="h-3 flex items-center justify-end pr-2">
                {index % 2 === 0 && (
                  <span className="text-xs text-slate-400">{day}</span>
                )}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex space-x-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm transition-all duration-200 cursor-pointer ${getDayColor(day)}`}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    title={getTooltipContent(day)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div className="mt-4 p-3 bg-slate-900 text-white rounded-lg text-sm">
          <div className="font-medium">{getTooltipContent(hoveredDay)}</div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-slate-900">
              {data.filter(day => day.hasWorkout).length}
            </div>
            <div className="text-xs text-slate-500">Workout Days</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-slate-900">
              {Math.round((data.filter(day => day.hasWorkout).length / data.length) * 100)}%
            </div>
            <div className="text-xs text-slate-500">Consistency</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-slate-900">
              {data.reduce((sum, day) => sum + day.workoutCount, 0)}
            </div>
            <div className="text-xs text-slate-500">Total Workouts</div>
          </div>
        </div>
      </div>
    </div>
  );
} 