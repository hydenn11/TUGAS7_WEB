import React from 'react';

export default function RincianLamaranTerkirim({ application, onClose }) {
  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          title="Tutup"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <div className="flex items-center gap-3 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#16B3A3] flex items-center justify-center text-xl shrink-0">
            <i className="fa-solid fa-file-circle-check"></i>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#16B3A3] flex items-center gap-1.5 mb-0.5">
              <i className="fa-solid fa-file-circle-check text-[10px]"></i>
              <span>Salinan Berkas Lamaran</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#00193F] leading-snug">
              {application.title}
            </h3>
            <p className="text-xs font-semibold text-slate-500">{application.company}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Status Lamaran</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {application.status || 'Terkirim'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-semibold uppercase">Tanggal Diajukan</span>
            <span className="font-bold text-slate-700 mt-0.5 block">{application.date || 'Hari ini'}</span>
          </div>
        </div>

        <div className="space-y-3.5 text-xs">
          <div>
            <span className="text-slate-500 font-bold block mb-1">Dokumen Resume / CV yang Dilampirkan:</span>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <i className="fa-solid fa-file-pdf text-red-500 text-lg"></i>
                <span className="font-bold text-slate-800 truncate">{application.resumeName || 'Resume_Pelamar.pdf'}</span>
              </div>
              <button
                type="button"
                onClick={() => alert(`Mengunduh salinan berkas: ${application.resumeName || 'Resume.pdf'}`)}
                className="text-xs font-bold text-[#16B3A3] hover:underline flex items-center gap-1 shrink-0 ml-2"
              >
                <i className="fa-solid fa-download"></i> Unduh
              </button>
            </div>
          </div>

          {application.portfolioUrl && (
            <div>
              <span className="text-slate-500 font-bold block mb-1">Tautan Portofolio / Profil:</span>
              <a
                href={application.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#16B3A3] hover:underline font-semibold flex items-center gap-1.5 truncate"
              >
                <i className="fa-solid fa-link text-slate-400"></i>
                <span>{application.portfolioUrl}</span>
              </a>
            </div>
          )}

          {application.expectedSalary && (
            <div>
              <span className="text-slate-500 font-bold block mb-0.5">Ekspektasi Gaji:</span>
              <span className="text-xs font-bold text-slate-800">{application.expectedSalary}</span>
            </div>
          )}

          <div>
            <span className="text-slate-500 font-bold block mb-1">Surat Pengantar / Catatan untuk Rekruter:</span>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap">
              {application.coverLetter || <span className="text-slate-400 italic">Tidak ada catatan pengantar tambahan yang dilampirkan.</span>}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
