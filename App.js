import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, StyleSheet, Button, Pressable, Text, Modal, Alert, Image, View, SafeAreaView, ScrollView, SectionList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


// import * as WebBrowser from 'expo-web-browser';
// import RenderHtml from 'react-native-render-html';
// import { Video } from 'expo-av';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SeasonHeader, EpisodeItem } from './components/SectionListHeader';
import { MovieCard } from './components/Cards';

const movies = require(`./assets/movies.json`);

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

// const formatSeriesData = (series) => {
//   let dataSeries = [];
//   series.seasons.forEach((season, index) => {
//     let dataSeason = {};
//     season.results.forEach((episode, index) => {
//       if(index === 0) {
//         dataSeason['season'] = episode
//         dataSeason.data = [];
//       } else { 
//         dataSeason.data.push(episode);
//       }
//     });
//     dataSeries.push(dataSeason);
//   });
//   return dataSeries;
// }

const formatSeasonData = (season) => {
  let dataShow = [];
  let dataSeason = {};
  season.results.forEach((episode, index) => {
    if(index === 0) {
      dataSeason['season'] = episode
      dataSeason.data = [];
    } else { 
      dataSeason.data.push(episode);
    }
  });
  dataShow.push(dataSeason);
  return dataShow;
}

// const randomIntFromInterval = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

// const getSeriesSeason = (artist, collection) => {
//   return artist.replace(`${collection}, `, '');
// }

// const getYear = (date) => {
//   var d = new Date(date);
//   return d.getFullYear();
// }

// const renderSeries = (seasons) => {
//   var series = [];
//   seasons.map((item) => (
//     series.push(
//       renderSeason(item)
//     )
//   ))
//   return (
//     <View>
//       { series }
//     </View>
//   )
// }

// const RandomSeriesEpisode = (seasons) => {
//   const [episode, setEpisode] = React.useState({});

//   const getRandomEpisode = (seasons) => {
//     const randomSeason = randomIntFromInterval(0, seasons.length - 1);
//     let season = seasons[randomSeason];
//     let episodes = season.results;
//     const randomEpisode = randomIntFromInterval(1, episodes.length - 1);
//     let episode = episodes[randomEpisode];
//     setEpisode(episode);
//   }

//   return(
//     <View style={{ backgroundColor: "#ffffff", padding: 16, marginVertical: 16, borderRadius: 8, }}>
//       <View style={{ flex: 1, flexDirection: "row", alignItems: "center", }}>
//         <View style={{ width: "90%", }}>
//           <Text style={{ fontSize: 34, fontWeight: "bold", }}>Random</Text>
//         </View>
//         <View style={{ width: "10%", }}>
//           <Pressable onPress={() => getRandomEpisode(seasons.seasons)}>
//             <Ionicons name="reload" size={24} color="#3C3C43" />
//           </Pressable>
//         </View>
//       </View>
//       {episode && Object.keys(episode).length !== 0 && Object.getPrototypeOf(episode) === Object.prototype &&
//         <View style={{ marginTop: 16, }}>
//           <EpisodeCard episode={episode} />
//         </View>
//       }
//     </View>
//   );

// }

// const SeasonHeader = ({ width, episode }) => (
//   <View>
//     <Text style={{ fontSize: 13, color: "#3C3C43", }}>Released {getYear(episode.releaseDate)}</Text>
//     <Text style={{ fontSize: 34, fontWeight: "bold", }}>{getSeriesSeason(episode.collectionName, episode.artistName)}</Text>
//     {/* <RenderHtml contentWidth={width} source={{ html: episode.longDescription }} /> */}
//   </View>
// );

// const WebBrowserButton = ({ webUrl }) => {
//   const [result, setResult] = React.useState(null);
//   const _handlePressButtonAsync = async () => {
//     let result = await WebBrowser.openBrowserAsync(webUrl, { dismissButtonStyle: 'close', controlsColor: '#000000' });
//     setResult(result);
//   };

//   return(
//     <Pressable onPress={_handlePressButtonAsync}>
//       <Ionicons name="play" size={24} color="#3C3C43" />
//     </Pressable>
//   );
// }

// const EpisodeCard = ({ episode }) => {
//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});
//   const webUrl = `https://google.com/search?q=${encodeURIComponent(episode.artistName + ' ' + episode.trackName)}`;
//   React.useEffect(() => video.current.playFromPositionAsync(0), [episode]);

