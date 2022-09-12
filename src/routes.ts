import { Router } from "express";

import contactRoute from "./contacts/contacts.routes";
import authRoute from "./auth/auth.routes";
import { loginRequired } from "./auth/services/auth_service";
import graphql from "./graphql";

const route = Router();

export default function () {
  route.get("/", (req, res) => {
    res.send("starting page");
  });

  route.use("/contacts", loginRequired, contactRoute());

  route.use("/auth", authRoute());

  route.use("/graphql", graphql);

  return route;
}
