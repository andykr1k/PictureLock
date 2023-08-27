import { Button, Text, View, StyleSheet, useColorScheme, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { SearchBar } from '@rneui/themed';
import { styles } from '../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';

const data = [
  {
    movie: 'Friends',
    movieURL: 'https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'
  },
  {
    movie: 'Barbie',
    movieURL: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg'
  },
  {
    movie: 'Game of Thrones',
    movieURL: 'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg'
  },
  {
    movie: 'How I Met Your Mother',
    movieURL: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b34jPzmB0wZy7EjUZoleXOl2RRI.jpg'
  },
  {
    movie: 'Elemental',
    movieURL: 'https://www.themoviedb.org/t/p/w440_and_h660_face/8riWcADI1ekEiBguVB9vkilhiQm.jpg'
  },
  {
    movie: 'Heart of Stone',
    movieURL: 'https://www.themoviedb.org/t/p/w440_and_h660_face/vB8o2p4ETnrfiWEgVxHmHWP9yRl.jpg'
  },
  {
    movie: 'Flash',
    movieURL: 'https://www.themoviedb.org/t/p/w440_and_h660_face/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg'
  },
  {
    movie: 'Fast X',
    movieURL: 'https://www.themoviedb.org/t/p/w440_and_h660_face/fiVW06jE7z9YnO4trhaMEdclSiC.jpg'
  },
  {
    movie: 'The Matrix',
    movieURL: 'https://static.wikia.nocookie.net/matrix/images/5/56/The_Matrix_digital_release_cover.jpg/revision/latest?cb=20210908111245'
  }
]

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
        <SearchBar lightTheme
          platform="ios"
          placeholder="Search for friends and films"
          onChangeText={updateSearch}
          value={search}
          inputStyle={style.searchBarInput}
          containerStyle={style.searchbar}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View  style={style.gridContainer}>
            {data.map((item, index) => {
                return(
                <View key={index} style={style.gridItem}>
                  <Image source={{uri:item.movieURL}} style={style.image}/>
                </View>
              )})}
          </View>
        </ScrollView>
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchbar: {
    zIndex: 2,
    position: 'absolute', 
    top: 0,
    backgroundColor: 'transparent',
    alignItems: 'center', // Center horizontally
    marginTop: 5, // Adjust spacing from the top
    marginLeft: 20
  },
  searchBarInput: {
    backgroundColor: 'transparent',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: '600',
  },
  username: {
    color: 'gray',
    marginLeft: 3
  },
  content: {
    color: 'gray',
    marginLeft: 3
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
    marginVertical: 5,
    borderRadius: 15,
  },
  footer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  lightButton: {
    backgroundColor: '#ffffff',
  },
  darkButton: {
    backgroundColor: '#242c40',
  },
  lightPost: {
    backgroundColor: '#ffffff',
    borderColor: 'lightgrey',
  },
  darkPost: {
    backgroundColor: '#242c40',
    borderColor: 'grey',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -5,
    marginTop: 75
  },
  gridItem: {
    width: '33.333%',
    padding: 5,
  },
});
