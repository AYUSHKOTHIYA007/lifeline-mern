import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');

    if (storedUserId && storedUserName && storedUserName.length > 0) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    } else {
      setIsLoggedIn(false);
      setUserName('');
      if (storedUserId) {
        localStorage.removeItem('userId');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/login');
  };

  const loggedInMenu = (
    <div className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle d-flex align-items-center"
        href="/#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-person-circle me-1"></i>{' '}
        Hello, {userName.split(' ')[0]}
      </a>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li>
          <Link className="dropdown-item" to="/profile">
            My Profile
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item text-danger" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  const loggedOutButtons = (
    <div className="d-flex">
      <Link to="/login" className="btn btn-lifeline-outline me-2">
        Login
      </Link>
      <Link to="/signup" className="btn btn-lifeline">
        Sign Up
      </Link>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-lifeline" to="/">
          <i className="fas fa-heartbeat me-2"></i>LifeLine
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/why-donate">
                Why Donate?
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Find Donors
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/request-blood">
                Request Blood
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {isLoggedIn ? loggedInMenu : loggedOutButtons}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
