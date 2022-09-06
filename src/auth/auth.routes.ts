import { Router } from "express";
import { loginAction, registerAction } from "./controllers/auth_controller";

const route = Router();

export default function () {
  route.post("/login", loginAction);
  route.post("/register", registerAction);

  return route;
}
