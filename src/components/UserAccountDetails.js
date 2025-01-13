import React, { useState } from 'react';

const UserAccountDetails = ({ user, handleUpdateUser }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [shippingAddress, setShippingAddress] = useState(user.shippingAddress || '');

  const handleSubmit = e => {
    e.preventDefault();

    const updatedUser = {
      id: user.id,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      shippingAddress: shippingAddress
    };

    handleUpdateUser(updatedUser);
  };

  return (
    <div className="user-account-details">
      <h2>My Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="shippingAddress">Shipping Address:</label>
          <textarea id="shippingAddress" value={shippingAddress} onChange={e => setShippingAddress(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default UserAccountDetails;