import React, { useState } from 'react';

function Search() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [donors, setDonors] = useState([]);
  const [stock, setStock] = useState(null);
  const [searched, setSearched] = useState(false);

  const API_BASE_URL = "http://localhost:5000";

  // Fetch Lifeline Stock
  const fetchStock = async (group) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/stock`);
      const data = await response.json();
      const found = data.find((s) => s.blood_group === group);
      setStock(found || null);
    } catch (error) {
      console.error("Error loading stock:", error);
    }
  };

  // Search Donors
  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${API_BASE_URL}/api/search?blood_group=${bloodGroup}&address=${address}`
    );
    const data = await response.json();
    setDonors(data);
    setSearched(true);

    if (bloodGroup) fetchStock(bloodGroup);
  };

  // Helper: format address + map link
  const getAddressInfo = (donor) => {
    const parts = [
      donor.address_line,
      donor.city,
      donor.state,
      donor.pincode,
    ].filter(Boolean);

    const fullAddress = parts.join(", ") || donor.address || "Address not available";

    const mapHref =
      donor.google_maps_link && donor.google_maps_link.trim() !== ""
        ? donor.google_maps_link
        : fullAddress !== "Address not available"
        ? `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`
        : null;

    return { fullAddress, mapHref };
  };

  return (
    <div className="text-center">
      <h1 className="fw-bold">Find a Blood Donor</h1>
      <p className="lead text-muted col-md-8 mx-auto">
        Search for available donors by blood group and location.
      </p>

      {/* Search Form */}
      <div className="card shadow-sm p-4 mt-4 col-lg-10 mx-auto">
        <form onSubmit={handleSearch} className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label text-start w-100">Blood Group</label>
            <select
              className="form-select"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="">Any</option>
              <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
            </select>
          </div>

          <div className="col-md-5">
            <label className="form-label text-start w-100">City or State</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Surat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-lifeline">
              <i className="fas fa-search me-1"></i> Search
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5 col-lg-10 mx-auto">

        {/* BEFORE SEARCH */}
        {!searched && (
          <div className="alert alert-info">Please use the form above to search for donors.</div>
        )}

        {/* NO DONORS */}
        {searched && donors.length === 0 && (
          <div className="alert alert-warning">No donors found matching your criteria.</div>
        )}

        {/* DONOR LIST */}
        {searched && donors.length > 0 && (
          <div>
            <h4 className="fw-bold mb-3 text-start">Available Donors</h4>

            <div className="row g-4">
              {donors.map((donor) => {
                const { fullAddress, mapHref } = getAddressInfo(donor);

                return (
                  <div className="col-md-6 col-lg-4" key={donor._id}>
                    <div className="card h-100 text-center shadow-sm border-0">
                      <div className="card-body">

                        {/* Blood Group */}
                        <div className="mb-2">
                          <span className="badge bg-danger p-2 fs-5">
                            {donor.blood_group}
                          </span>
                        </div>

                        <h5 className="fw-bold mt-3">{donor.name}</h5>

                        {/* Address */}
                        <p className="text-muted">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          {fullAddress}
                        </p>

                        {/* Phone */}
                        <p>
                          <i className="fas fa-phone me-2"></i>
                          {donor.mobile}
                        </p>

                        {/* Google Maps */}
                        {mapHref && (
                          <a
                            href={mapHref}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline-secondary btn-sm"
                          >
                            View on Maps
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LIFELINE STOCK CARD */}
        {bloodGroup && stock && (
          <div className="mt-5">
            <h4 className="fw-bold text-start">Lifeline Blood Bank Stock</h4>

            <div className="row g-4 mt-1">
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 text-center shadow-sm border-0">
                  <div className="card-body">

                    <div className="mb-2">
                      <span className="badge bg-danger p-2 fs-5">
                        {stock.blood_group}
                      </span>
                    </div>

                    <h5 className="fw-bold mt-3">Lifeline Blood Bank</h5>

                    <p className="text-muted">
                      <i className="fas fa-tint me-2 text-danger"></i>
                      {stock.units} Unit(s) Available
                    </p>

                    <p className="mb-1">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      Lifeline Blood Center
                    </p>

                    <p>
                      <i className="fas fa-phone me-2"></i>
                      +91 98765 43210
                    </p>

                    <a
                      href="https://maps.google.com/?q=Lifeline Blood Bank"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-secondary btn-sm mt-2"
                    >
                      View on Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Search;
