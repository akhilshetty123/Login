import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './View-items.css';

function ViewItems({ items, setItems, isAdmin, onLogout }) {
  const [editIndex, setEditIndex] = useState(-1);
  const [editPrice, setEditPrice] = useState('');
  const [editName, setEditName] = useState('');
  const navigate = useNavigate();

  const handleEditClick = (index, price, name) => {
    setEditIndex(index);
    setEditPrice(price.toString());
    setEditName(name);
  };

  const handleSaveClick = (index) => {
    const updatedItems = [...items];
    updatedItems[index].price = parseFloat(editPrice);
    updatedItems[index].productName = editName;
    setItems(updatedItems);
    setEditIndex(-1);
    setEditPrice('');
    setEditName('');
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

  return (
    <div className="view-items-container">
      <nav className="navbar">
        <img src="/images/loginnnn.jpg" alt="Dashboard" className="navbar-icon" />
        <div className="navbar-left">
          <ul className="navbar-items">
            {isAdmin ? (
              <>
                <li><Link to="/admin">Home</Link></li>
                <li><Link to="/Add-item">Add-Item</Link></li>
                <li><Link to="/View-item">View-Item</Link></li>
                <li><Link to="/View-Orders">View-Order</Link></li>
              </>
            ) : (
              <li><button onClick={handleLogout}>Logout</button></li>
            )}
          </ul>
        </div>
        {isAdmin && (
          <div className="navbar-right">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>

      
      <div className="text-color">
        <h2>View Items</h2>
      </div>
      <div className="item-list">
        <table className="items-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{editIndex === index ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    item.productName
                  )}</td>
                <td>{editIndex === index ? (
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                  ) : (
                    `₹${item.price}`
                  )}</td>
                {isAdmin && (
                  <td>
                    {editIndex === index ? (
                      <button className='save-btn' onClick={() => handleSaveClick(index)}>Save</button>
                    ) : (
                      <>
                        <button className='edit-button' onClick={() => handleEditClick(index, item.price, item.productName)}>Edit</button>
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
    </div>
  );
}

export default ViewItems;
