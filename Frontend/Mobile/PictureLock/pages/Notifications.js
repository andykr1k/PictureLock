import { View, ScrollView, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Notification } from "../components";
import { useUser } from "../lib/UserContext";
import { useEffect } from "react";

function NotificationsScreen() {
  const { notifications, refreshUserData } = useUser();

  useEffect(() => {
    const refresh = async () => {
      await refreshUserData("posts");
    };
    refresh();
  }, []);

  return (
    <View className="ios:mt-10 p-3 space-y-3">
      <Text className="dark:text-white font-bold text-3xl">Notifications</Text>
      {notifications && notifications.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="h-full max-w-full"
        >
          {notifications.map((item, index) => {
            return (
              <Notification
                key={index}
                id={item.user_id}
                content={item?.comment}
                post_id={item.post_id}
                date={item.created_at}
                status={item.type}
              />
            );
          })}
        </ScrollView>
      ) : (
        <Text className="dark:text-white font-bold">No notifications yet!</Text>
      )}
    </View>
  );
}

const NotificationsStack = createNativeStackNavigator();

export default function NotificationStackScreen() {
  return (
    <NotificationsStack.Navigator
      screenOptions={{
        headerTintColor: "#F97316",
        headerTitleStyle: { color: "white" },
      }}
    >
      <NotificationsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
    </NotificationsStack.Navigator>
  );
}
