import React, { useState, useContext } from 'react';
import './Menu.css';
import menuData from '../data/menuData.json';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom'; 

export default function Menu() {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("Tiffins");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ["Tiffins", "Starters", "Meals", "Snacks", "Drinks", "Desserts"];
  const { cartItems, addItem, removeItem } = useContext(CartContext);

  const filteredItems = menuData.filter(item => {
    const matchCategory = item.category === filterCategory;
    const matchType = filterType === "all" || item.type === filterType;
    return matchCategory && matchType;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetPage = () => setCurrentPage(1);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="menu-page-container">
        <aside className="sidebar">
          <h3>MENU</h3>
          {categories.map((cat, idx) => (
            <button key={idx} onClick={() => { setFilterCategory(cat); resetPage(); setFilterType("all"); }}>
              {cat}
            </button>
          ))}
        </aside>

        <div className="menu-content">
          
          <div className="filter-buttons">
            <button onClick={() => { setFilterType("all"); resetPage(); }}>All</button>
            <button onClick={() => { setFilterType("veg"); resetPage(); }}>Veg</button>
            <button onClick={() => { setFilterType("nonveg"); resetPage(); }}>Non-Veg</button>
          </div>

          <div className="menu-grid">
            {pageItems.length > 0 ? pageItems.map((item, idx) => {
              const quantity = cartItems.find(i => i.name === item.name)?.quantity || 0;
              return (
                <div className="card" key={idx}>
                  <img src={item.img} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <p><strong>₹ {item.price}</strong></p>
                  <div className="quantity-controls">
                    <button onClick={() => removeItem(item.name)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => addItem(item)}>+</button>
                  </div>
                </div>
              );
            }) : <p>No items available for this category and filter.</p>}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {totalCartCount > 0 && (
        <div className="go-to-cart">
          <Link to="/cart"> Go to Cart ({totalCartCount} items)</Link>
        </div>
      )}
    </>
  );
}
