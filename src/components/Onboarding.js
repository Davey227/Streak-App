import React, { useState } from 'react';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { Button } from './ui/button';
import AddHabitModal from './AddHabitModal';
import { api } from '../utils/api';
import { useToast } from '../hooks/use-toast';

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const steps = [
    {
      icon: Target,
      title: "Welcome to StreakSnap!",
      description: "Build lasting habits with one-tap completion and streak tracking.",
    },
    {
      icon: Zap,
      title: "Simple & Fast",
      description: "No complex setup. Just tap to complete your daily habits.",
    },
    {
      icon: Sparkles,
      title: "Celebrate Success",
      description: "Watch your streaks grow and celebrate every milestone with confetti!",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowAddModal(true);
    }
  };

  const handleAddFirstHabit = async (habitData) => {
    try {
      await api.createHabit(habitData);
      setShowAddModal(false);
      toast({
        title: "Welcome to StreakSnap! 🎉",
        description: `"${habitData.name}" is your first habit. Let's build that streak!`
      });
      onComplete();
    } catch (error) {
      toast({
        title: "Error creating habit",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="w-20 h-20 mx-auto mb-8 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-3xl font-bold">S</span>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Icon className="h-8 w-8 text-orange-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {currentStepData.title}
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-orange-500' : 'bg-orange-200'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button 
          onClick={handleNext}
          className="w-full h-12 text-lg"
          size="lg"
        >
          {currentStep < steps.length - 1 ? (
            <>
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          ) : (
            'Add Your First Habit'
          )}
        </Button>

        {/* Skip Option */}
        {currentStep < steps.length - 1 && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="mt-4 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            Skip to setup
          </button>
        )}
      </div>

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddFirstHabit}
        isFirstHabit={true}
      />
    </div>
  );
}