import React from 'react';

function Contact() {
  return (
    <div className="text-center">
      <h1 className="fw-bold">Get In Touch</h1>
      <p className="lead col-md-8 mx-auto">
        We'd love to hear from you. Whether it's a question, a suggestion, or a partnership inquiry, feel free to reach out.
      </p>
      <div className="card shadow-sm p-4 mt-5 col-lg-8 mx-auto">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="fs-2 text-lifeline"><i className="fas fa-map-marker-alt"></i></div>
            <h5 className="mt-2">Address</h5>
            <p>123 LifeLine Street,<br/>Kathodara, Gujarat, 394326</p>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="fs-2 text-lifeline"><i className="fas fa-phone"></i></div>
            <h5 className="mt-2">Phone</h5>
            <p>+91 12345 67890</p>
          </div>
          <div className="col-md-4">
            <div className="fs-2 text-lifeline"><i className="fas fa-envelope"></i></div>
            <h5 className="mt-2">Email</h5>
            <p>contact@lifeline.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;