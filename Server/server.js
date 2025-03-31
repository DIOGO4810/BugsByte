import { predict } from '../Prediction.js';
import { Api,search_id} from '../API.js'

import express from 'express'
import cors from 'cors'

const app = express();
const port = 5000; // You can use any available port number



// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing if you need it
app.use(express.json()); // To parse JSON payloads

let data = await Api('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur');
const prediction = [];


app.get('/predict/:coin', async (req, res) => {
    try {
        const { coin } = req.params;  // Get 'coin' from the URL     /

        while(prediction[search_id(data,coin)] == null) {
            prediction[search_id(data,coin)] = await predict(coin);     
        }

        const aux = prediction[search_id(data,coin)] 
        res.json({ previsto: aux,atual: data[search_id(data,coin)].current_price }); // Send the response back
    } catch (err) {
        console.error('Error occurred while fetching prediction:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/info', async (req,res) => {
    try {
        // const { coin } = req.params;  // Get 'coin' from the URL   /
        const aux = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur')
        if(aux.ok) data = await aux.json();
        res.json(data)
    } catch (err) {
        console.error('Error occurred while fetching prediction:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



//   app.get('/predict/tether', async (req, res) => {
//     try {
//       // Assuming 'predict' is an async function, and you need to await its result
//       const prediction = await predict('tether');
//       // Send a response with prediction data
//       res.json({ resultado: prediction});
//     } catch (err) {
//       console.error('Error occurred while fetching prediction:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });    

//   app.get('/predict/ripple', async (req, res) => {
//     try {
//       // Assuming 'predict' is an async function, and you need to await its result
//       const prediction = await predict('ripple');    // Call the async prediction function
//       // Send a response with prediction data
//       res.json({ resultado: prediction});
//     } catch (err) {  
//       console.error('Error occurred while fetching prediction:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });  

//   app.get('/predict/binancecoin', async (req, res) => {
//     try {
//       // Assuming 'predict' is an async function, and you need to await its result
//       const prediction = await predict('binancecoin');    // Call the async prediction function
//       // Send a response with prediction data
//       res.json({ resultado: prediction});
//     } catch (err) {  
//       console.error('Error occurred while fetching prediction:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });  

//   app.get('/predict/solana', async (req, res) => {
//     try {
//       // Assuming 'predict' is an async function, and you need to await its result
//       const prediction = await predict('solana');    // Call the async prediction function
//       // Send a response with prediction data
//       res.json({ resultado: prediction});
//     } catch (err) {  
//       console.error('Error occurred while fetching prediction:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });  
//   app.get('/predict/usd-coin', async (req, res) => {
//     try {
//       // Assuming 'predict' is an async function, and you need to await its result
//       const prediction = await predict('usd-coin');    // Call the async prediction function
//       // Send a response with prediction data
//       res.json({ resultado: prediction});
//     } catch (err) {  
//       console.error('Error occurred while fetching prediction:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });  

//   app.get('/predict/dogecoin', async (req, res) => {
//     try {
//       // Assuming 'predict' is an async function, and you need to await its result
//       const prediction = await predict('dogecoin');    // Call the async prediction function
//       // Send a response with prediction data
//       res.json({ resultado: prediction});
//     } catch (err) {  
//       console.error('Error occurred while fetching prediction:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });  

//   app.get('/predict/cardamg', async (req, res) => {
//     try {
//       // Assuming 'predict' is an async function, and you need to await its result
//       const prediction = await predict('cardamg');    // Call the async prediction function
//       // Send a response with prediction data
//       res.json({ resultado: prediction});
//     } catch (err) {  
//       console.error('Error occurred while fetching prediction:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }); 

//   app.get('/predict/tron', async (req, res) => {
//     try {
//       // Assuming 'predict' is an async function, and you need to await its result
//       const prediction = await predict('tron');    // Call the async prediction function
//       // Send a response with prediction data
//       res.json({ resultado: prediction});
//     } catch (err) {  
//       console.error('Error occurred while fetching prediction:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });  

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});