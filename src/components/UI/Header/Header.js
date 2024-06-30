// src/components/UI/Header/Header.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../store/actions/authActions';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import Cart from '../CartIcon/CartIcon';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        <Link to="/">Main Page</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products">All Products</Link>
        <Link to="/sales">All Sales</Link>
        {user ? (
          <>
            {user.role_id === 1 && (
              <>
                <Link to="/admin/categories">AdminCat</Link>
                <Link to="/admin/products">AdminPro</Link>
              </>
            )}
            <Link to="/orders">Orders</Link>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Cart />
    </header>
  );
};

export default Header;
