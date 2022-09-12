import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { getAllContacts } from "./contacts/models/contact_service";

const schema = buildSchema(`
    type Contact{
        first_name: String
        last_name: String
        email: String
        created_at: String
        last_updated_at: String
        addresses: [Address]
        isPublic: Boolean
        users_id: Int
        id: Int!
    }
    type Address{
        street: String
        city: String
        postal_code: Int
    }

    type Query{
        contact: [Contact]
    }
`);

const rootValue = {
  contact: () => getAllContacts(),
};

export default graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
});
