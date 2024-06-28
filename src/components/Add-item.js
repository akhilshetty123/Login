import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ items, addItem, updateItem, currentItem }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentItem) {
      setProductName(currentItem.productName);
      setPrice(currentItem.price);
      setIsEditing(true);
    }
  }, [currentItem]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!productName || !price) {
      setMessage('Please fill in all fields.');
      return;
    }

    const newItem = {
      id: items.length + 1,
      productName,
      price: parseFloat(price),
    };
    addItem(newItem);
    resetForm();
    setMessage('Item added successfully!');
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    if (!productName || !price) {
      setMessage('Please fill in all fields.');
      return;
    }

    const updatedItem = {
      ...currentItem,
      productName,
      price: parseFloat(price),
    };
    updateItem(updatedItem);
    resetForm();
    setMessage('Item updated successfully!');
  };

  const resetForm = () => {
    setProductName('');
    setPrice('');
    setIsEditing(false);
    setMessage('');
  };

  return (
    <div className="dashboard-container">
      <div className="content">
        <h2>{isEditing ? 'Edit Item' : 'Add Item'}</h2>
        <form onSubmit={isEditing ? handleUpdateItem : handleAddItem}>
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="form-control"
              placeholder="Enter product name"
              required
              disabled={isEditing} // Disable editing of product name
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
              placeholder="Enter price"
              required
            />
          </div>
          <button type="submit" className="btn-add">{isEditing ? 'Update Item' : 'Add Item'}</button>
          {isEditing && <button onClick={resetForm} className="btn-cancel">Cancel</button>}
        </form>
        {message && <p className="add-message">{message}</p>}
      </div>
    </div>
  );
}

export default Dashboard;
