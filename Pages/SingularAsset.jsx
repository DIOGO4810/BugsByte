import { useState, useEffect } from 'react';
import { useParams } from 'react-router-native';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Link } from 'react-router-native';
import { predict } from '../Prediction.js'; // Assuming predict is imported correctly
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importando Ionicons
import GeminiCall from '../AI_api.js';
import { Api, search_id} from '../API.js';

const SingularAsset = () => {
  const [predicts, setPredicts] = useState(0);  // Store prediction value

  const { id,name, price } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previsaoGemini, setPrevisaoGemini] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        // Fetch real data from the API
        const result = await Api('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur');
        setData(result.slice(0, 12));
        setLoading(false);

        // Chama a função GeminiCall e armazena a previsão no estado
        const response = await GeminiCall(name);
        setPrevisaoGemini(response);  // Atualiza o estado com a resposta da API
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
              <Ionicons name="arrow-back" size={30} color="white"/>
            </Link>
          )}
            <View style={styles.header}>
              <View>
                <Image source={{uri: data[search_id(data,id)].image}} style={styles.coinIcon}/>
              </View>

              <Text style={styles.coinText}>{name}</Text>

              <Text style={[styles.percentage, { color: data[search_id(data,id)].price_change_percentage_24h >= 0 ? "green" : "red" }]}>
                      {data[search_id(data,id)].price_change_percentage_24h}%
              </Text>

              <Text style={[styles.nome, { color: data[search_id(data,id)].price_change_percentage_24h >= 0 ? "green" : "red"}]}>
                      {price}€
              </Text>

            </View>
        </View>
      </View>

        {/* Exibe a previsão de Gemini */}
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
    marginBottom: 30
  },
  headerContainer: {
    width: '90%',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  coinText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  coinIcon: {
    width: 45,
    height: 45,
    marginRight: 10
  },
  containerGrafico: {
    width: '90%',
    height: 200,
    backgroundColor: '#11181C',
    borderRadius: 10,
    marginBottom: 20,
  },
  caixaPrevisao: {
    backgroundColor: '#11181C',
    borderRadius: 10,
    marginLeft: 35,
    alignItems: 'center',
    marginBottom: 20,
    maxWidth: '80%',
    maxHeight: '90%'
  },
  textoPrevisao: {
    fontSize: 19,
    color: 'white',
    textAlign: 'center',
    lineHeight: 30
  },
  noticiasContainer: {
    marginTop: 10,
    minWidth: '90%',
    minHeight: '50%',
    maxWidth: '90%',
    maxHeight: '50%',
    marginBottom: 30
  },
  noticiasContentContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginLeft: 35,
    marginRight: 35
  },
  caixaNoticias: {
    backgroundColor: '#11181C',
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
    marginLeft: 2
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
    backgroundColor: '000000',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentage: {
    marginLeft: 2,
    fontSize: 16
  },
  nome: {
    marginLeft: 10,
    fontSize: 16
  }
});

export default SingularAsset;
