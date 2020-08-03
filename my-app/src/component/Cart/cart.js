import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
  DecrementItem,
  IncrementItem,
  RemoveProduct,
} from '../action/cartActions';

import style from '../Cart/cart.module.css';

const Cart = () => {
  // console.log(baseket);
  const [t, st] = useState([]);
  const [totel, Settotel] = useState();

  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.baseketState.cart);

  async function findTotel() {
    var arr = [];
    cartItems.map(i => {
      arr.push(i.product_price * i.units);
    });

    const data = arr.reduce((i, j) => {
      return i + j;
    }, 0);
    await Settotel(data);
  }
  useEffect(() => {
    findTotel();
  }, [cartItems]);

  console.log(totel);
  return (
    <div>
      <div className={style.container}>
        {cartItems.length > 0 ? (
          <table>
            <thead>
              <tr className={style.thead}>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Totel</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(products => {
                return (
                  <tr className={style.con}>
                    <td className={style.name}>
                      <img
                        className={style.images}
                        src={products.product_images}
                      />
                      <div>
                        <h3 className={style.title}>{products.product_name}</h3>
                        <button
                          onClick={() => dispatch(RemoveProduct(products))}
                        >
                          X
                        </button>
                      </div>
                    </td>

                    <td>
                      <div className={style.unit}>
                        <button
                          onClick={() => dispatch(IncrementItem(products._id))}
                        >
                          +
                        </button>
                        <div>{products.units}</div>
                        <button
                          onClick={() => dispatch(DecrementItem(products._id))}
                        >
                          -
                        </button>
                      </div>
                    </td>

                    <td>
                      <div className={style.price}>
                        <div>
                          <p>Rs:{products.product_price}</p>
                        </div>
                      </div>
                    </td>

                    <td>{products.units * products.product_price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>Empty </div>
        )}
      </div>
      <div>
        {totel ? (
          <p
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '80%',
            }}
          >
            Totel:{totel}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
