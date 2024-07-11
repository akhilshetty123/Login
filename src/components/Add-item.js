import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Add-item.css';

function AddItem({ items = [], addItem, updateItem, currentItem, onLogout }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

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
      id: (items ? items.length : 0) + 1,
      productName,
      price: parseFloat(price),
      image,
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
      image: image || currentItem.image,
    };
    updateItem(updatedItem);
    resetForm();
    setMessage('Item updated successfully!');
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const resetForm = () => {
    setProductName('');
    setPrice('');
    setImage(null);
    setIsEditing(false);
    setMessage('');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <img src="/images/log.png" alt="Dashboard" className="navbar-icon" />
        <div className="navbar-left">
          <ul className="navbar-items">
            <li><Link to="/admin">Home</Link></li>
            <li><Link to="/Add-item">Add-Item</Link></li>
            <li><Link to="/View-item">View-Item</Link></li>
            <li><Link to="/View-Orders">View-Orders</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

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
              disabled={isEditing}
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
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="form-cntrl"
                accept="image/*"
              />
              
            </div>
            {image && <img src={image} alt="Preview" className="image-preview" />}
          
          <button type="submit" className="btn-add">{isEditing ? 'Update Item' : 'Add Item'}</button>
          {isEditing && <button onClick={resetForm} className="btn-cancel">Cancel</button>}
        </form>
        {message && <p className="add-message">{message}</p>}
      </div>
    </div>
  );
}

export default AddItem;
