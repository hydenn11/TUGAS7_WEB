import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PeringatanWajibLogin from '../components/PeringatanWajibLogin';

export default function Beranda() {
  const navigate = useNavigate();
  const { user, appliedJobs, savedJobIds, toggleSaveJob } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [activeCategoryPill, setActiveCategoryPill] = useState('Semua');

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    actionType: 'apply',
    jobTitle: '',
    companyName: '',
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const section = document.getElementById('lowongan-unggulan');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApply = (job) => {
    navigate(`/jobs?apply=${job.id}`);
  };

  const handleSave = (job) => {
    if (!user || user.role !== 'pelamar') {
      setAuthModal({
        isOpen: true,
        title: 'Masuk Akun Pelamar Terlebih Dahulu',
        message: `Untuk menyimpan lowongan "${job.title}" ke daftar favorit, Anda harus masuk ke akun pelamar Anda terlebih dahulu.`,
        actionType: 'save',
        jobTitle: job.title,
        companyName: job.company,
      });
      return;
    }
    toggleSaveJob(job.id);
  };

  const jobCards = [
    {
      id: 1,
      title: 'Senior Cloud & DevOps Engineer',
      company: 'PT Google Indonesia',
      logo: '/assets/company-google.png',
      category: 'Cloud & Infra',
      tags: [
        { label: 'Cloud & DevOps', bg: 'bg-[#CCFBF1]', text: 'text-[#16B3A3]' },
        { label: 'Hybrid', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]' },
        { label: 'Rp 28 - 45 Juta', bg: 'bg-slate-100', text: 'text-slate-700' },
      ],
      desc: 'Mengembangkan arsitektur microservices Google Cloud, infrastruktur Kubernetes, dan optimasi query data berskala global.',
      location: 'Jakarta Pusat',
    },
    {
      id: 2,
      title: 'Cloud Solutions Architect',
      company: 'PT Amazon Web Services Indonesia',
      logo: '/assets/company-amazon.png',
      category: 'Cloud & Infra',
      tags: [
        { label: 'Cloud Infrastructure', bg: 'bg-[#CCFBF1]', text: 'text-[#16B3A3]' },
        { label: 'Full-time', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]' },
        { label: 'Rp 25 - 40 Juta', bg: 'bg-slate-100', text: 'text-slate-700' },
      ],
      desc: 'Merancang arsitektur AWS cloud multi-region yang berkinerja tinggi, aman, resilient, dan mengoptimalkan efisiensi sistem klien enterprise.',
      location: 'Jakarta Selatan',
    },
    {
      id: 3,
      title: 'Senior UI/UX & Visual Designer',
      company: 'PT Adobe Systems Indonesia',
      logo: '/assets/company-adobe.png',
      category: 'UI/UX Design',
      tags: [
        { label: 'UI/UX Design', bg: 'bg-[#CCFBF1]', text: 'text-[#16B3A3]' },
        { label: 'Remote', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]' },
        { label: 'Rp 18 - 26 Juta', bg: 'bg-slate-100', text: 'text-slate-700' },
      ],
      desc: 'Merancang antarmuka interaktif, prototyping pengalaman pengguna, dan standardisasi sistem desain produk berbasis ekosistem Adobe Creative Cloud.',
      location: 'Bandung, Jawa Barat',
    },
    {
      id: 4,
      title: 'Restaurant Operations & QA Lead',
      company: 'PT Sari Burger Indonesia',
      logo: '/assets/company-burgerking.png',
      category: 'Operations & F&B',
      tags: [
        { label: 'Operations & F&B', bg: 'bg-[#CCFBF1]', text: 'text-[#16B3A3]' },
        { label: 'Full-time', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]' },
        { label: 'Rp 12 - 18 Juta', bg: 'bg-slate-100', text: 'text-slate-700' },
      ],
      desc: 'Mengawasi manajemen jaringan operasional gerai restoran, standardisasi mutu F&B, efisiensi rantai pasok kuliner, dan audit kepuasan pelanggan.',
      location: 'Surabaya, Jawa Timur',
    },
    {
      id: 5,
      title: 'Satellite & Network Engineer',
      company: 'PT Starlink Services Indonesia',
      logo: '/assets/company-spacex.png',
      category: 'Telecommunication',
      tags: [
        { label: 'Telecommunication', bg: 'bg-[#CCFBF1]', text: 'text-[#16B3A3]' },
        { label: 'Full-time', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]' },
        { label: 'Rp 30 - 50 Juta', bg: 'bg-slate-100', text: 'text-slate-700' },
      ],
      desc: 'Mengelola infrastruktur gateway stasiun bumi, pemeliharaan konstelasi satelit orbit rendah (LEO), dan optimalisasi performa konektivitas broadband.',
      location: 'Semarang, Jawa Tengah',
    },
    {
      id: 6,
      title: 'E-Commerce Growth & Ads Lead',
      company: 'PT Amazon Services Indonesia',
      logo: '/assets/company-amazon.png',
      category: 'Cloud & Infra',
      tags: [
        { label: 'Digital Marketing', bg: 'bg-[#CCFBF1]', text: 'text-[#16B3A3]' },
        { label: 'Full-time', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]' },
        { label: 'Rp 15 - 22 Juta', bg: 'bg-slate-100', text: 'text-slate-700' },
      ],
      desc: 'Memimpin strategi kemitraan merchant marketplace, optimasi performa campaign iklan digital, analitik konversi data penjualan ritel e-commerce.',
      location: 'Jakarta Barat',
    },
    {
      id: 7,
      title: 'Regional Supply Chain Lead',
      company: 'PT Kalla Logistics Nusantara',
      logo: '/assets/company-google.png',
      category: 'Operations & F&B',
      tags: [
        { label: 'Supply Chain', bg: 'bg-[#CCFBF1]', text: 'text-[#16B3A3]' },
        { label: 'Full-time', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]' },
        { label: 'Rp 18 - 28 Juta', bg: 'bg-slate-100', text: 'text-slate-700' },
      ],
      desc: 'Mengawasi distribusi logistik regional kawasan timur Indonesia, efisiensi pergudangan, dan kemitraan rantai pasok niaga.',
      location: 'Makassar, Sulawesi Selatan',
    },
    {
      id: 8,
      title: 'Creative Brand & Design Lead',
      company: 'PT Bali Digital Media',
      logo: '/assets/company-adobe.png',
      category: 'UI/UX Design',
      tags: [
        { label: 'Creative Design', bg: 'bg-[#CCFBF1]', text: 'text-[#16B3A3]' },
        { label: 'Full-time', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]' },
        { label: 'Rp 16 - 24 Juta', bg: 'bg-slate-100', text: 'text-slate-700' },
      ],
      desc: 'Merancang identitas visual, materi kampanye kreatif destinasi pariwisata internasional, dan portofolio aset digital studio.',
      location: 'Denpasar, Bali',
    },
    {
      id: 9,
      title: 'Senior Frontend React Engineer',
      company: 'PT Global Solusi Digital',
      logo: '/assets/company-google.png',
      category: 'AI & Software',
      tags: [
        { label: 'Software Engineering', bg: 'bg-[#CCFBF1]', text: 'text-[#16B3A3]' },
        { label: 'Remote', bg: 'bg-[#EFF6FF]', text: 'text-[#1D4ED8]' },
        { label: 'Rp 22 - 35 Juta', bg: 'bg-slate-100', text: 'text-slate-700' },
      ],
      desc: 'Membangun aplikasi single-page application berkinerja tinggi menggunakan React, Tailwind CSS, dan standardisasi clean architecture.',
      location: 'Remote',
    },
  ];

  const categoryPills = [
    'Semua',
    'AI & Software',
    'Cloud & Infra',
    'UI/UX Design',
    'Operations & F&B',
    'Telecommunication',
  ];

  const matchesProvinceOrCity = (jobLocation = '', filterProvince = '') => {
    if (!filterProvince) return true;
    const loc = (jobLocation || '').toLowerCase();
    const prov = filterProvince.toLowerCase();

    if (prov === 'remote') {
      return loc.includes('remote') || loc.includes('jarak jauh') || loc.includes('wfa');
    }

    if (prov === 'hybrid') {
      return loc.includes('hybrid');
    }

    const provinceMap = {
      jakarta: ['jakarta', 'dki', 'scbd', 'senayan', 'thamrin', 'kuningan', 'sudirman'],
      'jawa barat': ['jawa barat', 'jabar', 'bandung', 'bekasi', 'bogor', 'depok', 'cimahi', 'cikarang', 'karawang'],
      'jawa tengah': ['jawa tengah', 'jateng', 'semarang', 'solo', 'surakarta', 'yogyakarta', 'jogja'],
      'jawa timur': ['jawa timur', 'jatim', 'surabaya', 'malang', 'sidoarjo', 'gresik'],
      'sulawesi selatan': ['sulawesi selatan', 'sulsel', 'makassar', 'gowa', 'maros'],
      bali: ['bali', 'denpasar', 'badung', 'kuta', 'ubud'],
    };

    const keywords = provinceMap[prov] || [prov];
    return keywords.some((kw) => loc.includes(kw));
  };

  const filteredJobCards = jobCards.filter((job) => {
    if (activeCategoryPill !== 'Semua' && job.category !== activeCategoryPill) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchText = job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q);
      if (!matchText) return false;
    }
    if (selectedLocation) {
      if (!matchesProvinceOrCity(job.location, selectedLocation)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div>
      <section className="w-full bg-gradient-to-r from-[#00193F] to-[#16B3A3] pt-14 pb-16 px-4 text-center text-white shadow-md mb-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Temukan Karir Impianmu di <span className="text-[#99F6E4]">AYOKERJA!</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Platform job recruitment online resmi untuk menghubungkan pencari kerja dengan perusahaan terverifikasi di
            seluruh Indonesia.
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-3 max-w-3xl mx-auto border border-slate-200/80"
          >
            <div className="flex-1 flex items-center gap-3 px-3 py-1.5 sm:py-0 w-full">
              <i className="fa-solid fa-magnifying-glass text-slate-400 text-sm"></i>
              <input
                type="text"
                name="q"
                placeholder="Cari posisi pekerjaan atau nama perusahaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-2 sm:py-0 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-200 text-slate-600 text-xs sm:text-sm">
              <i className="fa-solid fa-location-dot text-slate-400 text-xs"></i>
              <select
                name="lokasi"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-slate-700 text-xs sm:text-sm pr-2 w-full sm:w-auto"
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

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#16B3A3] hover:bg-[#109485] text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
            >
              Cari Lowongan
            </button>
          </form>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <section id="statistik-platform" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-city"></i>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#00193F]">300+</div>
                <div className="text-xs text-slate-500 font-medium">Perusahaan Terverifikasi</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#00193F] text-xl shrink-0">
                <i className="fa-solid fa-users"></i>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#00193F]">10.000+</div>
                <div className="text-xs text-slate-500 font-medium">Pelamar Terdaftar</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#00193F]">1.200+</div>
                <div className="text-xs text-slate-500 font-medium">Lowongan Aktif</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#00193F]">94%</div>
                <div className="text-xs text-slate-500 font-medium">Tingkat Kelulusan</div>
              </div>
            </div>
          </div>
        </section>

        <section id="lowongan-unggulan" className="mb-14 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#00193F]">Rekomendasi Pekerjaan Unggulan</h2>
              <p className="text-xs text-slate-500 mt-1">
                Pilihan posisi terbaik yang disesuaikan dengan kebutuhan industri saat ini
              </p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 text-xs">
              {categoryPills.map((pill) => (
                <button
                  type="button"
                  key={pill}
                  onClick={() => setActiveCategoryPill(pill)}
                  className={`px-3.5 py-1.5 rounded-lg font-semibold shrink-0 cursor-pointer transition-colors ${activeCategoryPill === pill
                    ? 'bg-[#16B3A3] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-[#16B3A3] hover:text-[#16B3A3]'
                    }`}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {(searchQuery || selectedLocation || activeCategoryPill !== 'Semua') && (
            <div className="flex flex-wrap items-center gap-2 mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-xs">
              <span className="text-slate-500 font-semibold">Filter aktif:</span>
              {searchQuery && (
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-800 font-bold">
                  "{searchQuery}"
                </span>
              )}
              {selectedLocation && (
                <span className="bg-white border border-teal-200 text-[#16B3A3] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                  <i className="fa-solid fa-location-dot text-[10px]"></i> {selectedLocation}
                </span>
              )}
              {activeCategoryPill !== 'Semua' && (
                <span className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-bold">
                  Kategori: {activeCategoryPill}
                </span>
              )}
              <span className="text-slate-400 font-medium ml-1">
                ({filteredJobCards.length} lowongan ditemukan)
              </span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocation('');
                  setActiveCategoryPill('Semua');
                }}
                className="ml-auto text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <i className="fa-solid fa-arrow-rotate-left text-[10px]"></i> Reset Filter
              </button>
            </div>
          )}

          {filteredJobCards.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 mx-auto flex items-center justify-center text-xl mb-3">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 className="text-base font-bold text-[#00193F] mb-1">Tidak Ditemukan Lowongan</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Belum ada lowongan yang sesuai dengan kata kunci atau daerah yang Anda cari. Coba pilih provinsi lain atau reset filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocation('');
                  setActiveCategoryPill('Semua');
                }}
                className="px-5 py-2.5 rounded-lg bg-[#16B3A3] text-white font-semibold text-xs hover:bg-[#109485] transition-all shadow-sm"
              >
                Tampilkan Semua Lowongan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobCards.map((job) => (
                <article
                  key={job.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B3A3]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3.5 mb-3">
                      <img src={job.logo} alt={job.company} className="w-11 h-11 object-contain shrink-0" />
                      <div>
                        <button
                          type="button"
                          onClick={() => navigate(`/jobs?detail=${job.id}`)}
                          className="text-base font-bold text-[#00193F] leading-snug hover:text-[#16B3A3] text-left transition-colors cursor-pointer hover:underline block"
                          title="Klik posisi untuk melihat detail lowongan"
                        >
                          {job.title}
                        </button>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {job.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${t.bg} ${t.text}`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {job.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5 truncate max-w-[150px] sm:max-w-none">
                      <i className="fa-solid fa-location-dot text-slate-400"></i> {job.location}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSave(job)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors border ${savedJobIds.includes(job.id)
                          ? 'text-amber-500 bg-amber-50 border-amber-200'
                          : 'text-slate-400 hover:text-amber-500 hover:bg-slate-50 border-slate-200'
                          }`}
                        title={savedJobIds.includes(job.id) ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}
                        aria-label={savedJobIds.includes(job.id) ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}
                      >
                        <i className={`fa-bookmark ${savedJobIds.includes(job.id) ? 'fa-solid text-amber-500' : 'fa-regular'} text-sm`}></i>
                      </button>
                      {appliedJobs.some((a) => a.id === job.id) ? (
                        <span className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200">
                          <i className="fa-solid fa-circle-check text-emerald-500 text-[11px]"></i> Dilamar
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApply(job)}
                          className="h-9 px-4 rounded-lg bg-[#16B3A3] hover:bg-[#109485] text-white font-medium text-xs transition-colors shadow-sm"
                        >
                          Lamar Lowongan
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-14 pt-10 mb-20 pb-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00193F] tracking-tight">
                Peluang Karier Remote Global
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Bekerja secara asinkron dari mana saja untuk perusahaan teknologi terkemuka dunia.
              </p>
            </div>
            <Link
              to="/lowongan-api"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00193F] hover:bg-[#16B3A3] text-white text-xs sm:text-sm font-bold transition-colors shadow-sm shrink-0"
            >
              <span>Lihat Semua Lowongan Global</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B3A3]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/assets/company-google.png"
                    alt="Google Cloud Global"
                    className="w-12 h-12 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-[#00193F] text-sm">Google Cloud Global</h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <i className="fa-solid fa-location-dot text-[10px]"></i> San Francisco, CA (Remote)
                    </p>
                  </div>
                </div>
                <h4 className="font-extrabold text-[#00193F] text-base mb-2">
                  Senior Cloud Infrastructure Architect
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8]">
                    100% Remote
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Cloud & DevOps
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Membangun dan mengelola arsitektur server terdistribusi lintas zona waktu dengan keandalan tinggi.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-5">
                <span className="font-bold text-[#00193F] text-xs">$5,500 - $7,800 / bln</span>
                <Link
                  to="/lowongan-api?q=Google"
                  className="text-xs font-bold text-[#16B3A3] hover:underline flex items-center gap-1"
                >
                  <span>Lihat Detail</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B3A3]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/assets/company-amazon.png"
                    alt="AWS Global"
                    className="w-12 h-12 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-[#00193F] text-sm">Amazon Web Services</h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <i className="fa-solid fa-location-dot text-[10px]"></i> Seattle, WA (Remote)
                    </p>
                  </div>
                </div>
                <h4 className="font-extrabold text-[#00193F] text-base mb-2">
                  Principal Distributed Systems Engineer
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8]">
                    100% Remote
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Software Eng
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Mengembangkan microservices performa tinggi untuk pemrosesan jutaan transaksi per detik di AWS.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-5">
                <span className="font-bold text-[#00193F] text-xs">$6,000 - $8,500 / bln</span>
                <Link
                  to="/lowongan-api?q=Amazon"
                  className="text-xs font-bold text-[#16B3A3] hover:underline flex items-center gap-1"
                >
                  <span>Lihat Detail</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B3A3]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/assets/company-adobe.png"
                    alt="Adobe Creative Cloud"
                    className="w-12 h-12 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-[#00193F] text-sm">Adobe Creative Cloud</h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <i className="fa-solid fa-location-dot text-[10px]"></i> San Jose, CA (Remote)
                    </p>
                  </div>
                </div>
                <h4 className="font-extrabold text-[#00193F] text-base mb-2">
                  Senior UI/UX Design System Lead
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E6FFFA] text-[#0D9488]">
                    100% Remote
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Product Design
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Memimpin perancangan standar desain antarmuka dan komponen interaktif untuk suite aplikasi kreatif generasi baru.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-5">
                <span className="font-bold text-[#00193F] text-xs">$4,800 - $6,700 / bln</span>
                <Link
                  to="/lowongan-api?q=Adobe"
                  className="text-xs font-bold text-[#16B3A3] hover:underline flex items-center gap-1"
                >
                  <span>Lihat Detail</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B3A3]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/assets/company-spacex.png"
                    alt="SpaceX Starlink Tech"
                    className="w-12 h-12 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-[#00193F] text-sm">SpaceX Starlink Tech</h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <i className="fa-solid fa-location-dot text-[10px]"></i> Hawthorne, CA (Remote)
                    </p>
                  </div>
                </div>
                <h4 className="font-extrabold text-[#00193F] text-base mb-2">
                  Senior Network & Satcom Engineer
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E6FFFA] text-[#0D9488]">
                    100% Remote
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Infrastruktur
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Mengembangkan protokol transmisi data satelit orbit rendah berkecepatan tinggi dengan latensi ultra-rendah.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-5">
                <span className="font-bold text-[#00193F] text-xs">$6,500 - $9,200 / bln</span>
                <Link
                  to="/lowongan-api?q=SpaceX"
                  className="text-xs font-bold text-[#16B3A3] hover:underline flex items-center gap-1"
                >
                  <span>Lihat Detail</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B3A3]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/assets/company-burgerking.png"
                    alt="Burger King Global Tech"
                    className="w-12 h-12 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-[#00193F] text-sm">Burger King Global Tech</h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <i className="fa-solid fa-location-dot text-[10px]"></i> Miami, FL (Remote)
                    </p>
                  </div>
                </div>
                <h4 className="font-extrabold text-[#00193F] text-base mb-2">
                  Lead Enterprise Data Analyst
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E6FFFA] text-[#0D9488]">
                    100% Remote
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Data & Analytics
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Membangun pemodelan analitik data transaksi dan rantai pasok global berbasis kecerdasan buatan.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-5">
                <span className="font-bold text-[#00193F] text-xs">$4,200 - $6,000 / bln</span>
                <Link
                  to="/lowongan-api?q=Burger"
                  className="text-xs font-bold text-[#16B3A3] hover:underline flex items-center gap-1"
                >
                  <span>Lihat Detail</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B3A3]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/assets/company-amazon.png"
                    alt="Stripe Payments Inc."
                    className="w-12 h-12 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-[#00193F] text-sm">Stripe Payments Inc.</h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <i className="fa-solid fa-location-dot text-[10px]"></i> Dublin, Irlandia (Remote)
                    </p>
                  </div>
                </div>
                <h4 className="font-extrabold text-[#00193F] text-base mb-2">
                  Senior Fintech Security Architect
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E6FFFA] text-[#0D9488]">
                    100% Remote
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Cybersecurity
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Mengamankan arsitektur gateway transaksi finansial internasional terhadap ancaman siber perbankan.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-5">
                <span className="font-bold text-[#00193F] text-xs">$6,200 - $8,800 / bln</span>
                <Link
                  to="/lowongan-api?q=Stripe"
                  className="text-xs font-bold text-[#16B3A3] hover:underline flex items-center gap-1"
                >
                  <span>Lihat Detail</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

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
