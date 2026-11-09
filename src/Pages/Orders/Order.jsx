
import React, {
  useContext,
  useState,
  useEffect
} from "react";

import LayOut from "../../components/LayOut/Layout";
import classes from "./Order.module.css";

import { DataContext } from "../../components/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";

import {
  collection,
  query,
  onSnapshot
} from "firebase/firestore";

import ProductCard from "../../components/Product2/ProductCard2";

function Order() {
  const [{ user }] = useContext(DataContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is logged in
    if (!user?.uid) {
      setOrders([]);
      setLoading(false);
      setError("Please login to view your orders.");
      return;
    }

    setLoading(true);
    setError("");

    // Read orders belonging to the logged-in user
    const ordersRef = collection(
      db,
      "users",
      user.uid,
      "orders"
    );

    const ordersQuery = query(ordersRef);

    const unsubscribe = onSnapshot(
      ordersQuery,

      (snapshot) => {
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort newest orders first
        orderList.sort((a, b) => {
          const dateA =
            a.created?.seconds ||
            a.createdAt?.seconds ||
            0;

          const dateB =
            b.created?.seconds ||
            b.createdAt?.seconds ||
            0;

          return dateB - dateA;
        });

        console.log("Orders loaded:", orderList);
        console.log("Order count:", orderList.length);

        setOrders(orderList);
        setLoading(false);
        setError("");
      },

      (err) => {
        console.error(
          "Orders loading error:",
          err.code,
          err.message
        );

        setError(
          `${err.code || "Error"}: ${err.message || "Unable to load your orders."}`
        );

        setLoading(false);
      }
    );

    return () => unsubscribe();

  }, [user?.uid]);

  return (
    <LayOut>
      <div className={classes.orders}>

        <h1>Your Orders</h1>

        {/* Loading */}
        {loading && (
          <div className={classes.empty}>
            <p>Loading your orders...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className={classes.empty}>
            <h2>Unable to load your orders.</h2>
            <p>{error}</p>
          </div>
        )}

        {/* Empty Orders */}
        {!loading && !error && orders.length === 0 && (
          <div className={classes.empty}>
            <h2>You don't have any orders yet.</h2>

            <p>
              Your orders will appear here after
              you complete a successful payment.
            </p>
          </div>
        )}

        {/* Display Orders */}
        {!loading && !error && orders.length > 0 && (
          <div className={classes.orderList}>

            {orders.map((order) => {

              const orderDate =
                order.created?.seconds
                  ? new Date(
                      order.created.seconds * 1000
                    ).toLocaleString()
                  : order.createdAt?.seconds
                  ? new Date(
                      order.createdAt.seconds * 1000
                    ).toLocaleString()
                  : "Date unavailable";

              return (
                <div
                  key={order.id}
                  className={classes.orderCard}
                >

                  {/* Order Header */}
                  <div className={classes.orderHeader}>

                    <div>
                      <p>ORDER PLACED</p>
                      <strong>{orderDate}</strong>
                    </div>

                    <div>
                      <p>TOTAL</p>
                      <strong>
                        $
                        {Number(
                          order.amount || order.total || 0
                        ).toFixed(2)}
                      </strong>
                    </div>

                    <div>
                      <p>ORDER ID</p>
                      <strong>{order.id}</strong>
                    </div>

                  </div>

                  {/* Order Body */}
                  <div className={classes.orderBody}>

                    <p>
                      <strong>Payment Status:</strong>{" "}
                      {order.paymentStatus || "Pending"}
                    </p>

                    <p>
                      <strong>Customer:</strong>{" "}
                      {order.userEmail || user.email}
                    </p>

                    {/* Products */}
                    {Array.isArray(order.basket) &&
                      order.basket.map((item, index) => (
                        <ProductCard
                          key={`${item.id || "product"}-${index}`}
                          Product={item}
                          flex={true}
                          renderDesc={false}
                          renderaAdd={false}
                        />
                      ))}

                    {(!Array.isArray(order.basket) ||
                      order.basket.length === 0) && (
                      <p>No product details found for this order.</p>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </LayOut>
  );
}

export default Order;
