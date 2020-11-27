import nc from "next-connect";
import cors from "cors";
import { compare } from "bcrypt";
import admin from "../../../src/utils/firebase";
import { sign } from "jsonwebtoken";

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
    const jsonReq = await JSON.parse(req.body.data);

    if (!jsonReq.email || !jsonReq.password) {
      res.statusCode = 400;
      res.statusMessage = "Bad reqequest";
      if (!jsonReq.email)
        res.json({
          message: "Invalid fields detected.",
          detail: "email is a required field",
        });
      else if (!jsonReq.password)
        res.json({
          message: "Invalid fields detected.",
          detail: "password is a required field",
        });
    } else {
      const response = await db.where("email", "==", jsonReq.email).get();
      if (response.empty) {
        res.statusCode = 400;
        res.statusMessage = "Bad request";
        res.json({
          message: "Login was not successful.",
        });
      } else {
        let id = "",
          name = "",
          email = "",
          password = "";

        response.forEach((doc) => {
          id = doc.id;
          name = doc.data().username;
          email = doc.data().email;
          password = doc.data().password;
        });

        compare(jsonReq.password, password, async (err, result) => {
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

          // console.log(("Response: ", resp));
        });
      }
    }
  });

export default handler;
