// src/admin/ManageDonations.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

function ManageDonations() {
  const [donors, setDonors] = useState([]);
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({
    donorId: '',
    venue: '',
    donation_date: '',
    units: 1,
  });

  const navigate = useNavigate();

  const fetchDonors = async () => {
    const res = await fetch(`${API_BASE_URL}/api/admin/donors`);
    const data = await res.json();
    setDonors(data);
  };

  const fetchDonations = async () => {
    const res = await fetch(`${API_BASE_URL}/api/admin/donations`);
    const data = await res.json();
    setDonations(data);
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin/login');
    else {
      fetchDonors();
      fetchDonations();
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleAddDonation = async (e) => {
    e.preventDefault();
    if (!form.donorId || !form.venue || !form.donation_date) {
      alert('Select donor, venue and date.');
      return;
    }

    await fetch(`${API_BASE_URL}/api/admin/donations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        donorId: form.donorId,
        venue: form.venue,
        donation_date: form.donation_date,
        units: Number(form.units) || 1,
      }),
    });

    setForm({
      donorId: '',
      venue: '',
      donation_date: '',
      units: 1,
    });

    fetchDonations();
  };

  const handleDeleteDonation = async (id) => {
    if (!window.confirm('Delete this donation record?')) return;
    await fetch(`${API_BASE_URL}/api/admin/donations/${id}`, {
      method: 'DELETE',
    });
    fetchDonations();
  };

  return (
    <div>
      <h1 className="h2 mb-4">Manage Donations</h1>

      {/* Log new donation */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Log a New Donation</h5>
          <form className="row g-3" onSubmit={handleAddDonation}>
            <div className="col-md-4">
              <label className="form-label">Select Donor</label>
              <select
                name="donorId"
                className="form-select"
                value={form.donorId}
                onChange={handleChange}
              >
                <option value="">Choose a donor...</option>
                {donors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name} ({d.blood_group})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Venue</label>
              <input
                name="venue"
                className="form-control"
                value={form.venue}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Donation Date</label>
              <input
                type="date"
                name="donation_date"
                className="form-control"
                value={form.donation_date}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Units</label>
              <input
                type="number"
                name="units"
                min="1"
                className="form-control"
                value={form.units}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn btn-primary">
                Add Donation
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* All donations table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">All Donation Records</h5>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Blood Group</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Units</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d._id}>
                  <td>{d.user?.name}</td>
                  <td>
                    <span className="badge bg-danger">
                      {d.user?.blood_group || d.blood_group}
                    </span>
                  </td>
                  <td>{d.venue}</td>
                  <td>{new Date(d.donation_date).toLocaleDateString()}</td>
                  <td>{d.units}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteDonation(d._id)}
                    >
                      <i className="fas fa-trash-alt me-1"></i>Delete
                    </button>
                  </td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No donations logged yet.
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

export default ManageDonations;
