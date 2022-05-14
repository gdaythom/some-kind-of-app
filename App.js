import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Pressable, Text, ActivityIndicator, View, SafeAreaView, ScrollView, SectionList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { getRandomEpisode, getStorage } from './helpers';
import { ShowItem, SeasonItem, EpisodeItem, MovieItem, PlaylistSectionHeader, PlaylistItem, PlaylistEpisodeItem } from './components/Items';
import { ShowCard, SeasonCard, EpisodeCard, RandomEpisodeCard, MovieCard, PlaylistCard } from './components/Cards';
import { BackButton, CloseButton } from './components/Buttons';

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
  const context = useContext(ContextMedia);
  const refreshRandomEpisodes = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    loadRandomEpisodes();
  };
  const loadRandomEpisodes = () => {
    if(context?.data?.shows) {
      setEpisodes([]);
      var episodeBucket = [];
      context.data.shows.map(show => episodeBucket.push(getRandomEpisode(show.seasons)));
      setEpisodes(episodeBucket);
    }
  };

  useEffect(() => {
    loadRandomEpisodes();
  }, [context]);

  return (
    <SafeAreaView style={styles.container}>
      {context.isLoading ? <View style={{ flex: 1, justifyContent: "center", }}><ActivityIndicator/></View> : (
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
      )}
    </SafeAreaView>
  );
}

function HomeEpisodeScreen({ route, navigation }) {
  const { episode } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />
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
  const context = useContext(ContextMedia);
  return (
    <SafeAreaView style={styles.container}>
      {context.isLoading ? <View style={{ flex: 1, justifyContent: "center", }}><ActivityIndicator/></View> : (
        <ScrollView style={styles.scrollView}>
          <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 10, paddingTop: 20, paddingLeft: 20, }}>Shows</Text>
          {context.data.shows.map((item, index) => (
            <Pressable key={index} onPress={() => navigation.navigate('Show', { title: item.title, show: item })}>
              <ShowItem show={item} />
            </Pressable>
          ))}
        </ScrollView>
      )}
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
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />
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
  const context = useContext(ContextMedia);
  return (
    <SafeAreaView style={styles.container}>
      {context.isLoading ? <View style={{ flex: 1, justifyContent: "center", }}><ActivityIndicator/></View> : (
        <ScrollView style={styles.scrollView}>
          <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 10, paddingTop: 20, paddingLeft: 20, }}>Movies</Text>
          {context.data.movies.results.map((item, index) => (
            <Pressable key={index} onPress={() => navigation.navigate('Movie', { title: item.trackName, movie: item })}>
              <MovieItem movie={item} />
            </Pressable>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function MovieScreen({ route, navigation }) {
  const { movie } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />
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
  const context = useContext(ContextMedia);
  const twoPartersItem = { title: 'Two Parters' };
  const threePartersItem = { title: 'Three Parters' };
  return (
    <SafeAreaView style={styles.container}>
      {context.isLoading ? <View style={{ flex: 1, justifyContent: "center", }}><ActivityIndicator/></View> : (
      <ScrollView style={styles.scrollView}>
        <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 10, paddingTop: 20, paddingLeft: 20, }}>Playlists</Text>
        <Pressable onPress={() => navigation.navigate('MultiplePlaylist', { title: twoPartersItem.title, playlist: context.data.twoParters })}>
          <PlaylistItem playlist={twoPartersItem} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('MultiplePlaylist', { title: threePartersItem.title, playlist: context.data.threeParters })}>
          <PlaylistItem playlist={threePartersItem} />
        </Pressable>
        {context.data.playlists.map((item, index) => (
          <Pressable key={index} onPress={() => navigation.navigate('SinglePlaylist', { title: item.title, playlist: item })}>
            <PlaylistItem playlist={item} />
          </Pressable>
        ))}
      </ScrollView>
      )}
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
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingTop: 20, paddingHorizontal: 5, alignItems: 'flex-end' }}>
          <CloseButton navigation={navigation} />
        </View>
        <EpisodeCard episode={episode} />
      </ScrollView>
    </SafeAreaView>
  );
}

const FavouriteStack = createNativeStackNavigator();

function FavouriteStackScreen() {
  return (
    <FavouriteStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fdfdfd' } }}>
      <FavouriteStack.Screen name="Favourites" component={FavouritesScreen} />
      <FavouriteStack.Group screenOptions={{ presentation: 'modal' }}>
       <FavouriteStack.Screen name="FavouriteEpisode" component={FavouritesEpisodeScreen} options={({ route }) => ({ title: route.params.title })} />
     </FavouriteStack.Group>
    </FavouriteStack.Navigator>
  );
}

function FavouritesScreen({ route, navigation }) {
  const context = useContext(ContextMedia);
  const [favouriteEpisodes, setFavouriteEpisodes] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStorage().then(data => {
        setFavouriteEpisodes(data);
      });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      {context.isLoading ? <View style={{ flex: 1, justifyContent: "center", }}><ActivityIndicator/></View> : (
        <ScrollView style={styles.scrollView}>
          <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 10, paddingTop: 20, paddingLeft: 20, }}>Favourites</Text>
          {favouriteEpisodes && favouriteEpisodes.length !== 0 &&
            favouriteEpisodes.map((item, index) => (
              <Pressable key={index} onPress={() => navigation.navigate('FavouriteEpisode', { title: item.trackName, episode: item })}>
                <PlaylistEpisodeItem episode={item} />
              </Pressable>
            ))
          }
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function FavouritesEpisodeScreen({ route, navigation }) {
  const { episode } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />
      <ScrollView style={styles.scrollView}>
        <View style={{ paddingTop: 20, paddingHorizontal: 5, alignItems: 'flex-end' }}>
          <CloseButton navigation={navigation} />
        </View>
        <EpisodeCard episode={episode} />
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
          if (route.name === 'FavouriteStack') {
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
      <Tab.Screen name="FavouriteStack" component={FavouriteStackScreen} options={{ headerShown: false, tabBarLabel: "Favourites" }} />
      <Tab.Screen name="ShowsStack" component={ShowsStackScreen} options={{ headerShown: false, tabBarLabel: "Shows" }} />
      <Tab.Screen name="MoviesStack" component={MoviesStackScreen}  options={{ headerShown: false, tabBarLabel: "Movies" }} />
    </Tab.Navigator>
  );
}

const ContextMedia = React.createContext(null);

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMedia = async () => {
    try {
     const response = await fetch('https://star-trek-episodes.gdaythom.workers.dev');
     const json = await response.json();
     setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getMedia();
  }, []);

  return (
    <ContextMedia.Provider value={{ isLoading, data }}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </ContextMedia.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fdfdfd',
  },
  scrollView: {
    paddingHorizontal: 0,
  }
});
