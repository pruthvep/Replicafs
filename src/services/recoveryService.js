const fs = require("fs");
const path = require("path");

const recoverChunk = (fileId,chunkNumber) => {

  const nodeAPath = path.join(
    __dirname,
    `../storage/nodeA/${fileId}-chunk-${chunkNumber}`
  );

  const nodeBPath = path.join(
    __dirname,
    `../storage/nodeB/${fileId}-chunk-${chunkNumber}`
  );

  const nodeAExists =
    fs.existsSync(nodeAPath);

  const nodeBExists =
    fs.existsSync(nodeBPath);

  if (!nodeAExists && nodeBExists) {

    const backupChunk =
      fs.readFileSync(nodeBPath);

    fs.writeFileSync(
      nodeAPath,
      backupChunk
    );

    console.log(
      `Recovered chunk ${chunkNumber} into nodeA`
    );

    return;
  }

  if (!nodeBExists && nodeAExists) {

    const backupChunk =
      fs.readFileSync(nodeAPath);

    fs.writeFileSync(
      nodeBPath,
      backupChunk
    );

    console.log(
      `Recovered chunk ${chunkNumber} into nodeB`
    );

    return;
  }

  console.log(
    "No recovery needed"
  );
};

module.exports = {
  recoverChunk
};