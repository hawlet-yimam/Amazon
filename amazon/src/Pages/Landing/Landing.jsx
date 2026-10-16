import React from 'react';
import Catagory from '../../components/Catagory/Catagory';
import ProductComponent from '../../components/Products/Product';
import LayOut from '../../components/LayOut/Layout';

function Landing() {
  return (
    <LayOut>
      <Catagory />
      <ProductComponent />
    </LayOut>
  );
}

export default Landing;