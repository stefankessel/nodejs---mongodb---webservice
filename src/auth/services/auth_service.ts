import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import { Response, Request, NextFunction } from "express";

import { collections } from "../../services/database/database_service";
import { NewUserEntity, UserEntity } from "../models/user_entity";

export const loginService = async (
  username: Pick<UserEntity, "username">,
  password: string
) => {
  const hashedPassword = createHash("sha256").update(password).digest("hex");
  const user = (await collections.users!.findOne({
    username,
    password: hashedPassword,
  })) as UserEntity;
  if (user) {
    const payload = { ...user };
    payload.password = undefined;
    const token = jwt.sign(payload, process.env.JWT_SECRET!.toString());
    return token;
  } else {
    throw Error();
  }
};

export const registerService = async (newUser: NewUserEntity) => {
  const hashedPassword = createHash("sha256")
    .update(newUser.password)
    .digest("hex");
  const user = { ...newUser, password: hashedPassword };
  console.log(user);
  const res = await collections.users?.insertOne(user);

  return res;
};

export const loginRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json("unauthorized ");
  }
};
