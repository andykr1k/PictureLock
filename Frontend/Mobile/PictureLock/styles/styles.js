import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      gap: 4
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
      backgroundColor: '#ffffff',
    },
    darkButton: {
      backgroundColor: '#242c40',
    },
    lightContainer: {
      backgroundColor: '#ffffff',
    },
    darkContainer: {
      backgroundColor: '#242c40',
    },
    lightPost: {
      backgroundColor: '#ffffff',
    },
    darkPost: {
      backgroundColor: '#242c40',
    },
    lightThemeText: {
      color: '#242c40',
      padding: 6
    },
    darkThemeText: {
      color: '#d0d0c0',
      padding: 6
    },
  });