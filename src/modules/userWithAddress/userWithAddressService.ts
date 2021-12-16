import dbconnection from '../../infra/server/dbconnection';
import { User } from '../users/users';
import { Address } from '../addresses/addresses';
import { UserWithAddresses } from './userWithAddress';
import { RowDataPacket } from "mysql2";
import { login } from '../users/userServices';

export const listAllInfo = (user: User, callback: Function) => {
    const queryString = "SELECT Users.UserCode, Users.Name, Users.Login, Users.Nickname, Users.Email, " +
        "Users.PhoneNumber, Users.Job, Users.CreatedAt , Users.ModifiedAt, " +
        "Addresses.AddressCode, Addresses.Country, Addresses.State, Addresses.City, " +
        "Addresses.District, Addresses.Street , Addresses.Number, Addresses.ZipCode, " +
        "Addresses.AdditionalInformation, Addresses.CreatedAt AS CriacaoEndereco, Addresses.ModifiedAt AS ModificacaoEndereco" +
        " FROM `Users` " +
        "INNER JOIN `Addresses` ON Users.UserCode = Addresses.UserCode " +
        "WHERE Users.UserCode = ?";

    dbconnection.query(
        queryString,
        [user.userCode],
        (err, result) => {
            if (err) {
                callback(err)
            };

            const rows = <RowDataPacket[]>result;
            const newUser: User = {
                userCode: rows[0].UserCode,
                name: rows[0].Name,
                login: rows[0].Login,
                nickname: rows[0].Nickname,
                email: rows[0].Email,
                phoneNumber: rows[0].PhoneNumber,
                job: rows[0].Job,
                createdAt: rows[0].CreatedAt,
                modifiedAt: rows[0].ModifiedAt,
                password: '***'
            };
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
            var userAddress: UserWithAddresses = {
                user: newUser,
                addresses: resultAddresses
            };
            callback(null, userAddress);
        }
    )
}