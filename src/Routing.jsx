
import React, {
  useContext,
  useMemo
} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import {
  CheckoutElementsProvider
} from "@stripe/react-stripe-js/checkout";

import { loadStripe } from "@stripe/stripe-js";

import { DataContext } from "./components/DataProvider/DataProvider";

import Landing from "./Pages/Landing/Landing";
import Authh from "./Pages/Auth/Authh";
import Payment from "./Pages/Payments/Payment";
import Order from "./Pages/Orders/Order";
import Cart from "./Pages/Carts/Cart";
import Result from "./Pages/Results/Result";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

// =====================================
// STRIPE CONFIGURATION
// =====================================

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

// =====================================
// BACKEND API URL
// =====================================

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

// =====================================
// PAYMENT ROUTE COMPONENT
// =====================================

function PaymentRoute() {

  const [{ user, basket = [] }] = useContext(DataContext);

  // Calculate basket total
  const total = basket.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        (Number(item.amount) || 1),
    0
  );

  // =====================================
  // BASKET SIGNATURE
  // =====================================

  const basketSignature = useMemo(() => {

    return basket
      .map((item) => {
        return `${item.id}:${item.amount || 1}:${item.price}`;
      })
      .sort()
      .join("|");

  }, [basket]);

  // =====================================
  // CHECKOUT KEY
  // =====================================

  const checkoutKey = useMemo(() => {

    if (!user?.uid || !basketSignature) {
      return "";
    }

    const storageKey =
      `amazon_checkout_${user.uid}_${basketSignature}`;

    let savedKey = sessionStorage.getItem(storageKey);

    if (!savedKey) {

      savedKey = crypto.randomUUID();

      sessionStorage.setItem(
        storageKey,
        savedKey
      );
    }

    return savedKey;

  }, [user?.uid, basketSignature]);

  // =====================================
  // CREATE STRIPE CHECKOUT SESSION
  // =====================================

  const clientSecretPromise = useMemo(() => {

    if (!API_URL) {
      return Promise.reject(
        new Error(
          "Backend API URL is missing. Please configure VITE_API_URL in Vercel."
        )
      );
    }

    if (!user?.uid || !user?.email) {
      return Promise.reject(
        new Error("Please login before making a payment.")
      );
    }

    if (!basket.length || total <= 0) {
      return Promise.reject(
        new Error("Your basket is empty.")
      );
    }

    if (!checkoutKey) {
      return Promise.reject(
        new Error("Checkout key is missing.")
      );
    }

    return fetch(
      `${API_URL}/create-checkout-session`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          basket,
          userId: user.uid,
          userEmail: user.email,
          checkoutKey
        })
      }
    ).then(async (response) => {

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Unable to create checkout session."
        );
      }

      if (!data.clientSecret) {
        throw new Error(
          "Stripe client secret is missing."
        );
      }

      return data.clientSecret;

    }).catch((error) => {

      console.error(
        "Checkout session error:",
        error
      );

      throw error;

    });

  }, [
    user?.uid,
    user?.email,
    basketSignature,
    total,
    checkoutKey
  ]);

  // =====================================
  // STRIPE ELEMENTS OPTIONS
  // =====================================

  const options = useMemo(() => ({

    clientSecret: clientSecretPromise,

    elementsOptions: {
      appearance: {
        theme: "stripe"
      }
    }

  }), [clientSecretPromise]);

  // =====================================
  // LOGIN CHECK
  // =====================================

  if (!user?.uid || !user?.email) {

    return (
      <div>
        Please login before making a payment.
      </div>
    );
  }

  // =====================================
  // BASKET CHECK
  // =====================================

  if (!basket.length || total <= 0) {

    return (
      <div>
        Your basket is empty.
        Please add a product first.
      </div>
    );
  }

  // =====================================
  // PAYMENT ELEMENT PROVIDER
  // =====================================

  return (
    <CheckoutElementsProvider
      stripe={stripePromise}
      options={options}
    >
      <Payment />
    </CheckoutElementsProvider>
  );
}

// =====================================
// MAIN ROUTING COMPONENT
// =====================================

function Routing() {

  return (

    <Router>

      <Routes>

        {/* Home page */}

        <Route
          path="/"
          element={<Landing />}
        />

        {/* Login page */}

        <Route
          path="/Login"
          element={<Authh />}
        />

        {/* Protected Payment page */}

        <Route
          path="/Payment"
          element={
            <ProtectedRoute
              msg="Please login to access the payment page."
              redirect="/Payment"
            >
              <PaymentRoute />
            </ProtectedRoute>
          }
        />

        {/* Protected Orders page */}

        <Route
          path="/Orders"
          element={
            <ProtectedRoute
              msg="Please login to access your orders."
              redirect="/Orders"
            >
              <Order />
            </ProtectedRoute>
          }
        />

        {/* Cart page */}

        <Route
          path="/Cart"
          element={<Cart />}
        />

        {/* Category page */}

        <Route
          path="/category/:categoryName"
          element={<Result />}
        />

        {/* Product details */}

        <Route
          path="/products/:productId"
          element={<ProductDetail />}
        />

      </Routes>

    </Router>
  );
}

export default Routing;
