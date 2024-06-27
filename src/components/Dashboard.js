// import React, { useState } from 'react';
// import './Dashboard.css'; // Import CSS for styling

// function Dashboard() {
//   const [items, setItems] = useState([]);
//   const [id, setId] = useState('');
//   const [productName, setProductName] = useState('');
//   const [price, setPrice] = useState('');
//   const [message, setMessage] = useState('');
//   const [itemListVisible, setItemListVisible] = useState(false); // State to toggle item list visibility

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!id || !productName || !price) {
//       setMessage('Please fill in all fields.');
//       return;
//     }

//     const newItem = { id, productName, price };
//     setItems([...items, newItem]);
//     setId('');
//     setProductName('');
//     setPrice('');
//     setMessage('Item added successfully!');
//   };

//   const toggleItemList = () => {
//     setItemListVisible(!itemListVisible);
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="content">
//         <h2>Dashboard</h2>
//         <p>Welcome to the admin dashboard!</p>

//         <div className="add-item-form">
//           <h3>Add Item</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="id">ID:</label>
//               <input 
//                 type="text" 
//                 id="id"
//                 value={id} 
//                 onChange={(e) => setId(e.target.value)} 
//                 className="form-control"
//                 placeholder="Enter item ID"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="productName">Product Name:</label>
//               <input 
//                 type="text" 
//                 id="productName"
//                 value={productName} 
//                 onChange={(e) => setProductName(e.target.value)} 
//                 className="form-control"
//                 placeholder="Enter product name"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="price">Price:</label>
//               <input 
//                 type="number" 
//                 id="price"
//                 value={price} 
//                 onChange={(e) => setPrice(e.target.value)} 
//                 className="form-control"
//                 placeholder="Enter price"
//                 required
//               />
//             </div>
//             <button type="submit" className="btn-add">Add Item</button>
//           </form>
//           {message && <p className="add-message">{message}</p>}
//         </div>

//         {itemListVisible && (
//           <div className="item-list">
//             <h3>Item List</h3>
//             <table className="items-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Product Name</th>
//                   <th>Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.id}</td>
//                     <td>{item.productName}</td>
//                     <td>${item.price}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <button className="toggle-btn" onClick={toggleItemList}>
//           {itemListVisible ? 'Hide Item List' : 'Show Item List'}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard({ items, addItem }) {
  const [id, setId] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [itemListVisible, setItemListVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !productName || !price) {
      setMessage('Please fill in all fields.');
      return;
    }

    const newItem = { id, productName, price };
    addItem(newItem); // Add item through the prop function
    setId('');
    setProductName('');
    setPrice('');
    setMessage('Item added successfully!');
  };

  const toggleItemList = () => {
    setItemListVisible(!itemListVisible);
  };

  return (
    <div className="dashboard-container">
      <div className="content">
        <h2>Dashboard</h2>
        <p>Welcome to the admin dashboard!</p>

        <div className="add-item-form">
          <h3>Add Item</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input 
                type="text" 
                id="id"
                value={id} 
                onChange={(e) => setId(e.target.value)} 
                className="form-control"
                placeholder="Enter item ID"
                required
              />
            </div>
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
            <button type="submit" className="btn-add">Add Item</button>
          </form>
          {message && <p className="add-message">{message}</p>}
        </div>

        {itemListVisible && (
          <div className="item-list">
            <h3>Item List</h3>
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
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* <button className="toggle-btn" onClick={toggleItemList}>
          {itemListVisible ? 'Hide Item List' : 'Show Item List'}
        </button> */}
      </div>
    </div>
  );
}

export default Dashboard;
