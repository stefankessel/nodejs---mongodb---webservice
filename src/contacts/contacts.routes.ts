import { Router } from "express";
import { listContactsAction } from "./controllers/contact_controller";

const route = Router();

export default function () {
  route.get("/", listContactsAction);

  return route;
}
