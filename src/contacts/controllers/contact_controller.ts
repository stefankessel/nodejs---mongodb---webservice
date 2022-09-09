import { Response, Request, NextFunction } from "express";
import { UserEntity } from "../../auth/models/user_entity";
import { ContactDTO } from "../models/contact_entity";
import {
  addContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from "../models/contact_service";

export const getContactsAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allContacts = await getAllContacts();
    res.json({ data: allContacts });
  } catch (err) {
    next(err);
  }
};

export const getContactDetailsAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req?.params?.id;
    const data = await getContactById(id);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

export const addContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newContact = req.body as ContactDTO;
    const user: UserEntity = req.user;
    await addContact(newContact, user);
    res.status(201).send({ message: "Successfully created a new contact" });
  } catch (err: any) {
    next(err);
  }
};

export const updateContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const user = req.user;
  try {
    const data = await updateContact(req.body, id, user);
    if (data && data.modifiedCount) {
      res.json({ message: `successfull update of id: ${id}` });
    } else {
      res.json({ message: `could not update id: ${id}` });
    }
  } catch (err: any) {
    next(err);
  }
};

export const deleteContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = await deleteContact(id, req.user);
    if (!data?.deletedCount) {
      res.status(404).send(`id ${id} does not exist`);
    } else if (data.deletedCount) {
      res.status(202).json({ data });
    } else if (!data) {
      res.status(400).send(`Failed to remove game with id ${id}`);
    }
  } catch (err: any) {
    next(err);
  }
};
