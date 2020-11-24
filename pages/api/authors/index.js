import nc from "next-connect";
import cors from "cors";

function onError(err, req, res, next) {
  res.status(500).json({ message: err.message });
}

function onNoMatch(req, res) {
  res.status(405).json({ message: "Method not allowed." });
}

const handler = nc({ onError, onNoMatch })
  .use(cors())

  .get(async (req, res) => {
    try {
      res.status(200).json({ message: "Not implemented" });
    } catch (error) {
      throw new Error("Problem getting authors");
    }
  })

  .post(async (req, res) => {
    try {
      res.status(200).json({ message: "Not implemented" });
    } catch (error) {
      throw new Error("Problem adding authors");
    }
  });

//   .options(async (req, res) => {
//     try {
//       res.status(200).json({ message: "Not implemented" });
//     } catch (error) {
//       throw new Error("Problem getting authors");
//     }
//   });

export default handler;
