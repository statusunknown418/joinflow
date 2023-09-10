import { connect } from "@planetscale/database";
import "dotenv/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as users from "./schema/auth";
import { computers } from "./schema/computers";
import * as organizations from "./schema/organizations";

const schema = {
  computers,
  ...organizations,
  ...users,
};

// create the connection
const connection = connect({
  url: process.env.DATABASE_URL!,
});

export const db = drizzle(connection, {
  schema,
});
