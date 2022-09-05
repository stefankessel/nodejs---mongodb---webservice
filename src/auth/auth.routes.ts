import { Router } from "express";
import { loginAction } from "./controllers/auth_controller";

const route = Router();

export default function () {
  route.post("/login", loginAction);

  return route;
}
