import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#00193F] text-slate-400 pt-14 pb-8 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <img src="/assets/logo.png" alt="AYOKERJA! Logo" className="h-8 w-auto object-contain" />
              <span className="text-xl font-black text-white tracking-wide">AYOKERJA!</span>
            </Link>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Platform rekrutmen &amp; penyaluran kerja terpercaya. Menghubungkan talenta berkualitas dengan perusahaan
              impian di seluruh Indonesia.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-3">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="text-[#CBD5E1] hover:text-[#5EEAD4] transition-colors">Beranda</Link></li>
              <li><Link to="/jobs" className="text-[#CBD5E1] hover:text-[#5EEAD4] transition-colors">Lowongan Kerja</Link></li>
              <li><Link to="/companies" className="text-[#CBD5E1] hover:text-[#5EEAD4] transition-colors">Daftar Perusahaan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-3">Untuk Perusahaan</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login-perusahaan" className="text-[#CBD5E1] hover:text-[#5EEAD4] transition-colors">Pasang Lowongan</Link></li>
              <li><Link to="/login-perusahaan" className="text-[#CBD5E1] hover:text-[#5EEAD4] transition-colors">Pendaftaran Recruiter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-3">Kontak &amp; Bantuan</h4>
            <address className="not-italic text-xs text-[#CBD5E1] space-y-2 leading-relaxed">
              <p>Email: <a href="mailto:support@ayokerja.id" className="hover:text-[#5EEAD4] transition-colors">support@ayokerja.id</a></p>
              <p>Telepon: +6281234567891</p>
              <p>Jakarta &amp; Surabaya, Indonesia</p>
            </address>
          </div>

        </div>

        <div className="pt-6 border-t border-white/10 text-center text-xs text-slate-500">
          &copy; 2026 AYOKERJA!. Seluruh hak cipta dilindungi undang-undang.
        </div>
      </div>
    </footer>
  );
}
