import dbconnection from '../../infra/server/dbconnection';
import { Address } from './addresses';
import { OkPacket, RowDataPacket } from "mysql2"

export const validaParamCreateAddress = (address : Address, callback : Function) => {
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

export const validaParamUpdateAddress = (address : Address, callback : Function) => {
    if(!address.addressCode || address.addressCode <= 0){
        callback(null,false,"Parâmetro Código do endereço incorreto");
    }
    else if(!address.userCode || address.userCode <= 0){
        callback(null,false,"Parâmetro usuário incorreto");
    }
    else if(!address.country || address.country == ''){
        callback(null,false,"Parâmetro country incorreto");
    }
    else if(!address.state || address.state == ''){
        callback(null,false,"Parâmetro state incorreto");
    }
    else if(!address.city || address.city == ''){
        callback(null,false,"Parâmetro city incorreto");
    }
    else if(!address.street || address.street == ''){
        callback(null,false,"Parâmetro street incorreto");
    }
    else if(!address.number || address.number <= 0){
        callback(null,false,"Parâmetro number incorreto");
    }
    else if(!address.zipCode || address.zipCode == ''){
        callback(null,false,"Parâmetro zipCode incorreto");
    }
    else{
        const queryString = "SELECT AddressCode FROM Addresses WHERE (AddressCode = ?) AND (UserCode = ?)";
        dbconnection.query(
            queryString,
            [address.addressCode, address.userCode],
            (err, result) => {
                if (err) {
                    callback(err,false, "Erro ao consultar banco de dados")
                };
                if((<RowDataPacket>result)[0]){
                    callback(null,true,"Parâmetros validados com sucesso")
                }
                else
                    callback(null, false, "Usuário não pode alterar este endereço");
            }
        )
    }
}

export const validaParamDeleteAddress = (address : Address, callback : Function) => {
    if(!address.addressCode || address.addressCode <= 0){
        callback(null, false,"Parâmetro Código do endereço incorreto");
    }
    else{
        const queryString = "SELECT AddressCode FROM Addresses WHERE (AddressCode = ?) AND (UserCode = ?)";
        dbconnection.query(
            queryString,
            [address.addressCode, address.userCode],
            (err, result) => {
                if (err) {
                    callback(err,false, "Erro ao consultar banco de dados")
                };
                if((<RowDataPacket>result)[0]){
                    callback(null,true,"Parâmetros validados com sucesso")
                }
                else
                    callback(null, false, "Usuário não pode deletar este endereço");
            }
        )
    }
}

export const MontaParamGetAddress = (address : Address, userCode : number, callback : Function) => {
    var paramsQuery : String = 'WHERE UserCode = ' + userCode;
    if(address.addressCode){
        paramsQuery =  paramsQuery + ' AND AddressCode = ' + address.addressCode; 
    }
    if(address.country){
        paramsQuery =  paramsQuery + ' AND Country = "' + address.country + '"';
    }
    if(address.state){
        paramsQuery =  paramsQuery + ' AND State = "' + address.state + '"';
    }
    if(address.city){
        paramsQuery =  paramsQuery + ' AND City = "' + address.city + '"';
    }
    if(address.district){
        paramsQuery =  paramsQuery + ' AND District = "' + address.district + '"';
    }
    if(address.street){
        paramsQuery =  paramsQuery + ' AND Strret = "' + address.street + '"';
    }
    if(address.number){
        paramsQuery =  paramsQuery + ' AND Number = ' + address.number;
    }
    if(address.zipCode){
        paramsQuery =  paramsQuery + ' AND ZipCode = "' + address.zipCode + '"';
    }
    if(address.additionalInformation){
        paramsQuery =  paramsQuery + ' AND AdditionalInformation = "' + address.additionalInformation + '"';
    }
    callback(paramsQuery);
}