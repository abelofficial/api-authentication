const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function openDb() {
  return sqlite.open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
}

async function setup() {
  const db = await openDb();
  await db.migrate({
    migrationsPath: "./src/migrations", //add cutom path to your migrations
    force: "last",
  });

  const authors = await db.all("SELECT * FROM Author");
  const books = await db.all("SELECT * FROM Book");
  console.log(authors);
  console.log(books);
}

setup();
