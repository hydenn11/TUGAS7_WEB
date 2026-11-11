import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GLOBAL_METAS = [
  { company: 'Google Cloud Global', logo: '/assets/company-google.png', location: 'Remote (San Francisco, CA)', category: 'Cloud & DevOps', salary: '$5,500 - $7,800 / bln' },
  { company: 'Amazon Web Services', logo: '/assets/company-amazon.png', location: 'Remote (Seattle, WA)', category: 'Software Engineering', salary: '$6,000 - $8,500 / bln' },
  { company: 'Adobe Creative Cloud', logo: '/assets/company-adobe.png', location: 'Remote (San Jose, CA)', category: 'Product Design', salary: '$4,800 - $6,700 / bln' },
  { company: 'SpaceX Starlink Tech', logo: '/assets/company-spacex.png', location: 'Remote (Hawthorne, CA)', category: 'Infrastruktur & Jaringan', salary: '$6,500 - $9,200 / bln' },
  { company: 'Burger King Global Tech', logo: '/assets/company-burgerking.png', location: 'Remote (Miami, FL)', category: 'Data & Analytics', salary: '$4,200 - $6,000 / bln' },
  { company: 'GoTo Global Tech', logo: '/assets/GOTO.JK.png', location: 'Remote (Jakarta & Singapura)', category: 'Software Engineering', salary: '$5,200 - $7,400 / bln' },
  { company: 'Stripe Payments Inc.', logo: '/assets/stripe-logo-png_seeklogo-290635.png', location: 'Remote (Dublin, Irlandia)', category: 'Cybersecurity', salary: '$6,200 - $8,800 / bln' },
  { company: 'Shopify Commerce Global', logo: '/assets/png-transparent-shopify-hd-logo.png', location: 'Remote (Ottawa, Kanada)', category: 'Product & Engineering', salary: '$5,000 - $7,100 / bln' },
  { company: 'Atlassian Global Network', logo: '/assets/png-transparent-atlassian-full-logo-tech-companies.png', location: 'Remote (Sydney, Australia)', category: 'Cloud & DevOps', salary: '$5,800 - $8,000 / bln' },
];

import HeaderLowongan from '../components/HeaderLowongan';
import TabLowongan from '../components/TabLowongan';
import FilterLowongan from '../components/FilterLowongan';
import DaftarLowongan from '../components/DaftarLowongan';
import RiwayatLamaran from '../components/RiwayatLamaran';

import PeringatanWajibLogin from '../components/PeringatanWajibLogin';
import RincianLowongan from '../components/RincianLowongan';
import FormulirLamarLowongan from '../components/FormulirLamarLowongan';
import RincianLamaranTerkirim from '../components/RincianLamaranTerkirim';
import { ALL_JOBS } from '../data/jobsList';

