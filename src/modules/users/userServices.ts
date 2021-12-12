import dbconnection from '../../infra/server/dbconnection';
import { User } from './users';
import { OkPacket, RowDataPacket } from "mysql2"

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