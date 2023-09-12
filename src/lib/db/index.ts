import { connect } from "@planetscale/database";
import "dotenv/config";
import { sql } from "drizzle-orm";
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

export const findOrganizationByHandlePreparedSQL = db.query.organizations
  .findFirst({
    where: (o, { eq }) => eq(o.handle, sql.placeholder("handle")),
  })
  .prepare();
