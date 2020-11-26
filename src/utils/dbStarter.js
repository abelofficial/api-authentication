// import { openDb } from "./dbSetup";
const path = require("path");
const DB = require("./dbSetup");

DB.setup()
  .then(async (db) => {
    const authors = await db.all("SELECT * FROM Author");
    const books = await db.all("SELECT * FROM Book");
    console.log(authors);
    console.log(books);
  })
  .catch((error) => {
    console.log(error);
  });
