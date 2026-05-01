import React, { useContext, useRef } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Firebase Analytics (Notification မဟုတ်တဲ့အတွက် ဆက်ထားနိုင်ပါတယ်)
import analytics from '@react-native-firebase/analytics';

// Screens
import HomeScreen from './src/screen/HomeScreen';
import AboutScreen from './src/screen/AboutScreen';
import FavScreen from './src/screen/FavScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import SubListScreen from './src/screen/SubListScreen';
import DetailScreen from './src/screen/DetailScreen';
import SearchScreen from './src/screen/SearchScreen';

// Context Providers
import { FavoriteProvider } from './src/context/FavoriteContext';
import { SettingsProvider, SettingsContext } from './src/context/SettingsContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ၁။ Bottom Tab Navigator
function MyTabs() {
  const { isDarkMode } = useContext(SettingsContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontFamily: 'Pyidaungsu',
          fontSize: 12,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'About') iconName = focused ? 'information-circle' : 'information-circle-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Favourite') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: isDarkMode ? '#FFFFFF' : '#212529',
        tabBarInactiveTintColor: '#727579',
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#333' : '#EEE',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favourite" component={FavScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// ၂။ Navigation Logic & Analytics
const NavigationWrapper = () => {
  const { isDarkMode } = useContext(SettingsContext);
  const navigationRef = useRef();
  const routeNameRef = useRef();

  return (
    <NavigationContainer 
      ref={navigationRef}
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousScreenName = routeNameRef.current;
        const currentRoute = navigationRef.current.getCurrentRoute();
        const currentScreenName = currentRoute?.name;

        if (previousScreenName !== currentScreenName) {
          // Screen View တွေကို Analytics မှာ သိနိုင်ဖို့
          await analytics().logScreenView({
            screen_name: currentScreenName,
            screen_class: currentScreenName,
          });
        }
        routeNameRef.current = currentScreenName;
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MyTabs} />
        <Stack.Screen name="SubList" component={SubListScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// ၃။ Main Root App
const App = () => {
  return (
    <SettingsProvider>
      <FavoriteProvider>
        <NavigationWrapper />
      </FavoriteProvider>
    </SettingsProvider>
  );
};

export default App;