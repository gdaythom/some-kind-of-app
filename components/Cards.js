import React from 'react';
import { useWindowDimensions, View, Modal, Pressable, Alert, Text, Image } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { Video } from 'expo-av';

const SeasonCard = ({ season }) => {
  const { width } = useWindowDimensions();
}

const EpisodeCard = ({ episode }) => {
  return(
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", }}>
        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 13, color: "#3C3C43", }}>{getSeriesSeason(episode.collectionName, episode.artistName)}</Text>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ episode.trackNumber }. { episode.trackName }</Text>
          <Text style={{ fontSize: 17, marginBottom: 16, }}>{ episode.longDescription }</Text>
        </View>
        <View style={{ padding: 8, }}>
          <WebBrowserButton webUrl={webUrl} />
        </View>
      </View>
      <Video
        ref={video}
        style={{ width: "100%", aspectRatio: 1.3 / 1, marginTop: 8, marginBottom: 8, borderRadius: 8, }}
        source={{
          uri: episode.previewUrl,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping="false"
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  );
}

const MovieCard = ({ movie }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return(
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", }}>
        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ movie.trackName }</Text>
          <Text style={{ fontSize: 17, marginBottom: 16, }}>{ movie.longDescription }</Text>
        </View>
        {/* <View style={{ padding: 8, }}>
          <WebBrowserButton webUrl={webUrl} />
        </View> */}
      </View>
      <Video
        ref={video}
        style={{ width: "100%", aspectRatio: 1.3 / 1, marginTop: 8, marginBottom: 8, borderRadius: 8, }}
        source={{
          uri: movie.previewUrl,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping="false"
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  );
}

export { EpisodeCard, MovieCard };
