import nc from "next-connect";
import cors from "cors";
import { verify } from "jsonwebtoken";
function onError(err, req, res, next) {
  res.status(500).json({ message: err.message });
}

function onNoMatch(req, res) {
  res.status(404).json({ message: "The requested endpoint is not supported." });
}

const authenticated = (fn) => async (req, res) => {
  verify(
    req.headers.authorization,
    process.env.JWT_GUID,
    async (err, decoded) => {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.statusCode = 401;
      res.statusMessage = "Unauthorized";
      res.json({
        message: "You need to log in to perform admin actions.",
      });
    }
  );
};

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
    authenticated(async (req, res) => {
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
