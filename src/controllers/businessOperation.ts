import CoinsModel from "../models/coinsModel";
import getExchangeRates from "../api/currencyLayerApi.js";


export const verifyBusinessOperation = async (req, res) => {
  try {  
    // Obtendo moedas que queremos na solicitação
    const { fromCurrency, toCurrency } = req.body;

    // Verificando se as moedas realmente foram fornecidas
    if (!fromCurrency || !toCurrency) {
      return { error: 'Currency parameters missing from request.' };
    }

    // Obtendo dados da API
    const exchangeData = await getExchangeRates(`${fromCurrency}-${toCurrency}`);
    // Verificar se há dados encontrados   
    if (!exchangeData || exchangeData.length === 0) {
      return { error: 'No exchange rate data found.' };
    }

    // Obtendo códigos de moeda da API (code, codein)
    const allCodesFromAPI = [...new Set([
      ...exchangeData.map(index => index.code),
      ...exchangeData.map(index => index.codein)
    ])];

    // Fazendo a verificação se meu sistema suporta tal moeda
    const supportedCoins = await CoinsModel.findAll({
      where: {currency_code:  allCodesFromAPI}
    });  

    // Caso meu sistema não suporte uma das moedas recebidas
    if(!supportedCoins.some(coin => coin.currency_code === fromCurrency) || !supportedCoins.some(coin => coin.currency_code === toCurrency)){
      throw new Error("Currencies not supported")
    }

    //Retornando moedas suportadas
    return supportedCoins;
  } catch(error) {
    console.error(error);
    return { error: 'Error when carrying out business operation!' };
  }
};
