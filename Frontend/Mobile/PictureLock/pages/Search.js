import { Button, Text, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { SearchBar } from '@rneui/themed';


function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
    return (
      <View style={styles.view}>
        <SearchBar
          platform="ios"
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
          containerStyle={{ backgroundColor: '#00000000'  }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
  });

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