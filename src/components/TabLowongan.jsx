import React from 'react';

export default function TabLowongan({
  activeTab = 'all',
  onTabChange,
  totalCount = 0,
  savedCount = 0,
  appliedCount = 0,
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-5 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onTabChange('all')}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${activeTab === 'all'
            ? 'bg-[#00193F] text-white shadow-md'
            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
      >
        <i className="fa-solid fa-briefcase text-xs"></i>
        <span>Semua Lowongan</span>
        <span
          className={`text-[11px] font-bold ${activeTab === 'all' ? 'text-white/80' : 'text-slate-400'
            }`}
        >
          ({totalCount})
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('saved')}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${activeTab === 'saved'
            ? 'bg-amber-500 text-white shadow-md'
            : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200'
          }`}
      >
        <i
          className={`fa-bookmark ${activeTab === 'saved' ? 'fa-solid' : 'fa-regular'
            } text-xs`}
        ></i>
        <span>Lowongan Tersimpan</span>
        <span
          className={`text-[11px] font-bold ${activeTab === 'saved' ? 'text-white/80' : 'text-slate-400'
            }`}
        >
          ({savedCount})
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('applied')}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${activeTab === 'applied'
            ? 'bg-[#16B3A3] text-white shadow-md'
            : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-[#16B3A3] border border-slate-200'
          }`}
      >
        <i className="fa-solid fa-clipboard-check text-xs"></i>
        <span>Riwayat Lamaran</span>
        <span
          className={`text-[11px] font-bold ${activeTab === 'applied' ? 'text-white/80' : 'text-slate-400'
            }`}
        >
          ({appliedCount})
        </span>
      </button>
    </div>
  );
}

