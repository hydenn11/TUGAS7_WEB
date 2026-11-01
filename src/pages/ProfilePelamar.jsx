import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfilePelamar() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.nama || '');
  const [headline, setHeadline] = useState(user?.posisi || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.telepon || '');
  const [location, setLocation] = useState(user?.lokasi || '');
  const [linkedin, setLinkedin] = useState(user?.linkedin || '');
  const [summary, setSummary] = useState(
    user?.ringkasan ||
    'Seorang Software & Frontend Engineer yang berfokus pada pengembangan antarmuka web modern, responsif, dan berkinerja tinggi menggunakan React.js, Tailwind CSS, dan ekosistem TypeScript.'
  );

  useEffect(() => {
    if (user) {
      if (user.nama !== undefined) setName(user.nama);
      if (user.posisi !== undefined) setHeadline(user.posisi);
      if (user.email !== undefined) setEmail(user.email);
      if (user.telepon !== undefined) setPhone(user.telepon);
      if (user.lokasi !== undefined) setLocation(user.lokasi);
      if (user.linkedin !== undefined) setLinkedin(user.linkedin);
      if (user.ringkasan !== undefined) setSummary(user.ringkasan);
    }
  }, [user]);

  const [resumeFileName, setResumeFileName] = useState('Resume_Luthfi_Frontend.pdf');
  const [editNameModalOpen, setEditNameModalOpen] = useState(false);
  const [editSummaryModalOpen, setEditSummaryModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Perubahan data profil pelamar berhasil disimpan!');

  const triggerAlert = (msg) => {
    setAlertMessage(msg);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    updateProfile({
      nama: name,
      posisi: headline,
      email,
      telepon: phone,
      lokasi: location,
      linkedin,
    });
    setEditNameModalOpen(false);
    triggerAlert('Identitas dan kontak profil pelamar berhasil diperbarui!');
  };

  const handleSaveSummary = (e) => {
    e.preventDefault();
    updateProfile({ ringkasan: summary });
    setEditSummaryModalOpen(false);
    triggerAlert('Ringkasan profesional profil pelamar berhasil diperbarui!');
  };

  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setResumeFileName(fileName);
      triggerAlert(`Berkas resume berhasil diperbarui: ${fileName}`);
    }
  };

  if (!user || user.role !== 'pelamar') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#CCFBF1] text-[#16B3A3] flex items-center justify-center mx-auto mb-4 border border-[#99F6E4] text-2xl shadow-sm">
            <i className="fa-solid fa-lock"></i>
          </div>
          <h2 className="text-xl font-extrabold text-[#00193F] mb-2">Halaman Khusus Pelamar</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
            Anda harus masuk ke akun pelamar Anda terlebih dahulu untuk mengakses profil, resume, serta riwayat lamaran pekerjaan.
          </p>
          <div className="space-y-3">
            <Link
              to="/login-pelamar"
              className="w-full py-3 px-5 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-right-to-bracket text-xs"></i> Masuk Akun Pelamar
            </Link>
            <Link
              to="/login-pelamar?tab=register"
              className="w-full py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-user-plus text-xs"></i> Buat Akun Baru
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 pt-2"
            >
              <i className="fa-solid fa-arrow-left text-[10px]"></i> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-white border-b border-slate-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <nav className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                <Link to="/" className="hover:text-[#16B3A3] transition-colors">Beranda</Link>
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
                <span className="text-slate-600 font-semibold">Profil Saya</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00193F] tracking-tight">
                Profil &amp; Portofolio Pelamar
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kelola data diri, ringkasan pengalaman, riwayat karir, sertifikasi, keahlian, dan berkas resume Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">

        {alertVisible && (
          <div className="mb-6 p-4 rounded-2xl bg-[#CCFBF1] border border-[#16B3A3] text-[#00193F] flex items-center justify-between shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#16B3A3] text-white flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-check"></i>
              </div>
              <span className="text-xs sm:text-sm font-semibold">{alertMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setAlertVisible(false)}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="space-y-6">

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md text-center">

              <div className="relative w-28 h-28 mx-auto mb-4">
                <div className="w-full h-full rounded-full ring-4 ring-[#CCFBF1] bg-gradient-to-tr from-[#00193F] to-[#16B3A3] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg overflow-hidden">
                  <i className="fa-solid fa-user"></i>
                </div>
                <label
                  htmlFor="uploadPhotoInput"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#16B3A3] hover:bg-[#109485] text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110"
                  title="Ganti Foto Profil"
                >
                  <i className="fa-solid fa-camera text-xs"></i>
                  <input
                    type="file"
                    id="uploadPhotoInput"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        triggerAlert('Foto profil berhasil diperbarui!');
                      }
                    }}
                  />
                </label>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-[#00193F] tracking-tight">
                {name || 'Nama Belum Diatur'}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#16B3A3] mt-1">
                {headline || <span className="text-slate-400 font-normal italic">Headline / Posisi belum diatur</span>}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-100 text-left space-y-3 text-xs">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <span className="truncate font-medium text-slate-700">{email || '-'}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <span className="font-medium text-slate-700">{phone || <span className="text-slate-400 italic">Belum diatur</span>}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <span className="font-medium text-slate-700">{location || <span className="text-slate-400 italic">Belum diatur</span>}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <i className="fa-brands fa-linkedin"></i>
                  </div>
                  {linkedin ? (
                    <a
                      href={`https://${linkedin.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#16B3A3] hover:underline truncate"
                    >
                      {linkedin}
                    </a>
                  ) : (
                    <span className="text-slate-400 italic">Belum ditambahkan</span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditNameModalOpen(true)}
                className="w-full mt-6 py-2.5 rounded-xl border border-[#16B3A3] text-[#16B3A3] hover:bg-[#CCFBF1]/30 font-bold text-xs transition-colors"
              >
                <i className="fa-solid fa-user-pen mr-1.5"></i> Edit Informasi Pribadi
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-sm font-bold text-[#00193F] flex items-center gap-2">
                  <i className="fa-solid fa-file-pdf text-red-500"></i> Berkas Resume / CV
                </h3>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">Tersimpan</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg shrink-0">
                    <i className="fa-solid fa-file-lines"></i>
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 truncate">{resumeFileName}</p>
                    <span className="text-[10px] text-slate-400">Diperbarui 2 pekan lalu • 480 KB</span>
                  </div>
                </div>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Mengunduh berkas resume: ${resumeFileName}`);
                  }}
                  className="p-2 rounded-lg text-slate-500 hover:text-[#16B3A3] hover:bg-white transition-colors shrink-0"
                  title="Unduh Berkas Resume"
                >
                  <i className="fa-solid fa-download"></i>
                </a>
              </div>

              <label
                htmlFor="uploadResumeInput"
                className="mt-4 w-full py-2.5 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <i className="fa-solid fa-cloud-arrow-up"></i> Unggah / Ganti Resume
                <input
                  type="file"
                  id="uploadResumeInput"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleResumeUpload}
                />
              </label>
              <p className="text-[10px] text-slate-400 text-center mt-2">Mendukung format PDF atau DOCX (Maks. 5 MB)</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-sm font-bold text-[#00193F] flex items-center gap-2">
                  <i className="fa-solid fa-language text-[#16B3A3]"></i> Bahasa
                </h3>
                <button
                  type="button"
                  onClick={() => alert('Fitur tambah bahasa dapat disesuaikan pada modal profil.')}
                  className="text-xs text-[#16B3A3] font-bold hover:underline"
                >
                  + Tambah
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">Bahasa Indonesia</p>
                    <span className="text-[11px] text-slate-400">Penutur Asli / Fasih (Native)</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-[#CCFBF1] text-[#16B3A3]">Aktif</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div>
                    <p className="font-bold text-slate-800">Bahasa Inggris (English)</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">TOEFL 585</span>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-2 space-y-6">

            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h2 className="text-base sm:text-lg font-bold text-[#00193F]">
                  Ringkasan Pribadi
                </h2>
                <button
                  type="button"
                  onClick={() => setEditSummaryModalOpen(true)}
                  className="text-xs font-bold text-[#16B3A3] hover:underline flex items-center gap-1"
                >
                  <i className="fa-solid fa-pen-to-square"></i> Edit Ringkasan
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                {summary}
              </p>
            </section>

            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#00193F]">
                    Riwayat Karier &amp; Pengalaman
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pengalaman profesional untuk menarik perhatian tim recruiter perusahaan mitra
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Formulir penambahan pengalaman karier baru siap ditambahkan!')}
                  className="px-4 py-1.5 rounded-lg bg-[#16B3A3] hover:bg-[#109485] text-white font-semibold text-xs shadow-sm transition-colors shrink-0"
                >
                  + Tambah Karier
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <img
                    src="/assets/company-google.png"
                    alt="Google"
                    className="w-12 h-12 rounded-2xl object-contain p-2 bg-slate-50 border border-slate-200 shrink-0"
                  />
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#00193F]">Lead Frontend Engineer</h3>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60 w-fit">
                        2024 - Sekarang (Saat Ini)
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">PT Google Cloud Indonesia • Jakarta (Hybrid)</p>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 list-disc list-inside leading-relaxed">
                      <li>Memimpin tim frontend yang terdiri dari 5 insinyur dalam membangun dashboard analitik cloud berskala regional.</li>
                      <li>Meningkatkan skor performa Lighthouse dari 72 ke 98 dengan menerapkan teknik *code splitting* dan *lazy loading*.</li>
                      <li>Bekerja sama secara aktif dengan tim Backend dan UI/UX Designer dalam merilis 14 fitur baru tepat waktu.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                  <img
                    src="/assets/company-adobe.png"
                    alt="Adobe"
                    className="w-12 h-12 rounded-2xl object-contain p-2 bg-slate-50 border border-slate-200 shrink-0"
                  />
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#00193F]">Frontend UI/UX Specialist</h3>
                      <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/60 w-fit">
                        2022 - 2024 (2 Tahun)
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">PT Adobe Systems Indonesia • BSD City Tangerang</p>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 list-disc list-inside leading-relaxed">
                      <li>Membangun komponen *design system* modular yang digunakan oleh lebih dari 20 repository internal perusahaan.</li>
                      <li>Mengintegrasikan REST API arsitektur microservices dan mengoptimalkan state management aplikasi menggunakan Redux Toolkit.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h2 className="text-base sm:text-lg font-bold text-[#00193F]">
                  Riwayat Pendidikan
                </h2>
                <button
                  type="button"
                  onClick={() => alert('Formulir penambahan riwayat pendidikan siap digunakan.')}
                  className="text-xs font-bold text-[#16B3A3] hover:underline"
                >
                  + Tambah Pendidikan
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl text-black flex items-center justify-center text-xl shrink-0">
                    <i className="fa-solid fa-building-columns"></i>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#00193F]">Universitas Indonesia (UI)</h3>
                      <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/60 w-fit">
                        2018 - 2022
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">
                      Sarjana Komputer (S.Kom) - Teknik Informatika
                    </p>
                    <p className="text-xs text-slate-500 mt-1">IPK: <strong>3.84 / 4.00</strong> (Predikat CumLaude)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h2 className="text-base sm:text-lg font-bold text-[#00193F] flex items-center gap-2.5">
                  Lisensi &amp; Sertifikasi
                </h2>
                <button
                  type="button"
                  onClick={() => alert('Formulir penambahan sertifikasi profesional siap digunakan.')}
                  className="text-xs font-bold text-[#16B3A3] hover:underline"
                >
                  + Tambah Sertifikasi
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-base shrink-0 mt-0.5">
                    <i className="fa-solid fa-certificate"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#00193F]">Meta Certified Frontend Developer</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Meta / Coursera • Diterbitkan 2023</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#CCFBF1] text-[#16B3A3] flex items-center justify-center text-base shrink-0 mt-0.5">
                    <i className="fa-solid fa-cloud"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#00193F]">AWS Certified Cloud Practitioner</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Amazon Web Services • Diterbitkan 2024</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h2 className="text-base sm:text-lg font-bold text-[#00193F] flex items-center gap-2.5">
                  Keahlian &amp; Keterampilan Teknis
                </h2>
                <button
                  type="button"
                  onClick={() => alert('Formulir penambahan keahlian baru siap digunakan.')}
                  className="text-xs font-bold text-[#16B3A3] hover:underline"
                >
                  + Tambah Skill
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  'React.js', 'Tailwind CSS', 'TypeScript', 'Next.js', 'RESTful API',
                  'State Management (Redux/Zustand)', 'UI/UX Prototyping (Figma)',
                  'Git & GitHub Version Control', 'Responsive Web Design'
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

          </div>

        </div>
      </main>

      {editNameModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="text-lg font-bold text-[#00193F]">Edit Informasi Pribadi</h3>
              <button
                type="button"
                onClick={() => setEditNameModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSaveName} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap Anda"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline / Posisi Bidang</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Contoh: Frontend Engineer / Graphic Designer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Pelamar *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor Telepon</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 812-3456-7890"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Domisili / Lokasi</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tautan LinkedIn</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="Contoh: linkedin.com/in/username"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditNameModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold shadow-sm transition-colors"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editSummaryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="text-lg font-bold text-[#00193F]">Edit Ringkasan Pribadi</h3>
              <button
                type="button"
                onClick={() => setEditSummaryModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSaveSummary} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Ringkasan Pribadi (Tentang Saya) *
                </label>
                <textarea
                  rows="6"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] leading-relaxed"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditSummaryModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold shadow-sm transition-colors"
                >
                  Simpan Ringkasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
