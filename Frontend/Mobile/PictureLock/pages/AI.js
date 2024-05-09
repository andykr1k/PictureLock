import React, { useState } from 'react';
import { View, StyleSheet, useColorScheme, Image, ScrollView } from 'react-native';
import { Button, Text, Divider, ButtonGroup, Input } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Recommendation } from '../functions/Recommendation';
import { styles } from '../styles/styles';
import Feathericons from 'react-native-vector-icons/Feather';

const data = [
  {
    movie: 'The Matrix',
    movieURL: 'https://static.wikia.nocookie.net/matrix/images/5/56/The_Matrix_digital_release_cover.jpg/revision/latest?cb=20210908111245'
  },
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
  }
]

function AIScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const buttonStyles = StyleSheet.create({
    button: {
      marginBottom: 20
    }
  })

  const filmtypes = ['TV Show', 'Movie'];
  const platforms = [ 
    {
      name:"Amazon Prime",
      image:require('../assets/amazon_logo.jpeg')
    },
    {
      name:"Netflix",
      image:require('../assets/netflix_logo.jpeg')
    },
    {
      name:"Hulu",
      image:require('../assets/hulu_logo.jpeg')
    },
    {
      name:"Disney Plus",
      image:require('../assets/disney_logo.jpeg')
    },
    {
      name:"Paramount Plus",
      image:require('../assets/paramount_logo.jpeg')
    },
    {
      name:"HBO Max",
      image:require('../assets/hbo_logo.jpeg')
    }
  ];
  const genres = ['Action', 'Drama', 'Comedy', 'Romance'];
  const [recommends, setRecommends] = useState(null);
  const [movieName, setMovieName] = useState('');
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [selectedGenreIndexes, setSelectedGenreIndexes] = useState([]);
  const [selectedPlatformIndexes, setSelectedPlatformIndexes] = useState([]);

  const themeIconStyle = colorScheme === 'light' ? 'black' : 'white';
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeButtonStyle = colorScheme === 'light' ? styles.lightButton : styles.darkButton;


  function recommend(){
    (async () => {
      filmtype = filmtypes[selectedTypeIndex].toUpperCase();
      platforms_string = '';
      for (i = 0; i < selectedPlatformIndexes.length; i++){
        platforms_string += platforms[selectedPlatformIndexes[i]];
        if (i < selectedPlatformIndexes.length - 1){
          platforms_string += '-';
        }
      }
      console.log("Film Type: " + filmtype);
      console.log("Film Name: " + movieName);
      console.log("Platform String: " + platforms_string);
      const res = await Recommendation(filmtype,movieName,platforms_string);
      setRecommends(res)
    })();
  }

    return (
      <View style={[style.container, themeContainerStyle]}>
        <Text h4 style={[styles.text, themeTextStyle]}>
          Film Type
        </Text>
        <ButtonGroup
          buttons={filmtypes}
          selectedIndex={selectedTypeIndex}
          onPress={(value) => {
            setSelectedTypeIndex(value);
          }}
          buttonStyle={style.toggleButtonStyle}
          containerStyle={[styles.button, themeButtonStyle]}
        />
        <Text h4 style={[styles.text, themeTextStyle]}>
          Streaming Services
        </Text>
        {/* <ButtonGroup
        buttons={platforms}
        selectMultiple
        selectedIndexes={selectedPlatformIndexes}
        onPress={(value)=>{
          setSelectedPlatformIndexes(value);
        }}
        containerStyle={[styles.button, themeButtonStyle]}
      /> */}
        <View style={style.post_h}>
          {platforms.map((item, index) => {
            return (
              <Button
                buttonStyle={style.logoContainer}
                key={item.name}
                onPress={() => {
                  setSelectedPlatformIndexes(index);
                }}
              >
                <Image style={style.logo} source={item.image}></Image>
              </Button>
            );
          })}
        </View>
        <Text h4 style={[styles.text, themeTextStyle]}>
          Genres
        </Text>
        <ButtonGroup
          buttons={genres}
          selectMultiple
          selectedIndexes={selectedGenreIndexes}
          onPress={(value) => {
            setSelectedGenreIndexes(value);
          }}
          containerStyle={[styles.button, themeButtonStyle]}
        />
        <Text h4 style={[styles.text, themeTextStyle]}>
          Movie
        </Text>
        <View style={style.gridContainer}>
          {data.map((item, index) => {
            return (
              <View key={index} style={style.gridItem}>
                <Image source={{ uri: item.movieURL }} style={style.image} />
              </View>
            );
          })}
        </View>
        <Button
          onPress={() => recommend()}
          buttonStyle={{
            borderWidth: 2,
            borderRadius: 30,
          }}
          containerStyle={{
            marginHorizontal: 2,
            marginVertical: 2,
          }}
          titleStyle={{ fontWeight: "bold" }}
        >
          Recommend
        </Button>
        {recommends != null && (
          <View>
            <Text h4 style={{ padding: 6 }}>
              Recommendations
            </Text>
            <Divider
              inset={true}
              insetType="right"
              style={{ marginBottom: 4 }}
            />
            {recommends.map((item, index) => (
              <Text h5 key={item}>
                {index + 1}. {item}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  }

function DetailsScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {recommends != null && (
        <View>
        <Text h4 style={{padding:6}}>Recommendations</Text>
        <Divider inset={true} insetType="right" style={{marginBottom:4}} />
          {recommends.map((item, index) => (
            <Text h5 key={item}>{index+1}. {item}</Text>
          ))}
        </View>
      )}
      </View>
  );
}

const AIStack = createNativeStackNavigator();

export default function AIStackScreen() {
  return (
    <AIStack.Navigator>
      <AIStack.Screen name="PictureLock" component={AIScreen} options={{ headerShown: false }}/>
      <AIStack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }}/>
    </AIStack.Navigator>
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: "15%",
  },
  logoContainer: {
    padding: 0,
    margin: 0,
    paddingHorizontal: 0,
    borderRadius: 12
  },
  logo: {
    width: 60,
    height: 40,
    borderRadius: 10,
  },
  post_h: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 4,

  },
  image: {
    aspectRatio: 2 / 3,
    marginVertical: 5,
    borderRadius: 15,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -5,
  },
  gridItem: {
    width: "33.333%",
    padding: 5,
  },
  toggleButtonStyle: {
    border: 0,
    fontStyle: 'bold',
  }
});
