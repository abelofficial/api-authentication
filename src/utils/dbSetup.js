const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

const openDb = async () => {
  try {
    const db = await sqlite.open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    });
    return db;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

async function setup() {
  // const mgPath = path.resolve(__dirname, "../migrations");
  // console.log("check", mgPath);
  try {
    const db = await openDb();

    const dbMig = await db.migrate({
      migrationsPath: "./src/migrations", //add cutom path to your migrations
      force: "last",
    });
    console.log(dbMig);
    return db;
  } catch (error) {
    console.log(error);
  }
}

exports.openDb = openDb;
exports.setup = setup;
