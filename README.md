# 🔥 StreakSnap - Habit Tracker

A minimalist, mobile-first habit tracker app built with React and Capacitor. Track daily habits with one-tap completion, celebrate streaks with confetti, and build lasting positive behaviors.

![StreakSnap](https://img.shields.io/badge/Version-1.0.0-orange) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![Capacitor](https://img.shields.io/badge/Capacitor-6.1.2-lightblue)

## ✨ Features

- **🎯 One-Tap Completion**: Complete habits with a single tap
- **🔥 Streak Tracking**: Automatic streak counting and progress monitoring
- **🎉 Confetti Celebrations**: Motivational animations for completed habits
- **📱 Haptic Feedback**: Native mobile tactile responses
- **🎨 Modern UI**: Clean, minimalist design with Shadcn components
- **💾 Local Storage**: Offline-first with local data persistence
- **📊 Progress Stats**: View completion history and streaks
- **🌈 Customizable Habits**: Choose icons, colors, and names

## 🚀 Quick Start

### Option 1: Download APK (Recommended)

1. **Go to [Releases](../../releases)** or **Actions** tab
2. **Download the latest APK** from workflow artifacts
3. **Install on Android device** (Enable "Unknown sources")
4. **Start tracking your habits!**

### Option 2: Build from Source

#### Prerequisites
- Node.js 18+
- Java 17+
- Android SDK (API Level 34)

#### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd streaksnap

# Install dependencies
yarn install

# Build for production
yarn build

# Add Android platform (if not already added)
npx cap add android

# Sync Capacitor
npx cap sync android

# Build APK
cd android
chmod +x gradlew
./gradlew assembleDebug
```

The APK will be generated at: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📱 GitHub Actions Build

This repository includes automated APK building via GitHub Actions:

1. **Push changes** to `main` branch
2. **Actions automatically trigger** the build process
3. **Download APK** from the workflow artifacts
4. **Install on your device**

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1
- **UI Framework**: Shadcn UI + Tailwind CSS
- **Mobile**: Capacitor 6.1.2 (Hybrid App)
- **Build Tool**: Craco (Create React App Configuration Override)
- **State Management**: React Hooks + Local Storage
- **Animations**: Canvas Confetti
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── Dashboard.js     # Main habit overview
│   ├── HabitCard.js     # Individual habit display
│   ├── AddHabitModal.js # Habit creation modal
│   ├── HabitDetails.js  # Detailed habit view
│   ├── Onboarding.js    # Welcome flow
│   └── Settings.js      # App settings
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
├── utils/               # API and mobile utilities
└── App.js              # Main application component

android/                 # Capacitor Android project
public/                  # Static assets
.github/workflows/       # CI/CD configuration
```

## 🎯 App Flow

1. **Welcome/Onboarding**: First-time user experience
2. **Dashboard**: Main screen showing all habits
3. **Add Habit**: Create custom or preset habits
4. **Complete Habits**: One-tap completion with celebrations
5. **View Details**: Streak history and statistics
6. **Settings**: Data management and preferences

## 🔧 Configuration

### Capacitor Config (`capacitor.config.json`)
```json
{
  "appId": "com.streaksnap.app",
  "appName": "StreakSnap",
  "webDir": "build",
  "plugins": {
    "SplashScreen": { "backgroundColor": "#f97316" },
    "StatusBar": { "style": "LIGHT" },
    "Haptics": { "enabled": true }
  }
}
```

### Tailwind Theme
- **Primary Color**: Orange (#f97316)
- **Design System**: Shadcn UI components
- **Mobile-First**: Responsive design principles

## 📊 Data Structure

Habits are stored locally with this structure:

```javascript
{
  "id": "unique-id",
  "name": "Drink Water",
  "icon": "💧",
  "color": "#3b82f6",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "completions": [
    {
      "date": "2024-01-01",
      "completed": true,
      "completedAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

## 🚀 Deployment

### GitHub Actions (Automated)

The repository includes a complete CI/CD pipeline:

- **Builds** on every push to main
- **Tests** the React application
- **Generates APK** using Capacitor and Gradle
- **Uploads artifact** for easy download

### Manual Build

For local APK generation:

```bash
# Build React app
yarn build

# Sync with Capacitor
npx cap sync android

# Generate APK
cd android && ./gradlew assembleDebug
```

## 🎨 Customization

### Adding New Preset Habits

Edit `src/components/AddHabitModal.js`:

```javascript
const PRESET_HABITS = [
  { name: 'Your Habit', icon: '🎯', color: '#10b981' },
  // Add more presets...
];
```

### Changing Theme Colors

Update `tailwind.config.js` and `src/index.css` for custom theming.

### Adding New Features

The app follows a modular structure. Add new components in `src/components/` and wire them up through the main `App.js` router.

## 🐛 Troubleshooting

### Common Issues

**Build Fails**:
- Ensure Node.js 18+ is installed
- Run `yarn install` to update dependencies
- Check Java 17 is properly configured

**APK Won't Install**:
- Enable "Install unknown apps" in Android settings
- Ensure Android 5.0+ (API Level 21+)
- Check available storage space (~10MB)

**App Crashes on Launch**:
- Check browser console for errors in development
- Verify Capacitor plugins are properly installed

### Development Mode

```bash
# Start development server
yarn start

# Run in browser with live reload
# Visit: http://localhost:3000
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Issues**: Use GitHub Issues for bug reports
- **Questions**: Check existing issues or create a new discussion
- **Documentation**: Refer to this README and code comments

---

**StreakSnap** - Simple habits, powerful results! 🌟

Made with ❤️ for habit formation and personal growth.