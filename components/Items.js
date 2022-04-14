import React from 'react';
import { View, Text } from 'react-native';

const ShowItem= ({ show }) => {
  return(
    <View style={{ flexDirection: "row", alignItems: "center", }}>
      <View style={{ flex: 1, }}>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ show.title }</Text>
        </View>
      <View style={{ padding: 8, }}>
        <Text>></Text>
      </View>
    </View>
  ); 
}

const SeasonItem= ({ season }) => {
  return(
    <View style={{ flexDirection: "row", alignItems: "center", }}>
      <View style={{ flex: 1, }}>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>Season { season + 1 }</Text>
      </View>
      <View style={{ padding: 8, }}>
        <Text>></Text>
      </View>
    </View>
  ); 
}

const EpisodeItem = ({ episode }) => {
  return(
    <View style={{ flexDirection: "row", alignItems: "center", }}>
      <View style={{ flex: 1, }}>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ episode.trackNumber }. { episode.trackName }</Text>
        <Text style={{ fontSize: 17, }}>{ episode.shortDescription }...</Text>
      </View>
      <View style={{ padding: 8, }}>
        <Text>></Text>
      </View>
    </View>
  );
}

const MovieItem = ({ movie }) => {
  return(
    <View style={{ flexDirection: "row", alignItems: "center", }}>
      <View style={{ flex: 1, }}>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ movie.trackName }</Text>
      </View>
      <View style={{ padding: 8, }}>
        <Text>></Text>
      </View>
    </View>
  );
}

export { ShowItem, SeasonItem, EpisodeItem, MovieItem };
