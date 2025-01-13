import React from 'react';
import UserAccountDetails from '../components/UserAccountDetails';
import UserOrderHistory from '../components/UserOrderHistory';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { getAllUsers, getAllOrders, getAllProducts } from '../utils/apiHelper';

const AdminDashboardPage = () => {
  const [users, setUsers] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    getAllUsers().then((data) => setUsers(data));
    getAllOrders().then((data) => setOrders(data));
    getAllProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="admin-dashboard-page">
      <div className="user-management-container">
        <h2>User Management</h2>
        <div className="user-list">
          {users.map((user) => (
            <UserAccountDetails key={user.id} user={user} />
          ))}
        </div>
      </div>
      <div className="order-management-container">
        <h2>Order Management</h2>
        <div className="order-list">
          {orders.map((order) => (
            <UserOrderHistory key={order.id} order={order} />
          ))}
        </div>
      </div>
      <div className="product-management-container">
        <h2>Product Management</h2>
        <div className="product-filters">
          <CategoryFilter />
        </div>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
