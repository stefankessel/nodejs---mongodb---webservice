import { ObjectId } from "mongodb";
import { UserEntity } from "../../auth/models/user_entity";
import { collections } from "../../services/database/database_service";
import { Address, ContactDTO, ContactEntity } from "./contact_entity";

export const getAllContacts = async (): Promise<ContactEntity[]> => {
  console.time("find operation for mongodb from backend");
  const docs = (await collections.crm?.find({}).toArray()) as ContactEntity[];

  console.timeEnd("find operation for mongodb from backend");

  return docs;
};

export const getAllPublicContacts = async () => {
  let docs = [];
  console.time("find operation for mongodb from backend");
  const pipeline = [{ $match: { isPublic: true } }, { $project: { _id: 0 } }];
  const aggCursor = await collections.crm!.aggregate(pipeline);
  console.timeEnd("find operation for mongodb from backend");
  for await (const doc of aggCursor) {
    docs.push(doc);
  }

  return docs;
};

export const getContactById = async (id: string): Promise<ContactEntity> => {
  const query = { _id: new ObjectId(id) };
  const doc = (await collections.crm?.findOne(query)) as ContactEntity;

  return doc;
};

export const addContact = async (
  contact: ContactDTO,
  user: UserEntity
): Promise<ContactEntity | undefined> => {
  const address: Address[] = [];
  address.push({
    street: contact.street ?? "",
    city: contact.city ?? "",
    postal_code: Number(contact.postal_code ?? 0o0),
  });

  const payload = { ...contact };
  delete payload.street;
  delete payload.city;
  delete payload.postal_code;

  const newContact: ContactEntity = {
    ...payload,
    created_at: new Date(),
    isPublic: contact.isPublic === "true" ? true : false,
    users_id: new ObjectId(user._id),
    addresses: address,
  };
  const result = (await collections.crm?.insertOne(newContact)) as
    | ContactEntity
    | undefined;
  return result;
};

export const updateContact = async (
  updateContact: ContactDTO,
  id: string,
  user: UserEntity
) => {
  const address: Address[] = [];
  address.push({
    street: updateContact.street ?? "",
    city: updateContact.city ?? "",
    postal_code: Number(updateContact.postal_code ?? 0o0),
  });

  const payload = { ...updateContact };
  delete payload.street;
  delete payload.city;
  delete payload.postal_code;

  const newContact: ContactEntity = {
    ...payload,
    isPublic: updateContact.isPublic === "true" ? true : false,
    last_updated_at: new Date(),
    users_id: new ObjectId(user._id),
    addresses: address,
  };
  const query = { _id: new ObjectId(id) };
  const result = await collections.crm?.updateOne(query, {
    $set: newContact,
  });
  return result;
};

export const deleteContact = async (id: string, user: UserEntity) => {
  const contact = await getContactById(id);
  if (contact.users_id.toString() === user._id.toString()) {
    const query = { _id: new ObjectId(id) };
    const result = await collections.crm?.deleteOne(query);
    return result;
  } else {
    throw new Error("not authorized to delete contact");
  }
};
