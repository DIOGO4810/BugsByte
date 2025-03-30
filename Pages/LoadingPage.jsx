import { View, ActivityIndicator, Text, StyleSheet, Animated } from 'react-native';

const LoadingPage = () => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <ActivityIndicator size="large" color="#ff9800" />
      </Animated.View>
      <Text style={styles.text}>Carregando dados...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  text: {
    marginTop: 10,
    color: '#ff9800',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});

export default LoadingPage;
