import React from 'react';

export default function RincianKandidat({ isOpen, candidate, onClose }) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <div className="flex items-start gap-4 mb-5 pb-5 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00193F] to-[#16B3A3] text-white flex items-center justify-center text-xl font-extrabold shrink-0 shadow-md">
            {candidate.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-[#00193F]">{candidate.name}</h3>
            </div>
            <div className="text-xs text-[#16B3A3] font-bold mt-0.5">{candidate.jobTitle}</div>
            <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap items-center gap-3">
              <span><i className="fa-solid fa-envelope mr-1"></i> {candidate.email}</span>
              <span><i className="fa-solid fa-phone mr-1"></i> {candidate.phone}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <h4 className="font-bold text-[#00193F] mb-1">Pengalaman Relevan</h4>
            <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {candidate.experience}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#00193F] mb-1">Pendidikan Terakhir</h4>
            <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {candidate.education}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#00193F] mb-1.5">Keahlian &amp; Kualifikasi Teknis</h4>
            <div className="flex flex-wrap gap-1.5">
              {candidate.skills.map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#CCFBF1] text-[#16B3A3] border border-[#99F6E4]/70">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#00193F] mb-1">Catatan Pelamar (Cover Note)</h4>
            <p className="text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              "{candidate.coverNote}"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg">
                <i className="fa-solid fa-file-pdf"></i>
              </div>
              <div>
                <div className="font-bold text-[#00193F] text-xs">{candidate.resumeName}</div>
                <span className="text-[10px] text-slate-400">PDF Document • Terverifikasi ATS</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert(`Mengunduh berkas resume: ${candidate.resumeName}`)}
              className="px-4 py-2 rounded-xl bg-[#00193F] hover:bg-[#002D6B] text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <i className="fa-solid fa-download text-[11px]"></i> Unduh CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
