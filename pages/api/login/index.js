import nc from "next-connect";
import cors from "cors";
import { compare } from "bcrypt";
import admin from "../../../src/utils/firebase";
import { sign } from "jsonwebtoken";
import {
  validatePassword,
  validateEmail,
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
      validateEmail(req.body.email);
      validatePassword(req.body.password);

      // If validation passed
      let id = "",
        name = "",
        email = "",
        password = "";
      const response = await db.where("email", "==", req.body.email).get();
      response.forEach((doc) => {
        id = doc.id;
        name = doc.data().username;
        email = doc.data().email;
        password = doc.data().password;
      });

      compare(req.body.password, password, async (err, result) => {
        if (!err && result) {
          const claims = { id: id, userName: name };
          const jwt = sign(claims, process.env.JWT_GUID, { expiresIn: "1h" });
          res.status(200).json({
            message: `Hello ${name} , You can now use the token below.`,
            authToken: jwt,
          });
        } else {
          res.statusCode = 400;
          res.statusMessage = "Bad request";
          res.json({
            message: "Login was not successful.",
          });
        }
      });
    } catch (error) {
      res.statusCode = 400;
      res.statusMessage = "Bad request";
      res.json({
        message: error.message,
      });
    }
  });

export default handler;
