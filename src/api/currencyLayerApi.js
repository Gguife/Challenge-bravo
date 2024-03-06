import axios from "axios";

const BASE_URL = 'http://economia.awesomeapi.com.br';
const currencies = 'USD-BRL,BRL-USD,USD-EUR,EUR-USD,BTC-USD,BRL-EUR,EUR-BRL,BTC-BRL,BTC-EUR';

async function getExchangeRates(){
  try{
    const response = await axios.get(`${BASE_URL}/json/last/${currencies}`);

    if(response.status == 200){
      const exchangeRates = response.data;
      const currencyRates = Object.values(exchangeRates).map(rate => ({
        code: rate.code,
        codein: rate.codein,
        bid: rate.bid,
        ask: rate.ask
      }));
      console.log('Exchange rates for selected currencies:',currencyRates);
    }else{
      console.error('Error getting exchange rates:', response.statusText);
    }
  }catch(error){
    console.log('Error when making API request:', error.message);
  }
}

export default getExchangeRates;