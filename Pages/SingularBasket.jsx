import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions , Image} from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Ícones para as setas
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link, useParams} from "react-router-native"; 
import { Api, search_id } from '../API.js';



const baskets=[
  [    {name: 'bitcoin', value: 50.96},
                {name:'ethereum', value: 7.00},
                {name:'ripple', value: 9.08},
                {name:'stellar', value: 1.31},
                {name:'uniswap', value: 0.72},
                {name:'tron', value: 1.76},
                {name:'litecoin', value: 1.58},
                {name: 'binancecoin', value: 7.24},
                {name:'solana', value: 5.07},
                {name: 'dogecoin', value: 2.02},
                {name: 'cardano' , value: 1.86},
                {name:'tron', value: 11.4},
              ],
  
          [      {name:'bitcoin', value: 77.4},
                 {name: 'ethereum' , value: 10.7},
                 {name:'ripple', value: 6.0},
                 {name:'solana', value: 2.9},
                 {name:'cardano', value: 1.2},
                 {name: 'chainlink', value: 0.4},
                 {name:'avalanche-2', value: 0.4},
                 {name:'sui', value: 0.4},
                 {name: 'litecoin' , value: 0.3},
                 {name: 'polkadot', value: 0.3},
  
            ]]



           
            
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const SingularBasket = () => {

  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {name,index } = useParams();
    const basket=baskets[index];
    const filteredBaskets = (
      basket.filter(item => item.value > 5.5)
    );
    const [expandedCurrent, setExpandedCurrent] = useState(false);
    const [expandedPredictor, setExpandedPredictor] = useState(false);
    const animatedSizeCurrent = useState(new Animated.Value(150))[0];
    const animatedSizePredictor = useState(new Animated.Value(150))[0];
  
  
    // Usando useEffect para buscar dados assim que o componente for montado
    useEffect(() => {
      const fetchDataFromAPI = async () => {
        try {
          const result = await Api(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur"
          );
          setData(result);
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
       return <Text style={styles.loadingText}>Carregando...</Text>;
     }
  
    if (error) {
      console.log(error);
      return (
        <View style={styles.centered}>
          <Text>Erro: {error.message}</Text>
        </View>
      );
    }
  

 

  const toggleExpandCurrent = () => {
    if (!expandedCurrent) {
      Animated.timing(animatedSizeCurrent, {
        toValue: screenHeight , // Expande para altura da tela
        toValue: screenWidth * 0.90,
        duration: 500,
        useNativeDriver: false,
      }).start();

      setExpandedCurrent(true);  // Marca como expandido
    }
  };

  const closeCurrent = () => {
    Animated.timing(animatedSizeCurrent, {
      toValue: 150,  // Restaura o tamanho original
      duration: 500,
      useNativeDriver: false,
    }).start();

    setExpandedCurrent(false);  // Marca como fechado
  };

  const toggleExpandPredictor = () => {
    
    if (!expandedPredictor) {
      Animated.timing(animatedSizePredictor, {
        toValue: screenHeight , // Expande para altura da tela
        toValue: screenWidth * 0.90,
        duration: 500,
        useNativeDriver: false,
      }).start();

      setExpandedPredictor(true);  // Marca como expandido
    }
  };

  const closePredictor = () => {
    Animated.timing(animatedSizePredictor, {
      toValue: 150,  // Restaura o tamanho original
      duration: 500,
      useNativeDriver: false,
    }).start();

    setExpandedPredictor(false);  // Marca como fechado
  };

  const totalMarketCap = data.reduce((sum, coin) => sum + coin.market_cap, 0);

  const marketDominance = (basket.reduce((sum,item) => {
  const coinData=data[search_id(item.name)];
  if (coinData) {
    return sum + coinData.market_cap;
   
  } return sum*100;
},0)/ (totalMarketCap)).toFixed(5);


  const totalVolatility =( basket.reduce((sum, item) => {
    const coinData = data[search_id(item.name)];
    if (coinData) {
      const media=(coinData.high_24h+coinData.low_24h)/2;
      return sum + ((coinData.high_24h-coinData.low_24h)/ media) * (item.value/100);
    }
    return sum;
  }, 0)/ 
  basket.length
 ).toFixed(5);

  const weightedPriceChange = (
    basket.reduce((sum, item) => {
      const coinData = data[search_id(item.name)];
      if (coinData) {
        return sum + (coinData.price_change_percentage_24h * (item.value/100));
      }
      return sum;
    }, 0) /
    basket.length
  ).toFixed(5);

  const price=(
    basket.reduce((sum, item) => {
      const coinData = data[search_id(item.name)];
      if (coinData) {
        return sum + (coinData.current_price* (item.value/100));
      }
      return sum;
    }, 0)

  ).toFixed(2);


  return (
    <ScrollView style={styles.appContainer}>
     
      {!expandedCurrent && !expandedPredictor && 
         <View style={styles.headerContainer}>
         {data && data.length > 0 && (
           <Link to="/baskets" style={styles.link}>
             
             <Ionicons name="arrow-back" size={30} color="white"/>
           </Link>
         )}
         <View style={styles.header}>
           <Text style={[styles.title,{ fontSize: 40}]}>{name}</Text> {/* Exibe o nome do ativo aqui */}
         </View>
        </View>

      }


      <View style={(!expandedCurrent && !expandedPredictor) ? styles.squaresContainer : {width:"100%", height:"100%"}}>
        {/* Quando o quadrado não está expandido */}
        {!expandedPredictor && (
          <TouchableOpacity onPress={expandedCurrent ? null : toggleExpandCurrent}>
            <Animated.View
              style={[ (!expandedCurrent)?
                styles.square:
                {
                  backgroundColor: 'black',
                  width:screenWidth *0.9 ,
                  height:screenHeight*0.9,
                  alignItems:'center',
                  paddingVertical:10,
                  paddingHorizontal:10,
                  marginVertical: 10,
                  marginLeft: 10,
                  zIndex: 10, // Aumenta o zIndex para ficar acima dos outros elementos
                  position: 'relative', // Define o contêiner como relativo para o posicionamento absoluto
                }
              ]}
            >
             {!expandedCurrent &&(<Text style={styles.titlesquare}>Current{'\n'}{'\n'}Click to see More</Text>)} 
              {expandedCurrent && (
                <View style={styles.expandedContent}>
                  
                    <Text style={styles.titlebox}>Current</Text>
                     <TouchableOpacity onPress={closeCurrent} style={styles.closeButtonCurrentContainer} accessibilityLabel="Fechar">
                     <Icon name="close" size={24} color="#fff" />
                     </TouchableOpacity>
                  
                  <View style={styles.statsContainer}>
                      <View style={[styles.box,{backgroundColor:  weightedPriceChange>12? 'green':'red'}]}>
                      <Text style={[styles.stat,{ fontSize:18,marginBottom:10}]}>Retorno Total nas Últimas 24h:</Text>
                      <Text style={[styles.stat,{ fontSize:20}]}>{weightedPriceChange}%</Text>
                    </View>

                    <View style={[styles.priceBox,{backgroundColor: 'green'}]}>
                    <Text style={[styles.stat,{ fontSize:18,marginBottom:10}]}>Preço Total:</Text>
                    <Text style={[styles.stat,{ fontSize:20}]}>{price} €</Text>
                  </View>

                     

                 
                  <View style={[styles.box,{backgroundColor:  totalVolatility<20? 'green':'red'}]}>
                    <Text style={[styles.stat,{ fontSize:18,marginBottom:10}]}>Volatilidade Percentual nas Últimas 24h:</Text>
                    <Text style={[styles.stat,{ fontSize:20}]}>{totalVolatility}%</Text>
                  </View>

                 <View style={[styles.box,{backgroundColor:  marketDominance>5? 'green':'red'}]}>
                        <Text style={[styles.stat,{ fontSize:18,marginBottom:10}]}> Dominância de Mercado:</Text>
                        <Text style={[styles.stat,{ fontSize:20}]}> {marketDominance} % </Text>
                      </View>

                
                 
              </View>
              </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        )}

        {/* Quando o quadrado não está expandido */}
        {!expandedCurrent && (
          <TouchableOpacity onPress={expandedPredictor ? null : toggleExpandPredictor}>
            <Animated.View
              style={[ (!expandedPredictor)? 
                styles.square: 
                {
                  backgroundColor: 'black',
                  width: screenWidth *0.9 ,
                  height:screenHeight*0.9 ,
                  marginVertical: 10,
                  marginLeft: 10,
                  zIndex: 10, // Aumenta o zIndex para ficar acima dos outros elementos
                  position: 'relative', // Define o contêiner como relativo para o posicionamento absoluto
                }
              ]}
            >
             {!expandedPredictor&& (<Text style={styles.titlesquare}>Price Predictor</Text>)}
              {expandedPredictor && (
              <ScrollView>
                <View style={styles.expandedContent}>
                  
                   <Text style={styles.titlebox}>Price Predictor</Text>
                   <TouchableOpacity onPress={closePredictor} style={styles.closeButtonPredictorContainer}>
                    <Icon name="close" size={24} color="#fff" />
                 </TouchableOpacity>
                   
                   <View style={styles.statsContainer}>
                      <View style={styles.greenBox}>
                        <Text>Aumentaram</Text>
                      </View>
                      <View style={styles.box}>
                        <Text>Desceram</Text>
                      </View>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                    <View style={styles.noticiasContainer}>
                    
                    
                     </View>
                   </ScrollView>
              </View>
              </ScrollView>
              )}
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>

      {/* Círculos com scroll horizontal */}
      {!expandedCurrent && !expandedPredictor && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          <View style={styles.circlesContainer}>
            {
              basket.map( item => 
                <View key={item.name}>
                  <Image source= {{uri: data[search_id(data,item.name)].image}} style={styles.circle}/> 
                </View>
            )
          }
          </View>
        </ScrollView>
      )}

      {/* Retângulos em uma coluna, agora acima do quadrado expandido */}
      {!expandedCurrent && !expandedPredictor && (
        <View style={styles.rectanglesContainer}>
             
          {filteredBaskets.map(item => (
           
             <Link key={item.name} to={{ pathname: `/coinPage/${item.name}/${item.name}/${data[search_id(data,item.name)].current_price}`}}>
              <View style={styles.rectangle} >
                
                  <Image source={{uri:data[search_id(data,item.name)].image}} style={styles.rectCircle}/>

                  {/* Texto */}
                <View style={{width:100}}>
                  <Text style={styles.rectText}>{item.name}</Text>
                  <Text style={styles.rectText}>{item.value}%</Text>
                </View>
                  {/* Seta e Percentagem */}
                  <View style={styles.arrowContainer}>
                    <Ionicons
                      name={data[search_id(data,item.name)].price_change_percentage_24h >= 0 ? "arrow-up" : "arrow-down"}
                      size={24}
                      color={data[search_id(data,item.name)].price_change_percentage_24h >= 0 ? "green" : "red"}
                    />
                    <Text style={[styles.percentage, { color: data[search_id(data,item.name)].price_change_percentage_24h >= 0 ? "green" : "red" }]}>
                      {data[search_id(data,item.name)].price_change_percentage_24h}%
                    </Text>
                  </View>
              </View>
            </Link>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },

  header:{
    flexDirection: 'row'
  },

  title: {
    color: 'white',
    marginBottom: 50,
    marginLeft:30,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  expandedContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Usa padding em vez de margin
  },
  squaresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 30,
    position: 'relative',
  },
  square: {
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: '#11181C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titlesquare:{
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  },
  graphText: {
    color: 'white',
    marginVertical: 50,
    paddingBottom:50,
    fontSize: 30,
  },
  titlebox:{
    color: 'white',
    marginBottom: 20,
    marginTop:10,
    fontSize: 40,
  },

  closeButtonPredictorContainer: {
    position: 'relative',
    padding:5,
    top: "-13%",  // Mantém dentro do quadrado
    right:"-46%",
    zIndex: 20,  // Garante que o botão de fechar fique acima de tudo
  },
  closeButtonCurrentContainer: {
    position: 'relative',
    padding:5,
    top: "-17%",  // Mantém dentro do quadrado
    right:"-45%",
    zIndex: 20,  // Garante que o botão de fechar fique acima de tudo
  },
  closeButton: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  statsContainer: {

    marginBottom:10,
    flexDirection: 'column',
    textAlign:"center",
    gap: 30,
  },
  stat:{
      color:'white',
      textAlign:'center',
      marginBottom:5,
  },
  priceBox: {
    width: 300,
    height: 90,
    padding:10,
    fontSize:18,
    borderRadius: 30,
    color:"white",
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: 300,
    height: 120,
    padding:10,
    fontSize:18,
    borderRadius: 30,
    color:"white",
    justifyContent: 'center',
    alignItems: 'center',
  },

  noticiasContainer: {
    marginTop:10,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center', 
  },

  noticias: {
    width: 70,
    height: 70,
    backgroundColor: 'black',
    marginHorizontal: 5
  },

  circlesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 23
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  rectanglesContainer: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
    marginBottom:40,
  },

  rectangle: {
    width: 350,
    height: 60,
    marginLeft:20,
    backgroundColor: '#11181C',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20, 
    gap:20,
    borderRadius: 8,
  },

  rectCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
   
  },

  rectText: {
    color: 'white',
    fontSize: 18,
    marginLeft: -20,
  },

  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    width: 100,
    marginLeft:-20,

  },

  percentage: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SingularBasket;
