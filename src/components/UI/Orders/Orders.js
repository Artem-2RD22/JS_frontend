// src/pages/OrdersPage/OrdersPage.js

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Orders.module.css';
import { Route } from 'react-router-dom';

const OrdersPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3333/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.ordersPage}>
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              
              <tr key={order.id}>
                <td><Link to={`/order/${order.id}`}>{order.id}</Link></td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>${order.total_amount}</td>
              </tr>
              
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
