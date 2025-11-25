import React from 'react';
import { Link } from 'react-router-dom';

function WhyDonate() {
  return (
    <div className="card shadow-sm p-4 p-md-5">
      <div className="row align-items-center">
        {/* Left Side Image */}
        <div className="col-md-6 mb-4 mb-md-0">
          {/* Using a placeholder image that matches the style */}
          <img 
            src="/imges/smiling_man.png"  
            alt="Smiling blood donor" 
            className="img-fluid rounded" 
          />
          
        </div>

        {/* Right Side Text Content */}
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">Why Your Donation Matters</h1>

          <h5 className="fw-bold mt-4">💖 A Single Donation Can Save Three Lives</h5>
          <p className="text-muted">
            Your one act of kindness can be separated into red blood cells, plasma, and platelets—helping up to three people in need.
          </p>

          <h5 className="fw-bold mt-4">🏥 Essential for Medical Treatments</h5>
          <ul className="list-unstyled text-muted">
            <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i><strong>Emergency & Trauma:</strong> For victims of accidents, burns, and disasters.</li>
            <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i><strong>Surgery Support:</strong> To replace lost blood during major operations.</li>
            <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i><strong>Cancer & Chemotherapy:</strong> Patients often need transfusions.</li>
            <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i><strong>Chronic Illnesses:</strong> For conditions like sickle cell anemia.</li>
          </ul>

          <h5 className="fw-bold mt-4">💪 Benefits for Donors</h5>
          <p className="text-muted">
            Reduce harmful iron stores, refresh your body, and receive a free mini health check-up every time you donate.
          </p>

          <div className="mt-4">
            <Link to="/signup" className="btn btn-lifeline btn-lg">Become a Lifesaver Today</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhyDonate;