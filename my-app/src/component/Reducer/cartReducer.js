import {
  ADD_TO_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  REMOVE_PRODUCT_FROM_CART,
  GET_BASEKET_VALUE,
} from '../types/index';
const initialState = {
  cart: [
    {
      _id: '5eaff0c9bcc82231b8aa4b4a',
      product_name: 'Tometo',
      product_supplier: 'Raja',
      product_price: '20',
      product_images:
        'https://res.cloudinary.com/reactcommerce/image/upload/v1588588753/pmnswgtcij5wfyjtd87r.jpg',
      product_description: 'This is a pestisides free vegtable',
      product_category: 'vegtables',
      created_date: '2020-05-04T10:39:05.416Z',
      __v: 0,
      units: 1,
    },
  ],
};
export default (state = initialState, action) => {
  let cart;

  let updatedItemIndex;
  switch (action.type) {
    case INCREMENT_ITEM:
      return {
        ...state,
        cart: state.cart.map(i => {
          if (i._id === action.payload) {
            i = { ...i, units: i.units + 1 };
          }
          return i;
        }),
      };

    case DECREMENT_ITEM:
      return {
        ...state,
        cart: state.cart.map(i => {
          if (i.units > 1) {
            if (i._id === action.payload) {
              i = { ...i, units: i.units - 1 };
            }
          }

          return i;
        }),
      };

    case ADD_TO_CART:
      const existingProduct = state.cart.filter(
        p => p._id === action.payload._id,
      );

      if (existingProduct.length > 0) {
        return state;
      } else {
        return { ...state, cart: [...state.cart, { ...action.payload }] };
      }

    case REMOVE_PRODUCT_FROM_CART:
      cart = [...state.cart];
      updatedItemIndex = cart.findIndex(item => item._id === action.payload);

      cart.splice(updatedItemIndex, 1);

      return { ...state, cart: cart };

    case GET_BASEKET_VALUE:
      const no = [...state.cart];
      return no.length;

    default:
      return state;
  }
};
