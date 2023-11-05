var express = require('express');
import { AuthController } from '../controller/auth';

export const routerAuth = express.Router()


routerAuth.post('/login', AuthController.login);
routerAuth.post('/refresh', AuthController.refresh);



