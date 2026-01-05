import React, { useLayoutEffect } from 'react'; // 1. Adicionado useLayoutEffect
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

export default function AboutScreen({ navigation, route }) {
  // 2. Recebendo o tema
  const { isDarkMode } = route.params || { isDarkMode: false };

  // 3. Definindo as cores dinâmicas
  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const titleColor = isDarkMode ? '#fff' : '#000';
  const descriptionColor = isDarkMode ? '#ccc' : '#555'; // Cinza mais claro no modo escuro para leitura
  const subtitleColor = isDarkMode ? '#aaa' : '#888';

  // 4. Configurando o Topo (Header)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Sobre',
      headerStyle: {
        backgroundColor: backgroundColor, // Pinta o fundo da barra
      },
      headerTintColor: titleColor, // Pinta a seta e o título
      headerShadowVisible: !isDarkMode, // Remove sombra no escuro
    });
  }, [navigation, isDarkMode]);

  return (
    // Aplicando background dinâmico
    <View style={[styles.container, { backgroundColor }]}>
      <Image 
        source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' }} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={[styles.title, { color: titleColor }]}>PokéAPI App</Text>
      
      <Text style={[styles.description, { color: descriptionColor }]}>
        Este aplicativo foi desenvolvido como Atividade Avaliativa para a disciplina de Programação para Dispositivos Móveis.
        {'\n'}{'\n'}
        Ele consome dados da PokéAPI, uma API RESTful gratuita que fornece dados sobre o universo Pokémon.
      </Text>

      <Text style={[styles.subtitle, { color: subtitleColor }]}>Desenvolvedor:</Text>
      <Text style={[styles.devName, { color: titleColor }]}>Wanii Tatsuo</Text>

      <TouchableOpacity 
        onPress={() => Linking.openURL('https://pokeapi.co/')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Visitar Site da API</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // Background removido daqui, inserido via style inline
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    // Color removida daqui
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    // Color removida daqui
    marginBottom: 30,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    // Color removida daqui
    marginBottom: 5,
  },
  devName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    // Color removida daqui
  },
  button: {
    backgroundColor: '#2a75bb', // Azul estilo Pokemon (mantido pois contrasta bem no preto e no branco)
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});