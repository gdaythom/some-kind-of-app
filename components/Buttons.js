import React from 'react';
import { View, Pressable, Text, Share } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';

const SearchButton = ({ webUrl }) => {
  const [result, setResult] = React.useState(null);
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(webUrl, { dismissButtonStyle: 'close', controlsColor: '#000000' });
    setResult(result);
  };
  return(
    <Pressable onPress={_handlePressButtonAsync} style={{ backgroundColor: '#eeeeef', flex: 1, flexDirection: "row", borderRadius: 10, padding: 10, }}>
      <View style={{ alignItems: 'flex-end', paddingRight: 5, verticalAlign: 'middle', width: '40%', }}>
        <Ionicons name="ios-search-sharp" size={24} color="#3478F6" />
      </View>
      <View style={{ alignItems: 'stretch', paddingLeft: 5, verticalAlign: 'middle', width: '60%', }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#3478F6', margin: 0, paddingTop: 2, }}>Search</Text>
      </View>
    </Pressable>
  );
}

const ShareButton = ({ message }) => {
  const _onShare = async () => {
    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return(
    <Pressable onPress={_onShare} style={{ backgroundColor: '#eeeeef', flex: 1, flexDirection: "row", borderRadius: 10, padding: 10, }}>
      <View style={{ alignItems: 'flex-end', paddingRight: 5, verticalAlign: 'middle', width: '40%', }}>
        <Ionicons name="ios-share-outline" size={24} color="#3478F6" />
      </View>
      <View style={{ alignItems: 'stretch', paddingLeft: 5, verticalAlign: 'middle', width: '60%', }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#3478F6', margin: 0, paddingTop: 2, }}>Share</Text>
      </View>
    </Pressable>
  );
}

const BackButton = ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.goBack()} style={{ paddingTop: 20, paddingLeft: 5, }}>
      <Ionicons name="ios-chevron-back-circle-sharp" size={34} color="#3478F6" />
    </Pressable>
  );
}

const CloseButton = ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons name="ios-close-circle-sharp" size={34} color="#3478F6" />
    </Pressable>
  );
}

export { SearchButton, ShareButton, BackButton, CloseButton };
