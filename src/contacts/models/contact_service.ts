import { ObjectId } from "mongodb";
import { collections } from "../../services/database/database_service";
import { ContactEntity, UpdateContactEntity } from "./contact_entity";

export const getAllContacts = async (): Promise<ContactEntity[]> => {
  console.time("find operation for mongodb from backend");
  const docs = (await collections.crm?.find({}).toArray()) as ContactEntity[];
  console.timeEnd("find operation for mongodb from backend");
  return docs;
};

export const getContactById = async (id: string): Promise<ContactEntity> => {
  const query = { _id: new ObjectId(id) };
  const doc = (await collections.crm?.findOne(query)) as ContactEntity;

  return doc;
};

export const addContact = async (contact: ContactEntity) => {
  const result = await collections.crm?.insertOne(contact);
  return result;
};

export const updateContact = async (
  updateContact: UpdateContactEntity,
  id: string
) => {
  const query = { _id: new ObjectId(id) };
  const result = await collections.crm?.updateOne(query, {
    $set: updateContact,
  });
  return result;
};

export const deleteContact = async (id: string) => {
  const query = { _id: new ObjectId(id) };
  const result = await collections.crm?.deleteOne(query);
  return result;
};
