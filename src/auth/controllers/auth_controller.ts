import { Response, Request } from "express";
import { loginService, registerService } from "../services/auth_service";
import { NewUserEntity } from "../models/user_entity";

export const loginAction = async (req: Request, res: Response) => {
  try {
    const data = await loginService(req.body.username, req.body.password);

    res.json({ data });
  } catch (err) {
    console.log(err);
    res.status(401).json("unauthorized");
  }
};

export const registerAction = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const { username, password, email } = req.body;

    const newUser: NewUserEntity = {
      username,
      password,
      email,
      created_at: new Date(),
    };

    const data = await registerService(newUser);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};
