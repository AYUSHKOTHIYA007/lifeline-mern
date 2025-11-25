import React, { useState } from 'react';

function RequestBlood() {
  const [formData, setFormData] = useState({
    patient_name: '', blood_group: '', units_required: '', hospital_name: '',
    contact_person: '', contact_mobile: '', message: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/request-blood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
      if(response.ok) e.target.reset();
    } catch (error) {
      alert('Request submission failed.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-sm p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Request for Blood</h2>
            <p className="text-muted">Fill out the form below in case of an emergency.</p>
          </div>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="patient_name" className="form-label">Patient Full Name</label>
              <input type="text" className="form-control" id="patient_name" name="patient_name" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="blood_group" className="form-label">Required Blood Group</label>
              <select className="form-select" id="blood_group" name="blood_group" onChange={handleChange} required>
                <option value="">Choose...</option>
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="units_required" className="form-label">Units Required</label>
              <input type="number" className="form-control" id="units_required" name="units_required" min="1" onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label htmlFor="hospital_name" className="form-label">Hospital Name & Address</label>
              <input type="text" className="form-control" id="hospital_name" name="hospital_name" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="contact_person" className="form-label">Contact Person Name</label>
              <input type="text" className="form-control" id="contact_person" name="contact_person" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="contact_mobile" className="form-label">Contact Mobile Number</label>
              <input type="tel" className="form-control" id="contact_mobile" name="contact_mobile" onChange={handleChange} required />
            </div>
            <div className="col-12 text-center mt-4">
              <button type="submit" className="btn btn-lifeline btn-lg">Submit Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RequestBlood;