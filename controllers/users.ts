import { Request, Response } from "express";
import { hashPassword } from "../utils/hash-password";
import { Users } from "../models/users";
import { Op, Sequelize } from "sequelize";
import { sequelize } from "../utils/db";

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
