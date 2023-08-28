import * as React from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feathericons from 'react-native-vector-icons/Feather';
import { HomeStackScreen, SearchStackScreen, AIStackScreen, NotificationStackScreen, ProfileStackScreen } from './pages';
import { useColorScheme } from 'react-native';
import Login from './pages/Login';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { useSelector } from 'react-redux';

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

function HomeTabs() {
  const Tab = createBottomTabNavigator();

  const colorScheme = useColorScheme();
  
  const theme = colorScheme === 'light' ? LightTheme : DarkTheme;

  const status = useSelector(
    (state) => state.userState.status
  )

  return (
    <>
    {
      status === false 
      ?
      <Login />
      :
      <Tab.Navigator theme={theme} initialRouteName={"home"} screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        iconName = route.name
        
        if (iconName === 'ai') {
          iconName = 'film';
        } else if (iconName === 'notifications') {
          iconName = 'bell';
        } else if (iconName === 'profile') {
          iconName = 'user';
        }
        return <Feathericons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: {
        display: "none",
      }
    })}>
      <Tab.Screen name="home" component={HomeStackScreen} options={{headerShown: false}}/>
      <Tab.Screen name="search" component={SearchStackScreen} options={{headerShown: false}}/>
      <Tab.Screen name="ai" component={AIStackScreen} options={{headerShown: false}} />
      <Tab.Screen name="notifications" component={NotificationStackScreen} options={{headerShown: false}}/>
      <Tab.Screen name="profile" component={ProfileStackScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
    }
    </>
  );
}

export default function App() {  
  const Stack = createStackNavigator();

  const colorScheme = useColorScheme();
  
  const theme = colorScheme === 'light' ? LightTheme : DarkTheme;
  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={"HomeTabs"} screenOptions={{headerShown:false}}>
          <Stack.Screen name="HomeTabs" component={HomeTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}