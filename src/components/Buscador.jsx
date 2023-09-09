import React, { useState } from 'react';
import search_icon from '../assets/imgs/search.png'

export default function Buscador({ onSearch }) {
  const [city, setCity] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city);
    }
  };

  return (
    <div className="top-bar">
      <input
        type="text"
        className="cityInput"
        placeholder="Busqueda por Ciudad"
        value={city}
        onChange={handleInputChange}
      />
      <div className="search-icon" onClick={handleSearch}>
        <img src={search_icon} alt="" />
      </div>
    </div>
  );
}