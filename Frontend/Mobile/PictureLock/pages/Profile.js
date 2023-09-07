import React from 'react';
import { View, ScrollView, TouchableOpacity, useColorScheme, StyleSheet, Image, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { logUserOut } from "../redux/slices/loginSlice";
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '../components';
import NotificationStackScreen from './Notifications';
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

function ProfileScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const themeIconStyle = colorScheme === 'light' ? 'black' : 'white';
  const themeTextStyle = colorScheme === 'light' ? style.lightThemeText : style.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? style.lightPost : style.darkPost;
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[style.container, themeContainerStyle]}>
      <Image source={{ uri: user.image }} style={style.profileImage} />
      <View style={style.userInfoContainer}>
        <Text style={[style.nameText, themeTextStyle]}>{user.name}</Text>
        <Text style={[style.emailText, themeTextStyle]}>{user.email}</Text>
      </View>
      <View style={style.section}>
        <Text style={[style.sectionTitle, themeTextStyle]}>Favorite Movies & Shows</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      <View style={style.section}>
        <Text style={[style.sectionTitle, themeTextStyle]}>Recently Watched Movies & Shows</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      <View style={style.section}>
        <Text style={[style.sectionTitle, themeTextStyle]}>Bookmarks</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        <TouchableOpacity style={style.logoutBtn}>
        <Text style={style.logoutText}>Create A New List</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
            >
            <IconButton icon="settings" size={28}/>
            </TouchableOpacity>
            </View>
    </ScrollView>
  );
}


function SettingsScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? style.lightThemeText : style.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? style.lightPost : style.darkPost;
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  return (
    <ScrollView style={[style.container, themeContainerStyle]}>
      <TouchableOpacity onPress={() => dispatch(logUserOut())} style={style.logoutBtn}>
        <Text style={style.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen({ navigation }) {
  const colorScheme = useColorScheme();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
      {/* <ProfileStack.Screen name="Notifications" component={NotificationStackScreen} options={{headerShown: false}}/> */}
    </ProfileStack.Navigator>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    flexDirection: 'row',
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: '15%'
  },
  userInfoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: 'white',
  },
  logoutBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: "#FF1493",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  image: {
    width: '100%',
    width: 80,
    height: 120,
    marginVertical: 10,
    borderRadius: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -5,
  },
  gridItem: {
    padding: 5,
  },
});
