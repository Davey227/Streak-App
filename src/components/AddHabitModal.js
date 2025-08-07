import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

const PRESET_HABITS = [
  { name: 'Drink Water', icon: '💧', color: '#3b82f6' },
  { name: 'Exercise', icon: '🏃', color: '#f59e0b' },
  { name: 'Read', icon: '📚', color: '#10b981' },
  { name: 'Meditate', icon: '🧘', color: '#8b5cf6' },
  { name: 'Sleep Early', icon: '😴', color: '#6366f1' },
  { name: 'Journal', icon: '📝', color: '#ef4444' },
];

const COLORS = [
  '#f97316', '#ef4444', '#10b981', '#3b82f6', 
  '#8b5cf6', '#f59e0b', '#06b6d4', '#84cc16'
];

const ICONS = ['📝', '💧', '🏃', '📚', '🧘', '😴', '🎯', '💪', '🌱', '⭐', '🔥', '✨'];

export default function AddHabitModal({ isOpen, onClose, onAdd, isFirstHabit = false }) {
  const [isCustom, setIsCustom] = useState(false);
  const [customHabit, setCustomHabit] = useState({
    name: '',
    icon: '📝',
    color: '#f97316'
  });

  const handlePresetSelect = (preset) => {
    onAdd(preset);
    resetForm();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customHabit.name.trim()) {
      onAdd(customHabit);
      resetForm();
    }
  };

  const resetForm = () => {
    setIsCustom(false);
    setCustomHabit({
      name: '',
      icon: '📝',
      color: '#f97316'
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isFirstHabit ? 'Add Your First Habit' : 'Add New Habit'}
          </DialogTitle>
        </DialogHeader>

        {!isCustom ? (
          <div className="space-y-4">
            {/* Preset Options */}
            <div>
              <h4 className="font-medium mb-3">Choose a preset:</h4>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_HABITS.map((habit, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-center gap-2"
                    onClick={() => handlePresetSelect(habit)}
                  >
                    <span style={{ color: habit.color }} className="text-2xl">
                      {habit.icon}
                    </span>
                    <span className="text-sm">{habit.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Option */}
            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setIsCustom(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Habit
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            {/* Habit Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Habit Name</label>
              <Input
                type="text"
                placeholder="e.g., Practice Guitar"
                value={customHabit.name}
                onChange={(e) => setCustomHabit(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Choose Icon</label>
              <div className="flex flex-wrap gap-2">
                {ICONS.map((icon, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg hover:bg-gray-50 ${
                      customHabit.icon === icon ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}
                    onClick={() => setCustomHabit(prev => ({ ...prev, icon }))}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Choose Color</label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      customHabit.color === color ? 'border-gray-400' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setCustomHabit(prev => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCustom(false)}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Add Habit
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}