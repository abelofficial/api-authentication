import nc from "next-connect";
import cors from "cors";

import admin from "../../../src/utils/firebase";
import { sign, verify } from "jsonwebtoken";

const db = admin.collection("users");

function onError(err, req, res, next) {
  res.status(500).json({ message: err.message });
}

function onNoMatch(req, res) {
  res.status(404).json({ message: "The requested endpoint is not supported." });
}

const handler = nc({ onError, onNoMatch })
  .use(cors())

  .get(async (req, res) => {
    verify(req.query.token, process.env.JWT_GUID, async (err, decoded) => {
      if (!err && decoded) {
        const response = await db.get(decoded.id);
        if (!response.empty) {
          const claims = { id: decoded.id, userName: decoded.userName };
          const accessToken = sign(claims, process.env.JWT_GUID, {
            expiresIn: "1m",
          });
          res.status(200).json({
            authToken: accessToken,
          });
        } else {
          res.statusCode = 403;
          res.statusMessage = "Forbidden";
          res.json({
            message: "The refresh token is not a valid token.",
          });
        }
      } else {
        res.statusCode = 403;
        res.statusMessage = "Forbidden";
        res.json({
          message: "The refresh token is not a valid token.",
        });
      }
    });
  });

export default handler;
