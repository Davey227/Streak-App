import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Settings, Flame } from 'lucide-react';
import { Button } from './ui/button';
import { api } from '../utils/api';
import { calculateStreak, isToday } from '../lib/utils';
import HabitCard from './HabitCard';
import AddHabitModal from './AddHabitModal';
import confetti from 'canvas-confetti';
import { triggerHapticFeedback } from '../utils/mobileUtils';
import { useToast } from '../hooks/use-toast';

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const loadHabits = useCallback(async () => {
    try {
      const response = await api.getHabits();
      setHabits(response.habits);
    } catch (error) {
      toast({
        title: "Error loading habits",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]); // ✅ depends on the function

  const handleHabitComplete = async (habitId) => {
    try {
      await triggerHapticFeedback();

      const updatedHabit = await api.completeHabit(habitId);

      // Update local state
      setHabits(prev => prev.map(h =>
        h.id === habitId ? updatedHabit : h
      ));

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const streak = calculateStreak(updatedHabit.completions);
      toast({
        title: "Habit completed! 🎉",
        description: streak > 1 ? `${streak} day streak!` : "Great start!"
      });

    } catch (error) {
      toast({
        title: "Error completing habit",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleAddHabit = async (habitData) => {
    try {
      const newHabit = await api.createHabit(habitData);
      setHabits(prev => [...prev, newHabit]);
      setShowAddModal(false);
      toast({
        title: "Habit created!",
        description: `"${habitData.name}" added to your habits`
      });
    } catch (error) {
      toast({
        title: "Error creating habit",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-orange-600">Loading your habits...</div>
      </div>
    );
  }

  const todayCompletions = habits.filter(habit =>
    habit.completions.some(c => isToday(c.date))
  ).length;

  const totalHabits = habits.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <header className="px-6 py-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">StreakSnap</h1>
          <p className="text-gray-600 mt-1">
            {todayCompletions} of {totalHabits} completed today
          </p>
        </div>
        <Link to="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      </header>

      {/* Progress Overview */}
      {totalHabits > 0 && (
        <div className="px-6 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-medium">Today's Progress</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalHabits > 0 ? (todayCompletions / totalHabits) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(totalHabits > 0 ? (todayCompletions / totalHabits) * 100 : 0)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Habits Grid */}
      <div className="px-6 pb-20">
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No habits yet</h3>
            <p className="text-gray-600 mb-6">Create your first habit to get started!</p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Habit
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onComplete={() => handleHabitComplete(habit.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      {habits.length > 0 && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          size="icon"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddHabit}
      />
    </div>
  );
}
