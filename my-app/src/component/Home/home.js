import React, { Component } from 'react';
import { Products } from '../index';
import style from './home.module.css';
import { connect } from 'react-redux';

class Home extends Component {
  state = {
    products: [],
    loading: true,
  };

  componentDidMount() {
    this.data();
  }

  data = async () => {
    await fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(async json => {
        await this.setState({ products: json });
      });
  };

  render() {
    const { products } = this.state;

    return (
      <div>
        <div className={style.Container}>
          <Products get={products} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    baseketState: state,
  };
}

export default connect(mapStateToProps, null)(Home);
