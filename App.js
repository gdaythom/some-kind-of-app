import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, StyleSheet, Pressable, Text, Modal, Alert, Image, View, SafeAreaView, ScrollView, SectionList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getRandomEpisode } from './helpers';
import { ShowItem, SeasonItem, EpisodeItem, MovieItem, PlaylistSectionHeader, PlaylistItem, PlaylistEpisodeItem } from './components/Items';
import { ShowCard, SeasonCard, EpisodeCard, RandomEpisodeCard, MovieCard, PlaylistCard } from './components/Cards';
import { BackButton, CloseButton } from './components/Buttons';
import { Shows as shows, Movies as movies, Playlists as playlists, TwoParters  as twoParters, ThreeParters as threeParters, TngSeries as tngSeries } from './media';


const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fdfdfd' } }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
        <HomeStack.Screen name="HomeEpisode" component={HomeEpisodeScreen} options={({ route }) => ({ title: route.params.title })} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const [episodes, setEpisodes] = React.useState([]);

  const refreshRandomEpisodes = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setEpisodes([]);
    var episodeBucket = [];
    shows.map(show => episodeBucket.push(getRandomEpisode(show.seasons)));
    setEpisodes(episodeBucket);
  };

  if(episodes.length === 0) {
    refreshRandomEpisodes();
  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} stickyHeaderIndices={[0]}>
        <View>
          <View style={{ backgroundColor: '#ffffff', flex: 1, flexDirection: "row", alignItems: "center", }}>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 34, fontWeight: "bold", paddingVertical: 20, paddingLeft: 20, }}>Home</Text>
            </View>
            <View style={{ marginLeft: 'auto', paddingRight: 20, }}>
              <Pressable onPress={() => refreshRandomEpisodes()} style={{ backgroundColor: '#eeeeef', borderRadius: 10, padding: 10, }}>
                <Ionicons name="ios-refresh-sharp" size={24} color="#3478F6" />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ paddingBottom: 20, }}>
          {episodes.map((item, index) =>
            <Pressable key={index} onPress={() => navigation.navigate('HomeEpisode', { title: item.trackName, episode: item })}><RandomEpisodeCard episode={item} /></Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeEpisodeScreen({ route, navigation }) {
  const { episode } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingTop: 20, paddingHorizontal: 5, alignItems: 'flex-end' }}>
          <CloseButton navigation={navigation} />
        </View>
        <EpisodeCard episode={episode} />
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
      <ShowsStack.Group screenOptions={{ presentation: 'modal' }}>
        <ShowsStack.Screen name="Episode" component={EpisodeScreen} options={({ route }) => ({ title: route.params.title })} />
      </ShowsStack.Group>
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
        <View style={{ paddingTop: 20, paddingHorizontal: 5, }}>
          <BackButton navigation={navigation} />
        </View>
        <ShowCard show={show} />
        <View style={{ backgroundColor: '#F2F2F7', paddingVertical: 20, }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5, paddingLeft: 20, }}>Seasons</Text>
          {show.seasons.map((item, index) => (
            <Pressable key={index} onPress={() => navigation.navigate('Season', { title: `Season ${index + 1}`, season: item })}>
              <SeasonItem season={index} />
            </Pressable>
          ))}
        </View>
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
        <View style={{ paddingTop: 20, paddingHorizontal: 5, }}>
          <BackButton navigation={navigation} />
        </View>
        <SeasonCard season={introduction} />
        <View style={{ backgroundColor: '#F2F2F7', paddingVertical: 20, }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5, paddingLeft: 20, }}>Episodes</Text>
          {episodes.map((item, index) => (
            <Pressable key={index} onPress={() => navigation.navigate('Episode', { title: item.trackName, episode: item })}>
              <EpisodeItem episode={item} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
 }

function EpisodeScreen({ route, navigation }) {
  const { episode } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingTop: 20, paddingHorizontal: 5, alignItems: 'flex-end' }}>
          <CloseButton navigation={navigation} />
        </View>
        <EpisodeCard episode={episode} />
      </ScrollView>
    </SafeAreaView>
  );
}

const MoviesStack = createNativeStackNavigator();

