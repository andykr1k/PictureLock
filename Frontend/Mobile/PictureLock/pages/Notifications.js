import { Button, Text, View, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../styles/styles';

function NotificationsScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    return (
      <View style={[styles.container, themeContainerStyle]}>
        <Text style={[styles.text, themeTextStyle]}>Notifications screen</Text>
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
