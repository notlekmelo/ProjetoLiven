import express from "express";
import routes from "../../modules/routes"
import * as dotenv from "dotenv";


const server = express();
dotenv.config();
server.use(express.json());
server.use(routes);

export default server;