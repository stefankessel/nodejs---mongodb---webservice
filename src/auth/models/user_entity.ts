import { ObjectId } from "mongodb";
import type { WithId, Document } from "mongodb";

export interface IUserEntity extends WithId<Document> {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  created_at: Date;
  isManager: boolean;
  id?: ObjectId;
}

export class UserEntity implements WithId<Document> {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public hashedPassword: string,
    public created_at: Date,
    public isManager: boolean = false,
    public _id: ObjectId
  ) {}
}
