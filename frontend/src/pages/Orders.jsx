import React, { useState, useEffect } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem("userEmail"); // ✅ Assuming login stores email in localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/orders/${userEmail}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userEmail]);

  return (
    <div className="orders-container">
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
              <p>Total: ₹{order.total}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
