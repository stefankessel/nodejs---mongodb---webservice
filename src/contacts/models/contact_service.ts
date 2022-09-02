import { collections } from "../../services/database/database_service";
import { ContactEntity } from "./contact_entity";

export const getAllContacts = async (): Promise<ContactEntity[]> => {
  console.time("find operation for mongodb from backend");
  const docs = (await collections.crm!.find({}).toArray()) as ContactEntity[];
  console.timeEnd("find operation for mongodb from backend");
  return docs;
};

export const getContactById = async (
  id: Pick<ContactEntity, "id">
): Promise<ContactEntity> => {
  const doc = (await collections.crm!.findOne({ id })) as ContactEntity;

  return doc;
};
