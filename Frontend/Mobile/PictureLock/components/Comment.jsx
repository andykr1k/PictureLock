import { Text, View, useColorScheme, Image, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import IconButton from './IconButton';
import TimeAgo from '../functions/TimeAgo';
export default function Comment(props) {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? style.lightThemeText : style.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? style.lightPost : style.darkPost;
    return (
    <View style={[style.container, themeContainerStyle]}>
        <Image source={{uri:props.post.author.image}} style={style.userImage} />
        <View style={style.mainContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row'  }}>
              <Text style={[style.name, themeTextStyle]}>{props.post.author.username}</Text>
              <Text style={[style.content, themeTextStyle]}>· {TimeAgo(props.post.createdAt)}</Text>
            </View>

            <Entypo
              name="dots-three-horizontal"
              size={16}
              color="gray"
              style={{ marginLeft: 'auto' }}
            />
            </View>
            <Text style={[style.postContent, themeTextStyle]}>{props.post.content}</Text>

          </View>
    </View>
    );
  }

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  postContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  posterContent: {
    flex: 1,
    maxHeight: '100%'
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
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
  postContent: {
    color: 'gray',
    fontSize: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
    marginVertical: 10,
    borderRadius: 15,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '70%'
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
});
