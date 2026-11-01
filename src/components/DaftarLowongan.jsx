import React from 'react';
import BarisLowongan from './BarisLowongan';
import PesanKosong from './PesanKosong';

export default function DaftarLowongan({
  jobs = [],
  savedJobIds = [],
  appliedJobs = [],
  onOpenDetail,
  onToggleSave,
  onApply,
  activeTab = 'all',
  onTabChange,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {jobs.length === 0 ? (
        activeTab === 'saved' ? (
          <PesanKosong
            icon="fa-bookmark text-amber-400"
            title="Belum Ada Lowongan Tersimpan"
            description="Anda belum menandai lowongan pekerjaan ke daftar favorit. Klik ikon bookmark pada daftar untuk menyimpannya."
            showAction={true}
            actionLabel="Lihat Semua Lowongan"
            onAction={() => onTabChange && onTabChange('all')}
          />
        ) : (
          <PesanKosong
            icon="fa-briefcase"
            title="Belum ada data lowongan"
            description="Tidak ada lowongan yang sesuai dengan kriteria pencarian atau filter yang Anda pilih."
          />
        )
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th scope="col" className="py-4 px-4 sm:px-6">Posisi & Perusahaan</th>
                <th scope="col" className="py-4 px-4">Kategori & Tipe</th>
                <th scope="col" className="py-4 px-4">Rentang Gaji</th>
                <th scope="col" className="py-4 px-4">Peminat</th>
                <th scope="col" className="py-4 px-4 text-center">Batas Waktu</th>
                <th scope="col" className="py-4 px-4 sm:px-6 text-right">Aksi Pelamar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {jobs.map((job) => (
                <BarisLowongan
                  key={job.id}
                  job={job}
                  isSaved={savedJobIds.includes(job.id)}
                  isApplied={appliedJobs.some((item) => item.id === job.id)}
                  onOpenDetail={onOpenDetail}
                  onToggleSave={onToggleSave}
                  onApply={onApply}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

