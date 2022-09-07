import { ObjectId } from "mongodb";
import type { WithId, Document } from "mongodb";
import { UserEntity } from "../../auth/models/user_entity";

export interface ContactEntity extends WithId<Document> {
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  last_updated_at?: Date;
  addresses: Address[];
  isPublic: boolean;
  users_id: Object;
  id?: ObjectId;
}
/*
export interface UpdateContactEntity {
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  updated_by: ObjectId;
  id?: ObjectId;
}
*/

export interface Address {
  street: string;
  city: string;
  postal_code: number;
}

export interface ContactDTO extends WithId<Document> {
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  last_updated_at?: Date;
  updated_by?: ObjectId;
  street?: string;
  city?: string;
  postal_code?: number;
  isPublic: string;
  users_id: UserEntity["_id"];
  id?: ObjectId;
}
/*
export interface UpdateContactDTO {
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  street: string;
  city: string;
  postal_code: number;
  isPublic: boolean;
  users_id: UserEntity["_id"];
  id?: ObjectId;
}
*/
