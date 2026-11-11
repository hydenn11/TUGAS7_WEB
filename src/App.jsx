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
import { safeGetStorageItem, safeSetStorageItem } from './utils/storage';

function mergeApiJobs(apiJobs, prevJobs) {
  const apiIds = new Set(apiJobs.map((aj) => aj.id));
  const customJobs = (prevJobs || []).filter((j) => !apiIds.has(j.id));
  const merged = [...apiJobs, ...customJobs];
  safeSetStorageItem('ayokerja_jobs_state', merged);
  return merged;
}

function AppContent() {
  const location = useLocation();

  const [jobs, setJobs] = useState(() => {
    const saved = safeGetStorageItem('ayokerja_jobs_state', null);
    return Array.isArray(saved) && saved.length > 0 ? saved : ALL_JOBS;
  });

  const [loadingJobs, setLoadingJobs] = useState(false);

  // Fetch data lowongan dari mock API /data/jobs.json
  useEffect(() => {
    let isMounted = true;

    const loadJobsFromApi = async () => {
      try {
        setLoadingJobs(true);
        const res = await fetch('/data/jobs.json');
        if (!res.ok) return;
        const apiJobs = await res.json();
        if (isMounted && Array.isArray(apiJobs) && apiJobs.length > 0) {
          setJobs((prevJobs) => mergeApiJobs(apiJobs, prevJobs));
        }
      } catch (err) {
        console.warn('Gagal memuat /data/jobs.json, fallback ke state lokal:', err);
      } finally {
        if (isMounted) setLoadingJobs(false);
      }
    };

    void loadJobsFromApi();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    safeSetStorageItem('ayokerja_jobs_state', jobs);
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
          <Route path="/jobs" element={<Lowongan jobs={jobs} loadingJobs={loadingJobs} />} />
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
