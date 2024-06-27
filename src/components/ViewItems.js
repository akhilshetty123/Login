import React from 'react';
import './ViewItems.css';

function ViewItems({ items }) {
  if (!items) return null; // Add a check to ensure items is defined

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
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.productName}</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewItems;
