import nc from "next-connect";
import cors from "cors";
import { hash } from "bcrypt";
import admin from "../../../src/utils/firebase";
import { v4 as uuid } from "uuid";
import {
  validatePassword,
  validateEmail,
  validateString,
} from "../../../src/utils/apiHelper/validateUserInput";

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
    try {
      validateString(req.body.name, "Username");
      validateEmail(req.body.email);
      validatePassword(req.body.password);

      const response = await db.where("email", "==", req.body.email).get();

      if (response.empty) {
        hash(req.body.password, 10, async (err, hash) => {
          const userId = uuid();
          await db.doc(userId).set({
            username: req.body.name,
            email: req.body.email,
            password: hash,
          });

          res.statusCode = 201;
          res.statusMessage = "Created";
          res.json({
            message: "User is registered.",
            detail: {
              userId: userId,
              username: req.body.name,
              email: req.body.email,
            },
          });
        });
      } else {
        res.statusCode = 400;
        res.statusMessage = "Bad request";
        res.json({
          message: "A user with this emai address is already registered.",
          links: {
            login: "/api/login",
            users: "/api/users",
          },
        });
      }
    } catch (error) {
      res.statusCode = 400;
      res.statusMessage = "Bad request";
      res.json({
        message: error.message,
      });
    }
  });

export default handler;
