import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from "native-base";

function ProfileScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile screen</Text>
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