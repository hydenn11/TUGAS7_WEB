import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PeringatanWajibLogin({
  isOpen,
  onClose,
  title = 'Masuk ke Akun Pelamar',
  message = 'Silakan masuk ke akun pelamar Anda terlebih dahulu untuk melanjutkan aksi ini.',
  actionType = 'apply', // 'apply' | 'save' | 'general'
  jobTitle = '',
  companyName = '',
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center transform transition-all animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
          aria-label="Tutup"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <div className="w-16 h-16 rounded-2xl bg-[#CCFBF1] text-[#16B3A3] flex items-center justify-center mx-auto mb-4 border border-[#99F6E4] shadow-sm">
          {actionType === 'save' ? (
            <i className="fa-solid fa-bookmark text-2xl"></i>
          ) : (
            <i className="fa-solid fa-user-lock text-2xl"></i>
          )}
        </div>

        <h3 className="text-xl font-extrabold text-[#00193F] mb-2">{title}</h3>

        {jobTitle && companyName ? (
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 mb-4 text-left">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
              {actionType === 'save' ? 'Simpan Lowongan' : 'Melamar Posisi'}
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#00193F] truncate">{jobTitle}</p>
            <p className="text-xs text-slate-500 font-medium truncate">{companyName}</p>
          </div>
        ) : null}

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {message}
        </p>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/login-pelamar');
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-right-to-bracket text-xs"></i>
            Masuk Akun Pelamar Sekarang
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/login-pelamar?tab=register');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-user-plus text-xs"></i>
            Belum Punya Akun? Daftar Baru
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Nanti Saja
          </button>
        </div>
      </div>
    </div>
  );
}
