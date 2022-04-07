import React from 'react';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';

const WebBrowserButton = ({ webUrl }) => {
  const [result, setResult] = React.useState(null);
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(webUrl, { dismissButtonStyle: 'close', controlsColor: '#000000' });
    setResult(result);
  };

  return(
    <Pressable onPress={_handlePressButtonAsync}>
      <Ionicons name="play" size={24} color="#3C3C43" />
    </Pressable>
  );
}

export { WebBrowserButton };
