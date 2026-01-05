import React, { useState } from 'react'; // 1. Adicionado useState
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  // 2. CRIANDO O ESTADO DO TEMA
  const [theme, setTheme] = useState('light'); // Começa no modo claro

  // 3. DEFININDO AS VARIÁVEIS QUE FALTAVAM
  const isDarkMode = theme === 'dark';
  
  // Função para trocar o tema
  const toggleTheme = () => {
    setTheme(previousState => (previousState === 'light' ? 'dark' : 'light'));
  };

  // Cores dinâmicas
  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';
  const iconColor = isDarkMode ? '#FFD700' : '#000'; // Amarelo no escuro (Sol), Preto no claro (Lua)

  return (
    // 4. APLICANDO A COR DE FUNDO DINÂMICA
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      
      <Image 
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('List', { isDarkMode: isDarkMode })}
        >
          <Text style={styles.buttonText}>Listar Pokémons</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Search', { isDarkMode: isDarkMode })}
        >
          <Text style={styles.buttonText}>Pesquisar Pokémon</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('About', { isDarkMode: isDarkMode })}
        >
          <Text style={styles.buttonText}>Sobre a API</Text>
        </TouchableOpacity>

        {/* 5. BOTÃO DE TEMA AGORA FUNCIONA */}
        <TouchableOpacity 
            onPress={toggleTheme} 
            style={styles.iconButton}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <Ionicons 
                    name={isDarkMode ? 'sunny' : 'moon'} 
                    size={24} 
                    color={iconColor} 
                />
                <Text style={{ color: textColor, marginLeft: 10 }}>
                    {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
                </Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // A cor de fundo aqui será sobrescrita pelo estilo dinâmico lá em cima
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 50,
  },
  buttonContainer: {
    width: '80%',
    gap: 15,
  },
  button: {
    backgroundColor: '#FF3D00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
    alignItems: 'center',
  }
});