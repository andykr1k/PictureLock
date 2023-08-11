import { View, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from "native-base";
import { styles } from '../styles/styles';

function ProfileScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    return (
      <View style={[styles.container, themeContainerStyle]}>
        <Text style={[styles.text, themeTextStyle]}>Profile screen</Text>
      </View>
    );
}

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}