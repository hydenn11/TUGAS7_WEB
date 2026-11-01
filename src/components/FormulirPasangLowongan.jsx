import React, { useState } from 'react';

export default function FormulirPasangLowongan({ companyProfile = {}, onTambahLowongan }) {
  const [createStep, setCreateStep] = useState(1);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('Software & AI');
  const [newJobType, setNewJobType] = useState('Full-time');
  const [newJobPolicy, setNewJobPolicy] = useState('Hybrid');
  const [newJobLocation, setNewJobLocation] = useState('Jakarta Selatan, DKI Jakarta');
  const [newJobExp, setNewJobExp] = useState('Mid-Senior Level');
  const [newJobMinSalary, setNewJobMinSalary] = useState('20');
  const [newJobMaxSalary, setNewJobMaxSalary] = useState('35');
  const [newJobShowSalary, setNewJobShowSalary] = useState(true);
  const [newJobDeadline, setNewJobDeadline] = useState('2026-11-30');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobQual, setNewJobQual] = useState('');
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newJobSkills, setNewJobSkills] = useState(['React.js', 'TypeScript', 'Tailwind CSS', 'REST API']);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !newJobSkills.includes(newSkillInput.trim())) {
      setNewJobSkills([...newJobSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setNewJobSkills(newJobSkills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newJobTitle.trim()) {
      alert('Judul posisi lowongan wajib diisi.');
      return;
    }

    const createdJob = {
      id: Date.now(),
      title: newJobTitle.trim(),
      department: newJobDept,
      type: newJobType,
      workPolicy: newJobPolicy,
      location: newJobLocation.trim() || 'Jakarta Selatan',
      minSalary: Number(newJobMinSalary) || 0,
      maxSalary: Number(newJobMaxSalary) || 0,
      showSalary: newJobShowSalary,
      experienceLevel: newJobExp,
      deadline: newJobDeadline || '2026-11-30',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Aktif',
      description:
        newJobDesc.trim() ||
        'Bertanggung jawab merancang arsitektur sistem, kolaborasi lintas divisi, dan memastikan kualitas software standar industri.',
      qualifications:
        newJobQual.trim() ||
        'Memiliki pengalaman relevan di bidangnya, komitmen tinggi terhadap kualitas kerja, dan kemampuan komunikasi yang baik.',
      skills: newJobSkills.length > 0 ? newJobSkills : ['React.js', 'JavaScript'],
      applicantsCount: 0,
    };

    onTambahLowongan(createdJob);

    // Reset formulir
    setCreateStep(1);
    setNewJobTitle('');
    setNewJobDesc('');
    setNewJobQual('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#00193F]">
          Formulir Pasang Lowongan Baru
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          Publikasikan lowongan kerja terstruktur untuk menjangkau jutaan talenta profesional di seluruh Indonesia.
        </p>

        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 max-w-md mx-auto">
          {[
            { step: 1, title: 'Info Dasar' },
            { step: 2, title: 'Kompensasi' },
            { step: 3, title: 'Kualifikasi' },
            { step: 4, title: 'Pratinjau' },
          ].map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setCreateStep(s.step)}
              className="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  createStep === s.step
                    ? 'bg-[#16B3A3] text-white ring-4 ring-[#CCFBF1]'
                    : createStep > s.step
                    ? 'bg-[#00193F] text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {createStep > s.step ? (
                  <i className="fa-solid fa-check text-[11px]"></i>
                ) : (
                  s.step
                )}
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  createStep === s.step ? 'text-[#16B3A3]' : 'text-slate-400'
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6"
      >
        {createStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-[#00193F] border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#16B3A3] text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              Informasi Dasar Pekerjaan
            </h3>

            <div>
              <label htmlFor="input-posisi" className="block text-xs font-bold text-slate-700 mb-1.5">
                Judul Posisi Lowongan *
              </label>
              <input
                id="input-posisi"
                type="text"
                required
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
                placeholder="Contoh: Senior Fullstack React & Node.js Engineer"
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="input-dept" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Departemen / Kategori *
                </label>
                <select
                  id="input-dept"
                  value={newJobDept}
                  onChange={(e) => setNewJobDept(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] bg-white text-slate-700 cursor-pointer"
                >
                  <option value="Software & AI">Software Engineering & AI</option>
                  <option value="Cloud & Infrastructure">Cloud Infrastructure & DevOps</option>
                  <option value="UI/UX Design">UI/UX & Product Design</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Data & Analytics">Data Science & Analytics</option>
                  <option value="Marketing & Growth">Marketing & Brand</option>
                  <option value="Operations & Supply Chain">Operations & Supply Chain</option>
                </select>
              </div>

              <div>
                <label htmlFor="input-tipe" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tipe Pekerjaan *
                </label>
                <select
                  id="input-tipe"
                  value={newJobType}
                  onChange={(e) => setNewJobType(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] bg-white text-slate-700 cursor-pointer"
                >
                  <option value="Full-time">Full-time (Penuh Waktu)</option>
                  <option value="Part-time">Part-time (Paruh Waktu)</option>
                  <option value="Contract">Contract (Kontrak)</option>
                  <option value="Internship">Internship (Magang)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="input-policy" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Kebijakan Kehadiran *
                </label>
                <select
                  id="input-policy"
                  value={newJobPolicy}
                  onChange={(e) => setNewJobPolicy(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] bg-white text-slate-700 cursor-pointer"
                >
                  <option value="Hybrid">Hybrid (Kombinasi Kantor & WFH)</option>
                  <option value="Remote">Remote (100% Kerja Jarak Jauh)</option>
                  <option value="On-site">On-site (Wajib di Kantor)</option>
                </select>
              </div>

              <div>
                <label htmlFor="input-lokasi" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Lokasi Penempatan Kantor *
                </label>
                <input
                  id="input-lokasi"
                  type="text"
                  required
                  value={newJobLocation}
                  onChange={(e) => setNewJobLocation(e.target.value)}
                  placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                disabled={!newJobTitle.trim()}
                onClick={() => setCreateStep(2)}
                className="px-6 py-2.5 rounded-xl bg-[#16B3A3] disabled:opacity-50 hover:bg-[#109485] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                Lanjut ke Kompensasi
              </button>
            </div>
          </div>
        )}

        {createStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-[#00193F] border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#16B3A3] text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              Rentang Gaji &amp; Batas Waktu Tayang
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="input-min-gaji" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Gaji Minimum (Juta Rp / Bulan) *
                </label>
                <input
                  id="input-min-gaji"
                  type="number"
                  min="1"
                  value={newJobMinSalary}
                  onChange={(e) => setNewJobMinSalary(e.target.value)}
                  placeholder="Contoh: 20"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
              </div>

              <div>
                <label htmlFor="input-max-gaji" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Gaji Maksimum (Juta Rp / Bulan) *
                </label>
                <input
                  id="input-max-gaji"
                  type="number"
                  min="1"
                  value={newJobMaxSalary}
                  onChange={(e) => setNewJobMaxSalary(e.target.value)}
                  placeholder="Contoh: 35"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#00193F]">
                  Tampilkan Estimasi Gaji ke Publik
                </div>
                <div className="text-[11px] text-slate-500">
                  Lowongan yang menampilkan gaji menerima rata-rata 40% lebih banyak pelamar relevan.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={newJobShowSalary}
                  onChange={(e) => setNewJobShowSalary(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16B3A3]"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="input-exp" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tingkat Pengalaman *
                </label>
                <select
                  id="input-exp"
                  value={newJobExp}
                  onChange={(e) => setNewJobExp(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] bg-white text-slate-700 cursor-pointer"
                >
                  <option value="Entry / Fresh Graduate">Entry Level / Fresh Graduate</option>
                  <option value="Mid Level (2-4 Thn)">Mid Level (2 - 4 Tahun)</option>
                  <option value="Senior Level (5+ Thn)">Senior Level (5+ Tahun)</option>
                  <option value="Lead / Managerial">Lead / Managerial Level</option>
                </select>
              </div>

              <div>
                <label htmlFor="input-deadline" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Batas Tanggal Pendaftaran (Deadline) *
                </label>
                <input
                  id="input-deadline"
                  type="date"
                  required
                  value={newJobDeadline}
                  onChange={(e) => setNewJobDeadline(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCreateStep(1)}
                className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left text-[10px]"></i> Kembali
              </button>
              <button
                type="button"
                onClick={() => setCreateStep(3)}
                className="px-6 py-2.5 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                Lanjut ke Kualifikasi
              </button>
            </div>
          </div>
        )}

        {createStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-[#00193F] border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#16B3A3] text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              Deskripsi Pekerjaan, Syarat &amp; Skill Tags
            </h3>

            <div>
              <label htmlFor="input-desc" className="block text-xs font-bold text-slate-700 mb-1.5">
                Deskripsi Peran &amp; Tanggung Jawab *
              </label>
              <textarea
                id="input-desc"
                rows="4"
                required
                value={newJobDesc}
                onChange={(e) => setNewJobDesc(e.target.value)}
                placeholder="Jelaskan peran kerja, proyek yang akan ditangani, dan ekosistem teknologi yang digunakan..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] leading-relaxed"
              ></textarea>
            </div>

            <div>
              <label htmlFor="input-qual" className="block text-xs font-bold text-slate-700 mb-1.5">
                Kualifikasi &amp; Persyaratan Kandidat *
              </label>
              <textarea
                id="input-qual"
                rows="3"
                required
                value={newJobQual}
                onChange={(e) => setNewJobQual(e.target.value)}
                placeholder="Contoh: Pengalaman minimal 3 tahun menggunakan React.js, pemahaman arsitektur clean code, komunikasi tim yang baik..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] leading-relaxed"
              ></textarea>
            </div>

            <div>
              <label htmlFor="input-skill" className="block text-xs font-bold text-slate-700 mb-1.5">
                Keahlian &amp; Skill Tags yang Dibutuhkan
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  id="input-skill"
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(e);
                    }
                  }}
                  placeholder="Ketik nama skill lalu klik Tambah (cth: Docker, Figma, Golang)"
                  className="flex-1 px-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-xl bg-[#00193F] text-white text-xs font-bold hover:bg-[#002D6B] transition-colors cursor-pointer"
                >
                  + Tambah
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {newJobSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#CCFBF1] text-[#16B3A3] border border-[#99F6E4]"
                  >
                    {sk}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(sk)}
                      aria-label={`Hapus skill ${sk}`}
                      className="hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <i className="fa-solid fa-xmark text-[10px]"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCreateStep(2)}
                className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left text-[10px]"></i> Kembali
              </button>
              <button
                type="button"
                onClick={() => setCreateStep(4)}
                className="px-6 py-2.5 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                Lihat Pratinjau
              </button>
            </div>
          </div>
        )}

        {createStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-[#00193F] border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#16B3A3] text-white text-xs flex items-center justify-center font-bold">
                4
              </span>
              Pratinjau Tampilan Lowongan Anda
            </h3>

            <div className="p-6 rounded-2xl border-2 border-dashed border-[#16B3A3]/40 bg-slate-50/70">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={companyProfile?.logo || '/assets/company-google.png'}
                  alt="Logo"
                  className="w-12 h-12 rounded-xl object-contain bg-white p-1.5 border border-slate-200"
                />
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-[#EFF6FF] text-[#1D4ED8] mb-1">
                    {newJobPolicy} • {newJobType}
                  </div>
                  <h4 className="text-lg font-extrabold text-[#00193F]">
                    {newJobTitle || 'Judul Posisi Lowongan'}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {companyProfile?.name || 'Perusahaan Mitra'} • 📍 {newJobLocation}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {newJobSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white border border-slate-200 text-slate-700"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                {newJobDesc ||
                  'Deskripsi pekerjaan yang akan tampil pada halaman rincian lowongan kerja bagi pelamar.'}
              </p>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-[#00193F]">
                  {newJobShowSalary
                    ? `Rp ${newJobMinSalary} - ${newJobMaxSalary} Juta / Bulan`
                    : 'Gaji Dirahasiakan'}
                </span>
                <span className="text-slate-400">Batas: {newJobDeadline}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCreateStep(3)}
                className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left text-[10px]"></i> Ubah Kualifikasi
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i> Publikasikan Lowongan Sekarang
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

