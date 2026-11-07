
const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const admin = require("firebase-admin");

const {
  getFirestore,
  FieldValue
} = require("firebase-admin/firestore");

dotenv.config();

setGlobalOptions({ maxInstances: 10 });

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = getFirestore();

if (!process.env.STRIPE_KEY) {
  throw new Error("STRIPE_KEY is missing from functions/.env");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET is missing from functions/.env");
}

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(cors({ origin: true }));
app.options(/(.*)/, cors());

const FRONTEND_URL = (
  process.env.FRONTEND_URL || "http://localhost:5173"
).replace(/\/$/, "");


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Amazon Firebase API is running successfully!"
  });
});

app.post("/stripe-webhook", async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    const rawBody = req.rawBody;

    if (!Buffer.isBuffer(rawBody)) {
      console.error("Webhook rawBody is not a Buffer");
      return res.status(400).send("Invalid raw request body");
    }

    if (!signature) {
      return res.status(400).send("Missing Stripe signature");
    }

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

  } catch (error) {
    console.error("Webhook signature error:", error.message);
    return res.status(400).send("Invalid webhook signature");
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object;

      if (session.payment_status !== "paid") {
        console.log(
          "Payment is not completed:",
          session.id,
          session.payment_status
        );

        return res.status(200).json({
          received: true,
          message: "Payment is not paid yet"
        });
      }

      const userId = session.metadata?.userId || null;

      const orderRef = db.collection("orders").doc(session.id);

      const existingOrder = await orderRef.get();

      const existingData = existingOrder.exists
        ? existingOrder.data()
        : {};

      const order = {
        orderId: session.id,

        userId,

        userEmail:
          session.customer_details?.email ||
          session.customer_email ||
          existingData.userEmail ||
          null,

        basket: existingData.basket || [],

        total: (session.amount_total || 0) / 100,

        amount: (session.amount_total || 0) / 100,

        currency: session.currency || "usd",

        paymentStatus: "paid",

        paymentIntent:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id || null,

        createdAt:
          existingData.createdAt || FieldValue.serverTimestamp(),

        created:
          existingData.created || FieldValue.serverTimestamp()
      };

      // Update main order.
      await orderRef.set(order, { merge: true });

      // Update user's order.
      if (userId) {
        await db
          .collection("users")
          .doc(userId)
          .collection("orders")
          .doc(session.id)
          .set(order, { merge: true });
      }

      console.log("Order payment completed:", session.id);
    }

    return res.status(200).json({
      received: true
    });

  } catch (error) {
    console.error("Webhook processing error:", error);

    return res.status(500).send("Webhook processing failed");
  }
});



app.use(express.json());

// ==================================
// CREATE CHECKOUT SESSION
// ==================================

app.post("/create-checkout-session", async (req, res) => {
  try {
    const {
      basket,
      userId,
      userEmail,
      checkoutKey
    } = req.body;

    // Validate user.
    if (!userId || !userEmail) {
      return res.status(400).json({
        error: "User information is required"
      });
    }

    // Validate checkout key.
    if (
      !checkoutKey ||
      typeof checkoutKey !== "string" ||
      checkoutKey.trim().length === 0
    ) {
      return res.status(400).json({
        error: "Checkout key is required"
      });
    }

    // Validate basket.
    if (!Array.isArray(basket) || basket.length === 0) {
      return res.status(400).json({
        error: "Your basket is empty"
      });
    }

    // Prepare products.
    const orderBasket = basket.map((item) => {
      const price = Number(item.price);
      const amount = Number(item.amount) || 1;

      if (
        !item.id ||
        !item.title ||
        !Number.isFinite(price) ||
        price < 0 ||
        !Number.isFinite(amount) ||
        amount <= 0
      ) {
        throw new Error("Invalid product information in basket");
      }

      return {
        id: String(item.id),
        title: String(item.title),
        price,
        thumbnail: String(item.thumbnail || ""),
        amount,
        rating: Number(item.rating) || 0,
        description: String(item.description || "")
      };
    });

    // Calculate total.
    const total = orderBasket.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
    );

    if (!Number.isFinite(total) || total <= 0) {
      return res.status(400).json({
        error: "Invalid order total"
      });
    }

    const amountInCents = Math.round(total * 100);

    // ==================================
    // STRIPE IDEMPOTENCY KEY
    // ==================================

    const idempotencyKey =
      `amazon_checkout_${userId}_${checkoutKey.trim()}`;

    // Stripe creates one session for the same key
    // and same request parameters.
    const session = await stripe.checkout.sessions.create(
      {
        ui_mode: "elements",

        mode: "payment",

        customer_email: userEmail,

        metadata: {
          userId: String(userId),
          checkoutKey: checkoutKey.trim()
        },

        line_items: [
          {
            price_data: {
              currency: "usd",

              product_data: {
                name: "Amazon Order"
              },

              unit_amount: amountInCents
            },

            quantity: 1
          }
        ],

        return_url:
          `${FRONTEND_URL}/Orders?session_id={CHECKOUT_SESSION_ID}`
      },
      {
        idempotencyKey
      }
    );
    const orderRef = db.collection("orders").doc(session.id);

    const pendingOrder = {
      orderId: session.id,

      userId: String(userId),

      userEmail,

      basket: orderBasket,

      total,

      amount: total,

      currency: "usd",

      paymentStatus: "pending",

      createdAt: FieldValue.serverTimestamp(),

      created: FieldValue.serverTimestamp()
    };
    await db.runTransaction(async (transaction) => {
      const existing = await transaction.get(orderRef);

      if (!existing.exists) {
        transaction.set(orderRef, pendingOrder);
      }
    });

    // Read the saved order.
    const savedOrderSnapshot = await orderRef.get();
    const savedOrder = savedOrderSnapshot.data();

    // Save same order under the user.
    if (savedOrder) {
      await db
        .collection("users")
        .doc(String(userId))
        .collection("orders")
        .doc(session.id)
        .set(savedOrder, { merge: true });
    }

    console.log("Checkout Session:", session.id);
    console.log("Checkout Key:", checkoutKey);
    console.log("Order saved:", session.id);

    return res.status(200).json({
      clientSecret: session.client_secret,
      sessionId: session.id
    });

  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    return res.status(500).json({
      error: error.message || "Unable to create checkout session"
    });
  }
});
exports.api = onRequest(app);
