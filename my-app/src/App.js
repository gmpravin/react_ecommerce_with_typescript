import React, { Component } from 'react';
import { Home, Login, Register, Product, Category, Nav } from './component';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
import Cart from './component/Cart/cart';
import { store } from './config';
import { Provider } from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <Router>
            <Nav />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/product/:id" component={Product} />
              <Route exact path="/catagory/:catagory" component={Category} />
              <Route exact path="/cart" component={Cart} />
            </Switch>
          </Router>
          {/* </PersistGate> */}
        </Provider>
      </div>
    );
  }
}

export default App;
