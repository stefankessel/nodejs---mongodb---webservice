import { Response, Request } from "express";
import { getAllContacts } from "../models/contact_service";

export const listContactsAction = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const allContacts = await getAllContacts();
    res.json({ data: allContacts });
  } catch (err) {
    next(err);
  }
};
