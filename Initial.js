
import { StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { training } from './Prediction';
import { Api } from './API';
import { useEffect } from 'react';



const Initial=()=> {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchDataFromAPI = async () => {
        try {
          const result = await Api('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur');
          const trained = training(a);

          
          for(let i=0;i<10;i++) {

          }
          setData(result.slice(0, 10));
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };  
  
      fetchDataFromAPI();
      console.log("Nome do ativo: " + name); // Agora imprime o nome correto
    }, [name]); // Recarrega sempre que o nome mudar
    


  return (


  );
}
export default Initial;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
});

