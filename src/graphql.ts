import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import {
  addContact,
  getAllContacts,
  getContactById,
} from "./contacts/models/contact_service";
import { ContactDTO } from "./contacts/models/contact_entity";
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
    input AddressInput{
      street: String
      city: String
      postal_code: Int
  }
    input ContactInput{
      first_name: String
      last_name: String
      email: String
      created_at: String
      last_updated_at: String
      addresses: [AddressInput]
      isPublic: Boolean
      users_id: ID
      _id: ID
    }


    type Mutation{
      createContact(contact: ContactInput): Contact
    }

    type Query{
        contact(id: String): [Contact]
    }
`);

const rootValue = {
  contact: async ({ id }: ObjectId) => {
    if (id) {
      return Array(getContactById(id.toString()));
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
