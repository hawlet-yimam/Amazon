import React from 'react';
import { FaSearch, FaCartArrowDown, FaMapMarkerAlt } from "react-icons/fa";
import './Header.css';

function Header() {
  return (
    <div className='header'>
      {/* 1. Logo */}
      <a href='/' className='header__logo'>
        <img 
          src='https://pngimg.com/uploads/amazon/amazon_PNG25.png' 
          alt='Amazon Logo'
        />
      </a>

      {/* 2. Delivery Location */}
      <div className='header__delivery'>
        <FaMapMarkerAlt className='header__locationIcon' />
        <div className='header__deliveryText'>
          <span className='header__optionLineOne'>Deliver to</span>
          <span className='header__optionLineTwo'>Ethiopia</span>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className='header__search'>
        <select className='header__searchSelect'>
          <option value="ALL">All</option>
        </select>
        <input type="text" placeholder='Search products' className='header__searchInput' />
        <button className='header__searchIconBtn'>
          <FaSearch />
        </button>
      </div>

      {/* 4. Right Navigation Items */}
      <div className='header__nav'>
        {/* Flag & Language */}
        <div className='header__option header__language'>
          <img 
            src='https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' 
            alt='US Flag' 
            className='header__flag'
          />
          <span>EN</span>
        </div>

        {/* Sign In */}
        <a href='/login' className='header__option'>
          <span className='header__optionLineOne'>Hello, Sign in</span>
          <span className='header__optionLineTwo'>Account & Lists</span>
        </a>

        {/* Returns & Orders */}
        <a href='/orders' className='header__option'>
          <span className='header__optionLineOne'>Returns</span>
          <span className='header__optionLineTwo'>& Orders</span>
        </a>

        {/* Cart */}
        <a href="/cart" className='header__optionCart'>
          <FaCartArrowDown size={24} />
          <span className='header__cartCount'>0</span>
        </a>
      </div>
    </div>
  );
}

export default Header;