import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
export const Store = createContext();
const initialState = {
  save: Cookies.get('save')
    ? JSON.parse(Cookies.get('save'))
    : { saveItems: [], shippingAddress: {}, paymentMethod: '' },
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.save.saveItems.find(
        (item) => item.slug === newItem.slug
      );
      const saveItems = existItem
        ? state.save.saveItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.save.saveItems, newItem];
      Cookies.set('save', JSON.stringify({ ...state.save, saveItems }));

      return { ...state, save: { ...state.save, saveItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const saveItems = state.save.saveItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('save', JSON.stringify({ ...state.save, saveItems }));
      return { ...state, save: { ...state.save, saveItems } };
    }
    case 'CART_RESET':
      return {
        ...state,
        save: {
          saveItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
    case 'CART_CLEAR_ITEMS':
      return { ...state, save: { ...state.save, saveItems: [] } };

    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        save: {
          ...state.save,
          shippingAddress: {
            ...state.save.shippingAddress,
            ...action.payload,
          },
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        save: {
          ...state.save,
          paymentMethod: action.payload,
        },
      };
    default:
      return state;
  }
}
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
