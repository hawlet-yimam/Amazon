import React from 'react';
import './Footer.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* 1. ወደ ላይ መመለሻ አዝራር */}
      <div className="footer__back-to-top" onClick={scrollToTop}>
        Back to top
      </div>

      {/* 2. ዋናዎቹ 4 ሊንክ ኮሎኖች (Get to Know Us, Make Money, ወዘተ) */}
      <div className="footer__links-container">
        <div className="footer__column">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">About Amazon</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Amazon Devices</a></li>
            <li><a href="#">Amazon Science</a></li>
          </ul>
        </div>

        <div className="footer__column">
          <h3>Make Money with Us</h3>
          <ul>
            <li><a href="#">Sell products on Amazon</a></li>
            <li><a href="#">Sell on Amazon Business</a></li>
            <li><a href="#">Sell apps on Amazon</a></li>
            <li><a href="#">Become an Affiliate</a></li>
            <li><a href="#">Advertise Your Products</a></li>
            <li><a href="#">Self-Publish with Us</a></li>
            <li><a href="#">Host an Amazon Hub</a></li>
            <li><a href="#"><span>›</span> See More Make Money with Us</a></li>
          </ul>
        </div>

        <div className="footer__column">
          <h3>Amazon Payment Products</h3>
          <ul>
            <li><a href="#">Amazon Business Card</a></li>
            <li><a href="#">Shop with Points</a></li>
            <li><a href="#">Reload Your Balance</a></li>
            <li><a href="#">Amazon Currency Converter</a></li>
          </ul>
        </div>

        <div className="footer__column">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Your Orders</a></li>
            <li><a href="#">Shipping Rates & Policies</a></li>
            <li><a href="#">Returns & Replacements</a></li>
            <li><a href="#">Manage Your Content and Devices</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom-section">
        <div className="footer__logo">
          <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG6.png" alt="Amazon logo" />
        </div>
        <div className="footer__selectors">
          <button className="footer__dropdown">🌐 English</button>
          <button className="footer__dropdown">$ USD - U.S. Dollar</button>
    <button className="footer__dropdown">
    <img src="https://image.shutterstock.com/image-vector/design-professional-graphic-flag-amarican-260nw-2482407601.jpg" alt="US flag" />
    United States
  </button>
        </div>
      </div>
      <div className="footer__services-grid">
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Amazon Music</span>
            <span className="footer__service-desc">Stream millions<br />of songs</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Amazon Ads</span>
            <span className="footer__service-desc">Reach customers<br />wherever they<br />spend their time</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">6pm</span>
            <span className="footer__service-desc">Score deals<br />on fashion brands</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">AbeBooks</span>
            <span className="footer__service-desc">Books, art<br />& collectibles</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">ACX</span>
            <span className="footer__service-desc">Audiobook<br />Publishing<br />Made Easy</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Sell on Amazon</span>
            <span className="footer__service-desc">Start a Selling<br />Account</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Veeqo</span>
            <span className="footer__service-desc">Shipping Software<br />Inventory<br />Management</span>
          </a>
        </div>

        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Amazon Business</span>
            <span className="footer__service-desc">Everything For<br />Your Business</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">AmazonGlobal</span>
            <span className="footer__service-desc">Ship Orders<br />Internationally</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Amazon Web Services</span>
            <span className="footer__service-desc">Scalable Cloud<br />Computing<br />Services</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Audible</span>
            <span className="footer__service-desc">Listen to Books &<br />Original Audio</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Box Office Mojo</span>
            <span className="footer__service-desc">Find Movie<br />Box Office Data</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Goodreads</span>
            <span className="footer__service-desc">Book reviews<br />& recommendations</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">IMDb</span>
            <span className="footer__service-desc">Movies, TV<br />& Celebrities</span>
          </a>
        </div>

        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">IMDbPro</span>
            <span className="footer__service-desc">Get Info Entertainment<br />Professionals Need</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Kindle Direct Publishing</span>
            <span className="footer__service-desc">Indie Digital & Print<br />Publishing Made Easy</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Prime Video Direct</span>
            <span className="footer__service-desc">Video Distribution<br />Made Easy</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Shopbop</span>
            <span className="footer__service-desc">Designer<br />Fashion Brands</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Woot!</span>
            <span className="footer__service-desc">Deals and<br />Shenanigans</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Zappos</span>
            <span className="footer__service-desc">Shoes &<br />Clothing</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Ring</span>
            <span className="footer__service-desc">Smart Home<br />Security Systems</span>
          </a>
        </div>

        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">eero WiFi</span>
            <span className="footer__service-desc">Stream 4K Video<br />in Every Room</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Blink</span>
            <span className="footer__service-desc">Smart Security<br />for Every Home</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">Neighbors App</span>
            <span className="footer__service-desc">Real-Time Crime<br />& Safety Alerts</span>
          </a>
        </div>
        <div className="footer__service-item">
          <a href="#">
            <span className="footer__service-title">PillPack</span>
            <span className="footer__service-desc">Pharmacy<br />Simplified</span>
          </a>
        </div>
      </div>
      <div className="footer__legal-section">
        <div className="footer__legal-links">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Consumer Health Data Privacy Disclosure</a>
          <a href="#" className="footer__ad-choices">
            Your Ads Privacy Choices <span className="footer__ad-icon"></span>
          </a>
        </div>
        <div className="footer__copyright">
          © 1996-2026, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </footer>
  );
}

export default Footer;