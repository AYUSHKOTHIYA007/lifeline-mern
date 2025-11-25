import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    blood_group: '',
    gender: '',
    mobile: '',
    // New separate address fields based on the UI image
    house_street: '',
    city: '',
    state: '',
    pincode: '',
    google_maps_link: '',
    // Terms and Conditions checkbox state
    agreed_to_terms: false,
  });
  const navigate = useNavigate();

  // Handle changes for text/select inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle change for the checkbox
  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreed_to_terms) {
        alert('You must agree to the terms and conditions to sign up.');
        return;
    }

    // Destructure to remove agreed_to_terms from the payload if your backend doesn't expect it
    const { agreed_to_terms, ...dataToSend } = formData;

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    // The container classes match the structure in the existing code
    <div className="row justify-content-center">
      <div className="col-lg-8 col-md-10">
        <div className="card shadow-sm p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Donor Signup</h2>
            <p className="text-muted">Create your account to become a lifesaver.</p>
          </div>
          <form onSubmit={handleSubmit} className="row g-3">
            {/* --- User Details Section --- */}
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="email" name="email" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="age" className="form-label">Age</label>
              <input type="number" className="form-control" id="age" name="age" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="blood_group" className="form-label">Blood Group</label>
              <select className="form-select" id="blood_group" name="blood_group" onChange={handleChange} required>
                <option value="">Choose...</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="mobile" className="form-label">Mobile</label>
              <input type="tel" className="form-control" id="mobile" name="mobile" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">Gender</label>
              <input type="text" className="form-control" id="gender" name="gender" placeholder="e.g., Male, Female" onChange={handleChange} required />
            </div>
            {/* Added an empty column for layout alignment in the image */}
            <div className="col-md-6"></div>


            {/* --- Address Details Section --- */}
            <div className="col-12 mt-4">
              <h5 className="fw-bold">Address Details</h5>
            </div>
            <div className="col-12">
              <label htmlFor="house_street" className="form-label">House No. & Street Name (Optional)</label>
              <input type="text" className="form-control" id="house_street" name="house_street" onChange={handleChange} />
            </div>
            <div className="col-md-5">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="form-control" id="city" name="city" onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <input type="text" className="form-control" id="state" name="state" onChange={handleChange} required />
            </div>
            <div className="col-md-3">
              <label htmlFor="pincode" className="form-label">Pincode (Optional)</label>
              <input type="text" className="form-control" id="pincode" name="pincode" onChange={handleChange} />
            </div>
            <div className="col-12">
              <label htmlFor="google_maps_link" className="form-label">Google Maps Link (Optional)</label>
              <input type="url" className="form-control" id="google_maps_link" name="google_maps_link" onChange={handleChange} />
              <div className="form-text text-muted">If possible, please share a Google Maps link to your address.</div>
            </div>

            {/* --- Terms & Sign Up Button --- */}
            <div className="col-12 mt-4">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="agreed_to_terms" name="agreed_to_terms" checked={formData.agreed_to_terms} onChange={handleCheckboxChange} required />
                    <label className="form-check-label" htmlFor="agreed_to_terms">
                        I agree to the <Link to="/terms" className="text-lifeline">terms and conditions</Link> and confirm I am eligible to donate blood.
                    </label>
                </div>
            </div>

            <div className="col-12 text-center mt-4">
              <button type="submit" className="btn btn-lifeline btn-lg">Sign Up</button>
            </div>
            
            {/* --- Login Link --- */}
            <div className="col-12 text-center mt-3">
              <p className="text-muted">Already have an account? <Link to="/login" className="text-lifeline">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;