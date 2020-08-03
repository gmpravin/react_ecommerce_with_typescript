import { combineReducers } from 'redux';
import BasketReducer from './cartReducer';
export default combineReducers({
  baseketState: BasketReducer,
});
