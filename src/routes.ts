import { Router } from "express";

import contactRoute from "./contacts/contacts.routes";
import authRoute from "./auth/auth.routes";

const route = Router();

export default function () {
  route.get("/", (req, res) => {
    res.send("starting page");
  });

  route.use("/contacts", contactRoute());

  route.use("/auth", authRoute());

  return route;
}
