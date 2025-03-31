import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Link, useLocation } from "react-router-native"; // Importando Link para navegação

const baskets=[ {name:"Basket de Criptomoedas mais estáveis", index:0}, {name: "Basket de Criptomoedas menos estáveis",index:1}]

const HomeScreen = () => {
  const location = useLocation(); // Usando o hook para obter a localização atual



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
