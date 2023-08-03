import * as React from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feathericons from 'react-native-vector-icons/Feather';
import { HomeStackScreen, SearchStackScreen, AIStackScreen, NotificationStackScreen, ProfileStackScreen } from './pages';
import { NativeBaseProvider} from "native-base";

const Tab = createBottomTabNavigator();

export default function App() {  
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
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