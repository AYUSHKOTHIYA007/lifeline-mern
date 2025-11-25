// src/admin/AdminLayout.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h3 className="text-center p-3">
          <Link to="/admin/dashboard" className="text-white text-decoration-none">
            <i className="fas fa-heartbeat me-2"></i>LifeLine Admin
          </Link>
        </h3>
        <nav className="nav flex-column">
          <NavLink className="nav-link" to="/admin/dashboard">
            <i className="fas fa-tachometer-alt fa-fw me-2"></i>Dashboard
          </NavLink>
          <NavLink className="nav-link" to="/admin/donors">
            <i className="fas fa-users fa-fw me-2"></i>Manage Donors
          </NavLink>
          <NavLink className="nav-link" to="/admin/donations">
            <i className="fas fa-hand-holding-heart fa-fw me-2"></i>Manage Donations
          </NavLink>
          <NavLink className="nav-link" to="/admin/requests">
            <i className="fas fa-clipboard-list fa-fw me-2"></i>Blood Requests
          </NavLink>
          <NavLink className="nav-link" to="/admin/stock">
            <i className="fas fa-chart-pie fa-fw me-2"></i>Stock Report
          </NavLink>
        </nav>
      </div>

      <div className="admin-main-content">
        <div className="d-flex justify-content-end mb-3">
          <button onClick={handleSignOut} className="btn btn-outline-secondary">
            Sign Out
          </button>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
