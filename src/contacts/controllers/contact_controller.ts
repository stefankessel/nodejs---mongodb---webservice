import { Response, Request } from "express";
import { ContactEntity, UpdateContactEntity } from "../models/contact_entity";
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
  next: any
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
  next: any
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
  next: any
) => {
  try {
    const newContact = req.body as ContactEntity;
    const data = await addContact(newContact);
    res.status(201).send({ message: "Successfully created a new contact" });
  } catch (err: any) {
    next(err);
  }
};

export const updateContactController = async (
  req: Request,
  res: Response,
  next: any
) => {
  const id = req.params.id;
  const updatedContact: UpdateContactEntity = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    updated_at: new Date(),
    created_at: req.body.created_at,
  };

  try {
    const data = await updateContact(updatedContact, id);
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
  next: any
) => {
  try {
    const id = req.params.id;
    const data = await deleteContact(id);
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
