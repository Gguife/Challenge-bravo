import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.API_URL;

async function getExchangeRates(coins){
  try{
    const response = await axios.get(`${BASE_URL}/last/${coins}`);

    if(response.status == 200){
      const exchangeRates = response.data;
      const currencyRates = Object.values(exchangeRates).map(rate => ({
        code: rate.code,
        codein: rate.codein,
        bid: rate.bid,
        ask: rate.ask
      }));
      console.log('Exchange rates for selected currencies:',currencyRates);

      return currencyRates;
    }
  }catch(error){
    console.log('Error when making API request:', error.message);
  }
}

export default getExchangeRates;