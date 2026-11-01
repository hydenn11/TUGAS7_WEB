import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PeringatanWajibLogin from '../components/PeringatanWajibLogin';
import FormulirLamarLowongan from '../components/FormulirLamarLowongan';

const GLOBAL_COMPANIES = [
  {
    name: 'Google Cloud Global',
    logo: '/assets/company-google.png',
    location: 'Remote (San Francisco, CA)',
    category: 'Cloud & DevOps',
    salary: '$5,500 - $7,800 / bln',
    level: 'Senior Level',
  },
  {
    name: 'Amazon Web Services',
    logo: '/assets/company-amazon.png',
    location: 'Remote (Seattle, WA)',
    category: 'Software Engineering',
    salary: '$6,000 - $8,500 / bln',
    level: 'Mid - Senior',
  },
  {
    name: 'Adobe Creative Cloud',
    logo: '/assets/company-adobe.png',
    location: 'Remote (San Jose, CA)',
    category: 'Product Design',
    salary: '$4,800 - $6,700 / bln',
    level: 'Mid Level',
  },
  {
    name: 'SpaceX Starlink Tech',
    logo: '/assets/company-spacex.png',
    location: 'Remote (Hawthorne, CA)',
    category: 'Infrastruktur & Jaringan',
    salary: '$6,500 - $9,200 / bln',
    level: 'Lead Engineer',
  },
  {
    name: 'Burger King Global Tech',
    logo: '/assets/company-burgerking.png',
    location: 'Remote (Miami, FL)',
    category: 'Data & Analytics',
    salary: '$4,200 - $6,000 / bln',
    level: 'Mid Level',
  },
  {
    name: 'Spotify International',
    logo: '/assets/company-google.png',
    location: 'Remote (Stockholm, Swedia)',
    category: 'Software Engineering',
    salary: '$5,200 - $7,400 / bln',
    level: 'Senior Level',
  },
  {
    name: 'Stripe Payments Inc.',
    logo: '/assets/company-amazon.png',
    location: 'Remote (Dublin, Irlandia)',
    category: 'Cybersecurity & Fintech',
    salary: '$6,200 - $8,800 / bln',
    level: 'Senior Engineer',
  },
  {
    name: 'Shopify Commerce Global',
    logo: '/assets/company-adobe.png',
    location: 'Remote (Ottawa, Kanada)',
    category: 'Product & Engineering',
    salary: '$5,000 - $7,100 / bln',
    level: 'Mid Level',
  },
  {
    name: 'Atlassian Global Network',
    logo: '/assets/company-spacex.png',
    location: 'Remote (Sydney, Australia)',
    category: 'Cloud & DevOps',
    salary: '$5,800 - $8,000 / bln',
    level: 'Senior Level',
  },
];

