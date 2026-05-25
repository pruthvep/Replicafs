const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null
});

const fileQueue = new Queue("file-processing", {
  connection
});

module.exports = fileQueue;