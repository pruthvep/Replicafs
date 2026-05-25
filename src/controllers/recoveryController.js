const {
  recoverChunk
} = require("../services/recoveryService");

const recover = (req, res) => {

  const {
    fileId,
    chunkNumber
  } = req.params;

  recoverChunk(fileId,chunkNumber);

  res.json({
    message: "Recovery attempted"
  });
};

module.exports = {
  recover
};