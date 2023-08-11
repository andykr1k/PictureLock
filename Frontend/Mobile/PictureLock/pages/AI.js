import React, { useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Button, Text, LinearGradient, Divider, ButtonGroup, Input } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Recommendation } from '../functions/Recommendation';
import { styles } from '../styles/styles';

function AIScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const buttonStyles = StyleSheet.create({
    button: {
      marginBottom: 20
    }
  })

  const filmtypes = ['TV Show', 'Movie'];
  const platforms = ['Amazon Prime', 'Netflix', 'Hulu', 'Disney Plus', 'Paramount Plus', 'HBO Max'];
  const genres = ['Action', 'Drama', 'Comedy', 'Romance'];
  const [recommends, setRecommends] = useState(null);
  const [movieName, setMovieName] = useState('');
  const [selectedTypeIndex, setSelectedTypeIndex] = useState();
  const [selectedGenreIndexes, setSelectedGenreIndexes] = useState([]);
  const [selectedPlatformIndexes, setSelectedPlatformIndexes] = useState([]);

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
      <View style={[styles.container, themeContainerStyle]}>
      <Text h4 style={[styles.text, themeTextStyle]}>Film Type</Text>
      <ButtonGroup
        buttons={filmtypes}
        selectedIndex={selectedTypeIndex}
        onPress={(value)=>{
          setSelectedTypeIndex(value);
        }}
        containerStyle={[styles.button, themeButtonStyle]}
      />
      <Text h4 style={[styles.text, themeTextStyle]}>Streaming Services</Text>
      <ButtonGroup
        buttons={platforms}
        selectMultiple
        selectedIndexes={selectedPlatformIndexes}
        onPress={(value)=>{
          setSelectedPlatformIndexes(value);
        }}
        containerStyle={[styles.button, themeButtonStyle]}
      />
      <Text h4 style={[styles.text, themeTextStyle]}>Genres</Text>
      <ButtonGroup
        buttons={genres}
        selectMultiple
        selectedIndexes={selectedGenreIndexes}
        onPress={(value)=>{
          setSelectedGenreIndexes(value);
        }}
        containerStyle={[styles.button, themeButtonStyle]}
      />
      <Text h4 style={[styles.text, themeTextStyle]}>Movie</Text>
      <Input
      placeholder='Similar Movie'
      onChangeText={value => setMovieName(value)}
      />
      <Button 
      onPress={()=>recommend()}
      buttonStyle={{
        borderWidth: 2,
        borderRadius: 30,
      }}
      containerStyle={{
        marginHorizontal: 2,
        marginVertical: 2,
      }}
      titleStyle={{ fontWeight: 'bold' }}
      >
        Recommend
      </Button>
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
      <AIStack.Screen name="PictureLock" component={AIScreen} />
      <AIStack.Screen name="Details" component={DetailsScreen} />
    </AIStack.Navigator>
  );
}