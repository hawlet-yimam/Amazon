const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
setGlobalOptions({ maxInstances: 10 });

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    Message: "success !"
  });
});
exports.api = onRequest(app);