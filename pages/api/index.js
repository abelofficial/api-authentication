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
    console.log(authorId);
    try {
      res
        .status(200)
        .json({
          message:
            "Welcome to the api tester. You can start sending requests to the /api/authors or api/books end points.",
        });
    } catch (error) {
      throw new Error(`Problem getting the api landing page. :( )`);
    }
  });

export default handler;
