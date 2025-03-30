import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import { createArrayObj, totalget, teste, Api, search_id } from "../API.js";
import { Link, useLocation } from "react-router-native"; // Importando Link para navegação

const baskets=[ {name:"Basket de Criptomoedas mais estáveis", index:0}, {name: "Basket de Criptomoedas menos estáveis",index:1}]

const HomeScreen = () => {
  const location = useLocation(); // Usando o hook para obter a localização atual

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usando useEffect para buscar dados assim que o componente for montado
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await Api(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur"
        );
        setData(result.slice(0, 10));
        setLoading(false); // Atualizando o estado de carregamento
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDataFromAPI();
    console.log("Rodou useEffect");
  }, []); // O array vazio significa que isso será executado apenas uma vez

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Esperando por mais API Keys do CoinGecko</Text>;
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


  // Função para verificar se o link está ativo
  const isActive = (path) => location.pathname === path;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Footer com botões */}
        <View style={styles.topFooter}>
          <Link
            to="/baskets"
            style={[
              styles.footerButton,
               styles.activeLink,
            ]}
          >
            <Text style={styles.footerButtonText}>Baskets</Text>
          </Link>
          <Link
            to="/assets"
            style={[
              styles.footerButton,
              isActive("/assets") && styles.activeLink,
            ]}
          >
            <Text style={styles.footerButtonText}>Assets</Text>
          </Link>
        </View>

        <ScrollView contentContainerStyle={styles.mainContent}>
         <Image source={require('../assets/crytpo.jpeg')} style={{marginVertical:10, width: "80%", height: "100%", borderRadius:10, alignSelf:"center" }} />

          {baskets.map((item) => (
            <View key={item.index} style={styles.row}>

              <Link style={styles.card} to={{
                pathname: `/basketPage/${item.name}/${item.index}`,
                              }}>
              <View style={styles.row}>
                <Text style={styles.cardTitle}>
                  {item.name}
                </Text>

                

              </View>

              </Link>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activeLink: {
    backgroundColor: "#208020", // Cor que você deseja para o link ativo
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
  },
  topFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#000000",
  },
  footerButton: {
    width: '45%',
    marginHorizontal: 5,
    backgroundColor: "#000000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "center",      // Centraliza no eixo vertical
    alignItems: "center",
    },
  card: {
    flex: 1,
    backgroundColor: "#11181C",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  cardTitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 5,
    fontWeight:"bold",
    textAlign:"center",
    marginHorizontal:20,
  },
  cardAmount: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0064f9",
    marginBottom: 5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignItems: 'center'
  },
  cardImage: {
    width: 50,
    height: 50,
    alignItems: 'center'
  },
});


export default HomeScreen;
