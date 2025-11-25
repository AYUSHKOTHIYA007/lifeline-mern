import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function AddDonor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    blood_group: '',
    mobile: '',
    gender: '',
    address_line: '',
    city: '',
    state: '',
    pincode: '',
    google_maps_link: '',
  });

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.blood_group) {
      alert('Full Name, Email and Blood Group are required');
      return;
    }

    await fetch(`${API_BASE_URL}/api/admin/donors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    alert('Donor added successfully');
    navigate('/admin/donors');
  };

  return (
    <div className="d-flex justify-content-center">
      <div
        className="card shadow-sm"
        style={{ maxWidth: '900px', width: '100%' }}
      >
        <div className="card-body">
          <h2 className="text-center mb-4">Add New Donor</h2>
          <p className="text-center text-muted mb-4">
            Admin can create a new donor account with the same fields as signup.
          </p>

          <form onSubmit={handleSubmit} className="row g-3">
            {/* Full Name / Email */}
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password / Age */}
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="text"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="e.g. donor123"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            {/* Blood group / Mobile */}
            <div className="col-md-6">
              <label className="form-label">Blood Group</label>
              <select
                className="form-select"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                required
              >
                <option value="">Choose...</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                  (bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Mobile</label>
              <input
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <input
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="e.g. Male, Female"
              />
            </div>

            {/* Address line */}
            <div className="col-12">
              <label className="form-label">
                House No. & Street Name (Optional)
              </label>
              <input
                className="form-control"
                name="address_line"
                value={formData.address_line}
                onChange={handleChange}
              />
            </div>

            {/* City / State / Pincode */}
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                className="form-control"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Pincode (Optional)</label>
              <input
                className="form-control"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>

            {/* Maps link */}
            <div className="col-12">
              <label className="form-label">Google Maps Link (Optional)</label>
              <input
                className="form-control"
                name="google_maps_link"
                value={formData.google_maps_link}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 d-flex justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={() => navigate('/admin/donors')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Donor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDonor;
