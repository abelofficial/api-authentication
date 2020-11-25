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
    const { authorId } = req.query;

    try {
      res.status(200).json({
        message: `You can't get details about the author ${authorId} at the moment`,
      });
    } catch (error) {
      throw new Error(`Problem getting author ${authorId}`);
    }
  })

  .patch(async (req, res) => {
    const { authorId } = req.query;
    try {
      res.status(200).json({
        message: `You can't update details about the author ${authorId} at the moment`,
      });
    } catch (error) {
      throw new Error(`Problem updating fields in author ${authorId}`);
    }
  })

  .put(async (req, res) => {
    const { authorId } = req.query;
    try {
      res.status(200).json({
        message: `You can't  update  the author ${authorId} at the moment`,
      });
    } catch (error) {
      throw new Error(`Problem updating author ${authorId}`);
    }
  })

  .delete(async (req, res) => {
    const { authorId } = req.query;
    try {
      res.status(200).json({
        message: `You can't delete the author ${authorId} at the moment`,
      });
    } catch (error) {
      throw new Error(`Problem deleting author ${authorId}`);
    }
  });

// .options(async (req, res) => {
//   try {
//     res.status(200).json({ message: "Not implemented" });
//   } catch (error) {
//     throw new Error("Problem getting author");
//   }
// });

export default handler;
