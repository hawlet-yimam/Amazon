
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Authh from "./Pages/Auth/Authh";
import Payment from "./Pages/Payments/Payment";
import Order from "./Pages/Orders/Order";
import Cart from "./Pages/Carts/Cart";
import Result from "./Pages/Results/Result";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Authh />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Result />}  />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default Routing;
