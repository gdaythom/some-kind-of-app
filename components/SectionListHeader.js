import React from 'react';
import { useWindowDimensions, View, Modal, Pressable, Alert, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import RenderHtml from 'react-native-render-html';
import { WebBrowserButton } from './Buttons';

const getSeriesSeason = (artist, collection) => {
  return artist.replace(`${collection}, `, '');
}

const getYear = (date) => {
  var d = new Date(date);
  return d.getFullYear();
}

const SeasonHeader = ({ season }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { width } = useWindowDimensions();
  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      <Pressable
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontSize: 34, fontWeight: "bold", }}>{getSeriesSeason(season.collectionName, season.artistName)}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View>
            <Text style={{ fontSize: 13, color: "#3C3C43", }}>Released {getYear(season.releaseDate)}</Text>
            <Text style={{ fontSize: 34, fontWeight: "bold", }}>{getSeriesSeason(season.collectionName, season.artistName)}</Text>
            <RenderHtml contentWidth={width} source={{ html: season.longDescription }} />
            <Image
              style={{ height: 50, width: 50 }}
              source={{
                uri: season.artworkUrl100,
              }}
            />
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const EpisodeItem = ({ episode }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const webUrl = `https://google.com/search?q=${encodeURIComponent(episode.artistName + ' ' + episode.trackName)}`;
  // React.useEffect(() => video.current.playFromPositionAsync(0), [episode]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 18, }}>
      <View style={{ flex: 1, }}>
        <Pressable
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ episode.trackNumber }. { episode.trackName }</Text>
          <Text style={{ fontSize: 17, }}>{ episode.shortDescription }...</Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View>
          <View>
            <Text style={{ fontSize: 34, fontWeight: "bold", }}>{episode.trackName}</Text>
            <Text style={{ fontSize: 17, }}>{ episode.longDescription }</Text>
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
            <WebBrowserButton webUrl={webUrl} />
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export { SeasonHeader, EpisodeItem };
