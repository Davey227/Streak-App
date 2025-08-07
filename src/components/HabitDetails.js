import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Flame, MoreVertical, Trash2, Edit3 } from 'lucide-react';
import { Button } from './ui/button';
import { api } from '../utils/api';
import { calculateStreak, formatDate } from '../lib/utils';
import { useToast } from '../hooks/use-toast';

export default function HabitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadHabit();
  }, [id]);

  const loadHabit = async () => {
    try {
      const habitData = await api.getHabit(id);
      setHabit(habitData);
    } catch (error) {
      toast({
        title: "Error loading habit",
        description: error.message,
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this habit? This cannot be undone.')) {
      return;
    }

    try {
      await api.deleteHabit(id);
      toast({
        title: "Habit deleted",
        description: "Your habit has been successfully deleted."
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error deleting habit",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-orange-600">Loading habit details...</div>
      </div>
    );
  }

  if (!habit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Habit not found</p>
          <Button onClick={() => navigate('/')}>Go Back</Button>
        </div>
      </div>
    );
  }

  const streak = calculateStreak(habit.completions);
  const totalCompletions = habit.completions.length;
  const recentCompletions = habit.completions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
        >
          <Trash2 className="h-5 w-5 text-red-500" />
        </Button>
      </header>

      <div className="px-6 pb-20">
        {/* Habit Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ backgroundColor: habit.color }}
            >
              {habit.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{habit.name}</h1>
              <p className="text-gray-600">
                Created {formatDate(habit.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-medium">Current Streak</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {streak} {streak === 1 ? 'day' : 'days'}
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {totalCompletions} {totalCompletions === 1 ? 'completion' : 'completions'}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
          
          {recentCompletions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No completions yet. Start building your streak!
            </p>
          ) : (
            <div className="space-y-3">
              {recentCompletions.map((completion, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-gray-900">
                    {formatDate(completion.date)}
                  </span>
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Chart Placeholder */}
        <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
          <h3 className="font-bold text-gray-900 mb-4">Progress Overview</h3>
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart view coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}