import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../components/LayOut/Layout";
import classes from "./Order.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";

import {
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

import ProductCard from "../../components/Product2/ProductCard2";

function Order() {
  const [{ user }] = useContext(DataContext);

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.uid) {
      setOrders([]);
      return;
    }

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const uniqueOrders = new Map();

        snapshot.docs.forEach((document) => {
          const data = document.data();

          if (!uniqueOrders.has(document.id)) {
            uniqueOrders.set(document.id, {
              id: document.id,
              data
            });
          }
        });

        const orderList = Array.from(uniqueOrders.values());
       console.log("Unique Orders:", orderList);
console.log("Order Count:", orderList.length);
        orderList.sort((a, b) => {
          const dateA = a.data.created?.seconds || 0;
          const dateB = b.data.created?.seconds || 0;
          return dateB - dateA;
        });

        setOrders(orderList);
        setError("");
      },
      (err) => {
        console.error("Orders loading error:", err);
        setError("Unable to load your orders.");
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <LayOut>
      <div className={classes.orders}>
        <h1>Your Orders</h1>

        {error && <p>{error}</p>}

        {orders.length === 0 && !error ? (
          <div className={classes.empty}>
            <h2>You don't have any orders yet.</h2>
            <p>
              Your orders will appear here after
              you complete a successful payment.
            </p>
          </div>
        ) : (
          orders.map((order) => {
            const orderData = order.data;

            const orderDate = orderData.created?.seconds
              ? new Date(
                  orderData.created.seconds * 1000
                ).toLocaleString()
              : "Just now";

            return (
              <div
                key={order.id}
                className={classes.orderCard}
              >
                <div className={classes.orderHeader}>
                  <div>
                    <p>ORDER PLACED</p>
                    <strong>{orderDate}</strong>
                  </div>

                  <div>
                    <p>TOTAL</p>
                    <strong>
                      ${Number(orderData.amount || 0).toFixed(2)}
                    </strong>
                  </div>

                  <div>
                    <p>ORDER ID</p>
                    <strong>{order.id}</strong>
                  </div>
                </div>

                <div className={classes.orderBody}>
                  <p>
                    Payment Status: {orderData.paymentStatus}
                  </p>

                  <p>
                    Customer: {orderData.userEmail}
                  </p>

                  {orderData.basket?.map((item, index) => (
                    <ProductCard
                      key={`${item.id}-${index}`}
                      Product={item}
                      flex={true}
                      renderDesc={false}
                      renderaAdd={false}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </LayOut>
  );
}

export default Order;