import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, +process.env.BCRYPT_SALT!);

export const comparePassword = async (password: string, hashPassword: string) =>
  await bcrypt.compare(password, hashPassword);
