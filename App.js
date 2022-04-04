import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, StyleSheet, Button, Pressable, Text, Image, View, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';
// import RenderHtml from 'react-native-render-html';
import { Video } from 'expo-av';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const tosSeries = {
  "name": "Star Trek: The Original Series",
  "code": "tos",
  "seasons": [
    require(`./assets/episodes/sttos/01.json`),
    require(`./assets/episodes/sttos/02.json`),
    require(`./assets/episodes/sttos/03.json`),
  ]
};
const tngSeries = {
  "name": "Star Trek: The Next Generation",
  "code": "tng",
  "seasons": [
    require(`./assets/episodes/sttng/01.json`),
    require(`./assets/episodes/sttng/02.json`),
    require(`./assets/episodes/sttng/03.json`),
    require(`./assets/episodes/sttng/04.json`),
    require(`./assets/episodes/sttng/05.json`),
    require(`./assets/episodes/sttng/06.json`),
    require(`./assets/episodes/sttng/07.json`),
  ]
};
const ds9Series = {
  "name": "Star Trek: Deep Space Nine",
  "code": "ds9",
  "seasons": [
    require(`./assets/episodes/stds9/01.json`),
    require(`./assets/episodes/stds9/02.json`),
    require(`./assets/episodes/stds9/03.json`),
    require(`./assets/episodes/stds9/04.json`),
    require(`./assets/episodes/stds9/05.json`),
    require(`./assets/episodes/stds9/06.json`),
    require(`./assets/episodes/stds9/07.json`),
  ]
};
const voySeries = {
  "name": "Star Trek: Voyager",
  "code": "voy",
  "seasons": [
    require(`./assets/episodes/stvoy/01.json`),
    require(`./assets/episodes/stvoy/02.json`),
    require(`./assets/episodes/stvoy/03.json`),
    require(`./assets/episodes/stvoy/04.json`),
    require(`./assets/episodes/stvoy/05.json`),
    require(`./assets/episodes/stvoy/06.json`),
    require(`./assets/episodes/stvoy/07.json`),
  ]
};
const entSeries = {
  "name": "Star Trek: Enterprise",
  "code": "ent",
  "seasons": [
    require(`./assets/episodes/stent/01.json`),
    require(`./assets/episodes/stent/02.json`),
    require(`./assets/episodes/stent/03.json`),
    require(`./assets/episodes/stent/04.json`),
  ]
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getSeriesSeason = (artist, collection) => {
  return artist.replace(`${collection}, `, '');
}

const getYear = (date) => {
  var d = new Date(date);
  return d.getFullYear();
}

const renderSeries = (seasons) => {
  var series = [];
  seasons.map((item) => (
    series.push(
      renderSeason(item)
    )
  ))
  return (
    <View>
      { series }
    </View>
  )
}

const RandomSeriesEpisode = (seasons) => {
  const [episode, setEpisode] = React.useState({});

  const getRandomEpisode = (seasons) => {
    const randomSeason = randomIntFromInterval(0, seasons.length - 1);
    let season = seasons[randomSeason];
    let episodes = season.results;
    const randomEpisode = randomIntFromInterval(1, episodes.length - 1);
    let episode = episodes[randomEpisode];
    setEpisode(episode);
  }

  return(
    <View style={{ backgroundColor: "#ffffff", padding: 16, marginVertical: 16, borderRadius: 8, }}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", }}>
        <View style={{ width: "90%", }}>
          <Text style={{ fontSize: 34, fontWeight: "bold", }}>Random</Text>
        </View>
        <View style={{ width: "10%", }}>
          <Pressable onPress={() => getRandomEpisode(seasons.seasons)}>
            <Ionicons name="reload" size={24} color="#3C3C43" />
          </Pressable>
        </View>
      </View>
      {episode && Object.keys(episode).length !== 0 && Object.getPrototypeOf(episode) === Object.prototype &&
        <View style={{ marginTop: 16, }}>
          <EpisodeCard episode={episode} />
        </View>
      }
    </View>
  );

}

const SeasonHeader = ({ width, episode }) => (
  <View>
    <Text style={{ fontSize: 13, color: "#3C3C43", }}>Released {getYear(episode.releaseDate)}</Text>
    <Text style={{ fontSize: 34, fontWeight: "bold", }}>{getSeriesSeason(episode.collectionName, episode.artistName)}</Text>
    {/* <RenderHtml contentWidth={width} source={{ html: episode.longDescription }} /> */}
  </View>
);

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

const EpisodeCard = ({ episode }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const webUrl = `https://google.com/search?q=${encodeURIComponent(episode.artistName + ' ' + episode.trackName)}`;
  React.useEffect(() => video.current.playFromPositionAsync(0), [episode]);

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

const EpisodeItem = ({ episode }) => {
  const webUrl = `https://google.com/search?q=${encodeURIComponent(episode.artistName + ' ' + episode.trackName)}`;
  return(
    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 18, }}>
      <View style={{ flex: 1, }}>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ episode.trackNumber }. { episode.trackName }</Text>
        <Text style={{ fontSize: 17, }}>{ episode.shortDescription }...</Text>
      </View>
      <View style={{ padding: 8, }}>
        <WebBrowserButton webUrl={webUrl} />
      </View>
    </View>
  )
}

const renderSeason = (season) => (
  <View key={randomIntFromInterval(1, 1000)} style={{ backgroundColor: "#ffffff", padding: 16, marginVertical: 8, borderRadius: 8, }}>
    { listSeason(season) }
  </View>
)

const listSeason = (season) => {
  const { width } = useWindowDimensions();
  return (
    season.results.map((item, index) => (
      <View key={index}>
        {(() => {
          if (index == 0){
            return <SeasonHeader width={width} episode={item} />
          }
          return <EpisodeItem episode={item} />
        })()}
      </View>
    ))
  );
}

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Star Trek app</Text>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

function EpisodesScreen(props) { 
  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} ref={ref}>
        <RandomSeriesEpisode seasons={props.show.seasons} />
        <View key={props.show.code}>{ renderSeries(props.show.seasons) }</View>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else {
            iconName = focused ? 'ios-list-circle' : 'ios-list';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#3C3C43',
      })}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="The Original Series" options={{ tabBarLabel: "TOS" }}>
        {() => <EpisodesScreen show={tosSeries} />}
      </Tab.Screen>
      <Tab.Screen name="The Next Generation" options={{ tabBarLabel: "TNG" }}>
        {() => <EpisodesScreen show={tngSeries} />}
      </Tab.Screen>
      <Tab.Screen name="Deep Space Nine" options={{ tabBarLabel: "DS9" }}>
        {() => <EpisodesScreen show={ds9Series} />}
      </Tab.Screen>
      <Tab.Screen name="Voyager" options={{ tabBarLabel: "VOY" }}>
        {() => <EpisodesScreen show={voySeries} />}
      </Tab.Screen>
      <Tab.Screen name="Enterprise" options={{ tabBarLabel: "ENT" }}>
        {() => <EpisodesScreen show={entSeries} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
});
