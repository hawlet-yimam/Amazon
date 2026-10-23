import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import './Header.css';
import LowerHeader from '../LowerHeader/LowerHeader';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../DataProvider/DataProvider';
function Header() {
  const [{basket},dispach]= useContext(DataContext)
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  return (
    <section className="fixed">
    <div className='header'>
      <Link to='/' className='header__logo'>
        <img 
          src='https://pngimg.com/uploads/amazon/amazon_PNG25.png' 
          alt='Amazon Logo'
        />
      </Link>
      <div className='header__delivery'>
        <  FaMapMarkerAlt className='header__locationIcon' />
        <div className='header__deliveryText'>
          <span className='header__optionLineOne'>Deliver to</span>
          <span className='header__optionLineTwo'>Ethiopia</span>
        </div>
      </div>
      <div className='header__search'>
        <div className='header__selectWrapper'>
          <select className='header__searchSelect'>
            <option value="ALL">All</option>
          </select>
          <FaChevronDown className='header__selectIcon' />
        </div>
        <input type="text" placeholder='Search products' className='header__searchInput' />
        <button className='header__searchIconBtn'>
          <FaSearch />
        </button>
      </div>
      <div className='header__nav'>
        <div className='header__option header__language'>
          <img 
            src='https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' 
            alt='US Flag' 
            className='header__flag'
          />
          <span className='header__optionLineTwo'>EN</span>
          <FaChevronDown className='header__langIcon' />
        </div>
        <Link to='/login' className='header__option'>
          <span className='header__optionLineOne'>Hello, Sign in</span>
          <span className='header__optionLineTwo'>Account & Lists</span>
        </Link>
        <Link to='/orders' className='header__option'>
          <span className='header__optionLineOne'>Returns</span>
          <span className='header__optionLineTwo'>& Orders</span>
        </Link>
        <Link to="/cart" className='header__optionCart'>
          <IoCartOutline size={24} />
          <span className='header__cartCount'>{totalItem}</span>
        </Link>
      </div>
    </div>
       <LowerHeader />
    </section>
  );
}

export default Header;