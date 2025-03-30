import {Api} from './API.js';

const main = async() => {
    const data = await Api('https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=usd&days=max');
    console.log(data);
}
