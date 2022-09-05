import { Router } from "express";
import {
  addContactController,
  deleteContactController,
  getContactDetailsAction,
  getContactsAction,
  updateContactController,
} from "./controllers/contact_controller";

const route = Router();

export default function () {
  route.get("/:id", getContactDetailsAction);
  route.put("/:id", updateContactController);
  route.delete("/:id", deleteContactController);
  route.post("/", addContactController);
  route.get("/", getContactsAction);

  return route;
}
