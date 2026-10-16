import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Landing from './Pages/Landing/Landing';
import Signup from './Pages/Auth/Signup';
import Payment from './Pages/Payments/Payment';
import Order from './Pages/Orders/Order';
import Cart from './Pages/Carts/Cart';
import Result from './Pages/Results/Result';
import ProductDetail from './Pages/ProductDetail/ProductDetail'

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Signup />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/Cart" element={<Cart />} />
     <Route path="/category/:CatagoryName" element={<Result />} />
     <Route path ="/ProductDetail" element={<ProductDetail/>}/>
      </Routes>
    </Router>
  );
}

export default Routing;