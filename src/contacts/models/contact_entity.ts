import { ObjectId } from "mongodb";
import type { WithId, Document } from "mongodb";

export interface ContactEntity extends WithId<Document> {
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at?: Date;
  updated_by?: ObjectId;
  id?: ObjectId;
}

export interface UpdateContactEntity {
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at?: Date;
  updated_by?: ObjectId;
}
