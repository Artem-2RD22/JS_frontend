import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Order.module.css';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3333/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrder(response.data);
      } catch (error) {
        setError('Failed to fetch order details');
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.orderDetailContainer}>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}</p>
      <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
      <h3>Items</h3>
      <ul>
        {order.order_items.map((item) => (
          <li key={item.id}>
            <p><strong>Product:</strong> {item.product.title}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
