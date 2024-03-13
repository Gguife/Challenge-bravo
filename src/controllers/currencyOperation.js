import getExchangeRates from "../api/currencyLayerApi.js";
import { verifyBusinessOperation } from "./businessOperation.js";


const convertCurrency = async (fromCurrency, toCurrency, amount) =>{
  try{
    // Dados da API pública
    const exchangeRates = await getExchangeRates(`${fromCurrency}-${toCurrency}`);

    // Armazenando as taxas de câmbio correspondentes as moedas passadas no parâmetro
    const fromRate = exchangeRates.find(rate => rate.code === fromCurrency);
    const toRate = exchangeRates.find(rate => rate.codein === toCurrency);
    
    // Verificar se as moedas foram encontradas
    if(!fromRate || !toRate){
      throw new Error('One or more coins not found!');
    }

    const rateBid = toRate.bid;
    
    // Lógica de conversão das moedas
    const convertAmount = (amount * rateBid).toFixed(2);

    //retornarndo lógica
    return convertAmount; 
  }catch(error){
    console.error('Error when converting currency:', error);
    throw new Error('Erro when converting currency!');
  }
}

const execultCurrencyOperation = async (req, res) => {
  try {
    //Verificando as moedas sao compativeis com nosso sistema
    const suportedCoins = await verifyBusinessOperation(req, res);
    if(suportedCoins.error){
      return res.status(400).json({error: suportedCoins.error})
    }

    
    const { fromCurrency, toCurrency, amount } = req.body;
    if (fromCurrency === toCurrency) {
      return res.status(400).json({ error: 'Coins are the same!' });
    }
    
    const convertedAmount = await convertCurrency(fromCurrency, toCurrency, amount);
    
    return res.status(200).json({ convertedAmount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error when executing coins operation!' });
  }
};

export { execultCurrencyOperation };