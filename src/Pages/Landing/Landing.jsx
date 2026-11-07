import React from 'react';
import Catagory from '../../components/Catagory/Catagory';
import LayOut from '../../components/LayOut/Layout';
// import Product2 from "../components/Product2/Product2";
import Product2 from "../../components/Product2/Product2";

function Landing() {
  return (
    <LayOut>
      <Catagory />
      <Product2/>
    </LayOut>
  );
}

export default Landing;