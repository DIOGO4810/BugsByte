const apiUrl= 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur'

const info = fetch(apiUrl);

export async function totalget() {
    const apiUrl= 'https://api.coingecko.com/ºa.pi/v3/coins/markets?vs_currency=eur'
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


export const Api = async (url) => {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Erro ao carregar os dados');
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