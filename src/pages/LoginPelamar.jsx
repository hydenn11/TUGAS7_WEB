import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  authenticatePelamar,
  registerPelamarAccount,
} from '../utils/authService';
import { AuthAlert } from '../components/AuthFeedback';

export default function LoginPelamar() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') === 'register' ? 'register' : 'login'
  );
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'register' || tabParam === 'login') {
      setActiveTab((prev) => (prev !== tabParam ? tabParam : prev));
    }
  }, [searchParams]);

  // Register fields
  const [regUsername, setRegUsername] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const { loginPelamar } = useAuth();
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
      const account = await authenticatePelamar(loginEmail, loginPassword);
      loginPelamar(account);
      navigate('/profile');
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Gagal memverifikasi akun pelamar. Silakan coba lagi.',
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
      const userData = await registerPelamarAccount({
        username: regUsername,
        fullName: regFullName,
        email: regEmail,
        passwordInput: regPassword,
      });

      setLoginEmail(userData.email || userData.username);
      setLoginPassword('');
      setRegUsername('');
      setRegFullName('');
      setRegEmail('');
      setRegPassword('');
      setActiveTab('login');
      setFeedback({
        type: 'success',
        message: `Pendaftaran akun atas nama ${userData.nama} berhasil! Silakan masuk dengan kata sandi Anda.`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Pendaftaran akun gagal. Periksa kembali data Anda.',
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
          </Link>
          <Link to="/" className="text-xs font-semibold text-white/90 hover:text-white flex items-center gap-1.5 transition-colors">
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-[#00193F]">
              {activeTab === 'login' ? 'Masuk Akun Pelamar' : 'Daftar Akun Pelamar Baru'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {activeTab === 'login'
                ? 'Akses jutaan lowongan kerja terverifikasi dan kelola resume Anda'
                : 'Lengkapi biodata diri untuk mulai melamar pekerjaan impian Anda'}
            </p>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => handleTabSwitch('login')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'login' ? 'bg-white text-[#00193F] shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('register')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'register' ? 'bg-white text-[#00193F] shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Daftar Akun Baru
            </button>
          </div>

          <AuthAlert feedback={feedback} onDismiss={() => setFeedback(null)} />

          {activeTab === 'login' && (
            <form onSubmit={(e) => { void handleLoginSubmit(e); }} className="space-y-4">
              <div>
                <label htmlFor="loginEmailPelamar" className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Email atau Username</label>
                <input
                  id="loginEmailPelamar"
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="nama@email.com atau username"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="loginPasswordPelamar" className="block text-xs font-bold text-slate-700">Kata Sandi</label>
                  <button
                    type="button"
                    onClick={() =>
                      setFeedback({
                        type: 'info',
                        message: 'Gunakan akun yang sudah terdaftar atau buat akun baru melalui tab "Daftar Akun Baru".',
                      })
                    }
                    className="text-[11px] font-semibold text-[#16B3A3] hover:underline"
                  >
                    Lupa Sandi?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="loginPasswordPelamar"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
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
                <label htmlFor="rememberMePelamar" className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input id="rememberMePelamar" type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#16B3A3] focus:ring-[#16B3A3] border-slate-300 cursor-pointer" />
                  <span>Ingat saya di perangkat ini</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#16B3A3] hover:bg-[#109485] disabled:opacity-60 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting && <i className="fa-solid fa-spinner fa-spin"></i>}
                <span>{isSubmitting ? 'Memverifikasi Akun...' : 'Masuk Sekarang Sebagai Pelamar'}</span>
              </button>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={(e) => { void handleRegisterSubmit(e); }} className="space-y-3.5">
              <div>
                <label htmlFor="regUsernamePelamar" className="block text-xs font-bold text-slate-700 mb-1.5">Username Pelamar *</label>
                <input
                  id="regUsernamePelamar"
                  type="text"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="contoh: daniramadh47"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div>
                <label htmlFor="regFullNamePelamar" className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap Sesuai KTP *</label>
                <input
                  id="regFullNamePelamar"
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="Luthfi Ramadhan"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div>
                <label htmlFor="regEmailPelamar" className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Email Aktif *</label>
                <input
                  id="regEmailPelamar"
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div>
                <label htmlFor="regPasswordPelamar" className="block text-xs font-bold text-slate-700 mb-1.5">Kata Sandi Baru *</label>
                <input
                  id="regPasswordPelamar"
                  type="password"
                  required
                  minLength={6}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min. 6 karakter"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                Dengan mendaftar, Anda menyetujui Syarat &amp; Ketentuan serta Kebijakan Privasi platform AYOKERJA!.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#16B3A3] hover:bg-[#109485] disabled:opacity-60 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting && <i className="fa-solid fa-spinner fa-spin"></i>}
                <span>{isSubmitting ? 'Mendaftarkan Akun...' : 'Daftar Akun Pelamar Sekarang'}</span>
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-2">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[11px] text-slate-600">
                Apakah Anda perwakilan perusahaan / Recruiter?
              </p>
              <Link
                to="/login-perusahaan"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#00193F]"
              >
                Masuk di Portal Perusahaan <i className="fa-solid fa-arrow-right text-[10px]"></i>
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
