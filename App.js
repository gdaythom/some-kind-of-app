import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, StyleSheet, Button, Pressable, Text, Modal, Alert, Image, View, SafeAreaView, ScrollView, FlatList, SectionList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


// import * as WebBrowser from 'expo-web-browser';
// import RenderHtml from 'react-native-render-html';
// import { Video } from 'expo-av';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShowItem, SeasonItem, EpisodeItem, MovieItem } from './components/Items';
import { ShowCard, SeasonCard, EpisodeCard, MovieCard } from './components/Cards';
import { BackButton } from './components/Buttons';
import { formatSeasonData } from './helpers';

const tosSeries = {
  "title": "Star Trek: The Original Series",
  "abbreviation": "TOS",
  "wrapperType": "collection",
  "collectionType": "TV Season",
  "artistId": 1439512969,
  "collectionId": 1439512970,
  "artistName": "Star Trek: The Original Series",
  "collectionName": "Star Trek: The Original Series, The Complete Series",
  "collectionCensoredName": "Star Trek: The Original Series, The Complete Series",
  "artistViewUrl": "https://itunes.apple.com/au/tv-show/star-trek-the-original-series-remastered/id1439512969?uo=4",
  "collectionViewUrl": "https://itunes.apple.com/au/tv-season/star-trek-the-original-series-remastered-the/id1439512970?uo=4",
  "artworkUrl60": "https://is3-ssl.mzstatic.com/image/thumb/Music118/v4/69/52/49/69524998-8243-f46c-e15b-454ac01a463a/source/60x60bb.jpg",
  "artworkUrl100": "https://is3-ssl.mzstatic.com/image/thumb/Music118/v4/69/52/49/69524998-8243-f46c-e15b-454ac01a463a/source/100x100bb.jpg",
  "collectionPrice": 44.99,
  "collectionHdPrice": 59.99,
  "collectionExplicitness": "notExplicit",
  "contentAdvisoryRating": "M",
  "trackCount": 79,
  "copyright": "© 2018 CBS Corp",
  "country": "AUS",
  "currency": "AUD",
  "releaseDate": "2018-11-09T08:00:00Z",
  "primaryGenreName": "Drama",
  "longDescription": "Space. The Final Frontier. The U.S.S. Enterprise embarks on a five year mission to explore the galaxy. The Enterprise is under the command of Captain James T. Kirk. The First Officer is Mr. Spock, from the planet Vulcan. The Chief Medical Officer is Dr. Leonard 'Bones' McCoy. Their mission is to explore strange new worlds, to seek new life and new civilizations, to boldly go where no man has gone before!",
  "seasons": [
    require(`./assets/shows/sttos/01.json`),
    require(`./assets/shows/sttos/02.json`),
    require(`./assets/shows/sttos/03.json`),
  ]
};
const tngSeries = {
  "title": "Star Trek: The Next Generation",
  "abbreviation": "TNG",
  "wrapperType": "collection",
  "collectionType": "TV Season",
  "artistId": 466420215,
  "collectionId": 1439415393,
  "artistName": "Star Trek: The Next Generation",
  "collectionName": "Star Trek: The Next Generation: The Complete Series",
  "collectionCensoredName": "Star Trek: The Next Generation: The Complete Series",
  "artistViewUrl": "https://itunes.apple.com/au/tv-show/star-trek-the-next-generation/id466420215?uo=4",
  "collectionViewUrl": "https://itunes.apple.com/au/tv-season/star-trek-the-next-generation-the-complete-series/id1439415393?uo=4",
  "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/f1/ca/30/f1ca3025-15dc-bac1-6ead-97b9c06d3d41/source/60x60bb.jpg",
  "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/f1/ca/30/f1ca3025-15dc-bac1-6ead-97b9c06d3d41/source/100x100bb.jpg",
  "collectionPrice": 99.99,
  "collectionHdPrice": 99.99,
  "collectionExplicitness": "notExplicit",
  "contentAdvisoryRating": "PG",
  "trackCount": 178,
  "copyright": "© 2018 CBS Corp",
  "country": "AUS",
  "currency": "AUD",
  "releaseDate": "2018-11-09T08:00:00Z",
  "primaryGenreName": "Sci-Fi & Fantasy",
  "longDescription": "Restored and meticulously remastered in brilliant high definition, <i>Star Trek: The Next Generation<\/i> is a true milestone in TV history. With such thought-provoking episodes as “The Measure of a Man” and “The Inner Light”; the return of the Borg in “The Best of Both Worlds”; and the time-shattering confrontation between Captain Jean-Luc Picard (Patrick Stewart) and the mysterious, god-like Q in the Hugo Award-winning series finale. Enjoy every memorable moment from the series that re-launched the Star Trek™ legacy for new “generations” to enjoy and experience!",
  "seasons": [
    require(`./assets/shows/sttng/01.json`),
    require(`./assets/shows/sttng/02.json`),
    require(`./assets/shows/sttng/03.json`),
    require(`./assets/shows/sttng/04.json`),
    require(`./assets/shows/sttng/05.json`),
    require(`./assets/shows/sttng/06.json`),
    require(`./assets/shows/sttng/07.json`),
  ]
};
const ds9Series = {
  "title": "Star Trek: Deep Space Nine",
  "abbreviation": "DS9",
  "wrapperType": "collection",
  "collectionType": "TV Season",
  "artistId": 256033895,
  "collectionId": 1439412147,
  "artistName": "Star Trek: Deep Space Nine",
  "collectionName": "Star Trek: Deep Space Nine: The Complete Series",
  "collectionCensoredName": "Star Trek: Deep Space Nine: The Complete Series",
  "artistViewUrl": "https://itunes.apple.com/au/tv-show/star-trek-deep-space-nine/id256033895?uo=4",
  "collectionViewUrl": "https://itunes.apple.com/au/tv-season/star-trek-deep-space-nine-the-complete-series/id1439412147?uo=4",
  "artworkUrl60": "https://is5-ssl.mzstatic.com/image/thumb/Music118/v4/42/aa/ba/42aaba0c-ffef-7834-618b-93af2213b477/source/60x60bb.jpg",
  "artworkUrl100": "https://is5-ssl.mzstatic.com/image/thumb/Music118/v4/42/aa/ba/42aaba0c-ffef-7834-618b-93af2213b477/source/100x100bb.jpg",
  "collectionPrice": 79.99,
  "collectionExplicitness": "notExplicit",
  "contentAdvisoryRating": "M",
  "trackCount": 175,
  "copyright": "© 2018 CBS Corp",
  "country": "AUS",
  "currency": "AUD",
  "releaseDate": "2018-11-09T08:00:00Z",
  "primaryGenreName": "Sci-Fi & Fantasy",
  "longDescription": "The third Star Trek series concerns Benjamin Sisko, commander of the space station Deep Space Nine, who discovers the first known stable wormhole--a virtual shortcut through space that leads from the Alpha Quadrant to the Gamma Quadrant on the other side of the galaxy.",
  "seasons": [
    require(`./assets/shows/stds9/01.json`),
    require(`./assets/shows/stds9/02.json`),
    require(`./assets/shows/stds9/03.json`),
    require(`./assets/shows/stds9/04.json`),
    require(`./assets/shows/stds9/05.json`),
    require(`./assets/shows/stds9/06.json`),
    require(`./assets/shows/stds9/07.json`),
  ]
};
const voySeries = {
  "title": "Star Trek: Voyager",
  "abbreviation": "VOY",
  "wrapperType": "collection",
  "collectionType": "TV Season",
  "artistId": 252478381,
  "collectionId": 1439413673,
  "artistName": "Star Trek: Voyager",
  "collectionName": "Star Trek: Voyager, The Complete Series",
  "collectionCensoredName": "Star Trek: Voyager, The Complete Series",
  "artistViewUrl": "https://itunes.apple.com/au/tv-show/star-trek-voyager/id252478381?uo=4",
  "collectionViewUrl": "https://itunes.apple.com/au/tv-season/star-trek-voyager-the-complete-series/id1439413673?uo=4",
  "artworkUrl60": "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/e9/9f/22/e99f22dc-ea9d-05bb-8729-4ff5172f22db/source/60x60bb.jpg",
  "artworkUrl100": "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/e9/9f/22/e99f22dc-ea9d-05bb-8729-4ff5172f22db/source/100x100bb.jpg",
  "collectionPrice": 79.99,
  "collectionExplicitness": "notExplicit",
  "contentAdvisoryRating": "M",
  "trackCount": 170,
  "copyright": "© 2018 CBS Corp",
  "country": "AUS",
  "currency": "AUD",
  "releaseDate": "2018-11-09T08:00:00Z",
  "primaryGenreName": "Sci-Fi & Fantasy",
  "longDescription": "Relive the journey of the starship Voyager - from its harrowing first season in the Delta Quadrant to its exciting encounters with alien life forms and its quest to return home. From internal ship conflicts to battles with the Borg Collective, \"Voyager\" represents some of the finest writing, acting and visual effects ever seen in the \"Trek\" universe.",
  "seasons": [
    require(`./assets/shows/stvoy/01.json`),
    require(`./assets/shows/stvoy/02.json`),
    require(`./assets/shows/stvoy/03.json`),
    require(`./assets/shows/stvoy/04.json`),
    require(`./assets/shows/stvoy/05.json`),
    require(`./assets/shows/stvoy/06.json`),
    require(`./assets/shows/stvoy/07.json`),
  ]
};
const entSeries = {
  "title": "Star Trek: Enterprise",
  "abbreviation": "ENT",
  "wrapperType": "collection",
  "collectionType": "TV Season",
  "artistId": 212367634,
  "collectionId": 1439413076,
  "artistName": "Star Trek: Enterprise",
  "collectionName": "Star Trek: Enterprise: The Complete Series",
  "collectionCensoredName": "Star Trek: Enterprise: The Complete Series",
  "artistViewUrl": "https://itunes.apple.com/au/tv-show/star-trek-enterprise/id212367634?uo=4",
  "collectionViewUrl": "https://itunes.apple.com/au/tv-season/star-trek-enterprise-the-complete-series/id1439413076?uo=4",
  "artworkUrl60": "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/8f/c5/2c/8fc52c13-8d6b-6bde-f970-bfb69762e776/source/60x60bb.jpg",
  "artworkUrl100": "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/8f/c5/2c/8fc52c13-8d6b-6bde-f970-bfb69762e776/source/100x100bb.jpg",
  "collectionPrice": 59.99,
  "collectionHdPrice": 59.99,
  "collectionExplicitness": "notExplicit",
  "contentAdvisoryRating": "M",
  "trackCount": 98,
  "copyright": "© 2018 CBS Corp",
  "country": "AUS",
  "currency": "AUD",
  "releaseDate": "2018-11-09T08:00:00Z",
  "primaryGenreName": "Sci-Fi & Fantasy",
  "longDescription": "Join Captain Archer and his crew on their last adventures, including missions to restore the mind of the legendary Vulcan Surak to his people's High Command, to defeat a rogue army of genetically-enhanced supermen led by the brilliant Dr Soong, and as evil versions of themselves, to bring all the powers of Earth's Empite to heel in the Mirror Universe!",
  "seasons": [
    require(`./assets/shows/stent/01.json`),
    require(`./assets/shows/stent/02.json`),
    require(`./assets/shows/stent/03.json`),
    require(`./assets/shows/stent/04.json`),
  ]
};

