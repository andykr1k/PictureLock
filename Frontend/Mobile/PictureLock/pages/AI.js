import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function AIScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>AI screen</Text>
      </View>
    );
  }

const AIStack = createNativeStackNavigator();

export default function AIStackScreen() {
  return (
    <AIStack.Navigator>
      <AIStack.Screen name="AI" component={AIScreen} />
    </AIStack.Navigator>
  );
}