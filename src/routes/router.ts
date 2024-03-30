import * as express from "express";
import coinsController from "../controllers/coins.js";
import { verifyBusinessOperation } from "../controllers/businessOperation.js";
import { execultCurrencyOperation } from "../controllers/currencyOperation.js";

const routes = express.Router();

routes.get('/coins', coinsController.findAll);
routes.get('/coins/:id', coinsController.findOne);
routes.post('/coins', coinsController.add);
routes.put('/coins/:id', coinsController.update);
routes.delete('/coins/:id', coinsController.remove);

//Verificando moedas suportadas
routes.post('/verify-operation', verifyBusinessOperation);

//Conversão das moedas selecionadas
routes.post('/convert', execultCurrencyOperation);

export default routes;