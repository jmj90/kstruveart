const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");
let DATABASE_URL;
process.env.NODE_ENV === "development"
  ? (DATABASE_URL = `postgres://localhost:5432/${databaseName}`)
  : (DATABASE_URL = `${process.env.DATABASE_URL}?sslmode=require`);

const db = new Sequelize(DATABASE_URL, {
  logging: false,
  dialect: "postgres",
  dialectOptions: {
    ssl: process.env.DATABASE_URL ? true : false,
  },
});
module.exports = db;

if (process.env.NODE_ENV === "test") {
  after("close database connection", () => db.close());
}
