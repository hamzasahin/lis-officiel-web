import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders, getAllProducts, deleteProduct } from '../utils/apiHelper';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import ConfirmationDialog from './ConfirmationDialog';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const ITEMS_PER_PAGE = 10;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, productsData] = await Promise.all([
          getAllOrders(),
          getAllProducts()
        ]);
        setOrders(ordersData);
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId);
      setProducts(products.filter(product => product.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <section className="orders-section">
        <h3>Orders</h3>
        {orders.length > 0 ? (
          <ul className="orders-list">
            {orders.map(order => (
              <li key={order.id} className="order-item">
                <h4>Order #{order.id}</h4>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <Link to={`/order/${order.id}`} className="btn view-details">
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found</p>
        )}
      </section>

      <section className="products-section">
        <div className="products-header">
          <h3>Products</h3>
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search products..."
          />
        </div>
        
        {filteredProducts.length > 0 ? (
          <>
            <ul className="products-list">
              {paginatedProducts.map(product => (
                <li key={product.id} className="product-item">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <div className="product-actions">
                      <Link to={`/product/${product.id}`} className="btn edit">
                        Edit Product
                      </Link>
                      <button 
                        className="btn delete"
                        onClick={() => setDeleteId(product.id)}
                      >
                        Delete Product
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <Pagination
              currentPage={currentPage}
              totalItems={filteredProducts.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <p>No products found</p>
        )}
      </section>

      {deleteId && (
        <ConfirmationDialog
          message="Are you sure you want to delete this product?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
