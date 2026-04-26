import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // App စဖွင့်ချင်း ဖုန်းထဲမှာ သိမ်းထားတဲ့ Fav list ကို ပြန်ယူမယ်
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavs = await AsyncStorage.getItem('myFavorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch (error) {
      console.log('Load error:', error);
    }
  };

  // Favourite ထဲ ထည့်မယ်/ဖယ်မယ်
  const toggleFavorite = async (item) => {
    let newFavs = [...favorites];
    const isExist = newFavs.find(f => f.id === item.id);

    if (isExist) {
      newFavs = newFavs.filter(f => f.id !== item.id); // ရှိပြီးသားဆို ဖယ်လိုက်မယ်
    } else {
      newFavs.push(item); // မရှိသေးရင် ထည့်မယ်
    }

    setFavorites(newFavs);
    await AsyncStorage.setItem('myFavorites', JSON.stringify(newFavs)); // ဖုန်းထဲမှာ သိမ်းမယ်
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};