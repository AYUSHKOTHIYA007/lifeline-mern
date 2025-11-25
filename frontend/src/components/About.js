import React from 'react';

function About() {
  return (
    <div className="text-center">
      <h1 className="fw-bold mb-3">About LifeLine</h1>
      <p className="lead mb-5 col-md-8 mx-auto">
        Connecting donors, saving lives. Our mission is to build a community-driven platform to make blood donation simple, accessible, and efficient.
      </p>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100">
            <h3 className="fw-bold text-lifeline">Our Mission</h3>
            <p>Our primary goal is to bridge the gap between blood donors and recipients. In critical moments, finding the right blood type can be a challenge. LifeLine aims to create a reliable, on-demand network of volunteer donors who are ready to step up and save a life.</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100">
            <h3 className="fw-bold text-lifeline">Our Vision</h3>
            <p>We envision a world where no one suffers due to a shortage of blood. By fostering a culture of regular, voluntary blood donation, we hope to ensure that safe blood is always available for those in need. LifeLine is more than just an app; it's a movement to inspire heroism in everyday life.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;