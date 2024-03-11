import getExchangeRates from "../api/currencyLayerApi.js";
import { verifyBusinessOperation } from "./businessOperation.js";


const convertCurrency = async (amount, fromCurrency, toCurrency) =>{
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
    const convertAmount = amount / rateBid;

    console.log(convertAmount)

    //retornarndo lógica
    return convertAmount; 
  }catch(error){
    console.error('Error when converting currency:', error);
    throw new Error('Erro when converting currency!');
  }
}

const execultCurrencyOperation = async (req, res) =>{
  try{
    // Verificar se as moedas são suportadas antes de executar a opração
    await verifyBusinessOperation(req, res);
    // Extraindo dados da requisição
    const {amount, fromCurrency, toCurrency} = req.body;

    // Verificar se as moedas são iguais
    if(fromCurrency === toCurrency){
      throw new Error('Coins are the same!');
    }
    
    // Chamar a função de conversão de moedas
    await convertCurrency(amount, fromCurrency, toCurrency);
    
  }catch(error){
    console.error(error);
    throw new Error('Error when executing coins operation!');
  }
}

export {execultCurrencyOperation};