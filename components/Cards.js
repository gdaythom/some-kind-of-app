import React from 'react';
import { useWindowDimensions, View, Modal, Pressable, Alert, Text, Image } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { Video } from 'expo-av';
import { PlayButton } from './Buttons';

import { getShowRun, getShowSeasonTitle, getShowSeasonNumber, getSearchTerm, getShowSeasonCount, getYear, getReleaseDate, getRuntime, removeHtmlTags } from '../helpers';


const ShowCard = ({ show }) => {
  return (
    <View style={{ backgroundColor: '#fdfdfd', padding: 20 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 12, }}>
          <Image
            style={{ height: 100, width: 100, marginTop: 10, marginBottom: 20, borderRadius: 4, }}
            source={{
              uri: show.artworkUrl100,
            }}
          />
        </View>
      </View>
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, }}>{ show.title }</Text>
      <Text style={{ fontSize: 14, textAlign: 'center', color: '#4C4C4C', marginBottom: 20, }}>{ getShowRun(show) } • { getShowSeasonCount(show) } seasons</Text>
      <Text style={{ fontSize: 17, marginBottom: 1, }}>{ removeHtmlTags(show.longDescription) }</Text>
    </View>
  );
}

const SeasonCard = ({ season }) => {
  return (
    <View style={{ backgroundColor: '#fdfdfd', padding: 20 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 12, }}>
          <Image
            style={{ height: 100, width: 100, marginTop: 10, marginBottom: 20, borderRadius: 4, }}
            source={{
              uri: season.artworkUrl100,
            }}
          />
        </View>
      </View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, }}>{ season.artistName }</Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, }}>{ getShowSeasonTitle(season.artistName, season.collectionName) }</Text>
      <Text style={{ fontSize: 14, textAlign: 'center', color: '#4C4C4C', marginBottom: 20, }}>{ getReleaseDate(season.releaseDate) } • { season.trackCount } episodes</Text>
      <Text style={{ fontSize: 17, marginBottom: 1, }}>{ removeHtmlTags(season.longDescription) }</Text>
    </View>
  );
}

const EpisodeCard = ({ episode }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const webUrl = getSearchTerm(episode.artistName + ' ' + episode.trackName);
  return(
    <View style={{ backgroundColor: '#fdfdfd', padding: 20 }}>
      <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 12, }}>
        <Video
          ref={video}
          style={{ width: "100%", aspectRatio: 1.3 / 1, marginTop: 10, marginBottom: 20, borderRadius: 8, }}
          source={{
            uri: episode.previewUrl,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping="false"
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, }}>{ episode.artistName }</Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, }}>{ episode.trackName }</Text>
      <Text style={{ fontSize: 14, textAlign: 'center', color: '#4C4C4C', marginBottom: 20, }}>{ getReleaseDate(episode.releaseDate) } • { getRuntime(episode.trackTimeMillis) }</Text>
      <PlayButton webUrl={webUrl} />
      <Text style={{ fontSize: 16, marginTop: 20, }}><Text style={{ fontWeight: 'bold', }}>S{getShowSeasonNumber(episode.collectionName, episode.artistName)} E{ episode.trackNumber }:</Text> { episode.longDescription }</Text>
    </View>
  );
}

const RandomEpisodeCard = ({ episode }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const webUrl = getSearchTerm(episode.artistName + ' ' + episode.trackName);
  return(
    <View style={{ backgroundColor: '#ffffff', marginHorizontal: 20, marginTop: 20, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 12, }}>
      <View style={{ backgroundColor: '#000000', borderTopLeftRadius: 8, borderTopRightRadius: 8, }}>
        <Video
          ref={video}
          style={{ width: "100%", aspectRatio: 1.3 / 1, borderTopLeftRadius: 8, borderTopRightRadius: 8, }}
          source={{
            uri: episode.previewUrl,
          }}
          useNativeControls={false}
          resizeMode="contain"
          isLooping="false"
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
      <View style={{ padding:10, }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginBottom: 5, }}>{ episode.artistName }</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'left', marginBottom: 5, }}>{ episode.trackName }</Text>
        <Text style={{ fontSize: 14, textAlign: 'left', color: '#4C4C4C', }}>S{getShowSeasonNumber(episode.collectionName, episode.artistName)} E{ episode.trackNumber } • { getRuntime(episode.trackTimeMillis) }</Text>
      </View>
    </View>
  );
}

const MovieCard = ({ movie }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const webUrl = getSearchTerm(movie.trackName);
  return(
    <View style={{ backgroundColor: '#fdfdfd', padding: 20 }}>
      <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 12, }}>
        <Video
          ref={video}
          style={{ width: "100%", aspectRatio: 1.3 / 1, marginTop: 10, marginBottom: 20, borderRadius: 8, }}
          source={{
            uri: movie.previewUrl,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping="false"
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, }}>{ movie.trackName }</Text>
      <Text style={{ fontSize: 14, textAlign: 'center', color: '#4C4C4C', marginBottom: 20, }}>{ getYear(movie.releaseDate) } • { getRuntime(movie.trackTimeMillis) } • { movie.contentAdvisoryRating }</Text>
      <PlayButton webUrl={webUrl} />
      <Text style={{ fontSize: 16, marginTop: 20, }}>{ movie.longDescription }</Text>
    </View>
  );
}

const PlaylistCard = ({ title }) => {
  return (
    <View style={{ backgroundColor: '#fdfdfd', paddingTop: 20, paddingLeft: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', }}>{ title }</Text>
    </View>
  );
}

export { ShowCard, SeasonCard, EpisodeCard, RandomEpisodeCard, MovieCard, PlaylistCard };
