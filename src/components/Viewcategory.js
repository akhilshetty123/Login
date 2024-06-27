import React, { useState } from 'react';
import './ViewCategory.css';

function ViewCategory() {
  const [fruits, setFruits] = useState([
    { name: 'Orange', weight: '200g', price: '₹100' },
    { name: 'Apple', weight: '150g', price: '₹150' },
    { name: 'Grapes', weight: '250g', price: '₹80' },
    { name: 'Watermelon', weight: '250g', price: '₹50' },
    { name: 'mango', weight: '250g', price: '₹90' },
  ]);

  return (
    <div className="view-category-container">
      <div className="bk">
      <h2>View Category</h2>
      </div>
      <div className="table-wrapper">
        <table className="fruits-table">
          <thead>
            <tr>
              <th>Fruit Name</th>
              <th>Weight</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {fruits.map((fruit, index) => (
              <tr key={index}>
                <td>{fruit.name}</td>
                <td>{fruit.weight}</td>
                <td>{fruit.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCategory;
