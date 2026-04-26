import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16); // Default size (M)
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  // App စဖွင့်ချိန်မှာ သိမ်းထားတဲ့ Setting တွေ ပြန်ယူမယ်
  useEffect(() => {
    const loadSettings = async () => {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      const savedSize = await AsyncStorage.getItem('fontSize');
      const savedNoti = await AsyncStorage.getItem('notification');
      
      if (savedTheme !== null) setIsDarkMode(JSON.parse(savedTheme));
      if (savedSize !== null) setFontSize(JSON.parse(savedSize));
      if (savedNoti !== null) setIsNotificationOn(JSON.parse(savedNoti));
    };
    loadSettings();
  }, []);

  const toggleTheme = async () => {
    const newVal = !isDarkMode;
    setIsDarkMode(newVal);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newVal));
  };

  const updateFontSize = async (size) => {
    setFontSize(size);
    await AsyncStorage.setItem('fontSize', JSON.stringify(size));
  };

  const toggleNotification = async () => {
    const newVal = !isNotificationOn;
    setIsNotificationOn(newVal);
    await AsyncStorage.setItem('notification', JSON.stringify(newVal));
  };

  return (
    <SettingsContext.Provider value={{ 
      isDarkMode, toggleTheme, 
      fontSize, updateFontSize, 
      isNotificationOn, toggleNotification 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};