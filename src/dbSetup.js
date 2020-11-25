const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

async function openDb() {
  const dbPath = path.resolve(__dirname, "../database.db");
  return sqlite.open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

async function setup() {
  const mgPath = path.resolve(__dirname, "./migrations");
  const db = await openDb();
  await db.migrate({
    migrationsPath: mgPath, //add cutom path to your migrations
    force: "last",
  });

  const authors = await db.all("SELECT * FROM Author");
  const books = await db.all("SELECT * FROM Book");
  console.log(authors);
  console.log(books);
}

setup();
