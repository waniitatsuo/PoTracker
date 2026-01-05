import React, { useState, useLayoutEffect } from 'react'; // 1. Adicionado useLayoutEffect
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Keyboard } from 'react-native';
import api from '../services/api';

export default function SearchScreen({ navigation, route }) {
  // 2. Recebendo o tema
  const { isDarkMode } = route.params || { isDarkMode: false };

  const [searchText, setSearchText] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 3. Definindo Cores Dinâmicas
  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';
  const cardColor = isDarkMode ? '#1E1E1E' : '#f9f9f9';
  const subTextColor = isDarkMode ? '#ccc' : '#666';
  
  // Cores específicas para o Input
  const inputBg = isDarkMode ? '#2C2C2C' : '#fff'; 
  const inputBorder = isDarkMode ? '#444' : '#ccc';
  const placeholderColor = isDarkMode ? '#aaa' : '#888';

  // 4. Configurando o Header (Topo)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Busca',
      headerStyle: {
        backgroundColor: backgroundColor, // Fundo do header igual ao da tela
      },
      headerTintColor: textColor, // Cor da seta e título
      headerShadowVisible: !isDarkMode,
    });
  }, [navigation, isDarkMode]);

  async function handleSearch() {
    if (searchText.trim() === '') return;

    setPokemon(null);
    setError('');
    setLoading(true);
    Keyboard.dismiss();

    try {
      const response = await api.get(`/pokemon/${searchText.toLowerCase().trim()}`);
      const data = response.data;

      const foundPokemon = {
        id: data.id,
        name: data.name,
        imageUrl: data.sprites.front_default
      };

      setPokemon(foundPokemon);
      setLoading(false);

    } catch (err) {
      setLoading(false);
      setError('Pokémon não encontrado! Verifique o nome.');
      console.log(err);
    }
  }

  return (
    // Aplicando background na View principal
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Busque seu Pokémon</Text>
      
      {/* Campo de Busca */}
      <View style={styles.inputContainer}>
        <TextInput 
          // Aplicando cores no Input
          style={[
            styles.input, 
            { 
                color: textColor, 
                backgroundColor: inputBg, 
                borderColor: inputBorder 
            }
          ]}
          placeholder="Digite o nome (ex: ditto)"
          placeholderTextColor={placeholderColor} // Importante para ler no escuro
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
        />
        <Button title="Buscar" onPress={handleSearch} color="#FF3D00" />
      </View>

      {/* Feedback de Carregamento ou Erro */}
      {loading && <Text style={{marginTop: 20, color: textColor}}>Procurando...</Text>}
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      {/* Resultado da Busca */}
      {pokemon && (
        <TouchableOpacity 
          style={[styles.resultCard, { backgroundColor: cardColor }]}
          // Passando o tema para a próxima tela
          onPress={() => navigation.navigate('Details', { pokemonId: pokemon.id, isDarkMode: isDarkMode })}
        >
          <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
          <View>
            <Text style={[styles.resultName, { color: textColor }]}>
                #{pokemon.id} {pokemon.name.toUpperCase()}
            </Text>
            <Text style={[styles.tapText, { color: subTextColor }]}>
                Toque para ver detalhes
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // Background color movido para style inline
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    // Cores de borda e fundo movidas para inline
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
  resultCard: {
    marginTop: 30,
    // Background color movido para style inline
    width: '100%',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  resultName: {
    fontSize: 18,
    fontWeight: 'bold',
    // color movido para inline
  },
  tapText: {
    fontSize: 12,
    marginTop: 5,
  }
});