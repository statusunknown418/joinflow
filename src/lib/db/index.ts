import { connect } from "@planetscale/database";
import "dotenv/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { computers } from "./schema/computers";

const schema = {
  computers,
};

// create the connection
const connection = connect({
  url: process.env.DATABASE_URL!,
});

export const db = drizzle(connection, {
  schema,
});
