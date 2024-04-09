import { Button, Text, View, StyleSheet, useColorScheme, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { SearchBar } from '@rneui/themed';
import { styles } from '../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';
import Feathericons from 'react-native-vector-icons/Feather';

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

  const themeIconStyle = colorScheme === 'light' ? 'black' : 'white';
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeButtonStyle = colorScheme === 'light' ? styles.lightButton : styles.darkButton;

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
    return (
      <View style={[style.container, themeContainerStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, marginTop: 30}, themeContainerStyle]}>
        </View>
        <SearchBar lightTheme
          platform="ios"
          placeholder="Search for friends and films"
          onChangeText={updateSearch}
          value={search}
          inputStyle={style.searchBarInput}
          containerStyle={style.searchbar}
        />
          <View  style={style.gridContainer}>
            {data.map((item, index) => {
                return(
                <TouchableOpacity onPress={() => navigation.navigate("Details",{item, index})} key={index} style={style.gridItem}>
                  <Image source={{uri:item.movieURL}} style={style.image}/>
                </TouchableOpacity>
              )})}
          </View>
        </ScrollView>
      </View>
    );
}

function DetailsScreen({ route, navigation }) {
  const { item, index } = route.params;
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? style.lightThemeText : style.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeButtonStyle = colorScheme === 'light' ? styles.lightButton : styles.darkButton;

  return (
      <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={[style.movieName, themeTextStyle]}>{item.movie}</Text>
      <Image source={{uri:item.movieURL}} style={style.poster}/>
      </View>
  );
}

const SearchStack = createNativeStackNavigator();

export default function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
      <SearchStack.Screen name="Details" component={DetailsScreen}/>
    </SearchStack.Navigator>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    zIndex: 2,
    backgroundColor: 'transparent',
    alignItems: 'center', // Center horizontally
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
    backgroundColor: '#F5F8FA',
  },
  darkButton: {
    backgroundColor: '#141d26',
  },
  lightPost: {
    backgroundColor: '#F5F8FA',
    borderColor: 'lightgrey',
  },
  darkPost: {
    backgroundColor: '#141d26',
    borderColor: 'grey',
  },
  lightThemeText: {
    color: '#141d26',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -5,
    padding: 10,
  },
  gridItem: {
    width: '33.333%',
    padding: 5,
  },
  poster:{
    width: 200,
    height: 300,
    borderRadius: 15,
  },
  movieName: {
    fontSize: 32,
    padding: 20,
  }
});
