import { config } from "dotenv";

config();

export const PORT = process.env.PORT;
export const DB_ADDRESS = process.env.DB_ADDRESS as string;
