// src/components/UI/Cart/Cart.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { removeFromCart, updateQuantity, clearCart } from '../../../store/actions/cartActions';
import styles from './Cart.module.css';

// Path to this file: src/components/UI/Cart/Cart.js

const Cart = ({ showButton }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.first_name);
      setPhone(user.phone);
    }
  }, [user]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, delta) => {
    dispatch(updateQuantity(productId, delta));
  };

  const handleOrder = async () => {
    try {
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));
      await axios.post('http://localhost:3333/order/create', {
        userId: user.id,
        items: orderItems
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsSubmitted(true);
      setPopupVisible(true);
      dispatch(clearCart());
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  const closePopup = () => {
    setIsSubmitted(false);
    setPopupVisible(false);
  };

  const roundEpsilon = (price) => {
    return Math.round((price + Number.EPSILON) * 100) / 100;
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.discont_price ? item.discont_price : item.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.header}>
        <h2 className={styles.title}>Shopping cart</h2>
        {showButton && (
          <div className={styles.btn}>
            <div className={styles.line}></div>
            <div className={styles.navigation}>
              <Link to="/products" className={styles.allSales}>Back to the store</Link>
            </div>
          </div>
        )}
      </div>
      <div className={styles.cartContent}>
        <div className={styles.itemList}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className={styles.item} key={item.id}>
                <div className={styles.image}>
                  <img src={`http://localhost:3333/public${item.image}`} alt={item.title} />
                </div>
                <div className={styles.content}>
                  <div className={styles.headerItem}>
                    <Link to={`/product/${item.id}`} key={item.id} className={styles.productTitle}>{item.title}</Link>
                    <button onClick={() => handleRemoveFromCart(item.id)} className={styles.removeItem}>×</button>
                  </div>
                  <div className={styles.priceSection}>
                    <div className={styles.quantity}>
                      <button onClick={() => handleUpdateQuantity(item.id, -1)} className={styles.quantityBtn}>-</button>
                      <span className={styles.quantityValue}>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, 1)} className={styles.quantityBtn}>+</button>
                    </div>
                    <div className={styles.price}>
                      <span>${roundEpsilon(item.discont_price ? item.discont_price * item.quantity : item.price * item.quantity)}</span>
                      {item.discont_price && <span className={styles.originalPrice}>${roundEpsilon(item.price * item.quantity)}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyCart}>
              <p>Looks like you have no items in your basket currently.</p>
              <Link to="/products" className={styles.continueShopping}>Continue Shopping</Link>
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className={styles.orderDetails}>
            <h2>Order details</h2>
            <p>{cartItems.length} items</p>
            <div className={styles.total}>
              <span>Total</span>
              <span className={styles.totalAmount}>${roundEpsilon(totalPrice)}</span>
            </div>
            <div className={styles.orderForm}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                readOnly
              />
              <button 
                type="button" 
                className={`${styles.orderButton} ${isSubmitted ? styles.submitted : ''}`}
                onClick={handleOrder}
              >
                {isSubmitted ? 'The Order is Placed' : 'Order'}
              </button>
            </div>
          </div>
        )}
      </div>
      {popupVisible && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <button onClick={closePopup} className={styles.closePopup}>×</button>
            <div className={styles.popupContent}>
              <h2>Congratulations!</h2>
              <p>Your order has been successfully placed on the website.</p>
              <p>A manager will contact you shortly to confirm your order.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
