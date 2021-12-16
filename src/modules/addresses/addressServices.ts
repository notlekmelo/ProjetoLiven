import dbconnection from '../../infra/server/dbconnection';
import { Address } from './addresses';
import { OkPacket, RowDataPacket } from "mysql2";

export const createAddress = (address: Address, callback: Function) => {
    const queryString = "INSERT INTO `Addresses`(`UserCode`, `Country`, `State`, `City`, `District`," +
                         " `Street`, `Number`, `ZipCode`,`AdditionalInformation`, `CreatedAt`) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?,Now())"

    dbconnection.query(
        queryString,
        [address.userCode, address.country, address.state, address.city, address.district, address.street, address.number,
        address.zipCode, address.additionalInformation],
        (err, result) => {
            if (err) {
                callback(err)
            };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
}

export const updateAddress = (address: Address, callback: Function) => {
    const queryString = "UPDATE `Addresses` SET `Country`= ?,`State`= ?,`City`= ? ,`District`=?, " +
                         "`Street`= ?,`Number`= ?,`ZipCode`= ?,`AdditionalInformation`=?, `ModifiedAt`= Now()" +
                         "WHERE `AddressCode` = ?";

    dbconnection.query(
        queryString,
        [address.country, address.state, address.city, address.district, address.street, address.number,
        address.zipCode, address.additionalInformation, address.addressCode],
        (err, result) => {
            if (err) {
                callback(err)
            };

            callback(null, true);
        }
    )
}

export const deleteAddress = (address: Address, callback: Function) => {
    const queryString = "Delete FROM `Addresses` WHERE `AddressCode` = ?";

    dbconnection.query(
        queryString,
        [address.addressCode],
        (err, result) => {
            if (err) {
                callback(err)
            };

            callback(null, true);
        }
    )
}

export const getAddresses = (paramsQuery : string, callback: Function) => {
    const queryString = "SELECT * FROM `Addresses` ";

    dbconnection.query(
        queryString + paramsQuery,
        [],
        (err, result) => {
            if (err) {
                callback(err)
            }
            else {
            const rows = <RowDataPacket[]>result;
            var resultAddresses: Address[] = []
            rows.forEach(row => {
                if (row.AddressCode) {
                    const address: Address = {
                        addressCode: row.AddressCode,
                        userCode: row.Userode,
                        country: row.Country,
                        state: row.State,
                        city: row.City,
                        district: row.District,
                        street: row.Street,
                        number: row.Number,
                        zipCode: row.ZipCode,
                        additionalInformation: row.AdditionalInformation,
                        createdAt: row.CriacaoEndereco,
                        modifiedAt: row.ModificacaoEndereco
                    }
                    resultAddresses.push(address);
                }
            });
            callback(null, resultAddresses);
        }
        }
    )
}