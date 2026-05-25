const express = require("express");

const uploadRoutes = require("./routes/uploadRoutes");

const recoverRoutes = require("./routes/recoveryRoutes");


const app = express();

app.use("/upload", uploadRoutes);
app.use("/recover", recoverRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});