const apiUrl= 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur'

const info = fetch(apiUrl);

export async function totalget() {
    const apiUrl= 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur'
    return fetch(apiUrl);
}

export async function createArrayObj() {
    
        const apiUrl= 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur'
        const response = fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Adjust based on API response structure
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export const Api = async (url) => {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
            console.log("Dormir um pouco");
            await sleep(30000)
            console.log("Tentar de Novo");
            return await Api(url);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
};



export const search_id =  (info,crypto) => {
    for (let i =0;i < info.length;i++) {
        if (crypto == info[i].id) return i;
    }
    return -1
}
