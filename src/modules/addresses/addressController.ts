import dbconnection from '../../infra/server/dbconnection';
import { Address } from './addresses';
import { OkPacket, RowDataPacket } from "mysql2"

export const validaParamCreateAdress = (address : Address, callback : Function) => {
    if(!address.userCode || address.userCode <= 0){
        callback(false,"Parâmetro usuário incorreto");
    }
    else if(!address.country || address.country == ''){
        callback(false,"Parâmetro country incorreto");
    }
    else if(!address.state || address.state == ''){
        callback(false,"Parâmetro state incorreto");
    }
    else if(!address.city || address.city == ''){
        callback(false,"Parâmetro city incorreto");
    }
    else if(!address.street || address.street == ''){
        callback(false,"Parâmetro street incorreto");
    }
    else if(!address.number || address.number <= 0){
        callback(false,"Parâmetro number incorreto");
    }
    else if(!address.zipCode || address.zipCode == ''){
        callback(false,"Parâmetro zipCode incorreto");
    }
    else{
        callback(true,"Parâmetros definidos corretamente");
    }
}