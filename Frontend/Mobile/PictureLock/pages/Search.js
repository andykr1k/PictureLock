import { Button, Text, View, StyleSheet, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { SearchBar } from '@rneui/themed';
import { styles } from '../styles/styles';


function SearchScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeButtonStyle = colorScheme === 'light' ? styles.lightButton : styles.darkButton;

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
    return (
      <View style={[styles.container, themeContainerStyle]}>
        <SearchBar
          platform="ios"
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
          containerStyle={[styles.button, themeButtonStyle]}
        />
      </View>
    );
}

function DetailsScreen() {
return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Details!</Text>
    </View>
);
}

const SearchStack = createNativeStackNavigator();

export default function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="Details" component={DetailsScreen} />
    </SearchStack.Navigator>
  );
}