import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/UI/Header/Header';
import Contact from '../../components/UI/Contact/Contact';
import Order from '../../components/UI/Order/Order';

const OrderPage = () => {
    const { orderId } = useParams();
  return (
    <div>
    <Header />
    <Order  orderId={orderId} />
    <Contact />
    </div>
  );
};

export default OrderPage;
