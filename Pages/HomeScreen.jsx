import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const HomeScreen = () => {




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
    width:'45%',
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
