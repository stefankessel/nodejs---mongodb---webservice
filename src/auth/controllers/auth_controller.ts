import { Response, Request } from "express";
import { createHash } from "crypto";

export const loginAction = async (req: Request, res: Response, next: any) => {
  try {
    res.send("loginAction");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
