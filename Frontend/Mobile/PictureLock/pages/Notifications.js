import { View, ScrollView, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Notification } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../lib/UserContext";

function NotificationsScreen() {
  const navigation = useNavigation();
  const { refreshUserData, notifications } = useUser();
  console.log(notifications)
  return (
    <View className="ios:mt-10 p-3 space-y-3">
      <Text className="dark:text-white font-bold text-3xl">Notifications</Text>
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
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
    </View>
  );
}

const NotificationsStack = createNativeStackNavigator();

export default function NotificationStackScreen() {
  return (
    <NotificationsStack.Navigator
      screenOptions={{
        headerTintColor: "#FFB54F",
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
