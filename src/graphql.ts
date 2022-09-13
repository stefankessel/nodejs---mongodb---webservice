import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import {
  getAllContacts,
  getContactById,
} from "./contacts/models/contact_service";
import { ObjectId } from "mongodb";

const schema = buildSchema(`
    type Contact{
        first_name: String
        last_name: String
        email: String
        created_at: String
        last_updated_at: String
        addresses: [Address]
        isPublic: Boolean
        users_id: ID
        _id: ID
    }
    type Address{
        street: String
        city: String
        postal_code: Int
    }

    type Query{
        contact(id: String): [Contact]
    }
`);

const rootValue = {
  contact: async ({ id }: any) => {
    if (id) {
      return Array(getContactById(id));
    } else {
      return getAllContacts();
    }
  },
};

export default graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
});
