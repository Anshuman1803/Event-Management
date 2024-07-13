const express = require("express");
const cors = require("cors");
const appServer = express();
const dotENV = require("dotenv");
const { mongooseConnection } = require("./config/mongooseConnection");
const { authRoute } = require("./routes/auth.routes");

dotENV.config();
appServer.use(express.json());
appServer.use(cors({ origin: "*",}));

appServer.use("/api/eventmanagement/v1/auth", authRoute)


appServer.listen(5000, async () => {
  try {
    await mongooseConnection();
    console.log(`SERVER STARED  : http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.log(`SOMETHING WENT WRONG : ${err}`);
  }
});