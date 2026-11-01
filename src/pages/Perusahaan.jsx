import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Perusahaan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const companyList = [
    {
      id: 1,
      name: 'PT Astra International Tbk',
      dataName: 'Astra International',
      industryKey: 'Teknologi',
      industryLabel: 'Otomotif & Industri IoT',
      logo: '/assets/company-amazon.png',
      rating: '4.8',
      desc: 'Konglomerat multisektor terkemuka Indonesia dengan fokus inovasi otomotif, jasa keuangan, alat berat, dan pengembangan platform Industrial IoT cerdas.',
      location: 'Semarang & Jakarta',
      openJobs: '18 Lowongan Terbuka',
      since: 'Mitra sejak 2023',
    },
    {
      id: 2,
      name: 'PT Telkom Indonesia (Persero) Tbk',
      dataName: 'Telkom Indonesia',
      industryKey: 'Telekomunikasi',
      industryLabel: 'Telekomunikasi & Jaringan',
      logo: '/assets/company-spacex.png',
      rating: '4.9',
      desc: 'BUMN telekomunikasi digital terbesar di Indonesia penyedia jaringan pita lebar, pusat data nasional, dan infrastruktur cloud telekomunikasi nusantara.',
      location: 'Bandung & Jakarta',
      openJobs: '24 Lowongan Terbuka',
      since: 'Mitra sejak 2023',
    },
    {
      id: 3,
      name: 'PT Bank Central Asia Tbk (BCA)',
      dataName: 'Bank Central Asia BCA',
      industryKey: 'Teknologi',
      industryLabel: 'Perbankan & Fintech',
      logo: '/assets/company-google.png',
      rating: '4.9',
      desc: 'Bank swasta terbesar di Indonesia pelopor inovasi perbankan digital, keamanan data perbankan transaksi tinggi, dan sistem pembayaran elektronik.',
      location: 'Jakarta Pusat',
      openJobs: '14 Lowongan Terbuka',
      since: 'Mitra sejak 2024',
    },
    {
      id: 4,
      name: 'PT GoTo Gojek Tokopedia Tbk',
      dataName: 'GoTo Gojek Tokopedia',
      industryKey: 'Teknologi',
      industryLabel: 'Ekosistem Digital & E-Commerce',
      logo: '/assets/company-adobe.png',
      rating: '4.8',
      desc: 'Ekosistem digital terintegrasi terbesar di Indonesia yang menggabungkan layanan on-demand, e-commerce Tokopedia, dan solusi keuangan digital GoPay.',
      location: 'Jakarta Selatan',
      openJobs: '20 Lowongan Terbuka',
      since: 'Mitra sejak 2024',
    },
    {
      id: 5,
      name: 'PT Google Indonesia',
      dataName: 'Google Indonesia Cloud Global',
      industryKey: 'Teknologi',
      industryLabel: 'Teknologi & Cloud',
      logo: '/assets/company-google.png',
      rating: '4.9',
      desc: 'Perusahaan teknologi multinasional penyedia ekosistem mesin pencari, komputasi awan Google Cloud, dan infrastruktur kecerdasan buatan global.',
      location: 'SCBD, Jakarta Selatan',
      openJobs: '12 Lowongan Terbuka',
      since: 'Mitra sejak 2024',
    },
    {
      id: 6,
      name: 'PT Amazon Web Services Indonesia',
      dataName: 'Amazon Web Services AWS',
      industryKey: 'Cloud',
      industryLabel: 'Cloud & Infra',
      logo: '/assets/company-amazon.png',
      rating: '4.8',
      desc: 'Penyedia platform komputasi awan global terlengkap, infrastruktur server enterprise, dan pusat analitik data di kawasan Asia Pasifik.',
      location: 'SCBD Senayan, Jakarta',
      openJobs: '8 Lowongan Terbuka',
      since: 'Mitra sejak 2024',
    },
    {
      id: 7,
      name: 'PT Adobe Systems Indonesia',
      dataName: 'Adobe Systems Creative Cloud',
      industryKey: 'Desain',
      industryLabel: 'Desain & Kreatif',
      logo: '/assets/company-adobe.png',
      rating: '4.9',
      desc: 'Pelopor perangkat lunak kreatif digital terkemuka dunia di bidang desain grafis, ilustrasi, UI/UX, video editing, dan publikasi media.',
      location: 'BSD City, Tangerang',
      openJobs: '6 Lowongan Terbuka',
      since: 'Mitra sejak 2025',
    },
    {
      id: 8,
      name: 'PT Sari Burger Indonesia',
      dataName: 'Burger King Sari Burger Global Tech',
      industryKey: 'F&B',
      industryLabel: 'F&B / Kuliner Tech',
      logo: '/assets/company-burgerking.png',
      rating: '4.7',
      desc: 'Jaringan waralaba restoran cepat saji internasional dengan ratusan cabang di Indonesia, didukung manajemen rantai pasok dan analitik data global.',
      location: 'Surabaya & Nasional',
      openJobs: '15 Lowongan Terbuka',
      since: 'Mitra sejak 2024',
    },
    {
      id: 9,
      name: 'PT Starlink Services Indonesia',
      dataName: 'SpaceX Starlink Services',
      industryKey: 'Telekomunikasi',
      industryLabel: 'Telekomunikasi Satelit',
      logo: '/assets/company-spacex.png',
      rating: '4.9',
      desc: 'Penyedia jaringan telekomunikasi internet satelit orbit rendah berkecepatan tinggi yang menjangkau seluruh pelosok kepulauan Indonesia.',
      location: 'Jakarta Pusat',
      openJobs: '5 Lowongan Terbuka',
      since: 'Mitra sejak 2025',
    },
    {
      id: 10,
      name: 'PT Kalla Logistics Nusantara',
      dataName: 'Kalla Logistics',
      industryKey: 'Teknologi',
      industryLabel: 'Logistik & Distribusi',
      logo: '/assets/company-google.png',
      rating: '4.7',
      desc: 'Penyedia layanan solusi rantai pasok terintegrasi, manajemen armada pintar, dan pergudangan modern terkemuka di kawasan Indonesia Timur.',
      location: 'Makassar, Sulawesi Selatan',
      openJobs: '9 Lowongan Terbuka',
      since: 'Mitra sejak 2024',
    },
    {
      id: 11,
      name: 'PT Bali Digital Media',
      dataName: 'Bali Digital Media',
      industryKey: 'Desain',
      industryLabel: 'Media Kreatif & Desain',
      logo: '/assets/company-adobe.png',
      rating: '4.8',
      desc: 'Agensi kreatif digital dan produksi konten multimedia interaktif terdepan untuk kampanye promosi pariwisata dan jenama internasional.',
      location: 'Denpasar, Bali',
      openJobs: '7 Lowongan Terbuka',
      since: 'Mitra sejak 2025',
    },
  ];

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
            {filteredCompanies.length} Perusahaan Terdaftar
          </span>
        </div>

        {filteredCompanies.length === 0 ? (
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
        ) : (
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
