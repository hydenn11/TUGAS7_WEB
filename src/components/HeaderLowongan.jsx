import React from 'react';

export default function HeaderLowongan() {
  return (
    <section className="bg-white border-b border-slate-200 py-6 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00193F] tracking-tight">
              Daftar Lowongan Kerja Terbaru
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Temukan karir impian Anda, bandingkan rentang gaji kompetitif, dan lamar posisi favorit secara langsung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
