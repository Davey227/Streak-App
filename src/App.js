import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { initializeCapacitor } from './utils/mobileUtils';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import Settings from './components/Settings';
import HabitDetails from './components/HabitDetails';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasHabits, setHasHabits] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initializeCapacitor();
      
      // Check if user has habits (for onboarding)
      const stored = localStorage.getItem('streaksnap_habits');
      const habits = stored ? JSON.parse(stored) : [];
      setHasHabits(habits.length > 0);
      
      setIsInitialized(true);
    };

    initialize();
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
          <div className="text-orange-600 font-medium">Loading StreakSnap...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={hasHabits ? <Dashboard /> : <Onboarding onComplete={() => setHasHabits(true)} />} 
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/habit/:id" element={<HabitDetails />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;