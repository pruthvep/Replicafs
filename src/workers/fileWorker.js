const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const fs = require("fs");
const path = require("path");

const metadataPath = path.join(
  __dirname,
  "../metadata/files.json"
);

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null
});

const CHUNK_SIZE = 1024 * 1024;

const worker = new Worker(

  "file-processing",

  async (job) => {

    const {
      fileId,
      filePath,
      chunkNumber
    } = job.data;

    console.log(
      `Processing chunk ${chunkNumber} for file ${fileId}`
    );
    if (chunkNumber === 2) {
        throw new Error("Simulated worker failure");
        }

    const fileBuffer = fs.readFileSync(filePath);

    const start =
      (chunkNumber - 1) * CHUNK_SIZE;

    const end =
      start + CHUNK_SIZE;

    const chunkBuffer =
      fileBuffer.slice(start, end);

    const chunkFileName =
      `${fileId}-chunk-${chunkNumber}`;

    const nodeAPath = path.join(
      __dirname,
      "../storage/nodeA",
      chunkFileName
    );

    const nodeBPath = path.join(
      __dirname,
      "../storage/nodeB",
      chunkFileName
    );

    fs.writeFileSync(
      nodeAPath,
      chunkBuffer
    );

    fs.writeFileSync(
      nodeBPath,
      chunkBuffer
    );
    

  let metadata = [];
  console.log("entered into the metadata")
  if (fs.existsSync(metadataPath)) {
    const existingData = fs.readFileSync(metadataPath,"utf8");
    metadata = JSON.parse(existingData || "[]");
  }
  metadata.push({ fileId, chunkNumber,nodes: ["nodeA", "nodeB"]});
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(
      `Stored chunk ${chunkNumber} in nodeA and nodeB`
    );
  console.log("completed writing")
  },

  { connection }

);

console.log("Worker started...");