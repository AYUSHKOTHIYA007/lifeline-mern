import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-light text-center py-4 mt-auto">
      <div className="container">
        <p className="mb-0 text-muted">
          &copy; {new Date().getFullYear()} LifeLine - Digital Blood Bank. All rights reserved.
        </p>
        <p className="mb-0 text-muted">
          <Link to="/about" className="text-decoration-none">About</Link> | 
          <Link to="/contact" className="text-decoration-none mx-2">Contact</Link> | 
          <Link to="/why-donate" className="text-decoration-none">Why Donate?</Link>
        </p>
        <p className="mb-0 text-muted">Made with <i className="fas fa-heart text-danger"></i> for saving lives.</p>
      </div>
    </footer>
  );
}
export default Footer;