const movies = require(`./assets/movies/index.json`);

const shows = [
  tosSeries,
  tngSeries,
  ds9Series,
  voySeries,
  entSeries
];


function HomeScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 10, paddingTop: 20, paddingLeft: 20, }}>Hello</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const ShowsStack = createNativeStackNavigator();

function ShowsStackScreen() {
  return (
    <ShowsStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fdfdfd' } }}>
      <ShowsStack.Screen name="Shows" component={ShowsScreen} />
      <ShowsStack.Screen name="Show" component={ShowScreen} options={({ route }) => ({ title: route.params.title })} />
      <ShowsStack.Screen name="Season" component={SeasonScreen} options={({ route }) => ({ title: route.params.title })} />
      <ShowsStack.Screen name="Episode" component={EpisodeScreen} options={({ route }) => ({ title: route.params.title })} />
    </ShowsStack.Navigator>
  );
}

function ShowsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 10, paddingTop: 20, paddingLeft: 20, }}>Shows</Text>
        {shows.map((item, index) => (
          <Pressable key={index} onPress={() => navigation.navigate('Show', { title: item.title, show: item })}>
            <ShowItem show={item} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
   );
 }

 function ShowScreen({ route, navigation }) {
  const { show } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <BackButton navigation={navigation}  />
        <ShowCard show={show} />
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5, paddingLeft: 20, }}>Seasons</Text>
        {show.seasons.map((item, index) => (
          <Pressable key={index} onPress={() => navigation.navigate('Season', { title: `Season ${index + 1}`, season: item })}>
            <SeasonItem season={index} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
 }

 function SeasonScreen({ route, navigation }) {
  const { season } = route.params;
  const introduction = season.results[0];
  const episodes = season.results.filter((_item, index) => index > 0);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <BackButton navigation={navigation}  />
        <SeasonCard season={introduction} />
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5, paddingLeft: 20, }}>Episodes</Text>
        {episodes.map((item, index) => (
          <Pressable key={index} onPress={() => navigation.navigate('Episode', { title: item.trackName, episode: item })}>
            <EpisodeItem episode={item} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
 }

function EpisodeScreen({ route, navigation }) {
  const { episode } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <BackButton navigation={navigation}  />
        <EpisodeCard episode={episode} />
      </ScrollView>
    </SafeAreaView>
  );
}

const MoviesStack = createNativeStackNavigator();

function MoviesStackScreen() {
  return (
    <MoviesStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fdfdfd' } }}>
      <MoviesStack.Screen name="Movies" component={MoviesScreen} />
      <MoviesStack.Screen name="Movie" component={MovieScreen} options={({ route }) => ({ title: route.params.title })} />
    </MoviesStack.Navigator>
  );
}

 function MoviesScreen({ route, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 10, paddingTop: 20, paddingLeft: 20, }}>Movies</Text>
        {movies.results.map((item, index) => (
          <Pressable key={index} onPress={() => navigation.navigate('Movie', { title: item.trackName, movie: item })}>
            <MovieItem movie={item} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function MovieScreen({ route, navigation }) {
  const { movie } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <BackButton navigation={navigation}  />
        <MovieCard movie={movie} />
      </ScrollView>
    </SafeAreaView>
  );
 }

 function SavedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 1, }}>Saved</Text>
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
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="ShowsStack" component={ShowsStackScreen} options={{ headerShown: false, tabBarLabel: "Shows" }} />
      <Tab.Screen name="MoviesStack" component={MoviesStackScreen}  options={{ headerShown: false, tabBarLabel: "Movies" }} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{ headerShown: false }} />
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
    backgroundColor: '#fdfdfd',
  },
  scrollView: {
    paddingHorizontal: 0,
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
