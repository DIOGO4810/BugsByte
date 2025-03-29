import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView} from "react-native";
import { Link, useLocation } from "react-router-native"; // Importando Link para navegação

const AssetsScreen = () => {
  const location = useLocation(); // Usando o hook para obter a localização atual

  // Função para verificar se o link está ativo
  const isActive = (path) => location.pathname === path;


  const items = [
    { id: 1, title: 'Sad' },
    { id: 2, title: 'Lucro' },
    { id: 3, title: 'Última Compra' },
  ];
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Footer no topo com dois botões */}

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

        {/* Conteúdo principal com ROWS */}



    <ScrollView contentContainerStyle={styles.mainContent}>
      {items.map(item => (
        <View key={item.id} style={styles.row}>
          <Link to={item.route} key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
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
    backgroundColor: '#208020', // Cor que você deseja para o link ativo
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
  },
  topFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#202020",
  },
  footerButton: {
    width: "45%",
    marginHorizontal: 5,
    backgroundColor: "#202020",
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
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0064f9",
  },
});

export default AssetsScreen;
