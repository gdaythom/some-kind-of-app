import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getShowSeasonNumber } from '../helpers';

const ShowItem= ({ show }) => {
  return(
    <View style={{ paddingLeft: 20, }}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#C6C6C8' }}>
        <View style={{ flex: 1, verticalAlign: 'middle', }}>
          <Text style={{ fontSize: 21, color: '#3478F6', }}>{ show.title }</Text>
        </View>
        <View style={{ alignItems: 'stretch', verticalAlign: 'middle', paddingRight: 20, }}>
          <Ionicons name="chevron-forward" size={24} color="#AAAAAA" />
        </View>
      </View>
    </View>
  ); 
}

const SeasonItem= ({ season }) => {
  return(
    <View style={{ paddingLeft: 20, }}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#C6C6C8' }}>
        <View style={{ flex: 1, verticalAlign: 'middle', }}>
          <Text style={{ fontSize: 21, color: '#3478F6', }}>Season { season + 1 }</Text>
        </View>
        <View style={{ alignItems: 'stretch', verticalAlign: 'middle', paddingRight: 20, }}>
          <Ionicons name="chevron-forward" size={24} color="#AAAAAA" />
        </View>
      </View>
    </View>
  ); 
}

const EpisodeItem = ({ episode }) => {
  return(
    <View style={{ paddingLeft: 20, }}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#C6C6C8' }}>
        <View style={{ flex: 1, verticalAlign: 'middle', }}>
          <Text style={{ fontSize: 21, color: '#3478F6', }}>{ episode.trackNumber }. { episode.trackName }</Text>
          <Text style={{ fontSize: 12, }}>{ episode.shortDescription }...</Text>
        </View>
        <View style={{ alignItems: 'stretch', verticalAlign: 'middle', paddingRight: 20, }}>
          <Ionicons name="chevron-forward" size={24} color="#AAAAAA" />
        </View>
      </View>
    </View>
  );
}

const MovieItem = ({ movie }) => {
  return(
    <View style={{ paddingLeft: 20, }}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#C6C6C8' }}>
        <View style={{ flex: 1, verticalAlign: 'middle', }}>
          <Text style={{ fontSize: 21, color: '#3478F6', }}>{ movie.trackName }</Text>
        </View>
        <View style={{ alignItems: 'stretch', verticalAlign: 'middle', paddingRight: 20, }}>
          <Ionicons name="chevron-forward" size={24} color="#AAAAAA" />
        </View>
      </View>
    </View>
  );
}

const PlaylistItem = ({ episode }) => {
  return(
    <View style={{ paddingLeft: 20, }}>
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#C6C6C8' }}>
        <View style={{ flex: 1, verticalAlign: 'middle', }}>
          <Text style={{ fontSize: 21, color: '#3478F6', }}>{ episode.trackName }</Text>
          <Text style={{ fontSize: 14, textAlign: 'left', color: '#4C4C4C', marginBottom: 5, }}>{ episode.artistName } • S{getShowSeasonNumber(episode.collectionName, episode.artistName)} E{ episode.trackNumber }</Text>
          <Text style={{ fontSize: 12, }}>{ episode.shortDescription }...</Text>
        </View>
        <View style={{ alignItems: 'stretch', verticalAlign: 'middle', paddingRight: 20, }}>
          <Ionicons name="chevron-forward" size={24} color="#AAAAAA" />
        </View>
      </View>
    </View>
  );
}

export { ShowItem, SeasonItem, EpisodeItem, MovieItem, PlaylistItem };
