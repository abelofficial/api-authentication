import nc from "next-connect";
import cors from "cors";
import authenticated from "../../../src/utils/apiHelper/authenticated";
import admin from "../../../src/utils/firebase";

const db = admin.collection("books");

function onError(err, req, res, next) {
  res.status(500).json({ message: err.message });
}

function onNoMatch(req, res) {
  res.status(404).json({ message: "The requested endpoint is not supported." });
}

const handler = nc({ onError, onNoMatch })
  .use(cors())

  .get(async (req, res) => {
    try {
      res.status(200).json({ message: "Not implemented" });
    } catch (error) {
      throw new Error("Problem getting books");
    }
  })

  .post(
    authenticated(async (req, res, userId) => {
      try {
        res.status(200).json({ message: "Not implemented" });
      } catch (error) {
        throw new Error("Problem adding books");
      }
    })
  );

//   .options(async (req, res) => {
//     res.status(200).json({ message: "Not implemented" });
//   });

export default handler;
