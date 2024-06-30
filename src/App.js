// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import HomePage from './pages/HomePage/HomePage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductPage from './pages/ProductPage/ProductPage';
import SalesPage from './pages/SalesPage/SalesPage';
import CartPage from './pages/CartPage/CartPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import OrderPage from './pages/OrderPage/OrderPage';
import NotFoundPage from './pages/404Page/404Page';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage/AdminCategoriesPage';
import AdminProductsPage from './pages/AdminProductsPage/AdminProductsPage';


const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => !!state.auth.user);
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/cart" element={<ProtectedRoute element={CartPage} />} />
          <Route path="/orders" element={<ProtectedRoute element={OrdersPage} />} />
          <Route path="/order/:orderId" element={<OrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/categories" element={<ProtectedRoute element={AdminCategoriesPage} />} />
          <Route path="/admin/products" element={<ProtectedRoute element={AdminProductsPage} />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route for 404 */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
