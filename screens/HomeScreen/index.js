import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';
import LoadingComponent from '../../components/LoadingComponent';

const HomeScreen = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const getPokemonList = async () => {
    try {
      await api
        .get(`pokemon?limit=2000`)
        .then((response) => setPokemonList(response.data.results));
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const filteredPokemons = pokemonList.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <SafeAreaView style={styles.homeView}>
      <ScrollView>
        {loading ? (
          <>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../../assets/pokemon-logo.png')}
              />
            </View>
            <Ionicons
              name='search'
              size={24}
              color='black'
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchBar}
              onChangeText={setSearch}
              placeholder={'Search'}
              placeholderTextColor='rgba(255,255,255,0.6)'
            />
            <View>
              {filteredPokemons.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  onPress={() =>
                    navigation.navigate('Pokemon Info', { url: item.url })
                  }
                >
                  <Text style={styles.listItem}>{item.name.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <LoadingComponent />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeView: {
    backgroundColor: '#1A9BDA',
    height: '100%',
  },
  logo: {
    height: 70,
    width: '100%',
    resizeMode: 'contain',
  },
  listItem: {
    fontSize: 16,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: '#fff',
    paddingTop: 10,
    marginTop: 20,
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 999,
  },

  searchBar: {
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    borderRadius: 50,
    height: 50,
    width: '95%',
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  searchIcon: {
    position: 'absolute',
    top: 110,
    left: 30,
    color: 'rgba(255,255,255,0.6)',
  },
});

export default HomeScreen;
