import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Flame } from 'lucide-react';
import { Button } from './ui/button';
import { calculateStreak, isToday } from '../lib/utils';
import { cn } from '../lib/utils';

export default function HabitCard({ habit, onComplete }) {
  const streak = calculateStreak(habit.completions);
  const completedToday = habit.completions.some(c => isToday(c.date));

  const handleComplete = (e) => {
    e.preventDefault();
    if (!completedToday) {
      onComplete();
    }
  };

  return (
    <Link to={`/habit/${habit.id}`}>
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: habit.color || '#f97316' }}
            >
              {habit.icon || '📝'}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{habit.name}</h3>
              {streak > 0 && (
                <div className="flex items-center gap-1 text-orange-600 text-sm">
                  <Flame className="h-3 w-3" />
                  <span>{streak} day streak</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Completion Button */}
        <Button
          className={cn(
            "w-full habit-complete-btn",
            completedToday 
              ? "bg-green-500 hover:bg-green-500 text-white" 
              : "bg-orange-500 hover:bg-orange-600 text-white"
          )}
          onClick={handleComplete}
        >
          <div className="flex items-center justify-center gap-2">
            {completedToday ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Completed!</span>
              </>
            ) : (
              <>
                <Circle className="h-4 w-4" />
                <span>Tap to complete</span>
              </>
            )}
          </div>
        </Button>

        {/* Stats */}
        <div className="mt-3 flex justify-between text-sm text-gray-500">
          <span>Total: {habit.completions.length}</span>
          <span>Best: {streak}</span>
        </div>
      </div>
    </Link>
  );
}