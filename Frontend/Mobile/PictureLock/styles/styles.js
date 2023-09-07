import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    post_h: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    post_v: {
      flex: 1,
      padding: 0,
      gap: 0,
    },
    button: {
        marginBottom: 10
    },
    lightButton: {
      backgroundColor: '#F5F8FA',
    },
    darkButton: {
      backgroundColor: '#141d26',
    },
    lightContainer: {
    },
    darkContainer: {
      backgroundColor: '#141d26',
    },
    lightPost: {
      backgroundColor: '#F5F8FA',
    },
    darkPost: {
      backgroundColor: '#141d26',
    },
    lightThemeText: {
      color: '#141d26',
      padding: 6
    },
    darkThemeText: {
      color: '#d0d0c0',
      padding: 6
    },
    postReactions: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    input: {
      height: 40,
      borderWidth: 1,
      padding: 10,
      marginHorizontal: 10,
    },
    lightThemeReactions: {
      color: 'black',
      borderRadius: 10,
      borderColor: 'black'
    },
    darkThemeReactions: {
      color: 'white',
      borderRadius: 10,
      borderColor: 'white'
    },
  });