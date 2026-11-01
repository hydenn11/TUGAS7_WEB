import React from 'react';

export default function FilterLowongan({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  locationFilter,
  onLocationChange,
  typeFilter,
  onTypeChange,
  onReset,
  activeTab,
  filteredCount,
}) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <i className="fa-solid fa-magnifying-glass text-xs"></i>
          </div>
          <input
            type="text"
            placeholder={
              activeTab === 'applied'
                ? 'Cari riwayat lamaran / perusahaan...'
                : 'Cari posisi atau perusahaan...'
            }
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all placeholder:text-slate-400"
          />
        </div>

        <div>
          <select
            disabled={activeTab === 'applied'}
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all text-slate-700 bg-white disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
          >
            <option value="">Semua Kategori</option>
            <option value="IT">Software & AI</option>
            <option value="Cloud">Cloud & Infrastructure</option>
            <option value="Design">UI/UX & Design</option>
            <option value="Operations">Operations & F&B</option>
            <option value="Telecom">Telecommunication</option>
          </select>
        </div>

        <div>
          <select
            disabled={activeTab === 'applied'}
            value={locationFilter}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all text-slate-700 bg-white disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
          >
            <option value="">Semua Provinsi</option>
            <option value="Jakarta">DKI Jakarta</option>
            <option value="Jawa Barat">Jawa Barat</option>
            <option value="Jawa Tengah">Jawa Tengah</option>
            <option value="Jawa Timur">Jawa Timur</option>
            <option value="Sulawesi Selatan">Sulawesi Selatan</option>
            <option value="Bali">Bali</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div>
          <select
            disabled={activeTab === 'applied'}
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all text-slate-700 bg-white disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
          >
            <option value="">Semua Tipe Kerja</option>
            <option value="Full-time">Full-time</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-arrow-rotate-left"></i> Reset Filter
          </button>
          <div className="hidden lg:flex items-center justify-center px-3 py-2 bg-[#CCFBF1] text-[#16B3A3] font-bold text-xs rounded-xl whitespace-nowrap">
            {activeTab === 'applied' ? `${filteredCount} Lamaran` : `${filteredCount} Lowongan`}
          </div>
        </div>
      </div>
    </div>
  );
}