export default function LowonganApi() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('q') || searchParams.get('company') || '';
  const debugState = searchParams.get('debug');

  const { user, savedJobIds, toggleSaveJob, appliedJobs: contextAppliedJobs, applyJob } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const [activeJobModal, setActiveJobModal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [selectedJobToApply, setSelectedJobToApply] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const [candidateName, setCandidateName] = useState(user?.nama || 'Luthfi Ramadhan');
  const [candidateEmail, setCandidateEmail] = useState(user?.email || 'daniramadh47@gmail.com');
  const [candidatePhone, setCandidatePhone] = useState(user?.telepon || '0857-1122-3344');
  const [resumeOption, setResumeOption] = useState('profile');
  const [uploadedResumeName, setUploadedResumeName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState(user?.linkedin || '');
  const [expectedSalary, setExpectedSalary] = useState('');

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    actionType: 'apply',
    jobTitle: '',
    companyName: '',
  });

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    const endpoint = 'https://jsonplaceholder.typicode.com/posts?_limit=9';

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(
          `Gagal menghubungi server API (HTTP ${response.status}: ${response.statusText || 'Gagal memuat sumber daya'}).`
        );
      }

      const data = await response.json();

      const enriched = data.map((item, index) => {
        const meta = GLOBAL_COMPANIES[index % GLOBAL_COMPANIES.length];
        const formattedTitle =
          item.title.charAt(0).toUpperCase() + item.title.slice(1);

        return {
          id: item.id,
          userId: item.userId,
          rawTitle: item.title,
          title: formattedTitle,
          description: item.body,
          company: meta.name,
          logo: meta.logo,
          location: meta.location,
          category: meta.category,
          salary: meta.salary,
          level: meta.level,
        };
      });

      setJobs(enriched);
    } catch (err) {
      setError(
        err.message || 'Terjadi kesalahan jaringan saat mengambil data dari server.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debugState === 'loading') {
      setLoading(true);
      setError(null);
      return;
    }
    if (debugState === 'error') {
      setLoading(false);
      setError('Gagal menghubungi server API eksternal (HTTP 404: Not Found).');
      return;
    }
    fetchJobs();
  }, [debugState]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === 'Semua' || job.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [jobs, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    const list = new Set(jobs.map((j) => j.category));
    return ['Semua', ...Array.from(list)];
  }, [jobs]);

  const handleApplyClick = (job) => {
    if (!user || user.role !== 'pelamar') {
      setAuthModal({
        isOpen: true,
        title: 'Masuk Akun Pelamar Terlebih Dahulu',
        message: `Untuk melamar posisi "${job.title}" di "${job.company}", Anda harus masuk sebagai pelamar terlebih dahulu.`,
        actionType: 'apply',
        jobTitle: job.title,
        companyName: job.company,
      });
      return;
    }

    if (contextAppliedJobs.some((a) => a.id === `global-${job.id}`)) {
      setToastMessage(`Anda sudah melamar posisi "${job.title}" sebelumnya.`);
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }

    setCandidateName(user?.nama || 'Luthfi Ramadhan');
    setCandidateEmail(user?.email || 'daniramadh47@gmail.com');
    setCandidatePhone(user?.telepon || '0857-1122-3344');
    setResumeOption('profile');
    setUploadedResumeName('');
    setCoverLetter('');
    setPortfolioUrl(user?.linkedin || '');
    setExpectedSalary(job.salary ? job.salary.split('-')[0].trim() : '$5,000');

    setSelectedJobToApply(job);
    setActiveJobModal(null);
    setApplyModalOpen(true);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran berkas melebihi batas maksimal 5MB.');
        return;
      }
      setUploadedResumeName(file.name);
      setResumeOption('upload');
      setToastMessage(`Berkas resume "${file.name}" berhasil dipilih.`);
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedJobToApply) return;

    const resumeName =
      resumeOption === 'upload' && uploadedResumeName
        ? uploadedResumeName
        : 'Resume_Luthfi_Frontend.pdf';

    applyJob(
      {
        id: `global-${selectedJobToApply.id}`,
        title: selectedJobToApply.title,
        company: selectedJobToApply.company,
        logo: selectedJobToApply.logo,
        location: selectedJobToApply.location,
        salary: selectedJobToApply.salary,
        type: '100% Remote',
        category: selectedJobToApply.category,
      },
      {
        candidateName,
        candidateEmail,
        candidatePhone,
        resumeOption,
        resumeName,
        coverLetter,
        portfolioUrl,
        expectedSalary,
        type: '100% Remote (Global)',
      }
    );

    setApplyModalOpen(false);
    setToastMessage(`Lamaran untuk posisi "${selectedJobToApply.title}" di ${selectedJobToApply.company} berhasil dikirim!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleToggleSave = (job) => {
    if (!user || user.role !== 'pelamar') {
      setAuthModal({
        isOpen: true,
        title: 'Masuk Akun Pelamar Terlebih Dahulu',
        message: `Untuk menyimpan lowongan "${job.title}" ke daftar favorit, Anda harus masuk sebagai pelamar terlebih dahulu.`,
        actionType: 'save',
        jobTitle: job.title,
        companyName: job.company,
      });
      return;
    }

    toggleSaveJob(`global-${job.id}`, {
      id: `global-${job.id}`,
      title: job.title,
      company: job.company,
      logo: job.logo,
      location: job.location,
      categoryKey: 'Global',
      categoryLabel: job.category,
      type: '100% Remote',
      salary: job.salary,
      applicants: 'Mitra Global',
      deadline: 'Terbuka',
      description: job.description,
      isClosed: false,
      isGlobal: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00193F] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 text-xs sm:text-sm font-semibold">
          <i className="fa-solid fa-circle-check text-[#16B3A3] text-base"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      <section className="bg-white border-b border-slate-200 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#00193F] tracking-tight">
              Lowongan Kerja Global
            </h1>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Jelajahi kesempatan berkarier secara remote dari perusahaan teknologi dunia.
              Data lowongan berikut diperbarui secara asinkron menggunakan REST API.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Cari berdasarkan posisi, perusahaan, atau keahlian..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading || !!error}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all disabled:opacity-50"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            <div className="sm:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={loading || !!error}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all disabled:opacity-50 text-slate-700 font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'Semua' ? 'Semua Kategori' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16">
        {loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-4 w-48 bg-slate-200 rounded-md animate-pulse"></div>
              <div className="h-4 w-32 bg-slate-200 rounded-md animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs animate-pulse flex flex-col justify-between h-[280px]"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 bg-slate-200 rounded-xl"></div>
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3.5 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-2.5 bg-slate-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded w-5/6 mb-3"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-2.5 bg-slate-200 rounded w-full"></div>
                      <div className="h-2.5 bg-slate-200 rounded w-4/5"></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="h-4 bg-slate-200 rounded w-28"></div>
                    <div className="h-8 bg-slate-200 rounded-xl w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl p-8 border border-rose-100 shadow-sm text-center space-y-5 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center mx-auto text-2xl">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#00193F]">
                Gagal Memuat Data Lowongan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-md mx-auto">
                {error}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={() => fetchJobs()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00193F] hover:bg-[#16B3A3] text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <i className="fa-solid fa-rotate-right"></i>
                <span>Coba Lagi</span>
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Menampilkan{' '}
                <span className="font-bold text-[#00193F]">
                  {filteredJobs.length} dari {jobs.length}
                </span>{' '}
                lowongan kerja global
              </p>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto my-8 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-lg">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <h3 className="font-bold text-[#00193F] text-base">Tidak Ada Lowongan yang Cocok</h3>
                <p className="text-xs text-slate-500">
                  Coba sesuaikan kata kunci pencarian atau ubah filter kategori Anda.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Semua');
                  }}
                  className="px-4 py-2 text-xs font-bold text-[#16B3A3] hover:underline cursor-pointer"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => {
                  const isSaved = savedJobIds.includes(`global-${job.id}`);
                  const isApplied = contextAppliedJobs.some((a) => a.id === `global-${job.id}`);

                  return (
                    <article
                      key={job.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-[#16B3A3]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={job.logo}
                              alt={job.company}
                              className="w-11 h-11 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200 shrink-0"
                            />
                            <div>
                              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                <span>{job.company}</span>
                                <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]" title="Perusahaan Terverifikasi"></i>
                              </h3>
                              <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                                <i className="fa-solid fa-location-dot text-slate-400 text-[10px]"></i>
                                <span>{job.location}</span>
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleToggleSave(job)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0 ${isSaved
                              ? 'bg-amber-50 text-amber-500 hover:bg-amber-100'
                              : 'bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                              }`}
                            title={isSaved ? 'Hapus dari simpanan' : 'Simpan lowongan'}
                          >
                            <i className={`${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark text-xs`}></i>
                          </button>
                        </div>

                        <h2
                          onClick={() => setActiveJobModal(job)}
                          className="text-base font-extrabold text-[#00193F] group-hover:text-[#16B3A3] transition-colors leading-snug line-clamp-2 cursor-pointer mb-2.5"
                          title="Klik untuk melihat rincian pekerjaan"
                        >
                          {job.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8]">
                            100% Remote
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                            {job.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-500">
                            {job.level}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-5">
                          {job.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">
                            Estimasi Gaji
                          </div>
                          <div className="text-xs font-bold text-[#00193F]">
                            {job.salary}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveJobModal(job)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Rincian
                          </button>
                          {isApplied ? (
                            <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200">
                              <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i> Dilamar
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleApplyClick(job)}
                              className="h-8 px-4 rounded-lg bg-[#16B3A3] hover:bg-[#109485] text-white font-medium text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center"
                            >
                              Lamar
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {activeJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-6">
            <button
              type="button"
              onClick={() => setActiveJobModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              title="Tutup Modal"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            <div className="flex items-start gap-4 pr-8">
              <img
                src={activeJobModal.logo}
                alt={activeJobModal.company}
                className="w-16 h-16 rounded-2xl object-contain p-2 bg-slate-50 border border-slate-200 shrink-0"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#00193F] leading-snug">
                  {activeJobModal.title}
                </h2>
                <p className="text-sm font-semibold text-slate-600 mt-1 flex items-center gap-2">
                  <span>{activeJobModal.company}</span>
                  <span className="text-emerald-600 text-xs flex items-center gap-1 font-medium">
                    <i className="fa-solid fa-circle-check"></i> Mitra Global
                  </span>
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#E6FFFA] text-[#0D9488]">
                    100% Remote
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700">
                    {activeJobModal.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                    <i className="fa-solid fa-location-dot text-slate-400 text-[10px]"></i>
                    {activeJobModal.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Departemen</span>
                <span className="font-bold text-[#00193F]">{activeJobModal.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Tingkat Posisi</span>
                <span className="font-bold text-[#00193F]">{activeJobModal.level}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Rentang Gaji</span>
                <span className="font-bold text-emerald-600">{activeJobModal.salary}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Uraian Pekerjaan (Job Overview)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                {activeJobModal.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Kualifikasi & Persyaratan
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Pengalaman kerja minimal 3 tahun di bidang terkait ({activeJobModal.category}).</li>
                <li>Kemampuan komunikasi bahasa Inggris secara lisan dan tulisan yang baik untuk lingkungan kerja global.</li>
                <li>Terbiasa bekerja mandiri dan asinkron dalam tim lintas zona waktu.</li>
                <li>Memiliki pemahaman mendalam tentang standar industri dan metodologi agile.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveJobModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Tutup
              </button>
              {contextAppliedJobs.some((a) => a.id === `global-${activeJobModal.id}`) ? (
                <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs sm:text-sm border border-emerald-200">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i> Lamaran Terkirim
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleApplyClick(activeJobModal)}
                  className="px-6 py-2.5 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <i className="fa-solid fa-paper-plane text-xs"></i>
                  <span>Lamar Lowongan</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <FormulirLamarLowongan
        isOpen={applyModalOpen}
        job={selectedJobToApply}
        onClose={() => setApplyModalOpen(false)}
        onSubmit={handleApplySubmit}
        user={user}
        candidateName={candidateName}
        setCandidateName={setCandidateName}
        candidateEmail={candidateEmail}
        setCandidateEmail={setCandidateEmail}
        candidatePhone={candidatePhone}
        setCandidatePhone={setCandidatePhone}
        resumeOption={resumeOption}
        setResumeOption={setResumeOption}
        uploadedResumeName={uploadedResumeName}
        onUploadResume={handleResumeUpload}
        coverLetter={coverLetter}
        setCoverLetter={setCoverLetter}
        portfolioUrl={portfolioUrl}
        setPortfolioUrl={setPortfolioUrl}
        expectedSalary={expectedSalary}
        setExpectedSalary={setExpectedSalary}
      />

      <PeringatanWajibLogin
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        title={authModal.title}
        message={authModal.message}
        actionType={authModal.actionType}
        jobTitle={authModal.jobTitle}
        companyName={authModal.companyName}
      />
    </div>
  );
}
