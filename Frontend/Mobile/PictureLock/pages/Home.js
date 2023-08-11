import { Button, Text, View, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../styles/styles';

function HomeScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    return (
      <View style={[styles.container, themeContainerStyle]}>
        <Text style={[styles.text, themeTextStyle]}>Home screen</Text>
      </View>
    );
  }

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="PictureLock" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}