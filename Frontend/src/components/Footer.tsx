 import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css'


function Footer() {
  return (
    <div className="footer text-white mt-5 pt-4 pb-2">
      {/* Top Section */}
      <footer className="text-center mb-4">
        <div className="container">
          <p className="mb-1 fw-bold">Contact | Policies | Help</p>
          <p className="mb-0">© 2025 BOOK BAZAAR . All rights reserved.</p>
        </div>
      </footer>
 
      {/* Bottom Section */}
      <footer className="container">
        <div className="row text-start">
          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="text-info">About Us</h5>
            <p style={{ fontSize: '0.9rem' }}>
              Book Bazaar is your one-stop destination for all genres of books. From bestsellers to hidden gems, we bring stories to life.
            </p>
            <div className="d-flex gap-3 mt-3">
              <FaFacebook style={{ cursor: 'pointer' }} />
              <FaTwitter style={{ cursor: 'pointer' }} />
              <FaInstagram style={{ cursor: 'pointer' }} />
            </div>
          </div>
 
          {/* Categories */}
          <div className="col-md-4 mb-4">
            <h5 className="text-info">Categories</h5>
            <ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
              <li>📚 BestSellers</li>
              <li>👻 Horror</li>
              <li>🔍 Thriller</li>
              <li>📖 Literature</li>
              <li>🧒 Kids</li>
              <li>🚀 Sci-Fi</li>
              <li>🎭 Fictional</li>
            </ul>
          </div>
 
          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="text-info">Contact Us</h5>
            <p style={{ fontSize: '0.9rem' }}>
              <FaPhoneAlt className="me-2" /> +91 93487 96492
            </p>
            <p style={{ fontSize: '0.9rem' }}>
              <FaEnvelope className="me-2" /> support@bookbazaar.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
 
export default Footer;
 