//   return(
//     <View>
//       <View style={{ flexDirection: "row", alignItems: "center", }}>
//         <View style={{ flex: 1, }}>
//           <Text style={{ fontSize: 13, color: "#3C3C43", }}>{getSeriesSeason(episode.collectionName, episode.artistName)}</Text>
//           <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ episode.trackNumber }. { episode.trackName }</Text>
//           <Text style={{ fontSize: 17, marginBottom: 16, }}>{ episode.longDescription }</Text>
//         </View>
//         <View style={{ padding: 8, }}>
//           <WebBrowserButton webUrl={webUrl} />
//         </View>
//       </View>
//       <Video
//         ref={video}
//         style={{ width: "100%", aspectRatio: 1.3 / 1, marginTop: 8, marginBottom: 8, borderRadius: 8, }}
//         source={{
//           uri: episode.previewUrl,
//         }}
//         useNativeControls
//         resizeMode="contain"
//         isLooping="false"
//         onPlaybackStatusUpdate={status => setStatus(() => status)}
//       />
//     </View>
//   );
// }

// const EpisodeItem = ({ episode }) => {
//   const webUrl = `https://google.com/search?q=${encodeURIComponent(episode.artistName + ' ' + episode.trackName)}`;
//   return(
//     <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 18, }}>
//       <View style={{ flex: 1, }}>
//         <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 1, }}>{ episode.trackNumber }. { episode.trackName }</Text>
//         <Text style={{ fontSize: 17, }}>{ episode.shortDescription }...</Text>
//       </View>
//       <View style={{ padding: 8, }}>
//         <WebBrowserButton webUrl={webUrl} />
//       </View>
//     </View>
//   )
// }

// function EpisodesScreen(props) { 
//   const ref = React.useRef(null);
//   useScrollToTop(ref);
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView} ref={ref}>
//         <RandomSeriesEpisode seasons={props.show.seasons} />
//         <View key={props.show.code}>{ renderSeries(props.show.seasons) }</View>
//         <StatusBar style="auto" />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


//  function DetailsScreen({ route, navigation }) {
//   const sectionListRef = React.useRef(null);
//   const [selectedSection, setSelectedSection] = React.useState(0);
//   React.useEffect(() => {
//     sectionListRef.current.scrollToLocation({ animated: false, sectionIndex: selectedSection, itemIndex: 1 });
//   }, [selectedSection]);

//   const { series } = route.params;
//   const tvshow = formatSeriesData(series);

//   const moveToSection = (index, sectionListRef) => {
//     console.log("moveToSection", index);
//     setSelectedSection(index);    
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, marginHorizontal: 16 }}>
//       <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 18, }}>
//         <Button title="1" onPress={() => moveToSection(0, sectionListRef)} />
//         <Button title="2" onPress={() => moveToSection(1, sectionListRef)} />
//         <Button title="3" onPress={() => moveToSection(2, sectionListRef)} />
//         <Button title="4" onPress={() => moveToSection(3, sectionListRef)} />
//         <Button title="5" onPress={() => moveToSection(4, sectionListRef)} />
//         <Button title="6" onPress={() => moveToSection(5, sectionListRef)} />
//         <Button title="7" onPress={() => moveToSection(6, sectionListRef)} />
//       </View>
//       <SectionList
//         ref={sectionListRef}
//         sections={tvshow}
//         keyExtractor={(item, index) => item + index}
//         renderItem={({ item }) => <EpisodeItem episode={item} />}
//         renderSectionHeader={({ section: { season } }) => <SeasonHeader season={season} />}
//         onScrollToIndexFailed={(error) => {
//           const offset = error.averageItemLength * error.index;
//           console.log("error", error);
//           console.log("offset", offset);
//           console.log("selectedSection", selectedSection);
//           setTimeout(() => sectionListRef.current.scrollToLocation({ animated: false, sectionIndex: 0, itemIndex: error.highestMeasuredFrameIndex }), 100)
//           setTimeout(() => sectionListRef.current.scrollToLocation({ animated: false, sectionIndex: selectedSection, itemIndex: 0 }), 100)
//         }}
//       />
//     </SafeAreaView>
//   );
// }

