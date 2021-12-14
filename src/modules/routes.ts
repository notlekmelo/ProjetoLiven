import express, { Request, response, Response } from "express";
import { User } from './users/users';
import * as userService from './users/userServices';
import * as userController from './users/userController';
import { Address } from './addresses/addresses';
import * as addressService from './addresses/addressServices';
import * as addressController from './addresses/addressController';
import swaggerUi from 'swagger-ui-express';
import * as token from '../infra/server/token'
// import { ConfigSwagger } from '../infra/swagger/configSwagger';


const routes = express.Router();

routes.post('/createUser', async (req: Request, res: Response) => {
    const newUser: User = req.body.User;
    userController.validaParamCreate(newUser, (err: Error, paramValido: boolean, message: String) => {
        if (err) {
            return res.status(500).json({
                "statusCode": 500,
                "message": err.message
            });
        }
        else if (paramValido) {
            userService.createUser(newUser, (err: Error, userId: number) => {
                if (err) {
                    return res.status(500).json({
                        "statusCode": 500,
                        "message": err.message
                    });
                }
                res.status(200).json({
                    "statusCode": 200,
                    "userCode": userId
                });
            });
        }
        else {
            return res.status(422).json({
                "statusCode": 422,
                "message": message
            });
        }
    });

});

routes.get('/login', async (req: Request, res: Response) => {
    const newUser: User = req.body.User;
    userController.validaParamLogin(newUser, (paramValido: boolean, message: String) => {
        if (paramValido) {
            userService.login(newUser, (err: Error, token: String) => {
                if (err) {
                    res.status(500).json({
                        "statusCode": 500,
                        "message": err.message
                    })
                }
                res.status(200).json({
                    "statusCode": 200,
                    "token": token
                })
            });
        }
        else {
            res.status(422).json({
                "statusCode": 422,
                "message": message
            })
        }
    });
});

routes.post('/updateUser', token.ValidaToken, async (req: Request, res: Response) => {
    const newUser: User = req.body.User;
    userController.validaParamUpdate(newUser, (err: Error, paramValido: boolean, message: String) => {
        if (err) {
            res.status(500).json({
                "statusCode": 500,
                "message": err.message
            })
        }
        else if (paramValido) {
            userService.updateUser(newUser, (error: Error, updated: boolean) => {
                if (error) {
                    res.status(500).json({
                        "statusCode": 500,
                        "message": error.message
                    })
                }
                if (updated) {
                    res.status(200).json({
                        "statusCode": 200,
                        "updated": true
                    })
                }
            });
        }
        else {
            res.status(422).json({
                "statusCode": 422,
                "message": message
            })
        }
    });
});

routes.post('/deleteUser', token.ValidaToken, async (req: Request, res: Response) => {
    const newUser = req.body.User;
    userService.deleteUser(newUser, (err: Error, deleted: boolean) => {
        if (err) {
            res.status(500).json({
                "statusCode": 500,
                "message": err.message
            })
        }
        else if (deleted) {
            res.status(200).json({
                "statusCode": 200,
                "deleted": true
            })
        }
    });
});

routes.post('/createAddress', token.ValidaToken,async(req: Request, res : Response) => {
    const newAddress : Address = req.body.Address;
    addressController.validaParamCreateAdress(newAddress, (paramValido : boolean, message : string)=> {
        if(!paramValido){
            res.status(422).json({
                "statusCode" : 422,
                "message": message
            });
        }
        else {
            addressService.createAddress(newAddress, (err : Error, insertId : number) => {
                if(err){
                    res.status(500).json({
                        "statusCode": 500,
                        "message" : err.message
                    })
                }
                else {
                    res.status(200).json({
                        "statusCode": 200,
                        "addressCode" : insertId
                    })
                }
            });
        }
    });
});

routes.post('/updateAddress', token.ValidaToken,async(req: Request, res : Response) => {
    const newAddress : Address = req.body.Address;
    // Todo
});


// const configSwagger = new ConfigSwagger();
// routes.use('/api/docs', swaggerUi.serve,
//     swaggerUi.setup(configSwagger.swaggerDocument));

routes.get('/', function (req, res) {
    res.send('Bem vindo ao gerenciador de usuários e endereços');
});

export default routes;