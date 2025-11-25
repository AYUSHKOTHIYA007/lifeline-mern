import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center p-5 mb-4 bg-light rounded-3">
        <h1 className="display-4 fw-bold">Be a Hero. Donate Blood.</h1>
        <p className="lead col-lg-8 mx-auto">
          Your donation can save up to three lives. Join our community of lifesavers today and make a difference.
        </p>
        <div className="mt-4">
          <Link to="/signup" className="btn btn-lifeline btn-lg me-2">Become a Donor</Link>
          <Link to="/search" className="btn btn-secondary btn-lg">Find a Donor</Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="row text-center g-4 my-5">
        <h2 className="mb-4">How LifeLine Works</h2>
        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-3">
            <div className="fs-1 text-lifeline mb-3"><i className="fas fa-user-plus"></i></div>
            <h5 className="fw-bold">1. Register</h5>
            <p>Create a donor profile with your details and blood group. It's quick, easy, and secure.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-3">
            <div className="fs-1 text-lifeline mb-3"><i className="fas fa-search"></i></div>
            <h5 className="fw-bold">2. Search</h5>
            <p>Those in need can search our database for donors by blood group and location.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-3">
            <div className="fs-1 text-lifeline mb-3"><i className="fas fa-hand-holding-heart"></i></div>
            <h5 className="fw-bold">3. Connect & Save</h5>
            <p>We connect the requester with potential donors, helping to save lives in critical moments.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;