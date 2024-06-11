import { View, Text, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { memo } from 'react';

const IconButton = ({ icon, text, size, color }) => {

  const colorScheme = useColorScheme();
  
  const themeIconStyle = colorScheme === 'light' ? 'black' : 'white';
  
  if ( color !== undefined){
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons name={icon} size={size} color={color} />
        <Text style={{ fontSize: 10, color: color }}>{text}</Text>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <MaterialIcons name={icon} size={size} color={themeIconStyle} />
      <Text style={{ fontSize: 10, color: themeIconStyle }}>{text}</Text>
    </View>
  );
};

export default memo(IconButton);