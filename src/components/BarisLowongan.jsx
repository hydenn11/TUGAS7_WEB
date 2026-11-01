import React from 'react';

export default function BarisLowongan({
  job,
  isSaved,
  isApplied,
  onOpenDetail,
  onToggleSave,
  onApply,
}) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors group">
      <td className="py-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <img
            src={job.logo || '/assets/company-google.png'}
            alt={job.company}
            className="w-10 h-10 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200 shrink-0"
            onError={(e) => {
              e.target.src = '/assets/company-google.png';
            }}
          />
          <div>
            <button
              type="button"
              onClick={() => onOpenDetail(job)}
              className="font-bold text-[#00193F] leading-snug hover:text-[#16B3A3] text-left transition-colors cursor-pointer hover:underline block"
              title="Klik posisi untuk melihat detail pekerjaan"
            >
              {job.title}
            </button>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{job.company}</p>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <i className="fa-solid fa-location-dot text-[#16B3A3] text-[10px]"></i>
              <span>{job.location}</span>
            </div>
          </div>
        </div>
      </td>

      <td className="py-4 px-4">
        <div className="flex flex-col gap-1 items-start">
          <span className="font-semibold text-slate-700">{job.categoryLabel}</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#EFF6FF] text-[#1D4ED8]">
            {job.type}
          </span>
        </div>
      </td>

      <td className="py-4 px-4 font-semibold text-[#00193F]">{job.salary}</td>

      <td className="py-4 px-4 font-bold text-slate-700">{job.applicants}</td>

      <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">
        {job.deadline}
      </td>

      <td className="py-4 px-4 sm:px-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onToggleSave(job)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors border cursor-pointer ${
              isSaved
                ? 'text-amber-500 bg-amber-50 border-amber-200'
                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-50 border-slate-200'
            }`}
            title={isSaved ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}
            aria-label={isSaved ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}
          >
            <i
              className={`fa-bookmark ${
                isSaved ? 'fa-solid text-amber-500' : 'fa-regular'
              } text-sm`}
            ></i>
          </button>

          {job.isClosed ? (
            <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-400 font-semibold text-xs whitespace-nowrap cursor-not-allowed">
              Sudah Ditutup
            </span>
          ) : isApplied ? (
            <span className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs whitespace-nowrap border border-emerald-200">
              <i className="fa-solid fa-circle-check text-emerald-500 text-[11px]"></i> Sudah Dilamar
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onApply(job)}
              className="h-9 px-4 rounded-lg bg-[#16B3A3] hover:bg-[#109485] text-white font-medium text-xs transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              Lamar Sekarang
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

