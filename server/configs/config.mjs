import dotenv from "dotenv";

dotenv.config();

export const DB_URL = process.env.DBCONNECTION_STRING;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
