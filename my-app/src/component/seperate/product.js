import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_TO_CART } from '../types/index';
import CircleLoader from 'react-spinners/CircleLoader';
// import { Cart } from '../Cart/cart';
import style from '../Home/home.module.css';
class Product extends Component {
  state = {
    products: [],
    cart: [],
    totelprice: '',
    loading: true,
  };

  fetchProduct = async () => {
    await fetch(
      `http://localhost:8000/api/product/${this.props.match.params.id}`,
    )
      .then(res => res.json())
      .then(json => {
        this.setState({ products: json });
        this.setState({ loading: false });
      })
      .catch(err => err);
  };

  add = item => {
    this.props.addBasket(item);
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    console.log(this.props.Basket);
    const { products, cart, loading } = this.state;
    console.log('**********', products);

    return (
      <div>
        {loading ? (
          <CircleLoader size={50} color={'#123abc'} loading={loading} />
        ) : products ? (
          <div className={style.productrow}>
            <div key={products._id} className={style.productitem}>
              <img src={products.product_images} height="200px" width="180px" />
              <div className={style.detail}>
                <div className={style.navigation}>
                  <Link to={'/'}>Home / </Link>
                  <Link to={`/catagory/${products.product_category}`}>
                    {products.product_category}
                  </Link>
                </div>
                <h3>{products.product_name}</h3>
                <p>RS : {products.product_price}</p>
                <p>{products.product_description}</p>
                <div>
                  <p>
                    <span>Supplier : {products.product_supplier}</span>
                  </p>
                </div>
                <div className={style.buy}>
                  <button onClick={() => this.add({ ...products, units: 1 })}>
                    {/* this.handleAddFunc({ ...products, units: 1 }) */}
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Basket: state.baseketState.cart,
  };
}

const addBasket = product => ({ type: ADD_TO_CART, payload: product });

const mapDispatchToProps = dispatch => {
  return {
    addBasket: product => {
      dispatch(addBasket(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
