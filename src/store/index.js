// src/store/index.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correctly import 'thunk'
import productsReducer from './reducers/productsReducer';
import categoriesReducer from './reducers/categoriesReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;
