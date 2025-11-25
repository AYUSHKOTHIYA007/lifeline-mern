import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './admin/AdminLayout';

// User Pages
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Search from './components/Search';
import RequestBlood from './components/RequestBlood';
import Profile from './components/Profile';
import WhyDonate from './components/WhyDonate';
import About from './components/About';
import Contact from './components/Contact';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import ManageDonors from './admin/ManageDonors';
import ManageRequests from './admin/ManageRequests';
import StockReport from './admin/StockReport';
import ManageDonations from './admin/ManageDonations';
import AddDonor from './admin/AddDonor';   // ✅ NEW

// Wrap user pages with navbar + footer
const UserPages = ({ children }) => (
  <>
    <Navbar />
    <main className="container py-4">{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- User Routes --- */}
        <Route path="/" element={<UserPages><Home /></UserPages>} />
        <Route path="/signup" element={<UserPages><Register /></UserPages>} />
        <Route path="/login" element={<UserPages><Login /></UserPages>} />
        <Route path="/search" element={<UserPages><Search /></UserPages>} />
        <Route path="/request-blood" element={<UserPages><RequestBlood /></UserPages>} />
        <Route path="/profile" element={<UserPages><Profile /></UserPages>} />
        <Route path="/why-donate" element={<UserPages><WhyDonate /></UserPages>} />
        <Route path="/about" element={<UserPages><About /></UserPages>} />
        <Route path="/contact" element={<UserPages><Contact /></UserPages>} />

        {/* --- Admin Login (no layout) --- */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* --- Admin Routes (with AdminLayout) --- */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/donors"
          element={
            <AdminLayout>
              <ManageDonors />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/donors/add"
          element={
            <AdminLayout>
              <AddDonor />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/donations"
          element={
            <AdminLayout>
              <ManageDonations />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <AdminLayout>
              <ManageRequests />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/stock"
          element={
            <AdminLayout>
              <StockReport />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
