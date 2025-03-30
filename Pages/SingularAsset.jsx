import { useState, useEffect } from 'react';
import { useParams } from 'react-router-native';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Link } from 'react-router-native';
import { Api } from '../API.js';
import { predict } from '../Prediction.js'; // Assuming predict is imported correctly
import { Ionicons } from '@expo/vector-icons'; // Ícones para as setas
const SingularAsset = () => {
  const [predicts, setPredicts] = useState(0);  // Store prediction value

  const { id, name, price } = useParams(); // Get URL params

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        // Fetch real data from the API
        const result = await Api('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur');
        setData(result.slice(0, 12));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }

      // Fetch prediction data and store it in state
      try {
        const help = await Api('http://10.14.0.130:5000/predict')  // This will return the rounded prediction value
        setPredicts(help);  // Update the state with the prediction value
      } catch (err) {
        console.error("Error fetching prediction:", err);
      }
    };

    fetchDataFromAPI();
  }, [name]); // Re-fetch data when name changes

  if (loading) {
    return <Text style={styles.loadingText}>Carregando...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Erro: {error.message}</Text>;
  }

  if (!data || data.length === 0) {
    return <Text style={styles.errorText}>Nenhum dado encontrado</Text>;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {data && data.length > 0 && (
            <Link to="/baskets" style={styles.link}>
              {/* Substituindo o texto por um ícone */}
              <Ionicons name="arrow-back" size={30} color="black" />
            </Link>
          )}
          <View style={styles.header}>
            <Text style={styles.coinText}>{name}</Text>
            <Text style={styles.currentCoinPriceText}>{price}€ </Text>
          </View>
        </View>

        <View style={styles.containerGrafico}>
          <View style={styles.yAxisLabels}>
            {[0, 10, 20, 30, 40, 50].map((value) => (
              <Text key={value} style={styles.yAxisLabelText}>
                {value}
              </Text>
            ))}
          </View>
          <View>
            <Text style={styles.textoPrevisao}>Gráfico aqui</Text>
          </View>
        </View>

        <View style={styles.caixaPrevisao}>
          {predicts !== null ? (
            <Text style={styles.textoPrevisao}>Previsão de Preço: {predicts.resultado}€</Text>
          ) : (
            <Text style={styles.textoPrevisao}>Carregando previsão...</Text>
          )}
        </View>

        <View style={styles.noticiasContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.noticiasContentContainer} nestedScrollEnabled={true}>
            
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContainer: {
    width: '90%',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 23,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  containerGrafico: {
    width: '90%',
    height: 200,
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
  },
  yAxisLabels: {
    position: 'absolute',
    left: -5,
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  yAxisLabelText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    width: 33,
  },
  caixaPrevisao: {
    marginTop: 20,
    backgroundColor: '#555',
    paddingVertical: 100,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  textoPrevisao: {
    fontSize: 19,
    color: 'white',
    textAlign: 'center',
  },
  noticiasContainer: {
    marginTop: 10,
    width: '90%',
    height: '20%',
  },
  noticiasContentContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  caixaNoticias: {
    backgroundColor: '#555',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 220,
    minHeight: 100,
    alignItems: 'center',
    marginRight: 15,
  },
  textoNoticias: {
    fontSize: 19,
    color: 'white',
    textAlign: 'center',
  },
  currentCoinPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SingularAsset;
