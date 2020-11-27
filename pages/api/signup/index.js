import nc from "next-connect";
import cors from "cors";
import { hash } from "bcrypt";
import admin from "../../../src/utils/firebase";
import { v4 as uuid } from "uuid";

const db = admin.collection("users");

function onError(err, req, res, next) {
  res.status(500).json({ message: err.message });
}

function onNoMatch(req, res) {
  res.status(404).json({ message: "The requested endpoint is not supported." });
}

const handler = nc({ onError, onNoMatch })
  .use(cors())

  .post(async (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.statusCode = 400;
      res.statusMessage = "Bad request";
      if (!req.body.email)
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
      const response = await db.where("email", "==", req.body.email).get();

      if (response.empty) {
        hash(req.body.password, 10, async (err, hash) => {
          await db.doc(uuid()).set({
            username: req.body.name,
            email: req.body.email,
            password: hash,
          });

          res.statusCode = 201;
          res.statusMessage = "Created";
          res.json({
            message: "User is registered.",
            detail: {
              username: req.body.name,
              email: req.body.email,
              password: hash,
            },
          });
        });
      } else {
        res.statusCode = 400;
        res.statusMessage = "Bad request";
        res.json({
          message: "A user with this emai adress is already registered.",
          detail: {
            login: "/api/login",
            users: "/api/users",
          },
        });
      }
    }
  });

export default handler;
