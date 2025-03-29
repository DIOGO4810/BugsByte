import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { createArrayObj, totalget, teste, Api, search_id } from '../API.js';

const HomeScreen = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usando useEffect para buscar dados assim que o componente for montado
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await Api('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur');
        setData(result.slice(0, 12));
        setLoading(false);  // Atualizando o estado de carregamento
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };


    fetchDataFromAPI();
  }, []);  // O array vazio significa que isso será executado apenas uma vez




  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    console.log(error);
    return (
      <View style={styles.centered}>
        <Text>Erro: {error.message}</Text>
      </View>
    );
  }




  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

        {/* Footer no topo com dois botões */}
        <View style={styles.topFooter}>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Baskets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Assets</Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo principal com ROWS */}
        <ScrollView contentContainerStyle={styles.mainContent}>
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Saldo</Text>
            </View>

          </View>
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Lucro</Text>
            </View>

          </View>

          <Text style={styles.title}>Dados Obtidos:</Text>
          <Text style={styles.cardTitle}>{data[search_id(data, 'ethereum')].current_price}</Text>
          <Text>{data[0].body}</Text>
          <Text style={styles.title}>Dados Obtidos:</Text>
          {data && data.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.id}</Text>
              <Text>{item.price_change_24h.toFixed(2)} %</Text>
              <Text>{item.current_price.toFixed(3)} </Text>
            </View>
          ))}



          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Última Compra</Text>
            </View>

          </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
  },
  topFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#202020',
  },
  footerButton: {
    width: '45%',
    marginHorizontal: 5,
    backgroundColor: '#202020',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0064f9',
  },
});

export default HomeScreen;