// const renderSeason = (season) => (
//   <View key={randomIntFromInterval(1, 1000)} style={{ backgroundColor: "#ffffff", padding: 16, marginVertical: 8, borderRadius: 8, }}>
//     { listSeason(season) }
//   </View>
// )

// const listSeason = (season) => {
//   const { width } = useWindowDimensions();
//   return (
//     season.results.map((item, index) => (
//       <View key={index}>
//         {(() => {
//           if (index == 0){
//             return <SeasonHeader width={width} episode={item} />
//           }
//           return <EpisodeItem episode={item} />
//         })()}
//       </View>
//     ))
//   );
// }






function HomeScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Star Trek Episodes</Text>
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>

        <StatusBar hidden={false} style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const ShowsStack = createNativeStackNavigator();

function ShowsStackScreen() {
  return (
    <ShowsStack.Navigator>
      <ShowsStack.Screen name="Shows" component={ShowsScreen} />
      <ShowsStack.Screen name="Show" component={ShowScreen} options={({ route }) => ({ title: route.params.name })} />
      <ShowsStack.Screen name="Season" component={SeasonScreen} options={({ route }) => ({ title: route.params.name })} />
    </ShowsStack.Navigator>
  );
}

function ShowsScreen({ navigation }) {
  return (
    <View>
      <Text>Shows Screen</Text>
      <Pressable onPress={() => navigation.navigate('Show', { name: "The Original Series", series: tosSeries })}>
        <Text>TOS</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Show', { name: "The Next Generation", series: tngSeries })}>
        <Text>TNG</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Show', { name: "Deep Space Nine", series: ds9Series })}>
        <Text>DS9</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Show', { name: "Voyager", series: voySeries })}>
        <Text>VOY</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Show', { name: "Enterprise", series: entSeries })}>
        <Text>ENT</Text>
      </Pressable>
    </View>
   );
 }

 function ShowScreen({ route, navigation }) {
  const { series } = route.params;
  return (
    <View>
      <Text>ShowScreen</Text>
      <Text>{ series.name }</Text>
      <Text>{ series.code }</Text>
      <Text>{ series.seasons.length }</Text>
      {series.seasons.map((season, index) => (
        <Pressable key={index} onPress={() => navigation.navigate('Season', { name: `Season ${index + 1}`, season: season })}>
          <Text>Season { index + 1 }</Text>
        </Pressable>
      ))}
    </View>
  );
 }

 

 function SeasonScreen({ route, navigation }) {
  const { season } = route.params;
  const tvshow = formatSeasonData(season);
  return (
    <View>
      <Text>SeasonScreen</Text>
      <Text>{ season.results.length - 1 }</Text>
      <SectionList
        sections={tvshow}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <EpisodeItem episode={item} />}
        renderSectionHeader={({ section: { season } }) => <SeasonHeader season={season} />}
      />
    </View>
  );
 }

const MoviesStack = createNativeStackNavigator();

function MoviesStackScreen() {
  return (
    <MoviesStack.Navigator>
      <MoviesStack.Screen name="Movies" component={MoviesScreen} />
      <MoviesStack.Screen name="Movie" component={MovieScreen} options={({ route }) => ({ title: route.params.name })} />
    </MoviesStack.Navigator>
  );
}

 function MoviesScreen({ route, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Movies Screen</Text>
        {movies.results.map((movie, index) => (
          <Pressable key={index} onPress={() => navigation.navigate('Movie', { name: movie.trackName, movie: movie })}>
            <Text>{ movie.trackName }</Text>
          </Pressable>
        ))}
        <StatusBar hidden={false} style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

function MovieScreen({ route }) {
  const { movie } = route.params;
  return (
    <View>
      <Text>MovieScreen</Text>
      <MovieCard movie={movie} />
    </View>
  );
 }

 function SavedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Saved Screen</Text>
        <StatusBar hidden={false} style="auto" />
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ShowsStack" component={ShowsStackScreen} options={{ headerShown: false, tabBarLabel: "Shows" }} />
      <Tab.Screen name="MoviesStack" component={MoviesStackScreen}  options={{ headerShown: false, tabBarLabel: "Movies" }} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      {/* <Tab.Screen name="The Next Generation" options={{ tabBarLabel: "TNG" }}>
        {() => <EpisodesScreen show={tngSeries} />}
      </Tab.Screen> */}
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
  modalView: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
