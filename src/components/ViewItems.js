import React, { useState } from 'react';
import './ViewItems.css';

function ViewItems({ items, setItems, isAdmin }) {
  const [editIndex, setEditIndex] = useState(-1);
  const [editPrice, setEditPrice] = useState('');

  const handleEditClick = (index, price) => {
    setEditIndex(index);
    setEditPrice(price);
  };

  const handleSaveClick = (index) => {
    const updatedItems = [...items];
    updatedItems[index].price = parseFloat(editPrice);
    setItems(updatedItems);
    setEditIndex(-1);
    setEditPrice('');
  };

  return (
    <div className="view-items-container">
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
                <td>{item.productName}</td>
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
                {isAdmin && (
                  <td>
                    {editIndex === index ? (
                      <button onClick={() => handleSaveClick(index)}>Save</button>
                    ) : (
                      <button onClick={() => handleEditClick(index, item.price)}>Edit</button>
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
