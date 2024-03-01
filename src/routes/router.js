import express from "express";
import coinsController from "../controllers/coins.js";

const routes = express.Router();

routes.get('/coins', coinsController.findAll);
routes.get('/coins/:id', coinsController.findOne);
routes.post('/coins', coinsController.add);
routes.put('/coins/:id', coinsController.update);
routes.delete('/coins/:id', coinsController.remove);

export default routes;