import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Ícones para as setas
import Icon from 'react-native-vector-icons/MaterialIcons';

const data = [
  { text: "Bitcoin", change: 5.2, percentage:'10%' },
  { text: "Ethereum", change: -3.8 , percentage:'10%'  },
  { text: "Cardano", change: 2.1, percentage:'10%'  },
  { text: "Cardano", change: -2.1, percentage:'10%'  },
  { text: "Cardano", change: 2.1, percentage:'10%'  },
  { text: "Cardano", change: 2.1, percentage:'10%'  },
];

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const SingularBasket = () => {
  const [expandedCurrent, setExpandedCurrent] = useState(false);
  const [expandedPredictor, setExpandedPredictor] = useState(false);
  const animatedSizeCurrent = useState(new Animated.Value(150))[0];
  const animatedSizePredictor = useState(new Animated.Value(150))[0];

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

  return (
    <ScrollView style={styles.appContainer}>
      {!expandedCurrent && !expandedPredictor && <Text style={styles.title}>Basket 1:</Text>}


      <View style={(!expandedCurrent && !expandedPredictor) ? styles.squaresContainer : {width:"100%", height:"100%"}}>
        {/* Quando o quadrado não está expandido */}
        {!expandedPredictor && (
          <TouchableOpacity onPress={expandedCurrent ? null : toggleExpandCurrent}>
            <Animated.View
              style={[ (!expandedCurrent)?
                styles.square:
                {
                  backgroundColor: 'gray',
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
             {!expandedCurrent &&(<Text style={styles.titlesquare}>Current</Text>)} 
              {expandedCurrent && (
                <View style={styles.expandedContent}>
                  {/* Botão de Fechar no canto superior direito */}
                  <Text style={styles.titlebox}>Current</Text>
                  <TouchableOpacity onPress={closeCurrent} style={styles.closeButtonCurrentContainer} accessibilityLabel="Fechar">
                    <Icon name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.graphText}>[ Gráfico Aqui ]</Text>
                  <View style={styles.statsContainer}>
                    <View style={styles.greenBox}><Text>Aumentaram</Text></View>
                    <View style={styles.redBox}><Text>Desceram</Text></View>
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
                  backgroundColor: 'gray',
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
                   {/* Botão de Fechar no canto superior direito */}
                   <Text style={styles.titlebox}>Price Predictor</Text>
                   <TouchableOpacity onPress={closePredictor} style={styles.closeButtonPredictorContainer}>
                    <Icon name="close" size={24} color="#fff" />
                 </TouchableOpacity>
                   <Text style={styles.graphText}>[ Gráfico Aqui ]</Text>
                   <View style={styles.statsContainer}>
                      <View style={styles.greenBox}>
                        <Text>Aumentaram</Text>
                      </View>
                      <View style={styles.redBox}>
                        <Text>Desceram</Text>
                      </View>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                    <View style={styles.noticiasContainer}>
                      {Array(17).fill().map((_, index) => (
                        <View key={index} style={styles.noticias}></View>
                      ))}
                    
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
            {Array(10).fill().map((_, index) => (
              <View key={index} style={styles.circle}>

              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Retângulos em uma coluna, agora acima do quadrado expandido */}
      {!expandedCurrent && !expandedPredictor && (
        <View style={styles.rectanglesContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.rectangle}>
              {/* Círculo */}
              <View style={styles.rectCircle}></View>

              {/* Texto */}
              <Text style={styles.rectText}>{item.text}</Text>
              <Text style={styles.rectText}>{item.percentage}</Text>
              {/* Seta e Percentagem */}
              <View style={styles.arrowContainer}>
                <Ionicons
                  name={item.change >= 0 ? "arrow-up" : "arrow-down"}
                  size={24}
                  color={item.change >= 0 ? "green" : "red"}
                />
                <Text style={[styles.percentage, { color: item.change >= 0 ? "green" : "red" }]}>
                  {item.change}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    paddingVertical: 70,
    paddingHorizontal: 5,
  },

  title: {
    fontSize: 40,
    color: 'black',
    marginBottom: 50,
    marginLeft:30,
    fontWeight: 'bold',
    textAlign: 'left',
    
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
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  titlesquare:{
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    
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
    fontSize: 30,
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
    marginVertical:10,
    flexDirection: 'row',
    gap: 20,
  },

  greenBox: {
    width: 150,
    height: 150,
    backgroundColor: 'limegreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  redBox: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
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
    marginHorizontal: 5,
    
  },

  circlesContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  circle: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 25,
  },

  rectanglesContainer: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
  },

  rectangle: {
    width: 350,
    height: 60,
    marginLeft:20,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20, 
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
  },

  percentage: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SingularBasket;
