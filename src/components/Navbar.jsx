import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, savedJobIds, appliedJobs } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    alert('Anda telah berhasil keluar dari akun.');
    navigate('/login-pelamar');
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-white font-bold text-sm border-b-2 border-white pb-1'
      : 'text-white/90 hover:text-white text-sm font-medium transition-colors';

  return (
    <header className="w-full bg-gradient-to-r from-[#00193F] to-[#16B3A3] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/logo.png"
              alt="AYOKERJA! Logo"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-extrabold text-white tracking-wide">AYOKERJA!</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <NavLink to="/" className={navLinkClass}>
              Beranda
            </NavLink>
            <NavLink to="/jobs" className={navLinkClass}>
              Lowongan Kerja
            </NavLink>
            <NavLink to="/companies" className={navLinkClass}>
              Daftar Perusahaan
            </NavLink>
            <NavLink to="/lowongan-api" className={navLinkClass}>
              Lowongan Global
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 bg-white/15 hover:bg-white/25 text-white pl-2 pr-3 py-1.5 rounded-xl border border-white/25 transition-colors cursor-pointer focus:outline-none"
                  title="Menu Profil"
                >
                  <div className="w-7 h-7 rounded-full bg-[#16B3A3] text-white flex items-center justify-center font-bold text-xs ring-2 ring-white overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <i className="fa-solid fa-user"></i>
                    )}
                  </div>
                  <i className="fa-solid fa-bars text-xs"></i>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-slate-800">
                    <div className="px-4 py-2">
                      <p className="text-[11px] text-slate-400">Masuk sebagai:</p>
                      <p className="text-xs font-bold text-[#00193F] truncate">{user.nama || user.namaPerusahaan}</p>
                    </div>

                    {user.role === 'pelamar' ? (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700"
                        >
                          Profil
                        </Link>
                        <Link
                          to="/jobs?filter=saved"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center justify-between px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700"
                        >
                          <span>Lowongan Tersimpan</span>
                          <span className="text-xs text-slate-400 font-semibold">
                            {savedJobIds.length}
                          </span>
                        </Link>
                        <Link
                          to="/jobs?filter=applied"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center justify-between px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700"
                        >
                          <span>Riwayat Lamaran</span>
                          <span className="text-xs text-slate-400 font-semibold">
                            {appliedJobs.length}
                          </span>
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/company-dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-slate-700"
                      >
                        Dashboard Perusahaan
                      </Link>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login-pelamar"
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-white/15 border border-white/30 hover:bg-white/25 transition-colors"
                >
                  Masuk Pelamar
                </Link>
                <Link
                  to="/login-perusahaan"
                  className="px-4 py-2 rounded-lg text-xs font-bold text-[#00193F] bg-white hover:bg-slate-100 shadow-sm transition-colors"
                >
                  Masuk Perusahaan
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#00193F] border-t border-white/15 px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-bold text-white hover:bg-white/10"
          >
            Beranda
          </NavLink>
          <NavLink
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10"
          >
            Lowongan Kerja
          </NavLink>
          <NavLink
            to="/companies"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10"
          >
            Daftar Perusahaan
          </NavLink>
          <NavLink
            to="/lowongan-api"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10"
          >
            Lowongan Global
          </NavLink>

          <div className="pt-3 border-t border-white/10 space-y-2">
            {user ? (
              <>
                <div className="px-3 py-2 bg-white/10 rounded-xl text-white text-xs">
                  <p className="text-[11px] text-teal-200">Masuk sebagai:</p>
                  <p className="font-bold text-white text-sm">{user.nama || user.namaPerusahaan}</p>
                </div>
                {user.role === 'pelamar' ? (
                  <div className="space-y-1.5">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-2.5 text-center text-xs text-white bg-[#16B3A3] hover:bg-[#109485] rounded-xl font-bold transition-colors"
                    >
                      Profil Saya
                    </Link>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        to="/jobs?filter=saved"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 px-3 text-center text-xs text-amber-300 bg-amber-500/20 border border-amber-400/30 rounded-xl font-bold flex items-center justify-center gap-1.5"
                      >
                        <i className="fa-solid fa-bookmark text-[10px]"></i>
                        <span>Tersimpan ({savedJobIds.length})</span>
                      </Link>
                      <Link
                        to="/jobs?filter=applied"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 px-3 text-center text-xs text-teal-200 bg-teal-500/20 border border-teal-400/30 rounded-xl font-bold flex items-center justify-center gap-1.5"
                      >
                        <i className="fa-solid fa-clipboard-check text-[10px]"></i>
                        <span>Lamaran ({appliedJobs.length})</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/company-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-2.5 text-center text-xs text-white bg-[#16B3A3] hover:bg-[#109485] rounded-xl font-bold transition-colors"
                  >
                    Dashboard Perusahaan
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full py-2.5 text-center text-xs text-rose-300 bg-rose-500/20 hover:bg-rose-500/30 rounded-xl font-bold transition-colors"
                >
                  Keluar
                </button>
              </>
            ) : (
              <div className="flex gap-2.5 pt-1">
                <Link
                  to="/login-pelamar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center text-xs text-white bg-white/15 border border-white/25 hover:bg-white/20 rounded-xl font-semibold transition-colors"
                >
                  Masuk Pelamar
                </Link>
                <Link
                  to="/login-perusahaan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center text-xs text-[#00193F] bg-white hover:bg-slate-100 rounded-xl font-bold shadow-sm transition-colors"
                >
                  Masuk Perusahaan
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
