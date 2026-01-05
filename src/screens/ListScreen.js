import React, { useState, useEffect, useLayoutEffect } from 'react'; // 1. Importe useLayoutEffect
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../services/api'; 

export default function ListScreen({ navigation, route }) {
  const { isDarkMode } = route.params || { isDarkMode: false };

  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cores dinâmicas
  const backgroundColor = isDarkMode ? '#121212' : '#f5f5f5';
  const cardColor = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#333333';
  const headerBg = isDarkMode ? '#121212' : '#FFFFFF'; // Cor de fundo do topo
  const headerText = isDarkMode ? '#FFFFFF' : '#000000'; // Cor do texto/seta do topo

  // 2. CONFIGURAÇÃO DO CABEÇALHO (HEADER)
  // Esse trecho diz ao navegador para pintar a barra superior
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Lista de Pokémons', // Garante que o título se mantenha
      headerStyle: {
        backgroundColor: headerBg, // Pinta o fundo da barra
      },
      headerTintColor: headerText, // Pinta a setinha e o título
      headerShadowVisible: !isDarkMode, // Remove a sombra no modo escuro para ficar mais limpo
    });
  }, [navigation, isDarkMode]); // Atualiza se o tema mudar

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await api.get('/pokemon?limit=20');
        const results = response.data.results;

        const pokemonWithImages = results.map((item) => {
          const urlParts = item.url.split('/');
          const id = urlParts[urlParts.length - 2]; 
          
          return {
            ...item,
            id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        });

        setPokemonList(pokemonWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar pokemons", error);
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color="#FF3D00" />
        <Text style={{ color: textColor, marginTop: 10 }}>Carregando Pokémons...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: cardColor }]}
            onPress={() => navigation.navigate('Details', { pokemonId: item.id, isDarkMode: isDarkMode })}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.pokemonImage} />
            <Text style={[styles.pokemonName, { color: textColor }]}>
                {item.name.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pokemonImage: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});