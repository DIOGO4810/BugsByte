import  { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import {Api} from "../API.js";
import { Link, useLocation } from "react-router-native"; // Importando Link para navegação
import LoadingPage from "./LoadingPage.jsx";

const AssetsScreen = () => {
  const location = useLocation(); // Usando o hook para obter a localização atual

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usando useEffect para buscar dados assim que o componente for montado
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await Api(
          "http://10.14.0.130:5000/info"
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
      <LoadingPage/>
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
              isActive("/baskets") && styles.activeLink,
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
          {data.map((item) => (
            <View key={item.id} style={styles.row}>
              <Link style={styles.card} to={{ pathname: `/coinPage/${item.id}/${item.name}/${item.current_price}`}}>
                <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', flex: 1 }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item.image }} style={styles.cardImage}/>
                    <Text style={styles.cardTitle}>
                      {item.name} ({item.symbol.toUpperCase()})
                    </Text>
                  </View>
                  <Text style={styles.cardAmount}>
                    ${item.current_price.toFixed(2)}
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
    width: "45%",
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
    justifyContent: "center", // Centraliza no eixo vertical
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
    marginTop: 10,
  },
});

export default AssetsScreen;
