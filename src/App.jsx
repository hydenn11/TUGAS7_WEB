import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Beranda from './pages/Beranda';
import Lowongan from './pages/Lowongan';
import Perusahaan from './pages/Perusahaan';
import LoginPelamar from './pages/LoginPelamar';
import LoginPerusahaan from './pages/LoginPerusahaan';
import ProfilePelamar from './pages/ProfilePelamar';
import DashboardPerusahaan from './pages/DashboardPerusahaan';
import LowonganApi from './pages/LowonganApi';

import { ALL_JOBS } from './data/jobsList';

function AppContent() {
  const location = useLocation();

  const [jobs] = useState(() => {
    const saved = localStorage.getItem('ayokerja_jobs_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Gagal parsing local storage jobs:', e);
      }
    }
    return ALL_JOBS;
  });

  useEffect(() => {
    localStorage.setItem('ayokerja_jobs_state', JSON.stringify(jobs));
  }, [jobs]);

  const isDedicatedAuthOrDashboard =
    location.pathname === '/login-pelamar' ||
    location.pathname === '/login-perusahaan' ||
    location.pathname === '/company-dashboard';

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      {!isDedicatedAuthOrDashboard && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/jobs" element={<Lowongan jobs={jobs} />} />
          <Route path="/lowongan-api" element={<LowonganApi />} />
          <Route path="/companies" element={<Perusahaan />} />
          <Route path="/login-pelamar" element={<LoginPelamar />} />
          <Route path="/login-perusahaan" element={<LoginPerusahaan />} />
          <Route path="/profile" element={<ProfilePelamar />} />
          <Route path="/company-dashboard" element={<DashboardPerusahaan />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isDedicatedAuthOrDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
