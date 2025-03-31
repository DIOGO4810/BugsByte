import { predict } from '../Prediction.js';
import { Api,search_id} from '../API.js'

import express from 'express'
import cors from 'cors'

const app = express();
const port = 5000; // You can use any available port number



// Middleware
app.use(cors()); 
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




// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});