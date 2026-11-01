import React from 'react';

export default function FormulirLamarLowongan({
  isOpen,
  job,
  onClose,
  onSubmit,
  user,
  candidateName,
  setCandidateName,
  candidateEmail,
  setCandidateEmail,
  candidatePhone,
  setCandidatePhone,
  resumeOption,
  setResumeOption,
  uploadedResumeName,
  onUploadResume,
  coverLetter,
  setCoverLetter,
  portfolioUrl,
  setPortfolioUrl,
  expectedSalary,
  setExpectedSalary,
}) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto space-y-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          title="Batal"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16B3A3] mb-1">
            <i className="fa-solid fa-file-signature text-[11px]"></i>
            <span>Formulir Pengajuan Lamaran</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#00193F]">
            Lengkapi Berkas Lamaran
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Kirimkan berkas CV dan surat pengantar untuk posisi <span className="font-bold text-[#00193F]">{job.title}</span> di <span className="font-semibold text-slate-700">{job.company}</span>.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Data Pribadi Pelamar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Aktif *</label>
                <input
                  type="email"
                  required
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 bg-slate-50/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor WhatsApp / Telepon *</label>
              <input
                type="tel"
                required
                value={candidatePhone}
                onChange={(e) => setCandidatePhone(e.target.value)}
                placeholder="0812-xxxx-xxxx"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. Lampiran Dokumen Resume / CV
            </h3>
            <div className="space-y-2">
              <label
                className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                  resumeOption === 'profile'
                    ? 'border-[#16B3A3] bg-teal-50/30'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="resumeOpt"
                  value="profile"
                  checked={resumeOption === 'profile'}
                  onChange={() => setResumeOption('profile')}
                  className="mt-1 text-[#16B3A3] focus:ring-[#16B3A3]"
                />
                <div className="text-xs">
                  <div className="font-bold text-[#00193F] flex items-center gap-1.5">
                    <i className="fa-solid fa-id-card text-[#16B3A3]"></i>
                    Gunakan Profil Terdaftar AYOKERJA!
                  </div>
                  <p className="text-slate-500 mt-0.5 text-[11px] leading-relaxed">
                    Sistem otomatis merangkum data pendidikan, ringkasan keahlian, dan riwayat dari profil akun <span className="font-semibold text-slate-700">{user?.nama || 'Anda'}</span>.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                  resumeOption === 'upload'
                    ? 'border-[#16B3A3] bg-teal-50/30'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="resumeOpt"
                  value="upload"
                  checked={resumeOption === 'upload'}
                  onChange={() => setResumeOption('upload')}
                  className="mt-1 text-[#16B3A3] focus:ring-[#16B3A3]"
                />
                <div className="text-xs flex-1">
                  <div className="font-bold text-[#00193F] flex items-center gap-1.5">
                    <i className="fa-solid fa-file-arrow-up text-[#16B3A3]"></i>
                    Unggah Berkas CV Baru (PDF/DOC)
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="uploadJobResumeFile"
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#00193F] font-semibold text-xs cursor-pointer border border-slate-300 transition-colors inline-block"
                      >
                        Pilih Berkas CV
                      </label>
                      <input
                        type="file"
                        id="uploadJobResumeFile"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={onUploadResume}
                      />
                      {uploadedResumeName && (
                        <span className="text-xs text-emerald-600 font-bold truncate max-w-[200px]">
                          <i className="fa-solid fa-check mr-1"></i> {uploadedResumeName}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">Maksimal 5MB (.PDF, .DOC, .DOCX)</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700">
              Surat Pengantar / Catatan untuk Rekruter (Opsional)
            </label>
            <textarea
              rows="3"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tuliskan ringkasan singkat mengapa Anda adalah kandidat yang tepat untuk posisi ini..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tautan Portofolio / LinkedIn</label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://linkedin.com/in/... atau GitHub"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ekspektasi Gaji Bersih</label>
              <input
                type="text"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                placeholder="Contoh: Rp 28.000.000 / bulan"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 hover:shadow-lg"
            >
              <i className="fa-solid fa-paper-plane text-[11px]"></i>
              <span>Kirim Berkas Lamaran</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
