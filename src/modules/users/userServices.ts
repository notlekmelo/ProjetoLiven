import dbconnection from '../../infra/server/dbconnection';
import { User } from './users';
import { OkPacket, RowDataPacket } from "mysql2";
import jwt from 'jsonwebtoken';

export const createUser = (user: User, callback: Function) => {
    const queryString = "INSERT INTO `Users`(`Name`, `Login`, `Password`, `Nickname`, `Email`, `PhoneNumber`, `Job`, `CreatedAt`) VALUES (?, ?, ?, ?, ?, ?, ? , Now())"
    
    dbconnection.query(
        queryString,
        [user.name, user.login, user.password, user.nickname, user.email, user.phoneNumber, user.job],
        (err, result) => {
            if (err) {
                callback(err)
            };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    )
}

export const login = (user : User, callback: Function) => {
    const queryString = "SELECT Password,UserCode FROM Users WHERE Login = ?"

    dbconnection.query(
        queryString,
        [user.login],
        (err, result) => {
            if(err){
                callback(err)
            };
            const resultado = (<RowDataPacket>result)[0];
            if(resultado && resultado.Password == user.password){
                const id = resultado.UserCode;
                const token = jwt.sign({userCode: id }, "APILiven", {
                    expiresIn: 900 // Token com duração de 15 min
                  });
                callback(null, token);
            }
            else{
                callback(null, '');
            }
        }
    )
}

export const updateUser = (user: User, callback: Function) => {
    const queryString = "UPDATE `Users` SET `Name` = ?, `Login` = ?, `Password` = ?, `Nickname` = ?, `Email` = ?, `PhoneNumber` = ?, `Job` = ?, `ModifiedAt` = Now() WHERE UserCode = ?"
    
    dbconnection.query(
        queryString,
        [user.name, user.login, user.password, user.nickname, user.email, user.phoneNumber, user.job, user.userCode],
        (err, result) => {
            if (err) {
                callback(err)
            };

            callback(null, true);
        }
    )
}

export const deleteUser = (user: User, callback: Function) => {
    const queryString = "DELETE FROM `Users` WHERE UserCode = ?"
    
    dbconnection.query(
        queryString,
        [user.userCode],
        (err, result) => {
            if (err) {
                callback(err)
            };

            callback(null, true);
        }
    )
}