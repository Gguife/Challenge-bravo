import { coinsModel } from "../models/coinsModel";
import getExchangeRates from "../api/currencyLayerApi";

export const verifyBusinessOperation = async (req, res) =>{
  try{
    const exchangeData = await getExchangeRates();
   
    //Obtendo códigos de moeda da API (code, codein)
    const allCodesFromAPI = [...new Set([
      ...exchangeData.map(index => index.code),
      ...exchangeData.map(index => index.codein)
    ])];

    //Fazendo a verificação se meu sistema suporta tal moeda
    const supportedCoins = await coinsModel.findAll({
      where: {currency_code: {$in: allCodesFromAPI}}
    });  

    //Retornando moedas suportadas
    res.status(200).json({supportedCoins});

  }catch(error){
    console.error(error);
    res.status(500).json({message: 'Erro when carrying out business operation!'});
  }
}
