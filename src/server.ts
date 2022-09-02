import "dotenv/config";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import route from "./routes";
import { connectToDatabase } from "./services/database/database_service";

const app: Express = express();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(express.json());

app.use(
  morgan("common", {
    immediate: true,
    stream: accessLogStream,
  })
);

/*
async function initDB() {
  await connectToDatabase();
}

initDB()
  .then(() => console.log("init db"))
  .catch((err) => console.log(err));
*/
app.use("/", route());

app.use((err: any, req: Request, res: Response, next: any) => {
  const statusCode = err.status || 500;
  res.status(statusCode).send("err.message");
});
/*
app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
*/

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`server running on port ${process.env.PORT}`)
    );
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
