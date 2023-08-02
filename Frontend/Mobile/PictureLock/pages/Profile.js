import {View, ScrollView, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Text } from "native-base";

function ProfileScreen({ navigation }) {
  const styles = {
    flexA: {
      flex: 1,
    },
    base: {
      flexGrow: 1,
    },
    userProfile: {
      flex: 1,
    },
    userProfileTop: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40,
    },
    userProfileTopBg: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
    },
    userProfileTopOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
    },
    avatar: {
      flexShrink: 0,
      width: 128,
      height: 128,
    },
    avatarContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#ffffff',
      borderRadius: 64,
      backgroundColor: '#a8bac1',
      overflow: 'hidden',
    },
    avatarImg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    avatarStatus: {
      position: 'absolute',
      right: 10.1,
      bottom: 10.1,
      width: 20,
      height: 20,
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#ffffff',
      borderRadius: 10,
      backgroundColor: '#67ab5b',
    },
    userProfileInfo: {
      paddingHorizontal: 24,
    },
    userProfileInfoName: {
      marginTop: 16,
      color: '#000000',
      fontSize: 22,
      textAlign: 'center',
    },
    userProfileInfoJobTitle: {
      marginTop: 4,
      color: '#000000',
      fontSize: 16,
      textAlign: 'center',
      opacity: 0.7,
    },
    userProfileWidget: {
      alignSelf: 'stretch',
      margin: 24,
      marginTop: 24,
      marginBottom: 24,
    },
    widget: {
      flexDirection: 'row',
      flexGrow: 1,
      flexShrink: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: 8,
      paddingVertical: 8,
      minHeight: 60,
    },
    widgetItem: {
      flex: 1,
      justifyContent: 'center',
      minWidth: 0,
      paddingVertical: 4,
      borderRightWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    widgetItemLast: {
      borderRightWidth: 0,
    },
    widgetItemLabel: {
      color: '#ffffff',
      fontSize: 14,
      textAlign: 'center',
      opacity: 0.5,
    },
    widgetItemValue: {
      marginTop: 4,
      color: '#ffffff',
      fontSize: 16,
      textAlign: 'center',
    },
    userProfileBody: {
      flexGrow: 1,
      paddingTop: 24,
      paddingBottom: 100,
    },
    flexB: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 24,
      paddingHorizontal: 24,
    },
    btnA: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 46,
      minWidth: 130,
      maxWidth: '100%',
      paddingHorizontal: 24,
      backgroundColor: '#299cd1',
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#299cd1',
      overflow: 'hidden',
    },
    btnTextA: {
      color: '#ffffff',
      fontSize: 20,
    },
    btnB: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 46,
      minWidth: 130,
      maxWidth: '100%',
      paddingHorizontal: 24,
      backgroundColor: '#ffffff00',
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#032535',
      overflow: 'hidden',
    },
    btnTextB: {
      color: '#032535',
      fontSize: 20,
    },
  };
    return (
    //   <View style={styles.flexA}>
    //   <ScrollView contentContainerStyle={styles.base}>
    //     <View style={styles.userProfile}>
    //       <View style={styles.userProfileTop}>
    //         <View style={styles.userProfileTopOverlay} />
    //         <View style={styles.avatar}>
    //           <View style={styles.avatarContainer}>
    //             <Image
    //               style={styles.avatarImg}
    //               source={{uri: 'https://images.unsplash.com/photo-1620508115467-aa36a8dcf82d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80'}}
    //             />
    //           </View>
    //           <View style={styles.avatarStatus} />
    //         </View>
    //         <View style={styles.userProfileInfo}>
    //           <Text style={styles.userProfileInfoName}>Amelie Stevens</Text>
    //           <Text style={styles.userProfileInfoJobTitle}>Graphic designer</Text>
    //         </View>
    //         <View
    //           style={[
    //             styles.userProfileWidget,
    //             styles.widget,
    //           ]}
    //         >
    //           <View style={styles.widgetItem}>
    //             <Text style={styles.widgetItemLabel}>FRIENDS</Text>
    //             <Text style={styles.widgetItemValue}>1589</Text>
    //           </View>
    //           <View style={styles.widgetItem}>
    //             <Text style={styles.widgetItemLabel}>FOLLOWING</Text>
    //             <Text style={styles.widgetItemValue}>638</Text>
    //           </View>
    //           <View style={[styles.widgetItem, styles.widgetItemLast]}>
    //             <Text style={styles.widgetItemLabel}>FOLLOWERS</Text>
    //             <Text style={styles.widgetItemValue}>356</Text>
    //           </View>
    //         </View>
    //       </View>
    //       <View style={styles.userProfileBody}>
    //         <View style={styles.flexB}>
    //           <TouchableOpacity style={styles.btnA} activeOpacity={0.8}>
    //             <Text style={styles.btnTextA} numberOfLines={1}>
    //               Follow
    //             </Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity style={styles.btnB} activeOpacity={0.8}>
    //             <Text style={styles.btnTextB} numberOfLines={1}>
    //               Message
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View>
    //   </ScrollView>
    // </View>
    );
}

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}