import {predict} from '../Prediction.js';


import express from 'express'
import cors from 'cors'

const app = express();
const port = 5000; // You can use any available port number
let a = await predict();

// (async () =>{
//     const ola = await predict();
//     a = ola;
// })

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing if you need it
app.use(express.json()); // To parse JSON payloads

// Sample API endpoint
app.get('/predict', (req, res) => {
    res.send({"resultado":a});
    
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});