import { verify } from "jsonwebtoken";

const authenticated = (fn) => async (req, res) => {
  verify(
    req.headers.authorization,
    process.env.JWT_GUID,
    async (err, decoded) => {
      if (!err && decoded) {
        return await fn(req, res, decoded.id);
      } else if (err) {
        if (err.message === "jwt expired") {
          res.statusCode = 401;
          res.statusMessage = "Expired token";
          res.json({
            message: "You need to log in to perform admin actions.",
          });
        } else if (err.message === "invalid token") {
          res.statusCode = 400;
          res.statusMessage = "Bad Request";
          res.json({
            message: "The provided token is not valid or has been compromised.",
          });
        } else {
          res.statusCode = 401;
          res.statusMessage = "Unauthorized";
          res.json({
            message: "You need to log in to perform admin actions.",
          });
        }
      }
    }
  );
};

export default authenticated;
