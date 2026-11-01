import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RincianKandidat from '../components/RincianKandidat';
import FormulirEditLowongan from '../components/FormulirEditLowongan';
import TabelLowonganPerusahaan from '../components/TabelLowonganPerusahaan';
import FormulirPasangLowongan from '../components/FormulirPasangLowongan';

export default function DashboardPerusahaan() {
  const { user, logout, updateCompanyProfile } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Tab: 'dashboard' | 'jobs' | 'create-job' | 'applicants' | 'profile'
  const validTabs = ['dashboard', 'jobs', 'create-job', 'applicants', 'profile'];
  const tabFromUrl = searchParams.get('tab');

  const [activeTab, setActiveTabState] = useState(() => {
    if (tabFromUrl && validTabs.includes(tabFromUrl)) {
      return tabFromUrl;
    }
    return 'dashboard';
  });

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    setSearchParams(tab === 'dashboard' ? {} : { tab }, { replace: true });
  };

  useEffect(() => {
    if (tabFromUrl && validTabs.includes(tabFromUrl) && tabFromUrl !== activeTab) {
      setActiveTabState(tabFromUrl);
    } else if (!tabFromUrl && activeTab !== 'dashboard') {
      setActiveTabState('dashboard');
    }
  }, [tabFromUrl]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  // State profil perusahaan
  const [companyProfile, setCompanyProfile] = useState(() => {
    const saved = localStorage.getItem('ayokerja_current_company');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.name === 'daniramadh47' || !parsed.name)) {
          parsed.name = 'PT Google Indonesia';
        }
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    const rawName = user?.namaPerusahaan;
    const isUsername = rawName === 'daniramadh47' || (user?.email && rawName === user.email.split('@')[0]);
    return {
      name: rawName && !isUsername ? rawName : 'PT Google Indonesia',
      email: user?.email || 'recruitment@google.co.id',
      industry: user?.industri || 'Teknologi Informasi & SaaS',
      employeeSize: user?.ukuranKaryawan || '500 - 1.000 Karyawan',
      address: user?.lokasi || 'Sentral Senayan II, Jl. Asia Afrika No.8, Gelora, Jakarta Pusat',
      website: user?.website || 'https://careers.google.com',
      linkedin: user?.linkedin || 'https://linkedin.com/company/google-indonesia',
      instagram: user?.instagram || '@googleindonesia',
      description:
        user?.deskripsi ||
        'Perusahaan teknologi multinasional terkemuka penyedia ekosistem mesin pencari, komputasi awan Google Cloud, dan infrastruktur digital global. Kami berkomitmen membangun lingkungan kerja inklusif dan mendorong inovasi digital bagi Indonesia.',
      logo: user?.logo || '/assets/company-google.png',
      banner: user?.banner || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    };
  });

  useEffect(() => {
    localStorage.setItem('ayokerja_current_company', JSON.stringify(companyProfile));
  }, [companyProfile]);

  // State daftar lowongan
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('ayokerja_company_jobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 1,
        title: 'Senior Cloud & DevOps Engineer',
        department: 'Software & AI',
        type: 'Full-time',
        workPolicy: 'Hybrid',
        location: 'Jakarta Selatan',
        minSalary: 28,
        maxSalary: 45,
        showSalary: true,
        experienceLevel: 'Senior Level',
        deadline: '2026-11-15',
        createdAt: '2026-10-10',
        status: 'Aktif',
        description:
          'Mengembangkan arsitektur microservices Google Cloud, container orchestration Kubernetes, dan optimasi query data berskala global.',
        qualifications: 'Minimal 4 tahun pengalaman di ekosistem AI, Python/TypeScript, GCP, dan Docker/Kubernetes.',
        skills: ['AI / ML', 'Google Cloud', 'TypeScript', 'Kubernetes', 'Python'],
        applicantsCount: 142,
      },
      {
        id: 2,
        title: 'Cloud Solutions Architect',
        department: 'Cloud & Infrastructure',
        type: 'Full-time',
        workPolicy: 'Full-time',
        location: 'Jakarta Pusat',
        minSalary: 25,
        maxSalary: 40,
        showSalary: true,
        experienceLevel: 'Senior Level',
        deadline: '2026-11-20',
        createdAt: '2026-10-14',
        status: 'Aktif',
        description:
          'Merancang arsitektur multi-region enterprise cloud, disaster recovery, dan optimasi efisiensi biaya infrastruktur klien korporat.',
        qualifications: 'Memiliki sertifikasi Cloud Professional Architect dan pengalaman 5+ tahun dalam perancangan cloud infra.',
        skills: ['Cloud Architecture', 'Terraform', 'DevOps', 'Security', 'GCP'],
        applicantsCount: 74,
      },
      {
        id: 3,
        title: 'Senior UI/UX & Visual Designer',
        department: 'UI/UX Design',
        type: 'Remote',
        workPolicy: 'Remote',
        location: 'Bandung (Remote)',
        minSalary: 18,
        maxSalary: 26,
        showSalary: true,
        experienceLevel: 'Mid-Senior Level',
        deadline: '2026-11-10',
        createdAt: '2026-10-18',
        status: 'Aktif',
        description:
          'Merancang antarmuka sistem desain terpusat, memimpin user research, prototyping interaktif, dan validasi kegunaan produk.',
        qualifications: 'Menguasai Figma, design token, riset usability, dan memiliki portofolio UX mobile/web yang kuat.',
        skills: ['Figma', 'UI/UX', 'Design System', 'User Research', 'Prototyping'],
        applicantsCount: 56,
      },
      {
        id: 4,
        title: 'Associate Product Growth Specialist',
        department: 'Product Management',
        type: 'Internship',
        workPolicy: 'Hybrid',
        location: 'Jakarta Selatan',
        minSalary: 6,
        maxSalary: 9,
        showSalary: false,
        experienceLevel: 'Entry / Magang',
        deadline: '2026-10-30',
        createdAt: '2026-10-01',
        status: 'Ditutup',
        description:
          'Membantu analisis metrik akuisisi pengguna, funnel konversi, dan eksperimen fitur pertumbuhan produk aplikasi.',
        qualifications: 'Mahasiswa tingkat akhir atau fresh graduate dengan kemampuan analisis data dan komunikasi yang baik.',
        skills: ['Product Analytics', 'Growth Marketing', 'SQL', 'A/B Testing'],
        applicantsCount: 38,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('ayokerja_company_jobs', JSON.stringify(jobs));
  }, [jobs]);

  // State data pelamar
  const [applicants, setApplicants] = useState(() => {
    const saved = localStorage.getItem('ayokerja_company_applicants');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 101,
        name: 'Andi Pratama, S.Kom.',
        email: 'andi.pratama@gmail.com',
        phone: '0812-8899-7711',
        jobId: 1,
        jobTitle: 'Senior Cloud & DevOps Engineer',
        appliedDate: '2026-10-25',
        stage: 'baru', // 'baru' | 'review' | 'interview' | 'diterima' | 'ditolak'
        matchScore: 96,
        skills: ['Python', 'TensorFlow', 'GCP', 'TypeScript'],
        resumeName: 'CV_Andi_Pratama_AI_Engineer.pdf',
        experience: '4 Tahun di Tech Unicorn',
        education: 'S1 Teknik Informatika, Institut Teknologi Bandung',
        coverNote: 'Sangat antusias berkontribusi dalam implementasi model LLM & cloud infra berskala enterprise di Google Indonesia.',
      },
      {
        id: 102,
        name: 'Siti Rahmawati',
        email: 'siti.rahmawati@uiux.design',
        phone: '0857-1122-3344',
        jobId: 3,
        jobTitle: 'Senior UI/UX & Visual Designer',
        appliedDate: '2026-10-24',
        stage: 'interview',
        matchScore: 94,
        skills: ['Figma', 'Design System', 'User Research', 'Tailwind'],
        resumeName: 'Portfolio_CV_Siti_Rahmawati.pdf',
        experience: '3.5 Tahun di Digital Product Agency',
        education: 'S1 Desain Komunikasi Visual, Universitas Indonesia',
        coverNote: 'Berpengalaman membangun design system terintegrasi dari nol dan meningkatkan conversion rate produk hingga 35%.',
      },
      {
        id: 103,
        name: 'Fajar Nugraha',
        email: 'fajar.nugraha@cloudinfra.net',
        phone: '0813-4455-6677',
        jobId: 2,
        jobTitle: 'Cloud Solutions Architect',
        appliedDate: '2026-10-25',
        stage: 'baru',
        matchScore: 91,
        skills: ['Terraform', 'Kubernetes', 'GCP Architect', 'Docker'],
        resumeName: 'CV_Fajar_CloudArchitect.pdf',
        experience: '5 Tahun di Banking IT & Multi-cloud',
        education: 'S1 Sistem Informasi, Universitas Gadjah Mada',
        coverNote: 'Memiliki sertifikasi Google Cloud Professional Architect & pengalaman mengelola lebih dari 200 microservices clusters.',
      },
      {
        id: 104,
        name: 'Dimas Aditya Saputra',
        email: 'dimas.aditya@gmail.com',
        phone: '0821-9988-1122',
        jobId: 1,
        jobTitle: 'Senior Cloud & DevOps Engineer',
        appliedDate: '2026-10-23',
        stage: 'review',
        matchScore: 88,
        skills: ['Python', 'Docker', 'FastAPI', 'PyTorch'],
        resumeName: 'Resume_Dimas_Aditya.pdf',
        experience: '3 Tahun di AI Research Lab',
        education: 'S2 Ilmu Komputer, Institut Teknologi Sepuluh Nopember',
        coverNote: 'Berfokus pada fine-tuning model open-source dan deployment inferensi berkecepatan tinggi.',
      },
      {
        id: 105,
        name: 'Jessica Wong',
        email: 'jessica.wong@gmail.com',
        phone: '0811-2233-4455',
        jobId: 1,
        jobTitle: 'Senior Cloud & DevOps Engineer',
        appliedDate: '2026-10-18',
        stage: 'diterima',
        matchScore: 98,
        skills: ['AI / ML', 'Kubernetes', 'Go', 'GCP', 'TypeScript'],
        resumeName: 'CV_Jessica_Wong_Lead.pdf',
        experience: '6 Tahun di Silicon Valley & SEA Unicorn',
        education: 'B.Sc Computer Science, National University of Singapore',
        coverNote: 'Tawaran kerja (Offering Letter) telah disetujui. Siap bergabung per 1 Desember 2026.',
      },
      {
        id: 106,
        name: 'Reza Kurniawan',
        email: 'reza.kurniawan@corp.id',
        phone: '0819-0011-2233',
        jobId: 4,
        jobTitle: 'Associate Product Growth Specialist',
        appliedDate: '2026-10-15',
        stage: 'ditolak',
        matchScore: 68,
        skills: ['Marketing', 'Social Media', 'Excel'],
        resumeName: 'Resume_Reza_K.pdf',
        experience: '1 Tahun di E-Commerce Support',
        education: 'S1 Manajemen Bisnis, Universitas Padjadjaran',
        coverNote: 'Kualifikasi teknis dan analisis data belum memenuhi standar peran Growth Product saat ini.',
      },
      {
        id: 107,
        name: 'Dewi Lestari',
        email: 'dewi.lestari@desain.id',
        phone: '0812-7766-5544',
        jobId: 3,
        jobTitle: 'Senior UI/UX & Visual Designer',
        appliedDate: '2026-10-21',
        stage: 'review',
        matchScore: 89,
        skills: ['Figma', 'Interaction Design', 'Micro-copy', 'Design Tokens'],
        resumeName: 'CV_Dewi_Lestari_UIUX.pdf',
        experience: '3 Tahun di Fintech Startup',
        education: 'S1 Desain Produk, ITB',
        coverNote: 'Spesialis antarmuka ramah pengguna pada aplikasi perbankan digital dan e-wallet.',
      },
      {
        id: 108,
        name: 'Budi Hartono',
        email: 'budi.hartono@engineer.id',
        phone: '0878-3344-5566',
        jobId: 2,
        jobTitle: 'Cloud Solutions Architect',
        appliedDate: '2026-10-20',
        stage: 'interview',
        matchScore: 93,
        skills: ['AWS', 'GCP', 'Linux Kernel', 'Ansible', 'DevSecOps'],
        resumeName: 'CV_Budi_Hartono_DevOps.pdf',
        experience: '4.5 Tahun di FinTech Enterprise',
        education: 'S1 Teknik Elektro, Universitas Indonesia',
        coverNote: 'Jadwal wawancara teknis arsitektur sistem terjadwal pada Kamis, 29 Oktober 2026.',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('ayokerja_company_applicants', JSON.stringify(applicants));
  }, [applicants]);

  // Modal edit lowongan
  const [editJobModalOpen, setEditJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const openEditJob = (job) => {
    setEditingJob({ ...job });
    setEditJobModalOpen(true);
  };

  const handleSaveEditedJob = (e) => {
    e.preventDefault();
    setJobs(jobs.map((j) => (j.id === editingJob.id ? editingJob : j)));
    setEditJobModalOpen(false);
    showToast(`Perubahan lowongan "${editingJob.title}" berhasil disimpan!`);
  };

  const toggleJobStatus = (id) => {
    setJobs(
      jobs.map((j) => {
        if (j.id === id) {
          const nextStatus = j.status === 'Aktif' ? 'Ditutup' : 'Aktif';
          showToast(`Status lowongan diubah menjadi "${nextStatus}"`);
          return { ...j, status: nextStatus };
        }
        return j;
      })
    );
  };

  const handleDeleteJob = (id, title) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus lowongan "${title}"?`)) {
      setJobs(jobs.filter((j) => j.id !== id));
      showToast(`Lowongan "${title}" berhasil dihapus.`);
    }
  };

  // State seleksi pelamar
  const [atsViewMode, setAtsViewMode] = useState('kanban');
  const [atsFilterJobId, setAtsFilterJobId] = useState('all');
  const [atsSearchQuery, setAtsSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateModalOpen, setCandidateModalOpen] = useState(false);

  const filteredApplicants = useMemo(() => {
    return applicants.filter((app) => {
      const matchJob = atsFilterJobId === 'all' || String(app.jobId) === String(atsFilterJobId);
      const matchSearch =
        app.name.toLowerCase().includes(atsSearchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(atsSearchQuery.toLowerCase()) ||
        app.skills.some((s) => s.toLowerCase().includes(atsSearchQuery.toLowerCase()));
      return matchJob && matchSearch;
    });
  }, [applicants, atsFilterJobId, atsSearchQuery]);

  const handleStageChange = (applicantId, newStage) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, stage: newStage } : a))
    );
    showToast(`Status pelamar berhasil diperbarui ke tahap "${getStageLabel(newStage)}"`);
  };

  const openCandidateDetail = (candidate) => {
    setSelectedCandidate(candidate);
    setCandidateModalOpen(true);
  };

  const stages = [
    { key: 'baru', label: 'Terkirim / Baru', color: 'border-blue-400 bg-blue-50/50 text-blue-700', badge: 'bg-blue-100 text-blue-700' },
    { key: 'review', label: 'Di-review', color: 'border-amber-400 bg-amber-50/50 text-amber-700', badge: 'bg-amber-100 text-amber-700' },
    { key: 'interview', label: 'Interview', color: 'border-purple-400 bg-purple-50/50 text-purple-700', badge: 'bg-purple-100 text-purple-700' },
    { key: 'diterima', label: 'Diterima', color: 'border-emerald-400 bg-emerald-50/50 text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
    { key: 'ditolak', label: 'Ditolak', color: 'border-rose-300 bg-rose-50/50 text-rose-700', badge: 'bg-rose-100 text-rose-700' },
  ];

  function getStageLabel(stageKey) {
    const found = stages.find((s) => s.key === stageKey);
    return found ? found.label : stageKey;
  }

  // State form profil
  const [profileForm, setProfileForm] = useState({ ...companyProfile });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setCompanyProfile({ ...profileForm });
    if (updateCompanyProfile) {
      updateCompanyProfile({
        namaPerusahaan: profileForm.name,
        email: profileForm.email,
        industri: profileForm.industry,
        ukuranKaryawan: profileForm.employeeSize,
        lokasi: profileForm.address,
        website: profileForm.website,
        linkedin: profileForm.linkedin,
        instagram: profileForm.instagram,
        deskripsi: profileForm.description,
        logo: profileForm.logo,
        banner: profileForm.banner,
      });
    }
    showToast('Profil dan informasi perusahaan berhasil diperbarui!');
  };

  const handleLogoFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih berkas gambar yang valid (PNG, JPG, JPEG, WEBP, atau SVG).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran gambar terlalu besar! Maksimal ukuran berkas adalah 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileForm((prev) => ({
        ...prev,
        logo: event.target.result,
      }));
      showToast('Foto logo berhasil dipilih! Pratinjau langsung diperbarui.');
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logout();
    alert('Anda telah keluar dari Portal Perusahaan.');
    navigate('/');
  };

  // Metrik Ringkasan
  const totalActiveJobs = jobs.filter((j) => j.status === 'Aktif').length;
  const totalApplicants = applicants.length;
  const totalInterviews = applicants.filter((a) => a.stage === 'interview').length;
  const totalHired = applicants.filter((a) => a.stage === 'diterima').length;



  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] font-sans antialiased min-h-screen flex flex-col">
      {toastVisible && (
        <div className="fixed top-24 right-5 z-50 bg-[#00193F] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#16B3A3] text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <i className="fa-solid fa-circle-check text-[#16B3A3] text-base"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      <header className="w-full bg-gradient-to-r from-[#00193F] to-[#16B3A3] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/assets/logo.png"
                alt="AYOKERJA! Logo"
                className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-2xl font-extrabold text-white tracking-wide">AYOKERJA!</span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={
                  activeTab === 'dashboard'
                    ? 'text-white font-bold text-sm border-b-2 border-white pb-1 transition-all'
                    : 'text-white/90 hover:text-white text-sm font-medium transition-colors'
                }
              >
                Dashboard
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('jobs')}
                className={
                  activeTab === 'jobs'
                    ? 'text-white font-bold text-sm border-b-2 border-white pb-1 transition-all'
                    : 'text-white/90 hover:text-white text-sm font-medium transition-colors'
                }
              >
                Kelola Lowongan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('create-job')}
                className={
                  activeTab === 'create-job'
                    ? 'text-white font-bold text-sm border-b-2 border-white pb-1 transition-all'
                    : 'text-white/90 hover:text-white text-sm font-medium transition-colors'
                }
              >
                Pasang Lowongan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('applicants')}
                className={
                  activeTab === 'applicants'
                    ? 'text-white font-bold text-sm border-b-2 border-white pb-1 transition-all'
                    : 'text-white/90 hover:text-white text-sm font-medium transition-colors'
                }
              >
                Kelola Pelamar
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={
                  activeTab === 'profile'
                    ? 'text-white font-bold text-sm border-b-2 border-white pb-1 transition-all'
                    : 'text-white/90 hover:text-white text-sm font-medium transition-colors'
                }
              >
                Profil Perusahaan
              </button>
            </nav>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div
                className="flex items-center gap-2.5 bg-white/15 text-white pl-2 pr-3.5 py-1.5 rounded-xl border border-white/25 shadow-sm select-none"
              >
                <div className="w-7 h-7 rounded-lg bg-white p-0.5 flex items-center justify-center font-bold text-xs ring-2 ring-white/80 overflow-hidden shrink-0 shadow-sm">
                  <img
                    src={companyProfile.logo || '/assets/company-google.png'}
                    alt="Logo Perusahaan"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white max-w-[130px] sm:max-w-[170px] truncate leading-tight">
                    {companyProfile.name === 'daniramadh47' ? 'PT Google Indonesia' : companyProfile.name}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-600/90 text-white border border-white/20 hover:border-rose-400 text-xs font-semibold transition-colors shadow-sm cursor-pointer group"
                title="Keluar dari Portal Perusahaan"
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-xs text-white/80 group-hover:text-white transition-colors"></i>
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>

            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
                aria-label="Toggle navigation"
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#00193F] border-t border-white/15 px-4 pt-3 pb-6 space-y-2 shadow-xl">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold ${activeTab === 'dashboard' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('jobs');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold ${activeTab === 'jobs' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              Kelola Lowongan
            </button>
            <button
              onClick={() => {
                setActiveTab('create-job');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold ${activeTab === 'create-job' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              Pasang Lowongan Baru
            </button>
            <button
              onClick={() => {
                setActiveTab('applicants');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold ${activeTab === 'applicants' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              Kelola Pelamar
            </button>
            <button
              onClick={() => {
                setActiveTab('profile');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold ${activeTab === 'profile' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              Profil Perusahaan
            </button>
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-rose-300 hover:bg-rose-500/20 flex items-center gap-2"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Keluar
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-13 h-13 rounded-2xl bg-[#CCFBF1] text-[#16B3A3] flex items-center justify-center text-2xl shrink-0">
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#00193F]">{totalActiveJobs}</div>
                  <div className="text-xs text-slate-500 font-semibold">Lowongan Aktif Tayang</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-13 h-13 rounded-2xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center text-2xl shrink-0">
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#00193F]">{totalApplicants}</div>
                  <div className="text-xs text-slate-500 font-semibold">Total Lamaran Masuk</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-13 h-13 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shrink-0">
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#00193F]">{totalInterviews}</div>
                  <div className="text-xs text-slate-500 font-semibold">Jadwal Interview Mendatang</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shrink-0">
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#00193F]">{totalHired}</div>
                  <div className="text-xs text-slate-500 font-semibold">Kandidat Diterima (Hired)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#00193F] flex items-center gap-2.5">
                    <span>Jadwal Interview Mendatang</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Daftar kandidat pelamar yang telah dijadwalkan untuk sesi wawancara teknis dan manajerial
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('applicants')}
                    className="text-xs font-semibold text-[#16B3A3] hover:text-[#109485] px-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    Buka ATS Kanban
                  </button>
                </div>
              </div>

              {applicants.filter((a) => a.stage === 'interview').length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <i className="fa-solid fa-calendar-xmark text-3xl text-slate-300 mb-2"></i>
                  <p className="text-sm font-bold text-slate-600">Belum ada sesi wawancara yang dijadwalkan</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Kandidat yang Anda pindahkan ke tahap Interview di ATS akan otomatis muncul dalam agenda wawancara ini.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('applicants')}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white text-xs font-bold shadow-sm transition-all"
                  >
                    Buka Kelola Pelamar
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {applicants
                    .filter((a) => a.stage === 'interview')
                    .map((cand) => (
                      <div
                        key={cand.id}
                        className="p-5 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 flex flex-col justify-between transition-all hover:shadow-sm"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2.5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00193F] to-[#16B3A3] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                                {cand.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-[#00193F]">{cand.name}</h4>
                                <p className="text-xs text-slate-500 font-medium">{cand.jobTitle}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100 my-3">
                            <div className="flex items-center gap-2 text-purple-700 font-semibold">
                              <i className="fa-solid fa-video text-xs w-4 text-center"></i>
                              <span>Online via Google Meet</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                              <i className="fa-solid fa-clock text-xs w-4 text-center"></i>
                              <span>Terjadwal: {cand.coverNote.includes('Kamis') ? 'Kamis, 29 Okt 2026' : 'Besok, 10:00 WIB'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                              <i className="fa-solid fa-graduation-cap text-xs w-4 text-center"></i>
                              <span className="truncate">{cand.education}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                          <span className="text-[11px] text-slate-400">
                            <i className="fa-solid fa-phone mr-1"></i> {cand.phone}
                          </span>
                          <button
                            type="button"
                            onClick={() => openCandidateDetail(cand)}
                            className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#16B3A3] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Lihat Detail Berkas</span>
                            <i className="fa-solid fa-arrow-right text-[10px]"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <TabelLowonganPerusahaan
            jobs={jobs}
            openEditJob={openEditJob}
            toggleJobStatus={toggleJobStatus}
            handleDeleteJob={handleDeleteJob}
            onPasangLowongan={() => setActiveTab('create-job')}
          />
        )}

        {activeTab === 'create-job' && (
          <FormulirPasangLowongan
            companyProfile={companyProfile}
            onTambahLowongan={(createdJob) => {
              setJobs([createdJob, ...jobs]);
              showToast(`Lowongan "${createdJob.title}" berhasil dipublikasikan!`);
              setActiveTab('jobs');
            }}
          />
        )}

        {activeTab === 'applicants' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#00193F] flex items-center gap-2">
                  Sistem Pelacak Pelamar
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pantau alur seleksi pelamar, filter berdasarkan lowongan, dan ubah status kandidat secara real-time.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setAtsViewMode('kanban')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${atsViewMode === 'kanban' ? 'bg-white text-[#00193F] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                  <i className="fa-solid fa-table-columns"></i> Kanban Board
                </button>
                <button
                  type="button"
                  onClick={() => setAtsViewMode('list')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${atsViewMode === 'list' ? 'bg-white text-[#00193F] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                  <i className="fa-solid fa-list-ul"></i> Tampilan List
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:w-72">
                <select
                  value={atsFilterJobId}
                  onChange={(e) => setAtsFilterJobId(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] bg-white text-slate-700"
                >
                  <option value="all">Semua Posisi Lowongan ({applicants.length} Pelamar)</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={String(j.id)}>
                      {j.title} ({applicants.filter((a) => a.jobId === j.id).length} Pelamar)
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-magnifying-glass text-xs"></i>
                </div>
                <input
                  type="text"
                  placeholder="Cari nama kandidat atau keahlian..."
                  value={atsSearchQuery}
                  onChange={(e) => setAtsSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
              </div>

              {atsFilterJobId !== 'all' || atsSearchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setAtsFilterJobId('all');
                    setAtsSearchQuery('');
                  }}
                  className="text-xs font-bold text-rose-600 hover:underline px-2 py-1"
                >
                  Reset Filter
                </button>
              ) : null}
            </div>

            {atsViewMode === 'kanban' && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
                {stages.map((stage) => {
                  const stageApplicants = filteredApplicants.filter((a) => a.stage === stage.key);
                  return (
                    <div key={stage.key} className="bg-slate-100/90 rounded-2xl p-3 border border-slate-200 flex flex-col min-h-[500px]">
                      <div className="pb-2 mb-3 border-b border-slate-200/80 px-1">
                        <span className="text-xs font-extrabold text-[#00193F]">{stage.label}</span>
                      </div>

                      <div className="space-y-3 flex-1">
                        {stageApplicants.map((cand) => (
                          <div
                            key={cand.id}
                            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="text-xs font-bold text-[#00193F] leading-tight group-hover:text-[#16B3A3] transition-colors">
                                  {cand.name}
                                </h4>
                                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                                  {cand.jobTitle}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {cand.skills.slice(0, 3).map((sk, idx) => (
                                <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                  {sk}
                                </span>
                              ))}
                              {cand.skills.length > 3 && (
                                <span className="text-[10px] px-1 py-0.5 text-slate-400">+{cand.skills.length - 3}</span>
                              )}
                            </div>

                            <div className="text-[10px] text-slate-400 mb-3 flex items-center gap-1">
                              <i className="fa-regular fa-clock"></i> Melamar: {cand.appliedDate}
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                              <button
                                type="button"
                                onClick={() => openCandidateDetail(cand)}
                                className="px-2 py-1 rounded-lg text-[11px] font-bold text-[#16B3A3] hover:bg-[#CCFBF1] transition-colors"
                              >
                                Lihat CV
                              </button>

                              <select
                                value={cand.stage}
                                onChange={(e) => handleStageChange(cand.id, e.target.value)}
                                className="text-[10px] font-bold px-1.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none cursor-pointer"
                              >
                                {stages.map((st) => (
                                  <option key={st.key} value={st.key}>
                                    {st.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}

                        {stageApplicants.length === 0 && (
                          <div className="h-28 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-[11px] text-slate-400 italic">
                            Belum ada kandidat
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {atsViewMode === 'list' && (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                        <th className="py-4 px-5">Nama Pelamar</th>
                        <th className="py-4 px-4">Posisi Dilamar</th>
                        <th className="py-4 px-4">Tanggal Melamar</th>
                        <th className="py-4 px-4">Tahapan Seleksi</th>
                        <th className="py-4 px-5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApplicants.map((cand) => (
                        <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-5">
                            <div className="font-bold text-[#00193F]">{cand.name}</div>
                            <div className="text-[11px] text-slate-400">{cand.email} • {cand.phone}</div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-700">{cand.jobTitle}</td>
                          <td className="py-4 px-4 text-slate-500">{cand.appliedDate}</td>
                          <td className="py-4 px-4">
                            <select
                              value={cand.stage}
                              onChange={(e) => handleStageChange(cand.id, e.target.value)}
                              className="text-xs font-bold px-2 py-1 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none cursor-pointer"
                            >
                              {stages.map((st) => (
                                <option key={st.key} value={st.key}>
                                  {st.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <button
                              type="button"
                              onClick={() => openCandidateDetail(cand)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#16B3A3] hover:bg-[#109485] text-white font-semibold text-xs transition-colors shadow-xs"
                            >
                              Detail &amp; Resume
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        
        
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <form onSubmit={handleProfileSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-8">
              <div>
                <h2 className="text-xl font-extrabold text-[#00193F] flex items-center gap-2">
                  Pengaturan Profil Perusahaan
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lengkapi data profil, banner, logo, dan tautan sosial untuk memperkuat Employer Branding di AYOKERJA!.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1">
                  <div className="relative group shrink-0">
                    <img
                      src={profileForm.logo || '/assets/company-google.png'}
                      alt="Logo Preview"
                      className="w-20 h-20 rounded-2xl bg-white p-2 object-contain border-2 border-slate-200 shadow-md transition-all group-hover:border-[#16B3A3]"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Logo Resmi Perusahaan</label>
                    <div className="flex flex-wrap items-center gap-3">
                      <label
                        htmlFor="companyLogoUpload"
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00193F] text-xs font-bold cursor-pointer transition-colors border border-slate-200/80 flex items-center gap-2 shadow-xs"
                      >
                        <i className="fa-solid fa-arrow-up-from-bracket text-[#16B3A3]"></i>
                        <span>Pilih Foto dari Galeri</span>
                      </label>
                      <input
                        type="file"
                        id="companyLogoUpload"
                        accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                        className="hidden"
                        onChange={handleLogoFileChange}
                      />
                      {profileForm.logo && profileForm.logo !== '/assets/company-google.png' && (
                        <button
                          type="button"
                          onClick={() => setProfileForm({ ...profileForm, logo: '/assets/company-google.png' })}
                          className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
                        >
                          Reset ke Default
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Pilih berkas logo langsung dari perangkat Anda (PNG, JPG, WEBP, atau SVG, maks. 2MB).
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Resmi Perusahaan *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori Industri *</label>
                  <select
                    value={profileForm.industry}
                    onChange={(e) => setProfileForm({ ...profileForm, industry: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 bg-white"
                  >
                    <option value="Teknologi Informasi & SaaS">Teknologi Informasi &amp; SaaS</option>
                    <option value="Cloud & Infrastruktur">Cloud &amp; Infrastruktur</option>
                    <option value="Finansial & Perbankan Digital">Finansial &amp; Perbankan Digital</option>
                    <option value="E-Commerce & Ritel">E-Commerce &amp; Ritel</option>
                    <option value="Telekomunikasi & Satelit">Telekomunikasi &amp; Satelit</option>
                    <option value="F&B & Kuliner Nasional">F&B &amp; Kuliner Nasional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Ukuran / Jumlah Karyawan *</label>
                  <select
                    value={profileForm.employeeSize}
                    onChange={(e) => setProfileForm({ ...profileForm, employeeSize: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 bg-white"
                  >
                    <option value="1 - 10 Karyawan">1 - 10 Karyawan (Startup Awal)</option>
                    <option value="11 - 50 Karyawan">11 - 50 Karyawan (Berkembang)</option>
                    <option value="51 - 200 Karyawan">51 - 200 Karyawan (Menengah)</option>
                    <option value="201 - 500 Karyawan">201 - 500 Karyawan (Besar)</option>
                    <option value="500 - 1.000 Karyawan">500 - 1.000 Karyawan (Enterprise)</option>
                    <option value="1.000+ Karyawan">1.000+ Karyawan (Korporasi Multinasional)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Rekrutmen Resmi *</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Kantor Pusat *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-[#00193F]">Tautan Eksternal &amp; Media Sosial</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      <i className="fa-solid fa-globe mr-1 text-slate-400"></i> Website Resmi
                    </label>
                    <input
                      type="url"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      placeholder="https://company.com"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      <i className="fa-brands fa-linkedin mr-1 text-blue-600"></i> LinkedIn Perusahaan
                    </label>
                    <input
                      type="url"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/company/..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      <i className="fa-brands fa-instagram mr-1 text-pink-600"></i> Instagram
                    </label>
                    <input
                      type="text"
                      value={profileForm.instagram}
                      onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                      placeholder="@company_id"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Profil Perusahaan ('Tentang Kami') *</label>
                <textarea
                  rows="4"
                  required
                  value={profileForm.description}
                  onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                  placeholder="Ceritakan profil, budaya kerja, misi, dan produk unggulan perusahaan Anda..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 leading-relaxed"
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-floppy-disk text-xs"></i> Simpan Perubahan Profil Perusahaan
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <RincianKandidat
        isOpen={candidateModalOpen}
        candidate={selectedCandidate}
        onClose={() => setCandidateModalOpen(false)}
      />

      <FormulirEditLowongan
        isOpen={editJobModalOpen}
        job={editingJob}
        onClose={() => setEditJobModalOpen(false)}
        onChange={setEditingJob}
        onSave={handleSaveEditedJob}
      />

      <footer className="bg-[#00193F] text-slate-400 py-6 border-t border-white/10 mt-auto text-center text-xs">
        &copy; 2026 AYOKERJA!. Portal Manajemen Rekrutmen Perusahaan Mitra Indonesia.
      </footer>
    </div>
  );
}
