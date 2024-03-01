import { coinsModel } from "../models/coinsModel.js";

const findAll = async (_, res) =>{
  try {
    const coins = await coinsModel.findAll();
    return res.json({ coins });
  } catch (error) {
    console.log("Error finding all coins:", error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

const findOne = async (req, res) =>{
  try{
    const coin = await coinsModel.findByPk(req.params.id);
    return res.json({ coin });
  }catch(error){
    console.log("Error finding coin:", error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

const add = async(req, res) =>{
  try{
    coinsModel.create({
      name: req.body.name,
      currency_code: req.body.currency_code
    })
    .then((result) => res.json(result));
  }catch(error){
    console.log("Error registring currency", error)
    return res.status(500).json({error: "Internal server error."})
  }
}

const update = async(req, res) =>{
  try{
    coinsModel.update({
      name: req.body.name,
      currency_code: req.body.currency_code
    },{
      where: {
        id: req.params.id
      }
    })
    .then((result) => res.json(result));
  }catch(error){
    console.log("Error updating currency", error);
    return res.status(500).json({error: "Internal server error."})
  }
}

const remove = async (req, res)=>{
  try{
    coinsModel.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((result) => res.json(result));
  }catch(error){
    console.log("Error removing currency", error);
    return res.status(500).json({error: "Internal server error."})
  }
}


export default { findAll, findOne, add, update, remove };