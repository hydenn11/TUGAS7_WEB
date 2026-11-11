import React from 'react';

const JOB_STATUS_STYLES = {
  Aktif: {
    badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dot: 'bg-emerald-500',
  },
  Draft: {
    badge: 'bg-blue-50 text-blue-700 border border-blue-200',
    dot: 'bg-blue-500',
  },
  Ditutup: {
    badge: 'bg-rose-50 text-rose-700 border border-rose-200',
    dot: 'bg-rose-500',
  },
};

export default function BarisLowonganPerusahaan({
  job,
  openEditJob,
  toggleJobStatus,
  handleDeleteJob,
}) {
  const statusStyle = JOB_STATUS_STYLES[job.status] || JOB_STATUS_STYLES.Ditutup;

  return (
    <tr className="hover:bg-slate-50/80 transition-colors">
      <td className="py-4 px-5">
        <div className="font-bold text-[#00193F]">{job.title}</div>
        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
          <span className="font-medium text-slate-600">{job.department}</span>
          <span>•</span>
          <span>Dibuat: {job.createdAt}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-col gap-1 items-start">
          <span className="font-semibold text-slate-700">{job.workPolicy}</span>
          <span className="text-[11px] text-slate-400">{job.location}</span>
        </div>
      </td>
      <td className="py-4 px-4 font-semibold text-slate-800">
        {job.showSalary ? `Rp ${job.minSalary} - ${job.maxSalary} Juta` : 'Dirahasiakan'}
      </td>
      <td className="py-4 px-4">
        <span className="inline-flex items-center rounded-full font-bold text-xs text-slate-700">
          <span>{job.applicantsCount} Pelamar</span>
        </span>
      </td>
      <td className="py-4 px-4 text-xs text-slate-500 font-medium">
        {job.deadline}
      </td>
      <td className="py-4 px-4">
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${statusStyle.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}></span>
          <span>{job.status}</span>
        </span>
      </td>
      <td className="py-4 px-5 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => openEditJob(job)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
            title="Edit Parameter Lowongan"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            onClick={() => toggleJobStatus(job.id)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
            title={
              job.status === 'Aktif'
                ? 'Nonaktifkan / Tutup Lowongan'
                : 'Aktifkan Kembali Lowongan'
            }
          >
            <i
              className={`fa-solid ${
                job.status === 'Aktif' ? 'fa-pause' : 'fa-play'
              }`}
            ></i>
          </button>
          <button
            type="button"
            onClick={() => handleDeleteJob(job.id, job.title)}
            className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
            title="Hapus Lowongan"
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

