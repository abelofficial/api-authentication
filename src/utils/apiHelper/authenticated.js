import { verify } from "jsonwebtoken";

const authenticated = (fn) => async (req, res) => {
  verify(
    req.headers.authorization,
    process.env.JWT_GUID,
    async (err, decoded) => {
      if (!err && decoded) {
        console.log(decoded);
        return await fn(req, res, decoded.id);
      }
      res.statusCode = 401;
      res.statusMessage = "Unauthorized";
      res.json({
        message: "You need to log in to perform admin actions.",
      });
    }
  );
};

export default authenticated;
