import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Perusahaan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await fetch('/data/companies.json');
      if (!response.ok) {
        throw new Error(`Gagal memuat data mitra perusahaan (HTTP ${response.status})`);
      }
      const data = await response.json();
      setCompanyList(data);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memuat data perusahaan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCompanies();
  }, []);

  const filteredCompanies = companyList.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.dataName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = !selectedIndustry || comp.industryKey === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 flex flex-col">
      <section className="w-full bg-gradient-to-r from-[#00193F] to-[#16B3A3] pt-12 pb-16 px-4 text-center text-white shadow-md mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-teal-200 mb-3 border border-white/20">
            <i className="fa-solid fa-handshake"></i>
            <span>Jaringan Mitra Resmi AYOKERJA!</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Daftar Mitra <span className="text-[#99F6E4]">Perusahaan</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Jelajahi profil perusahaan terverifikasi yang telah lolos standar legalitas resmi AYOKERJA! dan siap merekrut talenta terbaik.
          </p>

          <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-3 max-w-3xl mx-auto border border-slate-200/80">
            <div className="flex-1 flex items-center gap-3 px-3 py-1.5 sm:py-0 w-full">
              <i className="fa-solid fa-magnifying-glass text-slate-400 text-sm"></i>
              <input
                type="text"
                placeholder="Cari nama perusahaan atau kota (contoh: Astra, Telkom, Google)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-2 sm:py-0 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-200 text-slate-600 text-xs sm:text-sm">
              <i className="fa-solid fa-industry text-slate-400 text-xs"></i>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-slate-700 text-xs sm:text-sm pr-2 w-full sm:w-auto"
              >
                <option value="">Semua Industri</option>
                <option value="Teknologi">Teknologi &amp; Software</option>
                <option value="Cloud">Cloud &amp; Infra</option>
                <option value="Desain">Desain &amp; Kreatif</option>
                <option value="F&B">F&B / Kuliner</option>
                <option value="Telekomunikasi">Telekomunikasi &amp; Satelit</option>
              </select>
            </div>

            {searchTerm || selectedIndustry ? (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedIndustry('');
                }}
                className="px-3 py-2 text-xs font-bold text-rose-600 hover:underline cursor-pointer"
              >
                Reset
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#00193F]">Perusahaan Rekanan Terverifikasi</h2>
            <p className="text-xs text-slate-500 mt-0.5">Menampilkan mitra aktif yang sedang membuka lowongan karir</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#CCFBF1] text-[#16B3A3] self-start sm:self-auto">
            {loading ? 'Memuat data...' : `${filteredCompanies.length} Perusahaan Terdaftar`}
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-12 bg-slate-100 rounded-lg"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-md mx-auto my-8 space-y-3">
            <i className="fa-solid fa-triangle-exclamation text-rose-500 text-3xl"></i>
            <h3 className="font-bold text-rose-800 text-sm">{error}</h3>
            <p className="text-xs text-rose-600">Pastikan file /data/companies.json tersedia pada direktori public.</p>
            <button
              type="button"
              onClick={fetchCompanies}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors shadow-sm"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCompanies.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto my-10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
              <i className="fa-solid fa-building-circle-xmark"></i>
            </div>
            <h3 className="font-bold text-[#00193F] text-base">Tidak Ditemukan Perusahaan</h3>
            <p className="text-xs text-slate-500">
              Tidak ada mitra yang cocok dengan filter atau kata kunci pencarian Anda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedIndustry('');
              }}
              className="text-xs font-bold text-[#16B3A3] hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Success List State */}
        {!loading && !error && filteredCompanies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((comp) => (
              <article
                key={comp.id}
                className="company-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B3A3]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={comp.logo}
                        alt={comp.name}
                        className="w-12 h-12 object-contain p-1.5 rounded-xl bg-slate-50 border border-slate-200 shrink-0"
                      />
                      <div>
                        <h3 className="text-base font-bold text-[#00193F] leading-snug">{comp.name}</h3>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md mt-1 border border-emerald-200/60">
                          <i className="fa-solid fa-shield-check text-xs"></i> Terverifikasi Resmi
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1 shrink-0">
                      <i className="fa-solid fa-star text-[11px]"></i> {comp.rating}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {comp.desc}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-industry w-4 text-slate-400"></i>
                      <span>Industri: <strong>{comp.industryLabel}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-location-dot w-4 text-slate-400"></i>
                      <span>Lokasi: {comp.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-briefcase w-4 text-slate-400"></i>
                      <span className="font-semibold text-slate-700">{comp.openJobs}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-slate-400">{comp.since}</span>
                  <Link
                    to={`/jobs?q=${encodeURIComponent(comp.name)}`}
                    className="h-9 px-4 rounded-lg bg-[#16B3A3] hover:bg-[#109485] text-white text-xs font-medium transition-colors shadow-xs flex items-center justify-center cursor-pointer"
                  >
                    Lihat Lowongan
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
