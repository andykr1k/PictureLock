import * as React from 'react';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feathericons from 'react-native-vector-icons/Feather';
import { HomeStackScreen, SearchStackScreen, AIStackScreen, NotificationStackScreen, ProfileStackScreen } from './pages';
import { NativeBaseProvider} from "native-base";
import { StyleSheet, useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {  
  const colorScheme = useColorScheme();

  const DarkTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(36, 44, 64)',
      card: 'rgb(36, 44, 64)',
      text: 'rgb(250, 251, 255)',
      border: 'rgb(36, 44, 64)',
      notification: 'rgb(36, 44, 64)',
    },
  };

  const LightTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: '#ffffff',
      notification: 'rgb(255, 69, 58)',
    },
  };

  const theme = colorScheme === 'light' ? LightTheme : DarkTheme;
  
  return (
    <NativeBaseProvider>
    <NavigationContainer theme={theme}>
      <Tab.Navigator theme={theme} screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = 'home';
            } else if (route.name === 'SearchTab') {
              iconName = 'search';
            } else if (route.name === 'AITab') {
              iconName = 'film';
            } else if (route.name === 'NotificationsTab') {
              iconName = 'bell';
            } else if (route.name === 'ProfileTab') {
              iconName = 'user';
            }
            return <Feathericons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            display: "none",
          },
        })}>
        <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{headerShown: false}}/>
        <Tab.Screen name="SearchTab" component={SearchStackScreen} options={{headerShown: false}}/>
        <Tab.Screen name="AITab" component={AIStackScreen} options={{headerShown: false}}/>
        <Tab.Screen name="NotificationsTab" component={NotificationStackScreen} options={{headerShown: false}}/>
        <Tab.Screen name="ProfileTab" component={ProfileStackScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}