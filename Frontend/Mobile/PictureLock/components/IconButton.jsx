import { View, Text, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { memo } from 'react';

const IconButton = ({ icon, text, size }) => {
  const colorScheme = useColorScheme();

  const themeIconStyle = colorScheme === 'light' ? 'gray' : 'white';
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <MaterialIcons name={icon} size={size} color={themeIconStyle} />
      <Text style={{ fontSize: 10, color: themeIconStyle, marginLeft: 2, }}>{text}</Text>
    </View>
  );
};

export default memo(IconButton);