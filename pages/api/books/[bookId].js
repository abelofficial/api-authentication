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
    const { bookId } = req.query;
    try {
      res.status(200).json({ message: "Not implemented" });
    } catch (error) {
      throw new Error(`Problem getting book ${bookId}`);
    }
  })

  .patch(async (req, res) => {
    const { bookId } = req.query;
    try {
      res.status(200).json({ message: "Not implemented" });
    } catch (error) {
      throw new Error(`Problem updating fields in book ${bookId}`);
    }
  })

  .put(async (req, res) => {
    const { bookId } = req.query;
    try {
      res.status(200).json({ message: "Not implemented" });
    } catch (error) {
      throw new Error(`Problem updating book ${bookId}`);
    }
  })

  .delete(async (req, res) => {
    const { bookId } = req.query;
    try {
      res.status(200).json({ message: "Not implemented" });
    } catch (error) {
      throw new Error(`Problem deleting book ${bookId}`);
    }
  });

//   .options(async (req, res) => {
//     try {
//       res.status(200).json({ message: "Not implemented" });
//     } catch (error) {
//       throw new Error("Problem getting book");
//     }
//   });

export default handler;
