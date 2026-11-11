import React from 'react';

export default function PesanKosong({
  title = 'Belum ada data lowongan',
  description = 'Daftar lowongan saat ini belum tersedia.',
  showAction = false,
  actionLabel = 'Lihat Semua Lowongan',
  onAction,
}) {
  return (
    <div className="p-12 text-center">
      <h3 className="text-base font-bold text-[#00193F] mb-1.5">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5 leading-relaxed">
        {description}
      </p>
      {showAction && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-4 py-2 rounded-lg bg-[#16B3A3] text-white font-semibold text-xs hover:bg-[#109485] transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
