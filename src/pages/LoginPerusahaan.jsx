import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPerusahaan() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');

  // Register
  const [regCompanyName, setRegCompanyName] = useState('');
  const [regIndustry, setRegIndustry] = useState('Teknologi');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const { loginPerusahaan } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const emailKey = companyEmail.trim().toLowerCase();

    let compData = null;
    try {
      const registered = JSON.parse(localStorage.getItem('ayokerja_registered_perusahaan') || '{}');
      compData = registered[emailKey];
    } catch (err) {
      console.error(err);
    }

    let companyName = compData?.namaPerusahaan;
    let industry = compData?.industri;

    if (!companyName) {
      const domainPart = emailKey.split('@')[1]?.split('.')[0];
      if (domainPart && domainPart !== 'gmail' && domainPart !== 'yahoo') {
        companyName = 'PT ' + domainPart.charAt(0).toUpperCase() + domainPart.slice(1) + ' Indonesia';
        industry = industry || 'Teknologi & Informasi';
      } else {
        companyName = 'PT Google Indonesia';
        industry = industry || 'Teknologi Informasi & SaaS';
      }
    }

    loginPerusahaan({
      namaPerusahaan: companyName,
      email: companyEmail.trim(),
      industri: industry || 'Teknologi & Bisnis Digital',
    });
    navigate('/company-dashboard');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regCompanyName.trim() || !regEmail.trim()) {
      alert('Mohon lengkapi nama perusahaan dan email PIC.');
      return;
    }

    try {
      const registered = JSON.parse(localStorage.getItem('ayokerja_registered_perusahaan') || '{}');
      registered[regEmail.trim().toLowerCase()] = {
        namaPerusahaan: regCompanyName.trim(),
        email: regEmail.trim(),
        industri: regIndustry,
        telepon: regPhone,
        password: regPassword,
      };
      localStorage.setItem('ayokerja_registered_perusahaan', JSON.stringify(registered));

      const compProfiles = JSON.parse(localStorage.getItem('ayokerja_company_profiles') || '{}');
      compProfiles[regEmail.trim().toLowerCase()] = {
        namaPerusahaan: regCompanyName.trim(),
        email: regEmail.trim(),
        industri: regIndustry,
        telepon: regPhone,
        lokasi: 'Jakarta, Indonesia',
        ukuranKaryawan: '50 - 200 Karyawan',
        deskripsi: `${regCompanyName.trim()} adalah entitas bisnis resmi yang membuka peluang rekrutmen melalui portal AYOKERJA!.`,
      };
      localStorage.setItem('ayokerja_company_profiles', JSON.stringify(compProfiles));
    } catch (err) {
      console.error(err);
    }

    alert('Pendaftaran perusahaan berhasil! Silakan masuk dengan akun yang telah didaftarkan.');
    setCompanyEmail(regEmail.trim());
    setCompanyPassword('');
    setActiveTab('login');
  };

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] font-sans antialiased min-h-screen flex flex-col justify-between">
      <header className="w-full bg-gradient-to-r from-[#00193F] to-[#16B3A3] py-4 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/assets/logo.png" alt="AYOKERJA! Logo" className="h-8 w-auto object-contain" />
            <span className="text-xl font-extrabold text-white tracking-wide">AYOKERJA!</span>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-white/15 text-white font-medium">Portal Perusahaan</span>
          </Link>
          <Link to="/" className="text-xs font-semibold text-white/90 hover:text-white flex items-center gap-1.5 transition-colors">
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-[#00193F]">Portal Khusus Perusahaan</h1>
            <p className="text-xs text-slate-500 mt-1">Daftar atau masuk untuk mempublikasikan lowongan &amp; seleksi pelamar</p>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'login' ? 'bg-white text-[#00193F] shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Masuk Perusahaan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'register' ? 'bg-white text-[#00193F] shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Daftar Perusahaan Baru
            </button>
          </div>

          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Resmi Perusahaan / HR</label>
                <input
                  type="email"
                  required
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  placeholder="hr@perusahaan.co.id"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">Kata Sandi Akun Perusahaan</label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Hubungi administrator AYOKERJA! di support@ayokerja.id untuk pemulihan kredensial korporasi.'); }} className="text-[11px] font-semibold text-[#16B3A3] hover:underline">
                    Bantuan Sandi?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  value={companyPassword}
                  onChange={(e) => setCompanyPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#16B3A3] focus:ring-[#16B3A3] border-slate-300" />
                  <span>Ingat kredensial recruiter ini</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm mt-2"
              >
                Masuk ke Dashboard Perusahaan
              </button>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Resmi Perusahaan / PT <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={regCompanyName}
                  onChange={(e) => setRegCompanyName(e.target.value)}
                  placeholder="Contoh: PT Teknologi Bangsa Indonesia"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Bidang Industri <span className="text-red-500">*</span></label>
                  <select
                    value={regIndustry}
                    onChange={(e) => setRegIndustry(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all bg-white text-slate-700"
                  >
                    <option value="Teknologi">Teknologi &amp; Software</option>
                    <option value="Cloud">Cloud &amp; Infra</option>
                    <option value="Desain">Desain &amp; Kreatif</option>
                    <option value="F&B">F&B / Kuliner</option>
                    <option value="Telekomunikasi">Telekomunikasi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">No. Telepon Kantor <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="(021) 555-xxxx"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email PIC / HR Recruiter <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="recruiter@perusahaan.co.id"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Buat Kata Sandi Akun <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimal 8 karakter aman"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input type="checkbox" required defaultChecked className="w-4 h-4 rounded text-[#16B3A3] focus:ring-[#16B3A3] border-slate-300 mt-0.5" />
                <label className="text-[11px] text-slate-500 leading-snug">
                  Saya menyetujui Ketentuan Kemitraan Recruiter &amp; Kebijakan Privasi Rekrutmen Terverifikasi AYOKERJA!.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00193F] hover:bg-[#0A2558] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm mt-2"
              >
                Daftarkan Perusahaan Sekarang
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[11px] text-slate-600">
                Anda seorang pencari kerja / pelamar?
              </p>
              <Link
                to="/login-pelamar"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#00193F]"
              >
                Masuk di Portal Pelamar <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-[#00193F] text-slate-400 py-4 text-center text-xs border-t border-white/10">
        &copy; 2026 AYOKERJA!. Portal Karir & Rekrutmen Terpadu Indonesia.
      </footer>
    </div>
  );
}
