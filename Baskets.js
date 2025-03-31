import { Api } from "./API";



export const previsto_price_basket = (async (basket) => {
    let soma =0 ;
    for(let i=0;i<basket.length;i++) {
        const aux = await Api(`http://10.14.0.130:5000/predict/${basket[i].name}`);
        soma +=aux.previsto*basket.value;
    }
    return soma;
})