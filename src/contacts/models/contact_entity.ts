import { ObjectId } from "mongodb";
import type { WithId, Document } from "mongodb";

export interface ContactEntity extends WithId<Document> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  created_at: Date;
  id?: ObjectId;
}
