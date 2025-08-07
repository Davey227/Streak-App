// Mock data for offline functionality
// In a real app, this would connect to your backend API

const STORAGE_KEY = 'streaksnap_habits';

// Load habits from localStorage
const loadHabits = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load habits:', error);
    return [];
  }
};

// Save habits to localStorage
const saveHabits = (habits) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Failed to save habits:', error);
  }
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const api = {
  // Get all habits
  getHabits: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const habits = loadHabits();
        resolve({ habits });
      }, 100);
    });
  },

  // Create a new habit
  createHabit: async (habitData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const habits = loadHabits();
        const newHabit = {
          id: generateId(),
          ...habitData,
          completions: [],
          createdAt: new Date().toISOString(),
        };
        habits.push(newHabit);
        saveHabits(habits);
        resolve(newHabit);
      }, 100);
    });
  },

  // Complete a habit
  completeHabit: async (habitId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const habits = loadHabits();
        const habit = habits.find(h => h.id === habitId);
        
        if (!habit) {
          reject(new Error('Habit not found'));
          return;
        }

        const today = new Date().toISOString().split('T')[0];
        const existingCompletion = habit.completions.find(c => c.date === today);

        if (!existingCompletion) {
          habit.completions.push({
            date: today,
            completed: true,
            completedAt: new Date().toISOString()
          });
          
          saveHabits(habits);
        }
        
        resolve(habit);
      }, 100);
    });
  },

  // Get habit by ID
  getHabit: async (habitId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const habits = loadHabits();
        const habit = habits.find(h => h.id === habitId);
        
        if (habit) {
          resolve(habit);
        } else {
          reject(new Error('Habit not found'));
        }
      }, 100);
    });
  },

  // Update habit
  updateHabit: async (habitId, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const habits = loadHabits();
        const habitIndex = habits.findIndex(h => h.id === habitId);
        
        if (habitIndex === -1) {
          reject(new Error('Habit not found'));
          return;
        }

        habits[habitIndex] = { ...habits[habitIndex], ...updates };
        saveHabits(habits);
        resolve(habits[habitIndex]);
      }, 100);
    });
  },

  // Delete habit
  deleteHabit: async (habitId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const habits = loadHabits();
        const habitIndex = habits.findIndex(h => h.id === habitId);
        
        if (habitIndex === -1) {
          reject(new Error('Habit not found'));
          return;
        }

        habits.splice(habitIndex, 1);
        saveHabits(habits);
        resolve({ message: 'Habit deleted successfully' });
      }, 100);
    });
  }
};