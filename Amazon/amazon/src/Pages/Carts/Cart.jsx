import React, { useContext } from 'react';
import LayOut from '../../components/LayOut/Layout';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product2/ProductCard2';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import classes from './Cart.module.css';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  // dispatch ን ከ Context መቀበል
  const [{ basket }, dispatch] = useContext(DataContext);

  // አጠቃላይ ዋጋ ማስላት (የእያንዳንዱን ዕቃ ብዛት ወይም amount በማብዛት)
  const total = (basket || []).reduce(
    (amount, item) => amount + Number(item.price * item.amount || 0),
    0
  );

  // የዕቃዎችን ብዛት ለመጨመር (Increment)
  const increment = (item) => {
    dispatch({
      type: 'ADD_TO_BASKET', // እንደ ፕሮጀክትዎ Action Type ያስተካክሉት
      item,
    });
  };

  // የዕቃዎችን ብዛት ለመቀነስ (Decrement)
  const decrement = (id) => {
    dispatch({
      type: 'REMOVE_FROM_BASKET', // እንደ ፕሮጀክትዎ Action Type ያስተካክሉት
      id,
    });
  };

  return (
    <LayOut>
      <main className={classes.cartPage}>
        <div className={classes.cartContent}>
          <section className={classes.cartItems}>
            <h1 className={classes.greeting}>Hello</h1>
            <h2 className={classes.cartTitle}>Your shopping basket</h2>
            <hr className={classes.divider} />

            {!basket ? (
              <p>Basket is not initialized.</p>
            ) : basket.length === 0 ? (
              <p className={classes.emptyCart}>
                Oops! No item in your cart.
              </p>
            ) : (
              basket.map((item) => (
                // key prop ን ለውጭኛው section ሰጥተነዋል
                <section key={item.id} className={classes.cartProductContainer}>
                  <ProductCard
                    Product={item}
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                  />
                  <div className={classes.btnContainer}>
                    <button onClick={() => increment(item)}>
                      <IoIosArrowDown />
                    </button>
                    <span>{item.amount}</span>
                    <button onClick={() => decrement(item.id)}>
                    <IoIosArrowUp />
                    </button>
                  </div>
                </section>
              ))
            )}
          </section>

          {basket?.length > 0 && (
            <aside className={classes.subtotal}>
              <h3>
                Subtotal ({basket.reduce((sum, i) => sum + i.amount, 0)}{' '}
                {basket.length === 1 ? 'item' : 'items'})
              </h3>

              <div className={classes.totalPrice}>
                <CurrencyFormat amount={total} />
              </div>

              <label className={classes.giftOption}>
                <input type="checkbox" />
                <span>This order contains a gift</span>
              </label>

              <Link
                to="/Payment"
                className={classes.checkoutButton}
              >
                Continue to checkout
              </Link>
            </aside>
          )}
        </div>
      </main>
    </LayOut>
  );
}

export default Cart;