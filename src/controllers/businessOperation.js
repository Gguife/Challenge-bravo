import { coinsModel } from "../models/coinsModel.js";
import getExchangeRates from "../api/currencyLayerApi.js";


export const verifyBusinessOperation = async (req, res) => {
  try {  
    // Obtendo moedas que queremos na solicitação
    const { currency1, currency2 } = req.query;

    // Verificando se as moedas realmente foram fornecidas
    if (!currency1 || !currency2) {
      return { error: 'Currency parameters missing from request.' };
    }

    // Obtendo dados da API
    const exchangeData = await getExchangeRates(`${currency1}-${currency2}`);
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
    const supportedCoins = await coinsModel.findAll({
      where: {currency_code:  allCodesFromAPI}
    });  

    //Retornando moedas suportadas
    return supportedCoins;

  } catch(error) {
    console.error(error);
    return { error: 'Error when carrying out business operation!' };
  }
};
