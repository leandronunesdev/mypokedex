import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from '@expo/vector-icons';

import api from '../../services/api';
import LoadingComponent from '../../components/LoadingComponent';

const PokemonDetailsScreen = ({ route, navigation }) => {
  const { url } = route.params;

  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPokemonInfo = async () => {
    try {
      await api.get(url).then((response) => setPokemonInfo(response.data));
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPokemonInfo();
  }, []);

  return (
    <View style={styles.pokemonInfoContainer}>
      {loading ? (
        <View>
          {pokemonInfo.sprites.other['official-artwork'].front_default ===
          null ? (
            <Text>Image not available</Text>
          ) : (
            <Image
              style={styles.pokemonImage}
              source={{
                uri: pokemonInfo.sprites.other['official-artwork']
                  .front_default,
              }}
            />
          )}
          <View style={styles.pokemonInfoText}>
            <Text style={styles.pokemonTitle}>
              {pokemonInfo.name.toUpperCase()}
            </Text>
            <Text style={styles.pokemonType}>
              {pokemonInfo.types['0'].type.name}
            </Text>
            {pokemonInfo.types['1']?.type.name !== undefined && (
              <Text style={styles.pokemonType}>
                {pokemonInfo.types['1'].type.name}
              </Text>
            )}
            <View style={styles.pokemonStats}>
              <Text style={styles.pokemonStatsText}>
                <AntDesign name='hearto' size={18} color='black' /> HP:{' '}
                {pokemonInfo.stats['0'].base_stat}
              </Text>
              <Text style={styles.pokemonStatsText}>
                <MaterialCommunityIcons name='sword' size={18} color='black' />{' '}
                Attack: {pokemonInfo.stats['1'].base_stat}
              </Text>
              <Text style={styles.pokemonStatsText}>
                <Feather name='shield' size={18} color='black' /> Defense:{' '}
                {pokemonInfo.stats['2'].base_stat}
              </Text>
              <Text style={styles.pokemonStatsText}>
                <MaterialCommunityIcons
                  name='sword-cross'
                  size={18}
                  color='black'
                />{' '}
                Special Attack: {pokemonInfo.stats['3'].base_stat}
              </Text>
              <Text style={styles.pokemonStatsText}>
                <MaterialCommunityIcons
                  name='shield-star-outline'
                  size={18}
                  color='black'
                />{' '}
                Special Defense: {pokemonInfo.stats['4'].base_stat}
              </Text>
              <Text style={styles.pokemonStatsText}>
                <FontAwesome5 name='running' size={18} color='black' /> Speed:{' '}
                {pokemonInfo.stats['5'].base_stat}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <LoadingComponent />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonInfoContainer: {
    backgroundColor: '#1A9BDA',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pokemonImage: {
    width: 250,
    height: 250,
  },
  pokemonInfoText: {
    alignItems: 'center',
    fontSize: 1,
  },
  pokemonTitle: {
    fontSize: 24,
    margin: 20,
    color: '#fff',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 10,
    textShadowColor: 'black',
  },
  pokemonType: {
    fontSize: 18,
    backgroundColor: 'yellow',
    width: 'auto',
    padding: 5,
    margin: 5,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 999,
    overflow: 'hidden',
  },
  pokemonStats: {
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
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
  pokemonStatsText: {
    fontSize: 18,
  },
});

export default PokemonDetailsScreen;
