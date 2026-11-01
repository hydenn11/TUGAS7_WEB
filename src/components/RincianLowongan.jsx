import React from 'react';
import { getJobDetail } from '../data/jobsList';

export default function RincianLowongan({ isOpen, job, onClose, onApply, onSave, isSaved, isApplied }) {
  if (!isOpen || !job) return null;

  const detail = getJobDetail(job);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          title="Tutup"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <div className="flex items-start gap-4 pr-8">
          <img
            src={detail.logo}
            alt={detail.company}
            className="w-16 h-16 rounded-2xl object-contain p-2 bg-slate-50 border border-slate-200 shrink-0 shadow-sm"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#00193F] leading-snug">
              {detail.title}
            </h2>
            <p className="text-sm font-semibold text-slate-600 mt-1 flex items-center gap-2">
              <span>{detail.company}</span>
              <span className="text-emerald-500 text-xs flex items-center gap-1">
                <i className="fa-solid fa-shield-check"></i> Terverifikasi
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8]">
                {detail.workPolicy || detail.type}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700">
                {detail.salary}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                <i className="fa-solid fa-location-dot text-slate-400 text-[10px]"></i>
                {detail.location}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Departemen</span>
            <span className="font-bold text-[#00193F]">{detail.department}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Pengalaman</span>
            <span className="font-bold text-[#00193F]">{detail.experienceLevel}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Peminat</span>
            <span className="font-bold text-[#00193F]">{detail.applicants}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Batas Lamaran</span>
            <span className="font-bold text-rose-600">{detail.deadline}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#00193F] flex items-center gap-2">
            <i className="fa-solid fa-file-lines text-[#16B3A3]"></i> Deskripsi Pekerjaan
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white">
            {detail.description}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#00193F] flex items-center gap-2">
            <i className="fa-solid fa-list-check text-[#16B3A3]"></i> Kualifikasi &amp; Persyaratan
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            {detail.qualifications.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <i className="fa-solid fa-circle-check text-[#16B3A3] text-xs mt-1 shrink-0"></i>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#00193F] flex items-center gap-2">
            <i className="fa-solid fa-layer-group text-[#16B3A3]"></i> Keahlian &amp; Kompetensi
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {detail.skills.map((sk, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#00193F] flex items-center gap-2">
            <i className="fa-solid fa-gift text-[#16B3A3]"></i> Benefit &amp; Fasilitas Karyawan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
            {detail.benefits.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <i className="fa-solid fa-star text-amber-500 text-xs shrink-0"></i>
                <span className="font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSave(detail)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <i className={`fa-bookmark ${isSaved ? 'fa-solid text-amber-500' : 'fa-regular'}`}></i>
            <span>{isSaved ? 'Tersimpan di Favorit' : 'Simpan'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Tutup
            </button>
            {detail.isClosed ? (
              <span className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs cursor-not-allowed">
                Lowongan Ditutup
              </span>
            ) : isApplied ? (
              <span className="px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 flex items-center gap-1.5">
                <i className="fa-solid fa-circle-check text-emerald-500"></i> Sudah Dilamar
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onApply(detail)}
                className="px-6 py-2.5 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs shadow-md transition-all hover:shadow-lg"
              >
                Lamar Posisi Ini
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
