import React from 'react';

export default function RiwayatLamaran({
  appliedJobs = [],
  allJobs = [],
  search = '',
  onOpenDetail,
  onViewApplication,
  onWithdraw,
  onExplore,
}) {
  const filteredAppliedJobs = appliedJobs.filter((app) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      app.title?.toLowerCase().includes(q) ||
      app.company?.toLowerCase().includes(q) ||
      app.status?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {appliedJobs.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-[#16B3A3] mx-auto flex items-center justify-center text-2xl mb-3 shadow-sm">
            <i className="fa-solid fa-clipboard-check"></i>
          </div>
          <h3 className="text-base font-bold text-[#00193F] mb-1">
            Belum Ada Riwayat Lamaran
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
            Anda belum pernah mengajukan lamaran ke lowongan pekerjaan mana pun. Jelajahi lowongan yang sesuai minat Anda dan kirimkan resume serta berkas profil terbaik Anda.
          </p>
          <button
            type="button"
            onClick={onExplore}
            className="px-5 py-2.5 rounded-lg bg-[#16B3A3] text-white font-semibold text-xs hover:bg-[#109485] transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-compass"></i> Jelajahi Semua Lowongan
          </button>
        </div>
      ) : filteredAppliedJobs.length === 0 ? (
        <div className="p-10 text-center text-slate-500 text-xs">
          Tidak ada riwayat lamaran yang cocok dengan pencarian "{search}".
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th scope="col" className="py-4 px-4 sm:px-6">Posisi & Perusahaan</th>
                <th scope="col" className="py-4 px-4">Tanggal Melamar</th>
                <th scope="col" className="py-4 px-4">Berkas yang Dikirim</th>
                <th scope="col" className="py-4 px-4 text-center">Status Lamaran</th>
                <th scope="col" className="py-4 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredAppliedJobs.map((app) => {
                const matchedJob = allJobs.find((j) => j.id === app.id);
                const displayLogo = app.logo || matchedJob?.logo || '/assets/company-google.png';
                const displayLocation = app.location || matchedJob?.location || 'Indonesia';
                const displaySalary = app.salary || matchedJob?.salary || 'Sesuai Standar';

                return (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={displayLogo}
                          alt={app.company}
                          className="w-10 h-10 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200 shrink-0"
                        />
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              const jobToOpen = matchedJob || app;
                              onOpenDetail(jobToOpen);
                            }}
                            className="font-bold text-[#00193F] leading-snug hover:text-[#16B3A3] text-left transition-colors cursor-pointer hover:underline block"
                            title="Klik posisi untuk melihat detail lowongan"
                          >
                            {app.title}
                          </button>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {app.company}
                          </p>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1">
                              <i className="fa-solid fa-location-dot text-[#16B3A3] text-[10px]"></i>
                              {displayLocation}
                            </span>
                            <span>•</span>
                            <span className="text-slate-600 font-medium">{displaySalary}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <i className="fa-regular fa-calendar text-slate-400"></i>
                        <span>{app.date || 'Hari ini'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 items-start text-xs">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                          <i className="fa-solid fa-file-pdf text-red-500 text-[10px]"></i>
                          <span className="truncate max-w-[150px]">{app.resumeName || 'Resume.pdf'}</span>
                        </span>
                        {app.expectedSalary && (
                          <span className="text-[11px] text-slate-500">
                            Gaji: <strong>{app.expectedSalary}</strong>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>{app.status || 'Terkirim'}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onViewApplication(app)}
                          className="h-9 px-3.5 rounded-lg border border-slate-200 hover:border-[#16B3A3] text-slate-700 hover:text-[#16B3A3] bg-white hover:bg-teal-50/50 font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                          title="Lihat salinan formulir berkas yang dikirim"
                        >
                          <i className="fa-solid fa-eye text-xs"></i>
                          <span>Lihat Berkas</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onWithdraw(app.id, app.title)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                          title="Tarik Lamaran"
                          aria-label="Tarik Lamaran"
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

