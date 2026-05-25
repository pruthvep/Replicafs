const {
  splitFileIntoChunks
} = require(
  "../services/chunkService"
);

const uploadFile = async (
  req,
  res
) => {

  try {

    const file = req.file;

    if (!file) {

      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const result =
      await splitFileIntoChunks(file);

    res.status(200).json({
      message:
        "File uploaded successfully",
      fileId: result.fileId,
      totalChunks:
        result.totalChunks
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Internal server error"
    });
  }
};

module.exports = {
  uploadFile
};