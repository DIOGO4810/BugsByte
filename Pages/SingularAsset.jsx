import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {Api, search_id } from '../API.js';

const SingularAsset = () => {
//const data = [18, 26, 24, 36, 37];
const noticias = [
{ id: '1', text: 'Notícia 1 aqui' },
{ id: '2', text: 'Notícia 2 aqui' },
{ id: '3', text: 'Notícia 3 aqui' },
{ id: '4', text: 'Notícia 4 aqui' },
{ id: '5', text: 'Notícia 5 aqui' },
];



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
  }, []);

  const aux = data[search_id(data,'bitcoin')];

return (
<ScrollView style={styles.scrollView}>
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={styles.coinIcon}/>
                <Text style={styles.coinText}>aux.id</Text>
                <Text style={styles.currentCoinPriceText}>aux.current_price</Text>
            </View>
        </View>

        {/*Gráfico aqui*/}
        <View style={styles.containerGrafico}>
            {/* Placeholder for the chart */}
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
            {/* <View style={styles.xAxisLabels}>
                {[0, 10, 20, 30, 40, 50].map((value) => (
                    <Text key={value} style={styles.xAxisLabelText}>
                        {value}
                    </Text>
                ))}
            </View> */}
            {/*LineChart aqui eventualmente*/}
        </View>
        
        {/*Container da previsão*/}
        <View style={styles.caixaPrevisao}>
            <Text style={styles.textoPrevisao}>Previsão aqui</Text>
        </View>

        {/*Container das notícias com Scroll horizontal*/}
        <View style={styles.noticiasContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.noticiasContentContainer} nestedScrollEnabled={true}>
                {noticias.map((noticia) => (
                    <View key={noticia.id} style={styles.caixaNoticias}>
                        <Text style={styles.textoNoticias}>{noticia.text}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    </View>
</ScrollView>);};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'black',
    },
    //Container geral da página
    container: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    //Container do header
    headerContainer: {
        width: '90%',
        alignItems: 'flex-start',
        marginTop: 55,
        marginBottom: 23,
    },
    //Mexe com a parte do icon/logo da moeda e o nome
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    //Mexe com o círculozinho/icon da moeda
    coinIcon: {
        width: 40,
        height: 40,
        borderRadius: 16,
        backgroundColor: 'purple',
        marginRight: 10
    },
    //Mexe com o texto
    coinText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 70
    },
    //Mexe com o container do gráfico
    containerGrafico: {
        width: '90%',
        height: 200,
        backgroundColor: '#333',
        borderRadius: 10,
        marginBottom: 20,
    },
    //Mexe com cenas no eixo x do gráfico - não está a ser usado tho
    xAxisLabels: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 5,
    },
    //Mexe com o texto no eixo x do gráfico - não está a ser usado tho
    xAxisLabelText: {
        fontSize: 20,
        color: '#666',
    },
    //Mexe com cenas no eixo y do gráfico
    yAxisLabels: {
        position: 'absolute',
        left: -5,
        top: 0,
        bottom: 0,
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    //Mexe com o texto no eixo y do gráfico
    yAxisLabelText: {
        fontSize: 12,
        color: 'white',
        textAlign: 'right',
        width: 33,
    },
    //Caixa da previsão
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
    //Texto da caixa de previsão
    textoPrevisao: {
        fontSize: 19,
        color: 'white',
        textAlign: 'center',
    },
    // Container para o ScrollView Horizontal das notícias
    noticiasContainer: {
        marginTop: 10,
        width: '90%',
        height: '20%'
    },
    //ScrollView horizontal para as notícias
    noticiasContentContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    //Caixa de notícias (agora dentro do ScrollView horizontal)
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
    //Texto da caixa de notícias
    textoNoticias: {
        fontSize: 19,
        color: 'white',
        textAlign: 'center',
    },
    currentCoinPriceText: {
        alignItems: 'flex-end',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default SingularAsset;