import React from 'react';
import { Link } from 'react-router-dom';
import style from './home.module.css';
import CircleLoader from 'react-spinners/CircleLoader';
export const Products = ({ get }) => {
  return (
    <div>
      {get ? (
        <div className={style.row}>
          {get.map(product => {
            return (
              <Link to={`/product/${product._id}`}>
                <div key={product._id} className={style.item}>
                  <img
                    src={product.product_images}
                    height="200px"
                    width="180px"
                  />
                  <div className={style.detail}>
                    <h3>{product.product_name}</h3>
                    <p>{product.product_price}</p>
                    <p>{product.product_description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <CircleLoader size={50} color={'#123abc'} loading={!get} />
      )}
    </div>
  );
};
