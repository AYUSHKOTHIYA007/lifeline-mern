import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function ManageDonors() {
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();

  const fetchDonors = async () => {
    const res = await fetch(`${API_BASE_URL}/api/admin/donors`);
    const data = await res.json();
    setDonors(data);
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin/login');
    else fetchDonors();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this donor?')) return;
    await fetch(`${API_BASE_URL}/api/admin/donors/${id}`, {
      method: 'DELETE',
    });
    fetchDonors();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Manage Donors</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/donors/add')}
        >
          <i className="fas fa-plus me-2"></i>Add New Donor
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Blood Group</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((d, idx) => (
                <tr key={d._id}>
                  <td>{idx + 1}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>
                    <span className="badge bg-danger">{d.blood_group}</span>
                  </td>
                  <td>{d.mobile}</td>
                  <td>
                    {d.address_line ||
                      d.address ||
                      `${d.city || ''} ${d.state || ''}`}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(d._id)}
                    >
                      <i className="fas fa-trash-alt me-1"></i>Delete
                    </button>
                  </td>
                </tr>
              ))}
              {donors.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No donors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageDonors;
