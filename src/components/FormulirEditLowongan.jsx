import React from 'react';

export default function FormulirEditLowongan({ isOpen, job, onClose, onChange, onSave }) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <h3 className="text-lg font-extrabold text-[#00193F] mb-4">Edit Parameter Lowongan</h3>

        <form onSubmit={onSave} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul Posisi</label>
            <input
              type="text"
              required
              value={job.title}
              onChange={(e) => onChange({ ...job, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Gaji Min (Juta)</label>
              <input
                type="number"
                value={job.minSalary}
                onChange={(e) => onChange({ ...job, minSalary: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Gaji Max (Juta)</label>
              <input
                type="number"
                value={job.maxSalary}
                onChange={(e) => onChange({ ...job, maxSalary: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Status Publikasi</label>
              <select
                value={job.status}
                onChange={(e) => onChange({ ...job, status: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 bg-white"
              >
                <option value="Aktif">Aktif</option>
                <option value="Draft">Draft</option>
                <option value="Ditutup">Ditutup</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Batas Waktu</label>
              <input
                type="date"
                value={job.deadline}
                onChange={(e) => onChange({ ...job, deadline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-500 font-semibold text-xs hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#16B3A3] text-white font-bold text-xs hover:bg-[#109485]"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
