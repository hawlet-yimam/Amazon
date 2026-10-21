
import React, { useContext } from 'react';
import LayOut from '../../components/LayOut/Layout';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product2/ProductCard2';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import classes from './Cart.module.css';

function Cart() {
  const [{ basket }] = useContext(DataContext);

  const total = (basket || []).reduce(
    (amount, item) => amount + Number(item.price || 0),
    0
  );

  return (
    <LayOut>
      <main className={classes.cartPage}>
        <div className={classes.cartContent}>
          <section className={classes.cartItems}>
            <h1 className={classes.greeting}>Hello</h1>
            <h2 className={classes.cartTitle}>
              Your shopping basket
            </h2>
            <hr className={classes.divider} />

            {!basket ? (
              <p>Basket is not initialized.</p>
            ) : basket.length === 0 ? (
              <p className={classes.emptyCart}>
                Oops! No item in your cart.
              </p>
            ) : (
              basket.map((item) => (
                <ProductCard
                  key={item.id}
                  Product={item}
                  renderDesc={true}
                  flex={true}
                  renderAdd={false}
                />
              ))
            )}
          </section>

          {basket?.length > 0 && (
            <aside className={classes.subtotal}>
              <h3>
                Subtotal ({basket.length}{' '}
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
