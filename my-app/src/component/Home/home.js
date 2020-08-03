import React, { Component } from 'react';
import { Products } from '../index';
import style from './home.module.css';
import { connect } from 'react-redux';
import CircleLoader from 'react-spinners/CircleLoader';
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
        await this.setState({ loading: false });
      });
  };

  render() {
    const { products, loading } = this.state;

    return (
      <div>
        <div className={style.Container}>
          {loading ? (
            <CircleLoader size={50} color={'#123abc'} loading={loading} />
          ) : (
            <Products get={products} />
          )}
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
