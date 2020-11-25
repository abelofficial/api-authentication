import nc from "next-connect";
import cors from "cors";

function onError(err, req, res, next) {
  res.status(500).json({ message: err.message });
}

function onNoMatch(req, res) {
  res.status(404).json({ message: "The requested endpoint is not supported." });
}

const handler = nc({ onError, onNoMatch })
  .use(cors())

  .get(async (req, res) => {
    const { bookId } = req.query;
    try {
      res.status(200).json({{ message: `You can't get details about the book ${bookId} at the moment` });
    } catch (error) {
      throw new Error(`Problem getting book ${bookId}`);
    }
  })

  .patch(async (req, res) => {
    const { bookId } = req.query;
    try {
      res.status(200).json({ message: `You can't update details about the author ${bookId} at the moment` });
    } catch (error) {
      throw new Error(`Problem updating fields in book ${bookId}`);
    }
  })

  .put(async (req, res) => {
    const { bookId } = req.query;
    try {
      res.status(200).json({ message: `You can't  update  the author ${bookId} at the moment` });
    } catch (error) {
      throw new Error(`Problem updating book ${bookId}`);
    }
  })

  .delete(async (req, res) => {
    const { bookId } = req.query;
    try {
      res.status(200).json({ message: `You can't delete the book ${bookId} at the moment` });
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
