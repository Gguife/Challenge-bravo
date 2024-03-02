import { exchangeModel } from "../models/exchangeRatesModel";

const findAll = async(_, res) =>{
  try{
    const exchangeRate = await exchangeModel.findAll();
    return res.json({ exchangeRate });
  }catch(error){
    console.log("Error finding all exchange rates:", error);
    return res.status(500).json({error: 'Internal server error.'});
  }
}




export default { findAll, };