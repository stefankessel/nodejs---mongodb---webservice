import { MongoClient, Collection, Db } from "mongodb";

export let collections: { crm?: Collection; users?: Collection } = {};

export const connectToDatabase = async () => {
  const client: MongoClient = new MongoClient(
    process.env.DB_CONN_STRING!.toString()
  );

  const mongoClient = await client.connect();

  const db: Db = client.db(process.env.DB_NAME);

  const crmCollection: Collection = db.collection("contacts");
  const userCollection: Collection = db.collection("users");

  collections.crm = crmCollection;
  collections.users = userCollection;

  console.log(
    `Successfully connected to database ${db.databaseName} and collections ${crmCollection.collectionName} and ${userCollection.collectionName}`
  );
};
