import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_TO_CART } from '../types/index';
import StripeCheckout from 'react-stripe-checkout';
import CircleLoader from 'react-spinners/CircleLoader';
// import { Cart } from '../Cart/cart';
import style from '../Home/home.module.css';
class Product extends Component {
  state = {
    products: [],
    cart: [],
    totelprice: '',
    loading: false,
  };

  fetchProduct = async () => {
    this.setState({ loading: true });
    await fetch(
      `http://localhost:8000/api/product/${this.props.match.params.id}`,
    )
      .then(res => res.json())
      .then(json => {
        this.setStat({ loading: false });
        this.setState({ products: json });
      })
      .catch(err => err);
  };

  add = item => {
    this.props.addBasket(item);
  };

  handleSubmit = token => {
    const body = {
      product: this.state.products,
      token: token,
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    fetch('http://localhost:8000/api/payment', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    }).then(response => {
      response.json().then(data => {
        alert(data);
      });
    });
  };

  componentDidUpdate() {
    this.fetchProduct();
  }

  render() {
    console.log(this.props.Basket);
    const { products, cart } = this.state;
    // console.log('this', cart);

    return (
      <div>
        {this.state.loading ? (
          <CircleLoader
            size={50}
            color={'#123abc'}
            loading={this.state.loading}
          />
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

                  <StripeCheckout
                    name="Ecommerece" // the pop-in header title
                    description="low price good quality" // the pop-in header subtitle
                    image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
                    ComponentClass="div"
                    panelLabel="Give Money" // prepended to the amount in the bottom pay button
                    amount={parseInt(products.product_price)} // cents
                    currency="INR"
                    stripeKey="pk_test_eUuzuGialbGz2eNFwBiSeFk600obfYNIlN"
                    locale="en"
                    email="info@vidhub.co"
                    // Note: Enabling either address option will give the user the ability to
                    // fill out both. Addresses are sent as a second parameter in the token callback.
                    shippingAddress
                    billingAddress={false}
                    // Note: enabling both zipCode checks and billing or shipping address will
                    // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                    zipCode={false}
                    alipay // accept Alipay (default false)
                    bitcoin // accept Bitcoins (default false)
                    allowRememberMe // "Remember Me" option (default true)
                    token={this.handleSubmit()} // submit callback
                    // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
                    // you are using multiple stripe keys
                    reconfigureOnUpdate={false}
                    // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
                    // useful if you're using React-Tap-Event-Plugin
                    triggerEvent="onTouchTap"
                  ></StripeCheckout>
                  {/* <button type="butoon" id="paymentclick" onClick={handleSubmit}>
                    Buy Product
                  </button> */}
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
