import dbconnection from '../../infra/server/dbconnection';
import { User } from './users';
import { OkPacket, RowDataPacket } from "mysql2"

export const validaParamCreate = (user: User, callback: Function) => {
    if (!user.name || user.name == ''){
        callback(null,false,"Parâmetro nome incorreto");
    }
    else if (!user.password || user.password == '') {
        callback(null,false,"Parâmetro senha incorreto");
    }
    else if (!user.nickname || user.nickname == '') {
        callback(null,false,"Parâmetro nickname incorreto");
    }
    else if (!user.login || user.login == '') {
        callback(null,false,"Parâmetro login incorreto");
    }
    else {
        const queryString = "SELECT Login FROM Users WHERE Login = ?";
        dbconnection.query(
            queryString,
            [user.login],
            (err, result) => {
                if (err) {
                    callback(err,false, "Erro ao consultar banco de dados")
                };
    result
                if((<RowDataPacket>result)[0]){
                    callback(null, false, "Login já existente");
                }
                else
                    callback(null,true,"Parâmetros validados com sucesso")
            }
        )
    }

}

export const validaParamLogin = (user : User, callback : Function) => {
    if (!user.login || user.login == ''){
        callback(false,"Parâmetro login incorreto");
    }
    else if (!user.password || user.password == '') {
        callback(false,"Parâmetro senha incorreto");
    }
    else {
        callback(true, "Parâmetros validados com sucesso");
    }
}

export const validaParamUpdate = (user: User, callback: Function) => {
    if (!user.name || user.name == ''){
        callback(null,false,"Parâmetro nome incorreto");
    }
    else if (!user.password || user.password == '') {
        callback(null,false,"Parâmetro senha incorreto");
    }
    else if (!user.nickname || user.nickname == '') {
        callback(null,false,"Parâmetro nickname incorreto");
    }
    else if (!user.login || user.login == '') {
        callback(null,false,"Parâmetro login incorreto");
    }
    else {
        const queryString = "SELECT Login FROM Users WHERE (Login = ?) AND (UserCode <> ?)";
       console.log(user.userCode + "   " + user.login)
        dbconnection.query(
            queryString,
            [user.login, user.userCode],
            (err, result) => {
                if (err) {
                    callback(err,false, "Erro ao consultar banco de dados")
                };
                if((<RowDataPacket>result)[0]){
                    callback(null, false, "Login já existente");
                }
                else
                    callback(null,true,"Parâmetros validados com sucesso")
            }
        )
    }

}