import { MongoClient, Collection, Db } from "mongodb";

export let collections: { crm?: Collection } = {};

export const connectToDatabase = async () => {
  const client: MongoClient = new MongoClient(
    process.env.DB_CONN_STRING!.toString()
  );

  const mongoClient = await client.connect();

  const db: Db = client.db(process.env.DB_NAME);

  const crmCollection: Collection = db.collection(
    process.env.COLLECTION_NAME!.toString()
  );

  collections.crm = crmCollection;

  console.log(
    `Successfully connected to database ${db.databaseName} and collection ${crmCollection.collectionName}`
  );
};
