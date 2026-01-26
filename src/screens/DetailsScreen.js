import React, { useState, useEffect, useLayoutEffect } from 'react'; // 1. useLayoutEffect adicionado
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, ScrollView } from 'react-native';
import api from '../services/api';

export default function DetailsScreen({ route, navigation }) {
  const { pokemonId, isDarkMode } = route.params;
  
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificação de Modo escuro ativo
  const backgroundColor = isDarkMode ? '#121212' : '#FF3D00';  
  const cardColor = isDarkMode ? '#1E1E1E' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#333333';
  const subTextColor = isDarkMode ? '#aaaaaa' : '#888888';
  const badgeBg = isDarkMode ? '#333333' : '#eeeeee';
  const badgeText = isDarkMode ? '#ffffff' : '#555555';

  useLayoutEffect(() => {
    navigation.setOptions({
      title: details ? `#${details.id} ${details.name.toUpperCase()}` : 'Detalhes', // Título dinâmico
      headerStyle: {
        backgroundColor: backgroundColor, // O topo segue a cor do fundo (Vermelho ou Preto)
      },
      headerTintColor: '#ffffff', // Texto do topo sempre branco para contrastar com vermelho ou preto
      headerShadowVisible: false, // Remove a linha de sombra para ficar "infinito"
    });
  }, [navigation, isDarkMode, details, backgroundColor]);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await api.get(`/pokemon/${pokemonId}`);
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar detalhes", error);
        setLoading(false);
      }
    }

    fetchDetails();
  }, [pokemonId]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={{ color: '#ffffff', marginTop: 10 }}>Carregando ficha técnica...</Text>
      </View>
    );
  }

  // Se não carregou nada (erro)
  if (!details) {
    return (
        <View style={[styles.loadingContainer, { backgroundColor }]}>
            <Text style={{ color: '#fff' }}>Erro ao carregar.</Text>
        </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      
      {/* APLICANDO CORES NO CARD */}
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        
        <Image 
          source={{ uri: details.sprites.other['official-artwork'].front_default }} 
          style={styles.image}
        />

        <Text style={[styles.name, { color: textColor }]}>
          #{details.id} {details.name.toUpperCase()}
        </Text>

        {/* Tipos */}
        <View style={styles.typesContainer}>
          {details.types.map((slot) => (
            <Text 
                key={slot.type.name} 
                style={[styles.typeBadge, { backgroundColor: badgeBg, color: badgeText }]}
            >
              {slot.type.name.toUpperCase()}
            </Text>
          ))}
        </View>

        {/* Estatísticas Básicas */}
        <View style={[styles.statsContainer, { borderTopColor: isDarkMode ? '#333' : '#eee' }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: subTextColor }]}>Altura</Text>
            <Text style={[styles.statValue, { color: textColor }]}>{details.height / 10} m</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: subTextColor }]}>Peso</Text>
            <Text style={[styles.statValue, { color: textColor }]}>{details.weight / 10} kg</Text>
          </View>
        </View>

        <View style={{ marginTop: 20, width: '100%' }}>
            <Button title="Voltar para Lista" onPress={() => navigation.goBack()} color="#FF3D00" />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop: -60, // Efeito visual: Sobe a imagem para sair um pouco do card
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    fontWeight: 'bold',
    overflow: 'hidden', // Garante que o borderRadius funcione no texto
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    borderTopWidth: 1,
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});