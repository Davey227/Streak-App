import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const initializeCapacitor = async () => {
  if (Capacitor.isNativePlatform()) {
    console.log('Running on native platform:', Capacitor.getPlatform());
    
    // Initialize any platform-specific features here
    return true;
  } else {
    console.log('Running on web platform');
    return false;
  }
};

export const triggerHapticFeedback = async (style = ImpactStyle.Light) => {
  if (Capacitor.isNativePlatform()) {
    try {
      await Haptics.impact({ style });
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  }
};

export const isNativePlatform = () => {
  return Capacitor.isNativePlatform();
};

export const getPlatform = () => {
  return Capacitor.getPlatform();
};