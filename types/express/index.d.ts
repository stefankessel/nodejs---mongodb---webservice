import { UserEnity } from "../../src/auth/models/user_entity";

declare global {
  namespace Express {
    interface Request {
      user: UserEntity | undefined;
    }
  }
}
