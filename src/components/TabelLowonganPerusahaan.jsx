import React from 'react';
import BarisLowonganPerusahaan from './BarisLowonganPerusahaan';
import PesanKosong from './PesanKosong';

export default function TabelLowonganPerusahaan({
  jobs = [],
  openEditJob,
  toggleJobStatus,
  handleDeleteJob,
  onPasangLowongan,
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {jobs.length === 0 ? (
          <PesanKosong
            icon="fa-briefcase"
            title="Belum ada data lowongan"
            description="Perusahaan Anda belum mempublikasikan lowongan kerja aktif. Pasang lowongan baru untuk mulai menjaring kandidat terbaik."
            showAction={true}
            actionLabel="+ Pasang Lowongan Baru"
            onAction={onPasangLowongan}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th scope="col" className="py-4 px-5">Posisi Pekerjaan</th>
                  <th scope="col" className="py-4 px-4">Tipe &amp; Lokasi</th>
                  <th scope="col" className="py-4 px-4">Rentang Gaji</th>
                  <th scope="col" className="py-4 px-4">Pelamar Masuk</th>
                  <th scope="col" className="py-4 px-4">Batas Tayang</th>
                  <th scope="col" className="py-4 px-4">Status</th>
                  <th scope="col" className="py-4 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <BarisLowonganPerusahaan
                    key={job.id}
                    job={job}
                    openEditJob={openEditJob}
                    toggleJobStatus={toggleJobStatus}
                    handleDeleteJob={handleDeleteJob}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

