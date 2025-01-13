import React from 'react';

const UserOrderHistory = ({ orders }) => {
  return (
    <div className="user-order-history">
      <h2>Order History</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <h3>Order #{order.id}</h3>
              <p>Date: {order.date}</p>
              <p>Total: ${order.total}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No order history available.</p>
      )}
    </div>
  );
};

export default UserOrderHistory;
