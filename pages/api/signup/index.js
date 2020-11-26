import nc from "next-connect";
import cors from "cors";
import { hash } from "bcrypt";
import admin from "../../../src/utils/firebase";
import { v4 as uuid } from "uuid";

function onError(err, req, res, next) {
  res.status(500).json({ message: err.message });
}

function onNoMatch(req, res) {
  res.status(404).json({ message: "The requested endpoint is not supported." });
}

const handler = nc({ onError, onNoMatch })
  .use(cors())

  .post(async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.statusCode = 400;
      res.statusMessage = "Bad request";
      if (!req.body.name)
        res.json({
          message: "Unable to register user",
          detail: "name is a required field.",
        });
      else if (!req.body.email)
        res.json({
          message: "Unable to register user",
          detail: "email is a required field",
        });
      else if (!req.body.password)
        res.json({
          message: "Unable to register user",
          detail: "password is a required field",
        });
    } else {
      hash(req.body.password, 10, async (err, hash) => {
        const db = admin.ref("users").child(uuid());
        db.set({
          username: req.body.name,
          email: req.body.email,
          password: hash,
        });
        // console.log(("Response: ", resp));
        res.status(200).json({
          message: "User is registered.",
          detail: {
            username: req.body.name,
            email: req.body.email,
            password: hash,
          },
        });
      });
    }
  });

export default handler;
