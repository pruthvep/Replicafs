const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const fileQueue = require("../queues/fileQueue");

const CHUNK_SIZE = 1024 * 1024;

const splitFileIntoChunks = async (file) => {

  const fileBuffer = fs.readFileSync(file.path);

  const fileId = uuidv4();

  const totalChunks = Math.ceil(
    fileBuffer.length / CHUNK_SIZE
  );

  console.log(`Splitting file into ${totalChunks} chunks`);

  for (let i = 0; i < totalChunks; i++) {

    await fileQueue.add(
        "process-chunk",
        {
            fileId,
            filePath: file.path,
            chunkNumber: i + 1
        },
        {
            attempts: 3,
            backoff: {  
                type: "exponential",
                delay: 2000
            }
        }

    );

    console.log(`Queued chunk ${i + 1}`);
  }

  return {
    fileId,
    totalChunks
  };
};

module.exports = {
  splitFileIntoChunks
};