import { Sequelize } from "sequelize";

const env = process.env as any;

const db = env.DATABASE_NAME;
const username = env.DATABASE_USER;
const password = env.DATABASE_PASSWORD;
const port = env.DATABASE_PORT;
const host = env.DATABASE_HOST;

const sslMode = env.NODE_ENV === "development" ? "" : "?sslmode=verify-full"
const DATABASE_URL=`postgresql://${username}:${password}@${host}:${port}/${db}${sslMode}`
export const sequelize = new Sequelize(DATABASE_URL);
sequelize.authenticate();
export const database = sequelize
