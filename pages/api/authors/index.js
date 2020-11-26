import nc from "next-connect";
import cors from "cors";
import next from "next";

const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");
const DB = require("../../../src/utils/dbSetup.js");

function onError(err, req, res, next) {
  res.status(500).json({ message: err.message });
}

function onNoMatch(req, res) {
  res.status(404).json({ message: "The requested endpoint is not supported." });
}

// async function getDB(req, res) {
//   const dbPath = path.resolve(__dirname, "./database.db");
//   console.log(dbPath);
//   const db = await sqlite.open({
//     filename: dbPath,
//     driver: sqlite3.Database,
//   });

//   return db;
// }

const handler = nc({ onError, onNoMatch })
  .use(cors())

  .get(async (req, res) => {
    const db = await DB.setup();

    try {
      const result = await db.all("SELECT * FROM Author");
      console.log(result);
      res.status(200).json({ result: result });
    } catch (error) {
      console.log(error);
      throw new Error("Problem getting authors");
    }
  })

  .post(async (req, res) => {
    console.log(req);
    try {
      res.status(200).json({ message: "Not implemented" });
    } catch (error) {
      throw new Error("Problem adding authors");
    }
  });

//   .options(async (req, res) => {
//     try {
//       res.status(200).json({ message: "Not implemented" });
//     } catch (error) {
//       throw new Error("Problem getting authors");
//     }
//   });

export default handler;
