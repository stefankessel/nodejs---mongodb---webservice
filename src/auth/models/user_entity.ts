import { ObjectId } from "mongodb";
import type { WithId, Document } from "mongodb";

export interface UserEntity extends WithId<Document> {
  username: string;
  email: string;
  password: string | undefined;
  created_at: Date;
  id?: ObjectId;
}

export interface NewUserEntity {
  username: string;
  email: string;
  password: string;
  created_at: Date;
  id?: ObjectId;
}

/*
export class UserEntity implements WithId<Document> {
  constructor(
    public username: string,
    public email: string,
    public hashedPassword: string,
    public created_at: Date,
    public _id: ObjectId
  ) {}
}
*/
