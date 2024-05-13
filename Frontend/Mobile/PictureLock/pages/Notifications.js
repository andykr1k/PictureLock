import { View, ScrollView, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Notification} from '../components';

const data = [
  {
    name: 'Andykr1k',
    status: 'just followed you',
    image: 'https://randomuser.me/api/portraits/men/47.jpg'
  },
  {
    name: 'JadaGanim',
    status: 'just followed you',
    image: 'https://randomuser.me/api/portraits/women/40.jpg'
  },
  {
    name: 'ONoss',
    status: 'liked a recent post',
    image: 'https://randomuser.me/api/portraits/men/40.jpg'
  },
  {
    name: 'SWilliams',
    status: 'bookmarked your post',
    image: 'https://randomuser.me/api/portraits/women/13.jpg'
  },
  {
    name: 'ONoss',
    status: 'liked a recent post',
    image: 'https://randomuser.me/api/portraits/men/40.jpg'
  },
  {
    name: 'SWilliams',
    status: 'bookmarked your post',
    image: 'https://randomuser.me/api/portraits/women/13.jpg'
  },
  {
    name: 'Andykr1k',
    status: 'just followed you',
    image: 'https://randomuser.me/api/portraits/men/47.jpg'
  },
  {
    name: 'JadaGanim',
    status: 'just followed you',
    image: 'https://randomuser.me/api/portraits/women/40.jpg'
  },
  {
    name: 'ONoss',
    status: 'liked a recent post',
    image: 'https://randomuser.me/api/portraits/men/40.jpg'
  },
  {
    name: 'SWilliams',
    status: 'commented your post',
    image: 'https://randomuser.me/api/portraits/women/13.jpg'
  },
  {
    name: 'Andykr1k',
    status: 'just followed you',
    image: 'https://randomuser.me/api/portraits/men/47.jpg'
  },
  {
    name: 'JadaGanim',
    status: 'just followed you',
    image: 'https://randomuser.me/api/portraits/women/40.jpg'
  },
  {
    name: 'ONoss',
    status: 'liked a recent post',
    image: 'https://randomuser.me/api/portraits/men/40.jpg'
  },
]

function NotificationsScreen({ navigation }) {

    return (
      <View className="mt-10 p-5 space-y-3">
        <Text className="dark:text-white font-bold text-3xl">
          Notifications
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} className="h-full">
          {data.map((item, index) => {
            return (
              <Notification
                key={index}
                name={item.name}
                status={item.status}
                image={item.image}
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
