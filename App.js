import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native'; // Alterei para NativeRouter e Routes
import HomeScreen from './Pages/HomeScreen'; 
import AssetsScreen from './Pages/AssetsScreen';

export default function App() {
  return (
    <NativeRouter> {/* Usando NativeRouter ao invés de Router */}
      <SafeAreaView style={styles.container}>
        <Routes>  {/* Usando Routes ao invés de Switch */}
          <Route path="/" element={<HomeScreen />} />  {/* Usando "element" ao invés de "component" */}
          <Route path="/assets" element={<AssetsScreen />} /> {/* Defina uma rota para Assets */}

        </Routes>
      </SafeAreaView>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
});
