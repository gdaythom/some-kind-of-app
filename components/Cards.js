import React from 'react';
import { useWindowDimensions, View, Modal, Pressable, Alert, Text, Image } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { Video } from 'expo-av';
import { WebBrowserButton } from './Buttons';

import { getShowRun, getShowSeasonTitle, getSearchTerm, getShowSeasonCount, getShowEpisodeCount, getSeasonEpisodeCount, getYear, getReleaseDate, getRuntime, removeHtmlTags } from '../helpers';


const ShowCard = ({ show }) => {
  return (
    <View>
      <Image
        style={{ height: 100, width: 100 }}
        source={{
          uri: show.artworkUrl100,
        }}
      />
      <Text>{ show.title }</Text>
      <Text>{ removeHtmlTags(show.longDescription) }</Text>
      <Text>Run: { getShowRun(show) }</Text>
      <Text>Seasons: { getShowSeasonCount(show) }</Text>
      <Text>Episodes: { getShowEpisodeCount(show) }</Text>
    </View>
  );
}

const SeasonCard = ({ season }) => {
  return (
    <View>
      <Text style={{ fontSize: 34, fontWeight: "bold", }}>{getShowSeasonTitle(season.collectionName, season.artistName)}</Text>
      <Text>{ removeHtmlTags(season.longDescription) }</Text>
      <Text>Released { getReleaseDate(season.releaseDate) }</Text>
      {/* <Text>Episodes: { getSeasonEpisodeCount(season) }</Text> */}
    </View>
  );
}

const EpisodeCard = ({ episode }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const webUrl = getSearchTerm(episode.artistName + ' ' + episode.trackName);
  return(
    <View>
      <Text style={{ fontSize: 13, color: "#3C3C43", }}>{getShowSeasonTitle(episode.collectionName, episode.artistName)}</Text>
      <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ episode.trackNumber }. { episode.trackName }</Text>
      <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ getReleaseDate(episode.releaseDate) }</Text>
      <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ getRuntime(episode.trackTimeMillis) }</Text>
      <Text style={{ fontSize: 17, marginBottom: 16, }}>{ episode.longDescription }</Text>
      <WebBrowserButton webUrl={webUrl} />
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
  const webUrl = getSearchTerm(movie.trackName);
  return(
    <View>
      <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ movie.trackName }</Text>
      <Text style={{ fontSize: 17, marginBottom: 1, }}>{ getYear(movie.releaseDate) }</Text>
      <Text style={{ fontSize: 17, marginBottom: 1, }}>{ movie.artistName }</Text>
      <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ getRuntime(movie.trackTimeMillis) }</Text>
      <Text style={{ fontSize: 17, marginBottom: 16, }}>{ movie.contentAdvisoryRating }</Text>
      
      <Text style={{ fontSize: 17, marginBottom: 16, }}>{ movie.longDescription }</Text>
      
      <WebBrowserButton webUrl={webUrl} />
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

export { ShowCard, SeasonCard, EpisodeCard, MovieCard };
