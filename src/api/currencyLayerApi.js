import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.API_URL;
const CURRENCIES = process.env.API_CURRENCIES;

async function getExchangeRates(){
  try{
    const response = await axios.get(`${BASE_URL}/json/last/${CURRENCIES}`);

    if(response.status == 200){
      const exchangeRates = response.data;
      const currencyRates = Object.values(exchangeRates).map(rate => ({
        code: rate.code,
        codein: rate.codein,
        bid: rate.bid,
        ask: rate.ask
      }));
      console.log('Exchange rates for selected currencies:',currencyRates);
    }
  }catch(error){
    console.log('Error when making API request:', error.message);
  }
}

getExchangeRates();

export default getExchangeRates;