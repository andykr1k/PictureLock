import { Button, Text, View, useColorScheme, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../styles/styles';
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

  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    return (
      <View style={[styles.container, themeContainerStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item, index) => {
            return(
            <Notification key={index} name={item.name} status={item.status} image={item.image}/> 
          )})}
        </ScrollView>
      </View>
    );
  }

const NotificationsStack = createNativeStackNavigator();

export default function NotificationStackScreen() {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen name="Notifications" component={NotificationsScreen} />
    </NotificationsStack.Navigator>
  );
}
