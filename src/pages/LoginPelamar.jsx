import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPelamar() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') === 'register' ? 'register' : 'login'
  );
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'register' || tabParam === 'login') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Register fields
  const [regUsername, setRegUsername] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const { loginPelamar } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const registeredUsers = JSON.parse(localStorage.getItem('ayokerja_registered_pelamar') || '{}');
    const key = loginEmail.trim().toLowerCase();
    const existing = registeredUsers[key];

    loginPelamar({
      nama: existing ? existing.nama : (loginEmail.includes('@') ? loginEmail.split('@')[0] : loginEmail),
      email: existing ? existing.email : (loginEmail.includes('@') ? loginEmail : `${loginEmail}@ayokerja.id`),
    });
    alert(`Selamat Datang kembali! Mengarahkan ke halaman profil pelamar...`);
    navigate('/profile');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const registeredUsers = JSON.parse(localStorage.getItem('ayokerja_registered_pelamar') || '{}');
    const userData = {
      nama: regFullName,
      email: regEmail,
      username: regUsername,
    };
    if (regEmail) registeredUsers[regEmail.trim().toLowerCase()] = userData;
    if (regUsername) registeredUsers[regUsername.trim().toLowerCase()] = userData;
    localStorage.setItem('ayokerja_registered_pelamar', JSON.stringify(registeredUsers));

    alert(`Pendaftaran Akun Pelamar atas nama ${regFullName} Berhasil!\nSilahkan masuk pada halaman masuk untuk melanjutkan.`);
    setLoginEmail(regEmail || regUsername);
    setLoginPassword('');
    setActiveTab('login');
  };

  const handleGoogleLogin = () => {
    loginPelamar({
      nama: 'Luthfi Ramadhan (Google Account)',
      email: 'daniramadh47@gmail.com',
    });
    alert('Autentikasi Akun Google Berhasil! Mengarahkan ke halaman profil...');
    navigate('/profile');
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
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'login' ? 'bg-white text-[#00193F] shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'register' ? 'bg-white text-[#00193F] shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Daftar Akun Baru
            </button>
          </div>

          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Email atau Username</label>
                <input
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
                  <label className="block text-xs font-bold text-slate-700">Kata Sandi</label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Instruksi pemulihan kata sandi telah dikirim ke email terdaftar.'); }} className="text-[11px] font-semibold text-[#16B3A3] hover:underline">
                    Lupa Sandi?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#16B3A3] focus:ring-[#16B3A3] border-slate-300" />
                  <span>Ingat saya di perangkat ini</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm mt-2"
              >
                Masuk Sekarang Sebagai Pelamar
              </button>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Username Pelamar *</label>
                <input
                  type="text"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="contoh: daniramadh47"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap Sesuai KTP *</label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="Luthfi Ramadhan"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Email Aktif *</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Kata Sandi Baru *</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min. 8 karakter"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all"
                />
              </div>

              <div className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                Dengan mendaftar, Anda menyetujui <a href="#" className="text-[#16B3A3] underline">Syarat &amp; Ketentuan</a> serta Kebijakan Privasi platform AYOKERJA!.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm mt-2"
              >
                Daftar Akun Pelamar Sekarang
              </button>
            </form>
          )}

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative px-3 bg-white text-[11px] text-slate-400 font-medium">atau masuk dengan</span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors"
          >
            <img src="/assets/company-google.png" alt="Google" className="w-4 h-4 object-contain" />
            Lanjutkan dengan Google
          </button>

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
        &copy; 2026 AYOKERJA!. Portal Karir & Rekrutmen Terpadu Indonesia.
      </footer>
    </div>
  );
}
