import express, { Request, Response } from "express";
import { User } from './users/users';
import * as userService from './users/userServices';
import swaggerUi from 'swagger-ui-express';
import { ConfigSwagger } from '../infra/swagger/configSwagger';

const routes = express.Router();
const configSwagger = new ConfigSwagger();

routes.post('/createUser', async (req: Request, res: Response) => { // Fazer a verificação se todos os parâmetros foram passados e se o login é unico
    const newUser: User = req.body;
    userService.createUser(newUser, (err: Error, userId: number) => {
        if (err) {
            return res.status(500).json({
                "statusCode": 500,
                "message": err.message
            });
        }
        res.status(200).json({
            "statusCode": 200,
            "orderId": userId
        });
    });
});

routes.use('/api/docs', swaggerUi.serve,
    swaggerUi.setup(configSwagger.swaggerDocument));

routes.get('/', function (req, res) {
    res.send('Bem vindo ao gerenciador de usuários e endereços');
});

export default routes;