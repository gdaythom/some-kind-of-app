import React from 'react';
import { View, Pressable, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';

const PlayButton = ({ webUrl }) => {
  const [result, setResult] = React.useState(null);
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(webUrl, { dismissButtonStyle: 'close', controlsColor: '#000000' });
    setResult(result);
  };
  return(
    <Pressable onPress={_handlePressButtonAsync} style={{ backgroundColor: '#eeeeef', flex: 1, flexDirection: "row", borderRadius: 10, padding: 10, }}>
      <View style={{ alignItems: 'flex-end', paddingRight: 5, verticalAlign: 'middle', width: '45%', }}>
        <Ionicons name="ios-search-sharp" size={24} color="#3478F6" />
      </View>
      <View style={{ alignItems: 'stretch', paddingLeft: 5, verticalAlign: 'middle', width: '55%', }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#3478F6', margin: 0, paddingTop: 2, }}>Search</Text>
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

export { PlayButton, BackButton, CloseButton };
