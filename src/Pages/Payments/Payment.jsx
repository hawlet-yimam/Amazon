import React, { useContext, useState } from "react";

import LayOut from "../../components/LayOut/Layout";
import classes from "./Payment.module.css";

import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product2/ProductCard2";

import {
  useCheckoutElements,
  PaymentElement,
} from "@stripe/react-stripe-js/checkout";

import { ClipLoader } from "react-spinners";

function Payment() {
  const [{ user, basket = [] }] = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const result = useCheckoutElements();

  // Calculate total items
  const totalItem = basket.reduce(
    (sum, item) => sum + (Number(item.amount) || 1),
    0
  );

  // Calculate total price
  const total = basket.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        (Number(item.amount) || 1),
    0
  );

  // Handle payment
  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    console.log("Checkout status:", result.type);
    console.log("User email:", user?.email);
    console.log("Basket:", basket);
    console.log("Total:", total);

    if (!user?.email) {
      setErrorMessage("Please login before making a payment.");
      return;
    }

    if (result.type !== "success") {
      setErrorMessage("Payment is not ready. Please wait.");
      return;
    }

    if (totalItem === 0 || total <= 0) {
      setErrorMessage("Your basket is empty.");
      return;
    }

    setLoading(true);

    try {
      console.log("Starting Stripe payment...");

      // Email is already provided by customer_email
      // in the Checkout Session created by the backend.
      const confirmResult =
  await result.checkout.confirm();
      console.log("Payment result:", confirmResult);

      if (confirmResult?.type === "error") {
        setErrorMessage(
          confirmResult.error?.message ||
            "Payment failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Payment Error:", error);

      setErrorMessage(
        error.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items
      </div>

      <section className={classes.payment}>

        {/* Delivery Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>

          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>

        <hr />

        {/* Review Items */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>

          <div>
            {basket.map((item) => (
              <ProductCard
                key={item.id}
                Product={item}
                renderDesc={true}
                flex={true}
                renderaAdd={false}
              />
            ))}
          </div>
        </div>

        <hr />

        {/* Payment Method */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>

          <div className={classes.payment__card_container}>

            {result.type === "loading" && (
              <p>Loading payment details...</p>
            )}

            {result.type === "error" && (
              <p className={classes.error}>
                {result.error.message}
              </p>
            )}

            {result.type === "success" && (
              <form onSubmit={handleSubmit}>

                <PaymentElement />

                {/* Total */}
                <div className={classes.payment_total}>
                  <h3>
                    Total: ${total.toFixed(2)}
                  </h3>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <p className={classes.error}>
                    {errorMessage}
                  </p>
                )}

                {/* Pay Now Button */}
                <button
                  className={classes.payment_button}
                  type="submit"
                  disabled={
                    loading ||
                    totalItem === 0 ||
                    !user?.email
                  }
                >
                  {loading ? (
                    <div className={classes.loading}>
                      <ClipLoader
                        color="#000"
                        size={15}
                      />
                      <p>Please wait...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

      </section>
    </LayOut>
  );
}

export default Payment;