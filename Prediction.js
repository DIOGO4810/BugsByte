import tf from '@tensorflow/tfjs';
import {Api} from './API.js';


// Generate synthetic training data (replace with real crypto prices)

const generateData = (async(crypto) => {
    const data = await Api(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=eur&days=365`);
    return data.prices.map((item) => {return item[1]});
}) 



// Prepare data for LSTM model
const prepareData = (data, lookBack = 90) => {
    let xs = [], ys = [];
    for (let i = 0; i < data.length - lookBack; i++) {
        xs.push(data.slice(i, i + lookBack));
        ys.push(data[i + lookBack]);
    }
    return {
        xs: tf.tensor2d(xs, [xs.length, lookBack]),
        ys: tf.tensor2d(ys, [ys.length, 1])
    };
};


// Define LSTM model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [90], units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1 }));
model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

// Train model
const training = (async (cripto) => {
    const cryptoPrices = await generateData(cripto);
    const { xs, ys } = prepareData(cryptoPrices);

    await model.fit(xs, ys, {
        epochs: 200,
        batchSize: 10,
        callbacks: {
            onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss}`)
        }
    });

    return model;
    // Predict future price
})();

const getPredict = (async (model,crypto) => {
    const cryptoPrices = await generateData( crypto );
    const testInput = tf.tensor2d([cryptoPrices.slice(-90)], [1, 90]);
    const prediction = model.predict(testInput);
    const predictedValue = prediction.arraySync()[0][0];
    return predictedValue;
})

(async () => {
    const model = await training ('bitcoin');
    const result = await getPredict(model,'bitcoin');
    console.log(predictedValue);
})

