import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET!);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!);
