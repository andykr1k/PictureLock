import { View, Text, useColorScheme } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const IconButton = ({ icon, text, size }) => {
  const colorScheme = useColorScheme();

  const themeIconStyle = colorScheme === 'light' ? 'gray' : 'white';
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <EvilIcons name={icon} size={size} color={themeIconStyle} />
      <Text style={{ fontSize: 12, color: themeIconStyle }}>{text}</Text>
    </View>
  );
};

export default IconButton;