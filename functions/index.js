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

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  
  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });

      console.log(paymentIntent);
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({
      Message: "Total must be greater than 0",
    });
  }
});

exports.api = onRequest(app);