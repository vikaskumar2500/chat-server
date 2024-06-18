import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/hash-password";
import { Users } from "../models/users";
import { Op, Sequelize } from "sequelize";
import { sequelize } from "../utils/db";
import { getToken } from "../utils/jwt-token";

export const postUserSignup = async (req: Request, res: Response) => {
  // getting data
  console.log("body data", req.body);
  const { name, email, password, phone } = req.body;
  const t = await sequelize.transaction();

  try {
    // exist?
    const user = await Users.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
      transaction: t,
    });

    if (user) throw new Error("User already exists!");

    // decrypt password
    const hashedPassword = await hashPassword(password);

    const userData = await Users.create(
      { name, email, phone, password: hashedPassword },
      { transaction: t }
    );

    await t.commit();
    res.status(200).json({ user: userData });
  } catch (e: any) {
    await t.rollback();
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};

export const getUserSignup = (req: Request, res: Response) => {
  res.json({ name: "vikas" });
};

export const postUserLogin = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  try {
    // fetch user
    const user: any = await Users.findOne({
      where: { email },
      attributes: ["id", "password"],
    });
    console.log("user", user);

    if (!user) throw new Error("User not found!");
    console.log(user.password);

    const compare = await comparePassword(password, user.password);
    if (!compare) throw new Error("User not authorized");

    const token = getToken(user.id);

    return res.status(200).json({ token });
  } catch (e: any) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};
