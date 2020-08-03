import {
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  REMOVE_PRODUCT_FROM_CART,
  GET_BASEKET_VALUE,
} from '../types/index';

export const IncrementItem = product => ({
  type: INCREMENT_ITEM,
  payload: product,
});
export const DecrementItem = product => ({
  type: DECREMENT_ITEM,
  payload: product,
});
export const RemoveProduct = product => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: product,
});
export const Baseket = product => ({
  type: GET_BASEKET_VALUE,
  payload: product,
});
