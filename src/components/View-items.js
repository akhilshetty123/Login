import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './View-items.css';
import OrderModal from './OrderModal';
// import OrderModal from './OrderModal';

function ViewItems({ items, setItems, isAdmin, onLogout, placeOrder }) {
  const [editIndex, setEditIndex] = useState(-1);
  const [editPrice, setEditPrice] = useState('');
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = (index, price, name, image) => {
    setEditIndex(index);
    setEditPrice(price.toString());
    setEditName(name);
    setEditImage(image);
  };

  const handleSaveClick = (index) => {
    const updatedItems = [...items];
    updatedItems[index].price = parseFloat(editPrice);
    updatedItems[index].productName = editName;
    if (editImage) {
      updatedItems[index].image = editImage;
    }
    setItems(updatedItems);
    setEditIndex(-1);
    setEditPrice('');
    setEditName('');
    setEditImage(null);
  };

  const handleDeleteClick = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout(false);
    navigate('/');
  };

  const handleOrderClick = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="view-items-container">
      <nav className="navbar">
        <img src="/images/log.png" alt="Dashboard" className="navbar-icon" />
        <div className="navbar-left">
          <ul className="navbar-items">
            {!isAdmin && (
              <>
                <li><Link to="/user">Home</Link></li>
                <li><Link to="/view-items">View-Items</Link></li>
                <li><Link to="/MyOrders">My-Orders</Link></li>
              </>
            )}
            {isAdmin && (
              <>
                <li><Link to="/admin">Home</Link></li>
                <li><Link to="/Add-item">Add-Item</Link></li>
                <li><Link to="/View-item">View-Item</Link></li>
                <li><Link to="/View-orders">View-Orders</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="text-color">
        <h2>View Items</h2>
      </div>
      <div className="item-list">
        <table className="items-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              {!isAdmin && <th>Order Now</th>}
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  {editIndex === index ? (
                    <div>
                      {editImage && <img src={editImage} alt="Preview" className="image-preview" />}
                    </div>
                  ) : (
                    item.image && <img src={item.image} alt={item.productName} className="item-image" />
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    item.productName
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                  ) : (
                    `₹${item.price}`
                  )}
                </td>
                {!isAdmin && (
                  <td>
                    <button className='order-btn' onClick={() => handleOrderClick(item)}>Order</button>
                  </td>
                )}
                {isAdmin && (
                  <td>
                    {editIndex === index ? (
                      <button className='save-btn' onClick={() => handleSaveClick(index)}>Save</button>
                    ) : (
                      <>
                        <button className='edit-button' onClick={() => handleEditClick(index, item.price, item.productName, item.image)}>Edit</button>
                        <button className='delete-button' onClick={() => handleDeleteClick(index)}>Delete</button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedItem && (
        <OrderModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          item={selectedItem}
          placeOrder={placeOrder}
        />
      )}
    </div>
  );
}

export default ViewItems;
