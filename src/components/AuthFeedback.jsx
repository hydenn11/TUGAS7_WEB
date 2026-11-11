import React from 'react';

/**
 * Menampilkan banner feedback (error, success, info) yang aksesibel di dalam form autentikasi.
 */
export function AuthAlert({ feedback, onDismiss }) {
  if (!feedback?.message) return null;

  const stylesByType = {
    error: 'bg-rose-50 border-rose-200 text-rose-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    info: 'bg-sky-50 border-sky-200 text-sky-800',
  };

  const iconByType = {
    error: 'fa-circle-exclamation text-rose-500',
    success: 'fa-circle-check text-emerald-500',
    info: 'fa-circle-info text-sky-500',
  };

  const type = feedback.type || 'info';

  return (
    <div
      role="alert"
      className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 mb-4 ${stylesByType[type] || stylesByType.info}`}
    >
      <i className={`fa-solid ${iconByType[type] || iconByType.info} mt-0.5 text-sm shrink-0`}></i>
      <span className="flex-1 font-medium">{feedback.message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Tutup pesan"
          className="text-current opacity-60 hover:opacity-100 transition-opacity"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
    </div>
  );
}
