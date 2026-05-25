const express = require("express");

const {
  recover
} = require(
  "../controllers/recoveryController"
);

const router = express.Router();

router.get(
  "/:fileId/:chunkNumber",
  recover
);

module.exports = router;