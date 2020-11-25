import nc from "next-connect";
import cors from "cors";

function onError(err, req, res, next) {
  res.status(500).json({ message: err.message });
}

function onNoMatch(req, res) {
  res.status(404).json({ message: "The requested endpoint is not supported." });
}

const handler = nc({ onError, onNoMatch }).use(cors());

// .options(async (req, res) => {
//   try {
//     res.status(200).json({ message: "Not implemented" });
//   } catch (error) {
//     throw new Error("Problem getting author");
//   }
// });

export default handler;
