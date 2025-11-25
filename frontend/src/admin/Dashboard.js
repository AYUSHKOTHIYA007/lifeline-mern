import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function Dashboard() {
  const [stats, setStats] = useState({
    donors: 0,
    pending: 0,
    approved: 0,
    totalUnits: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const navigate = useNavigate();

  const loadDashboard = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/dashboard`);
      if (!res.ok) {
        console.error('Dashboard API error:', res.status);
        return;
      }
      const data = await res.json();
      setStats({
        donors: data.donors || 0,
        pending: data.pending || 0,
        approved: data.approved || 0,
        totalUnits: data.totalUnits || 0,
      });
      setRecentRequests(data.recentRequests || []);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    } else {
      loadDashboard();
    }
  }, [navigate]);

  return (
    <div>
      <h1 className="h2 mb-4">Dashboard</h1>

      {/* Stat Cards */}
      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="card-title">TOTAL DONORS</div>
                <div className="display-4 fw-bold">{stats.donors}</div>
              </div>
              <i className="fas fa-users fa-3x opacity-50"></i>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="card-title">PENDING REQUESTS</div>
                <div className="display-4 fw-bold">{stats.pending}</div>
              </div>
              <i className="fas fa-hourglass-half fa-3x opacity-50"></i>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="card-title">APPROVED REQUESTS</div>
                <div className="display-4 fw-bold">{stats.approved}</div>
              </div>
              <i className="fas fa-check-circle fa-3x opacity-50"></i>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card text-white bg-danger h-100">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className="card-title">TOTAL UNITS</div>
                <div className="display-4 fw-bold">{stats.totalUnits}</div>
              </div>
              <i className="fas fa-tint fa-3x opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <h2 className="mt-5 mb-3">Recent Blood Requests</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Date Requested</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.patient_name}</td>
                    <td>
                      <span className="badge bg-danger">
                        {req.blood_group}
                      </span>
                    </td>
                    <td>
                      <span
                        className={
                          req.status === 'approved'
                            ? 'badge bg-success'
                            : req.status === 'pending'
                            ? 'badge bg-warning'
                            : 'badge bg-secondary'
                        }
                      >
                        {req.status}
                      </span>
                    </td>
                    <td>{new Date(req.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {recentRequests.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No recent requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
