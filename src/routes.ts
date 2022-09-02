import { Router } from "express";

import contactRoute from "./contacts/contacts.routes";

const route = Router();

export default function () {
  route.get("/", (req, res) => {
    res.send("starting page");
  });

  route.use("/contacts", contactRoute());

  return route;
}