function MoviesStackScreen() {
  return (
    <MoviesStack.Navigator screenOptions={{ headerShown: false, presentation: 'modal', contentStyle: { backgroundColor: '#fdfdfd' } }}>
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
      <StatusBar style='light' />
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingTop: 20, paddingHorizontal: 5, alignItems: 'flex-end' }}>
          <CloseButton navigation={navigation} />
        </View>
        <MovieCard movie={movie} />
      </ScrollView>
    </SafeAreaView>
  );
 }

 const PlaylistStack = createNativeStackNavigator();

 function PlaylistStackScreen() {
   return (
     <PlaylistStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fdfdfd' } }}>
       <PlaylistStack.Screen name="Playlists" component={PlaylistsScreen} />
       <PlaylistStack.Screen name="SinglePlaylist" component={SinglePlaylistScreen} />
       <PlaylistStack.Screen name="MultiplePlaylist" component={MultiplePlaylistScreen} />
       <PlaylistStack.Group screenOptions={{ presentation: 'modal' }}>
        <PlaylistStack.Screen name="PlaylistEpisode" component={PlaylistEpisodeScreen} options={({ route }) => ({ title: route.params.title })} />
      </PlaylistStack.Group>
     </PlaylistStack.Navigator>
   );
 }

 function PlaylistsScreen({ route, navigation }) {
  const twoPartersItem = { title: 'Two Parters' };
  const threePartersItem = { title: 'Three Parters' };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 10, paddingTop: 20, paddingLeft: 20, }}>Playlists</Text>
        <Pressable onPress={() => navigation.navigate('MultiplePlaylist', { title: twoPartersItem.title, playlist: twoParters })}>
          <PlaylistItem playlist={twoPartersItem} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('MultiplePlaylist', { title: threePartersItem.title, playlist: threeParters })}>
          <PlaylistItem playlist={threePartersItem} />
        </Pressable>
        {playlists.map((item, index) => (
          <Pressable key={index} onPress={() => navigation.navigate('SinglePlaylist', { title: item.title, playlist: item })}>
            <PlaylistItem playlist={item} />
          </Pressable>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}

function SinglePlaylistScreen({ route, navigation }) {
  const { playlist } = route.params;
  const episodes = playlist.data;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingTop: 20, paddingHorizontal: 5, }}>
          <BackButton navigation={navigation} />
        </View>
        <PlaylistCard playlist={playlist} />
        <View style={{ backgroundColor: '#F2F2F7', paddingVertical: 20, }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5, paddingLeft: 20, }}>Episodes</Text>
          {episodes.map((item, index) => (
            <Pressable key={index} onPress={() => navigation.navigate('PlaylistEpisode', { title: item.trackName, episode: item })}>
              <PlaylistEpisodeItem episode={item} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
 }

function MultiplePlaylistScreen({ route, navigation }) {
  const { title, playlist } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        ListHeaderComponent={
          <View style={{ paddingTop: 20, paddingHorizontal: 5, }}>
          <BackButton navigation={navigation} />
          <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 10, paddingTop: 20, paddingLeft: 15, }}>{ title }</Text>
        </View>
      }
        sections={playlist}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <Pressable key={index} onPress={() => navigation.navigate('PlaylistEpisode', { title: item.trackName, episode: item })}>
            <PlaylistEpisodeItem episode={item} />
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => <PlaylistSectionHeader title={title} />}
      />
    </SafeAreaView>
  );
}

function PlaylistEpisodeScreen({ route, navigation }) {
  const { episode } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingTop: 20, paddingHorizontal: 5, alignItems: 'flex-end' }}>
          <CloseButton navigation={navigation} />
        </View>
        <EpisodeCard episode={episode} />
      </ScrollView>
    </SafeAreaView>
  );
}

function FavouritesScreen() {
  var jsonValue = [];
  const getData = async () => {
    try {
      jsonValue = await AsyncStorage.getItem('@storage_Key');
      console.log(jsonValue);
      return jsonValue != [] ? JSON.parse(jsonValue) : [];
    } catch(e) {
      // error reading value
    }
  }
  const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
  
    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }
  getData();
  getAllKeys();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 10, paddingTop: 20, paddingLeft: 20, }}>Favourites</Text>
        {jsonValue.map((item, index) => (
          <Text>{{ item }}</Text>
        ))}
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
          let iconName = focused ? 'ios-list-sharp' : 'ios-list-sharp';

          if (route.name === 'HomeStack') {
            iconName = focused
              ? 'ios-home-sharp'
              : 'ios-home-sharp';
          }
          if (route.name === 'ShowsStack') {
            iconName = focused
              ? 'ios-tv-sharp'
              : 'ios-tv-sharp';
          }
          if (route.name === 'MoviesStack') {
            iconName = focused
              ? 'ios-film-sharp'
              : 'ios-film-sharp';
          }
          if (route.name === 'Favourites') {
            iconName = focused
              ? 'ios-heart-sharp'
              : 'ios-heart-sharp';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3478F6',
        tabBarInactiveTintColor: '#AAAAAA',
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ headerShown: false, tabBarLabel: "Home" }} />
      <Tab.Screen name="PlaylistStack" component={PlaylistStackScreen} options={{ headerShown: false, tabBarLabel: "Playlists" }} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="ShowsStack" component={ShowsStackScreen} options={{ headerShown: false, tabBarLabel: "Shows" }} />
      <Tab.Screen name="MoviesStack" component={MoviesStackScreen}  options={{ headerShown: false, tabBarLabel: "Movies" }} />

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
