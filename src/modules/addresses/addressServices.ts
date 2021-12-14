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