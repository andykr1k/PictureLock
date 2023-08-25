import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../styles/styles';
import { Post } from '../components';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

const data = [
  {
    name: 'Andrew Krikorian',
    username: 'andykrik',
    status: 'just watched',
    movie: 'Flash',
    movieURL: 'https://www.themoviedb.org/t/p/w440_and_h660_face/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    reaction: '👍',
    image: 'https://randomuser.me/api/portraits/men/47.jpg',
    numberOfComments: 43,
    numberOfLikes: 234,
    impressions: 945,
    time: 2,
  },
  {
    name: 'Jada Ganim',
    username: 'JadaGanim',
    status: 'is watching',
    movie: 'Friends',
    movieURL: 'https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
    reaction: '😂',
    image: 'https://randomuser.me/api/portraits/women/40.jpg',
    numberOfComments: 23,
    numberOfLikes: 2324,
    impressions: 95,
    time: 3,
  },
  {
    name: 'Omar Nossier',
    username: 'ONoss',
    status: 'just watched',
    movie: 'Barbie',
    movieURL: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg',
    reaction: '🙃',
    image: 'https://randomuser.me/api/portraits/men/40.jpg',
    numberOfComments: 4,
    numberOfLikes: 24,
    impressions: 94,
    time: 4,
  },
  {
    name: 'Sahara Williams',
    username: 'SWilliams',
    status: 'is watching',
    movie: 'Game of Thrones',
    movieURL: 'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
    reaction: '😤',
    image: 'https://randomuser.me/api/portraits/women/13.jpg',
    numberOfComments: 433,
    numberOfLikes: 2341,
    impressions: 9435,
    time: 6,
  },
]

function HomeScreen({ navigation }) {

  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    return (
      <View style={[styles.container, themeContainerStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item, index) => {
            return(
            <TouchableOpacity onPress={() => navigation.navigate("Details",{item, index})} key={index}>
                <Post key={index} navigation={navigation} name={item.name} username={item.username} status={item.status} movie={item.movie} reaction={item.reaction} image={item.image} movieURL={item.movieURL} time={item.time} numberOfComments={item.numberOfComments} numberOfLikes={item.numberOfLikes} impressions={item.impressions}/>
            </TouchableOpacity>
          )})}
        </ScrollView>
      </View>
    );
  }

  function PostDetails({ route, navigation }) {
    const { item, index } = route.params;

    const colorScheme = useColorScheme();
  
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

      return (
        <ScrollView style={[styles.container, themeContainerStyle]}>
              <View >
                <Post key={index} name={item.name} username={item.username} status={item.status} movie={item.movie} reaction={item.reaction} image={item.image} movieURL={item.movieURL} time={item.time} numberOfComments={item.numberOfComments} numberOfLikes={item.numberOfLikes} impressions={item.impressions}/>
              </View>
        </ScrollView>
      );
    }

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="PictureLock" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={PostDetails} />
    </HomeStack.Navigator>
  );
}