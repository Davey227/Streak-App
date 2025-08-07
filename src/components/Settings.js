import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Upload, Bell, Volume2, Sparkles, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleExportData = () => {
    try {
      const data = localStorage.getItem('streaksnap_habits');
      const habits = data ? JSON.parse(data) : [];
      
      const exportData = {
        habits,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `streaksnap-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Data exported",
        description: "Your habits have been exported successfully."
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export your data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target.result);
          if (importData.habits && Array.isArray(importData.habits)) {
            localStorage.setItem('streaksnap_habits', JSON.stringify(importData.habits));
            toast({
              title: "Data imported",
              description: "Your habits have been imported successfully."
            });
            window.location.reload(); // Refresh to show imported data
          } else {
            throw new Error('Invalid file format');
          }
        } catch (error) {
          toast({
            title: "Import failed",
            description: "Invalid file format. Please select a valid backup file.",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('streaksnap_habits');
      toast({
        title: "Data cleared",
        description: "All your habits have been deleted."
      });
      navigate('/');
      window.location.reload();
    }
  };

  const settingSections = [
    {
      title: 'Preferences',
      items: [
        { 
          icon: Bell, 
          label: 'Notifications', 
          description: 'Daily habit reminders',
          action: () => toast({ title: "Coming soon", description: "Notification settings will be available in a future update." })
        },
        { 
          icon: Volume2, 
          label: 'Sound Effects', 
          description: 'Audio feedback on completion',
          action: () => toast({ title: "Coming soon", description: "Sound settings will be available in a future update." })
        },
        { 
          icon: Sparkles, 
          label: 'Animations', 
          description: 'Confetti and visual effects',
          action: () => toast({ title: "Coming soon", description: "Animation settings will be available in a future update." })
        },
      ]
    },
    {
      title: 'Data Management',
      items: [
        { 
          icon: Download, 
          label: 'Export Data', 
          description: 'Download your habits as backup',
          action: handleExportData
        },
        { 
          icon: Upload, 
          label: 'Import Data', 
          description: 'Restore from backup file',
          action: handleImportData
        },
        { 
          icon: Trash2, 
          label: 'Clear All Data', 
          description: 'Delete all habits permanently',
          action: handleClearAllData,
          destructive: true
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <header className="px-6 py-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </header>

      <div className="px-6 pb-20">
        {/* App Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-2xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">StreakSnap</h2>
          <p className="text-gray-600 text-sm mb-2">Version 1.0.0</p>
          <p className="text-gray-500 text-sm">
            Minimalist habit tracker with one-tap completion
          </p>
        </div>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 px-2">
              {section.title}
            </h3>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className={`w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.destructive ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        item.destructive ? 'text-red-600' : 'text-gray-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${
                        item.destructive ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* About */}
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-2">
            Built with ❤️ for habit formation
          </p>
          <p className="text-gray-500 text-xs">
            © 2024 StreakSnap. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}