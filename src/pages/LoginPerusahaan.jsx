import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  authenticatePerusahaan,
  registerPerusahaanAccount,
} from '../utils/authService';
import { AuthAlert } from '../components/AuthFeedback';

export default function LoginPerusahaan() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Register
  const [regCompanyName, setRegCompanyName] = useState('');
  const [regIndustry, setRegIndustry] = useState('Teknologi');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const { loginPerusahaan } = useAuth();
  const navigate = useNavigate();

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setFeedback(null);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const companyData = await authenticatePerusahaan(companyEmail, companyPassword);
      loginPerusahaan(companyData);
      navigate('/company-dashboard');
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Gagal masuk ke portal perusahaan. Periksa email dan kata sandi.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const savedCompany = await registerPerusahaanAccount({
        companyName: regCompanyName,
        industry: regIndustry,
        phone: regPhone,
        email: regEmail,
        passwordInput: regPassword,
      });

      setCompanyEmail(savedCompany.email);
      setCompanyPassword('');
      setRegCompanyName('');
      setRegPhone('');
      setRegEmail('');
      setRegPassword('');
      setActiveTab('login');
      setFeedback({
        type: 'success',
        message: `Pendaftaran ${savedCompany.namaPerusahaan} berhasil! Silakan masuk dengan akun yang baru didaftarkan.`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Pendaftaran perusahaan gagal. Periksa kembali data yang diinput.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
              onClick={() => handleTabSwitch('login')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'login' ? 'bg-white text-[#00193F] shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Masuk Perusahaan
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('register')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'register' ? 'bg-white text-[#00193F] shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Daftar Perusahaan Baru
            </button>
          </div>

          <AuthAlert feedback={feedback} onDismiss={() => setFeedback(null)} />

          {activeTab === 'login' && (
            <form onSubmit={(e) => { void handleLoginSubmit(e); }} className="space-y-4">
              <div>
                <label htmlFor="companyEmailInput" className="block text-xs font-bold text-slate-700 mb-1.5">Email Resmi Perusahaan / HR</label>
                <input
                  id="companyEmailInput"
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
                  <label htmlFor="companyPasswordInput" className="block text-xs font-bold text-slate-700">Kata Sandi Akun Perusahaan</label>
                  <button
                    type="button"
                    onClick={() =>
                      setFeedback({
                        type: 'info',
                        message: 'Hubungi administrator di support@ayokerja.id atau daftarkan perusahaan melalui tab "Daftar Perusahaan Baru".',
                      })
                    }
                    className="text-[11px] font-semibold text-[#16B3A3] hover:underline"
                  >
                    Bantuan Sandi?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="companyPasswordInput"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={companyPassword}
                    onChange={(e) => setCompanyPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label htmlFor="rememberCompanyCreds" className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input id="rememberCompanyCreds" type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#16B3A3] focus:ring-[#16B3A3] border-slate-300 cursor-pointer" />
                  <span>Ingat kredensial recruiter ini</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#16B3A3] hover:bg-[#109485] disabled:opacity-60 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting && <i className="fa-solid fa-spinner fa-spin"></i>}
                <span>{isSubmitting ? 'Memverifikasi Akun...' : 'Masuk ke Dashboard Perusahaan'}</span>
              </button>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={(e) => { void handleRegisterSubmit(e); }} className="space-y-4">
              <div>
                <label htmlFor="regCompanyName" className="block text-xs font-bold text-slate-700 mb-1.5">Nama Resmi Perusahaan / PT <span className="text-red-500">*</span></label>
                <input
                  id="regCompanyName"
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
                  <label htmlFor="regIndustrySelect" className="block text-xs font-bold text-slate-700 mb-1.5">Bidang Industri <span className="text-red-500">*</span></label>
                  <select
                    id="regIndustrySelect"
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
                  <label htmlFor="regPhoneInput" className="block text-xs font-bold text-slate-700 mb-1.5">No. Telepon Kantor <span className="text-red-500">*</span></label>
                  <input
                    id="regPhoneInput"
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
                <label htmlFor="regCompanyEmailInput" className="block text-xs font-bold text-slate-700 mb-1.5">Email PIC / HR Recruiter <span className="text-red-500">*</span></label>
                <input
                  id="regCompanyEmailInput"
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="recruiter@perusahaan.co.id"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div>
                <label htmlFor="regCompanyPasswordInput" className="block text-xs font-bold text-slate-700 mb-1.5">Buat Kata Sandi Akun <span className="text-red-500">*</span></label>
                <input
                  id="regCompanyPasswordInput"
                  type="password"
                  required
                  minLength={6}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimal 6 karakter aman"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input id="agreePartnerTermsCheck" type="checkbox" required defaultChecked className="w-4 h-4 rounded text-[#16B3A3] focus:ring-[#16B3A3] border-slate-300 mt-0.5 cursor-pointer" />
                <label htmlFor="agreePartnerTermsCheck" className="text-[11px] text-slate-500 leading-snug cursor-pointer">
                  Saya menyetujui Ketentuan Kemitraan Recruiter &amp; Kebijakan Privasi Rekrutmen Terverifikasi AYOKERJA!.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#00193F] hover:bg-[#0A2558] disabled:opacity-60 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting && <i className="fa-solid fa-spinner fa-spin"></i>}
                <span>{isSubmitting ? 'Mendaftarkan Perusahaan...' : 'Daftarkan Perusahaan Sekarang'}</span>
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
        &copy; 2026 AYOKERJA!. Portal Karir &amp; Rekrutmen Terpadu Indonesia.
      </footer>
    </div>
  );
}
