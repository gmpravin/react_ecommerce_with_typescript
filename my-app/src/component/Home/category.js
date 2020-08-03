import React, { Component } from 'react';
import { style } from '../index';
import { Link } from 'react-router-dom';
export class Category extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.fetchProduct();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.catagory !== prevProps.match.params.catagory) {
      this.fetchProduct();
    }
  }

  fetchProduct = async () => {
    await fetch(
      `http://localhost:8000/api/catagory/${this.props.match.params.catagory}`,
    )
      .then(res => res.json())
      .then(async json => await this.setState({ products: json }));
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        {products ? (
          <div className={style.row}>
            {products.map(product => {
              return (
                <Link to={`/product/${product._id}`}>
                  <div key={product._id} className={style.item}>
                    <img
                      src={product.product_images}
                      height="200px"
                      width="180px"
                    />
                    <h3>{product.product_name}</h3>
                    <p>{product.product_description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