export default function Lowongan({ jobs: propJobs, loadingJobs = false }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { savedJobIds, savedJobDetails, toggleSaveJob, applyJob, withdrawApplication, appliedJobs, user } = useAuth();

  const allJobs = useMemo(() => {
    const base = propJobs || ALL_JOBS;
    const globalSaved = (savedJobIds || [])
      .filter((id) => typeof id === 'string' && id.startsWith('global-'))
      .map((id) => {
        if (savedJobDetails?.[id]) {
          return savedJobDetails[id];
        }
        const num = Number.parseInt(id.replace('global-', ''), 10) || 1;
        const meta = GLOBAL_METAS[(num - 1) % GLOBAL_METAS.length];
        return {
          id,
          title: `Posisi Mitra Global #${num}`,
          company: meta.company,
          logo: meta.logo,
          location: meta.location,
          categoryKey: 'Global',
          categoryLabel: meta.category,
          type: '100% Remote',
          salary: meta.salary,
          applicants: 'Mitra Global',
          deadline: 'Terbuka',
          isClosed: false,
          isGlobal: true,
        };
      });

    return [...base, ...globalSaved];
  }, [propJobs, savedJobIds, savedJobDetails]);

  const initialQ = searchParams.get('q') || '';
  const initialCategory = searchParams.get('kategori') || '';
  const initialLocation = searchParams.get('lokasi') || '';
  const filterParam = searchParams.get('filter');

  const [search, setSearch] = useState(initialQ);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [typeFilter, setTypeFilter] = useState('');

  const [activeTab, setActiveTab] = useState(() => {
    if (filterParam === 'saved') return 'saved';
    if (filterParam === 'applied') return 'applied';
    return 'all';
  });

  useEffect(() => {
    if (filterParam === 'saved' || filterParam === 'applied') {
      setActiveTab((prev) => (prev !== filterParam ? filterParam : prev));
    } else if (!filterParam && searchParams.size === 0) {
      setActiveTab((prev) => (prev !== 'all' ? 'all' : prev));
    }
  }, [filterParam, searchParams]);

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    actionType: 'apply',
    jobTitle: '',
    companyName: '',
  });

  const [selectedJobDetail, setSelectedJobDetail] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const [selectedJobToApply, setSelectedJobToApply] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const [viewApplicationModal, setViewApplicationModal] = useState(null);

  const [candidateName, setCandidateName] = useState(user?.nama || '');
  const [candidateEmail, setCandidateEmail] = useState(user?.email || '');
  const [candidatePhone, setCandidatePhone] = useState(user?.telepon || '0857-1122-3344');
  const [resumeOption, setResumeOption] = useState('profile');
  const [uploadedResumeName, setUploadedResumeName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const matchesProvinceOrCity = (jobLocation = '', filterProvince = '') => {
    if (!filterProvince) return true;
    const loc = (jobLocation || '').toLowerCase();
    const prov = filterProvince.toLowerCase();

    if (prov === 'remote') {
      return loc.includes('remote') || loc.includes('jarak jauh') || loc.includes('wfa');
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

  const filteredJobs = allJobs.filter((job) => {
    if (activeTab === 'saved' && !savedJobIds.includes(job.id)) {
      return false;
    }

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !categoryFilter ||
      job.categoryKey === categoryFilter ||
      job.categoryLabel?.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesLocation = matchesProvinceOrCity(job.location, locationFilter);
    const matchesType = !typeFilter || job.type === typeFilter;

    return matchesSearch && matchesCategory && matchesLocation && matchesType;
  });

  const openJobDetail = (job) => {
    setSelectedJobDetail(job);
    setDetailModalOpen(true);
  };

  const closeJobDetail = () => {
    setSelectedJobDetail(null);
    setDetailModalOpen(false);
    if (searchParams.get('detail')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('detail');
      navigate({ search: newParams.toString() ? `?${newParams.toString()}` : '' }, { replace: true });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const newParams = new URLSearchParams(searchParams);
    if (tab === 'saved') {
      newParams.set('filter', 'saved');
    } else if (tab === 'applied') {
      newParams.set('filter', 'applied');
    } else {
      newParams.delete('filter');
    }
    navigate({ search: newParams.toString() ? `?${newParams.toString()}` : '' }, { replace: true });
  };

  const handleWithdrawApplication = (jobId, jobTitle) => {
    if (window.confirm(`Apakah Anda yakin ingin membatalkan/menarik berkas lamaran untuk posisi "${jobTitle}"?`)) {
      withdrawApplication(jobId);
      showToast(`Lamaran untuk posisi "${jobTitle}" berhasil ditarik.`);
    }
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

  const handleApplyClick = (job) => {
    if (!user || user.role !== 'pelamar') {
      setAuthModal({
        isOpen: true,
        title: 'Masuk Akun Pelamar Terlebih Dahulu',
        message: `Untuk melamar posisi "${job.title}" di "${job.company}", Anda harus masuk ke akun pelamar Anda terlebih dahulu.`,
        actionType: 'apply',
        jobTitle: job.title,
        companyName: job.company,
      });
      return;
    }

    if (appliedJobs.some((item) => item.id === job.id)) {
      showToast(`Anda sudah melamar posisi "${job.title}" sebelumnya.`);
      return;
    }

    setCandidateName(user?.nama || 'Luthfi Ramadhan');
    setCandidateEmail(user?.email || 'daniramadh47@gmail.com');
    setCandidatePhone(user?.telepon || '0857-1122-3344');
    setResumeOption('profile');
    setUploadedResumeName('');
    setCoverLetter('');
    setPortfolioUrl(user?.linkedin || '');
    setExpectedSalary(job.salary ? job.salary.split('-')[0].trim() : '');

    setSelectedJobToApply(job);
    setApplyModalOpen(true);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran berkas melebihi batas maksimal 5MB.');
        return;
      }
      setUploadedResumeName(file.name);
      setResumeOption('upload');
      showToast(`Berkas resume "${file.name}" berhasil dipilih.`);
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedJobToApply) return;

    const resumeName =
      resumeOption === 'upload' && uploadedResumeName ? uploadedResumeName : 'Resume_Luthfi_Frontend.pdf';

    const success = applyJob(selectedJobToApply, {
      candidateName,
      candidateEmail,
      candidatePhone,
      resumeOption,
      resumeName,
      coverLetter,
      portfolioUrl,
      expectedSalary,
    });

    if (success) {
      setApplyModalOpen(false);
      showToast(`Lamaran untuk "${selectedJobToApply.title}" berhasil dikirim!`);
    } else {
      showToast('Gagal mengajukan lamaran.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 flex flex-col">
      <HeaderLowongan />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">

        <TabLowongan
          activeTab={activeTab}
          onTabChange={handleTabChange}
          totalCount={allJobs.length}
          savedCount={savedJobIds.length}
          appliedCount={appliedJobs.length}
        />

        <FilterLowongan
          search={search}
          onSearchChange={setSearch}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          onReset={() => {
            setSearch('');
            setCategoryFilter('');
            setLocationFilter('');
            setTypeFilter('');
          }}
          activeTab={activeTab}
          filteredCount={activeTab === 'applied' ? appliedJobs.length : filteredJobs.length}
        />

        {activeTab === 'applied' ? (
          <RiwayatLamaran
            appliedJobs={appliedJobs}
            allJobs={allJobs}
            search={search}
            onOpenDetail={openJobDetail}
            onViewApplication={setViewApplicationModal}
            onWithdraw={handleWithdrawApplication}
            onExplore={() => handleTabChange('all')}
          />
        ) : (
          <>
            {loadingJobs && (
              <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-teal-800 animate-pulse">
                <i className="fa-solid fa-arrows-rotate fa-spin text-teal-600"></i>
                <span>Memperbarui data lowongan dari sumber mock API...</span>
              </div>
            )}
            <DaftarLowongan
              jobs={filteredJobs}
              savedJobIds={savedJobIds}
              appliedJobs={appliedJobs}
              onOpenDetail={openJobDetail}
              onToggleSave={handleSave}
              onApply={handleApplyClick}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </>
        )}
      </main>

      {toastVisible && (
        <div className="fixed top-24 right-5 z-50 bg-[#00193F] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#16B3A3] text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <i className="fa-solid fa-circle-check text-[#16B3A3] text-base"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      <RincianLowongan
        isOpen={detailModalOpen}
        job={selectedJobDetail}
        onClose={closeJobDetail}
        onApply={(job) => {
          closeJobDetail();
          handleApplyClick(job);
        }}
        onSave={handleSave}
        isSaved={selectedJobDetail ? savedJobIds.includes(selectedJobDetail.id) : false}
        isApplied={selectedJobDetail ? appliedJobs.some((item) => item.id === selectedJobDetail.id) : false}
      />

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

      <RincianLamaranTerkirim
        application={viewApplicationModal}
        onClose={() => setViewApplicationModal(null)}
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
