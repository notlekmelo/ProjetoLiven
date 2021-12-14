import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode'
import { Request, Response } from "express";

export interface MyToken {
    userCode: number;
}

export function ValidaToken(req: Request, res: Response,next: Function) {
    const token = <string>req.headers['x-access-token'];
    var erro : string;
    erro = "";
    if (!token) {
        return res.status(401).json({
            "auth": false,
            "message": 'Token não inserido'
        });
    }
    try {
        jwt.verify(token, "APILiven", function (err) {
            if (err) {
                erro = err.message;
                return res.status(500).json({
                    "auth": false,
                    "message": 'Falha na Autenticação do token.'
                });
            }
            else {
                const id = jwt_decode<MyToken>(token)
                if (req.body.User){
                    return req.body.User.userCode = id.userCode;
                }
                else {
                    return req.body.Address.userCode = id.userCode;
                }
            }
        });
        if (erro == ""){
            next(); 
        }
    }catch(E) {
        if (E instanceof Error) {
            E.message
        }
    }

}