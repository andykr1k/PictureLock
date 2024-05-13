import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feathericons from "react-native-vector-icons/Feather";
import {
  HomeStackScreen,
  SearchStackScreen,
  AIStackScreen,
  NotificationStackScreen,
  ProfileStackScreen,
  LogInScreen
} from "./pages";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useSelector } from "react-redux";

const DarkTheme = {
  dark: true,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "#1A1A1A",
    card: "#1A1A1A",
    text: "white",
    border: "#1A1A1A",
    notification: "#1A1A1A",
  },
};

const LightTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "#EDEDED",
    card: "#EDEDED",
    text: "black",
    border: "#EDEDED",
    notification: "#EDEDED",
  },
};

function HomeTabs() {
  const Tab = createBottomTabNavigator();

  const colorScheme = useColorScheme();

  const status = useSelector((state) => state.userState.status);

  return (
    <>
      {status === false ? (
        <LogInScreen />
      ) : (
        <Tab.Navigator
          initialRouteName={"home"}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              iconName = route.name;

              if (iconName === "ai") {
                iconName = "film";
              } else if (iconName === "notifications") {
                iconName = "bell";
              } else if (iconName === "profile") {
                iconName = "user";
              }
              return <Feathericons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#FFB54F",
            tabBarInactiveTintColor: "gray",
            tabBarLabelStyle: {
              display: "none",
            },
            tabBarStyle: {
              backgroundColor: "#FFFFFF00",
              borderTopWidth: 0,
              position: "absolute",
              elevation: 0,
            },
          })}
        >
          <Tab.Screen
            name="home"
            component={HomeStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="search"
            component={SearchStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="ai"
            component={AIStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="notifications"
            component={NotificationStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="profile"
            component={ProfileStackScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      )}
    </>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  const colorScheme = useColorScheme();

  const theme = colorScheme === "light" ? LightTheme : DarkTheme;
  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName={"HomeTabs"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
