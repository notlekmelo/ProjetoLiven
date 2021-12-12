import mysql, { QueryError } from 'mysql2';
import * as dotenv from "dotenv";

dotenv.config();

var dbconnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'projetoliven'
});

dbconnection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

export default dbconnection;