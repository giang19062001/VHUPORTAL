import { FeeController } from "../controller/fee";

var express = require('express');

export const routerFee = express.Router()

routerFee.post('/pay', FeeController.pay);

routerFee.post('/getFee/:id', FeeController.getFee);
routerFee.post('/getAllFee', FeeController.getAllFee);


