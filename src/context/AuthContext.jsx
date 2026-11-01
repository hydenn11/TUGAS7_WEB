import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const STORAGE_KEY = 'ayokerja_pelamar_user';
  const SAVED_JOBS_KEY = 'ayokerja_saved_jobs';
  const SAVED_JOB_DETAILS_KEY = 'ayokerja_saved_job_details';
  const APPLIED_JOBS_KEY = 'ayokerja_applied_jobs';

  const getUserKey = (usr) => {
    if (!usr) return 'guest';
    return (usr.email || usr.nama || 'default').trim().toLowerCase();
  };

  const [user, setUser] = useState(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data && data !== 'logged_out') {
        const parsed = JSON.parse(data);
        if (parsed && parsed.isLoggedIn) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data && data !== 'logged_out') {
        const parsed = JSON.parse(data);
        if (parsed && parsed.isLoggedIn && parsed.role === 'pelamar') {
          const userKey = getUserKey(parsed);
          const saved = localStorage.getItem(`${SAVED_JOBS_KEY}_${userKey}`);
          if (saved) return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [savedJobDetails, setSavedJobDetails] = useState(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data && data !== 'logged_out') {
        const parsed = JSON.parse(data);
        if (parsed && parsed.isLoggedIn && parsed.role === 'pelamar') {
          const userKey = getUserKey(parsed);
          const saved = localStorage.getItem(`${SAVED_JOB_DETAILS_KEY}_${userKey}`);
          if (saved) return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  const [appliedJobs, setAppliedJobs] = useState(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data && data !== 'logged_out') {
        const parsed = JSON.parse(data);
        if (parsed && parsed.isLoggedIn && parsed.role === 'pelamar') {
          const userKey = getUserKey(parsed);
          const applied = localStorage.getItem(`${APPLIED_JOBS_KEY}_${userKey}`);
          if (applied) return JSON.parse(applied);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === 'pelamar') {
      const userKey = getUserKey(user);
      localStorage.setItem(`${SAVED_JOBS_KEY}_${userKey}`, JSON.stringify(savedJobIds));
      localStorage.setItem(`${SAVED_JOB_DETAILS_KEY}_${userKey}`, JSON.stringify(savedJobDetails));
    }
  }, [savedJobIds, savedJobDetails, user]);

  useEffect(() => {
    if (user && user.role === 'pelamar') {
      const userKey = getUserKey(user);
      localStorage.setItem(`${APPLIED_JOBS_KEY}_${userKey}`, JSON.stringify(appliedJobs));
    }
  }, [appliedJobs, user]);

  const loginPelamar = (userData) => {
    let saved = {};
    const userKey = (userData.email || userData.nama || 'default').toLowerCase();
    try {
      const savedProfiles = JSON.parse(localStorage.getItem('ayokerja_user_profiles') || '{}');
      saved = savedProfiles[userKey] || {};
    } catch {
      saved = {};
    }

    const newUser = {
      isLoggedIn: true,
      role: 'pelamar',
      nama: userData.nama || saved.nama || '',
      email: userData.email || saved.email || '',
      avatar: userData.avatar || saved.avatar || '',
      posisi: saved.posisi !== undefined ? saved.posisi : (userData.posisi || ''),
      lokasi: saved.lokasi !== undefined ? saved.lokasi : (userData.lokasi || ''),
      telepon: saved.telepon !== undefined ? saved.telepon : (userData.telepon || ''),
      linkedin: saved.linkedin !== undefined ? saved.linkedin : (userData.linkedin || ''),
      ringkasan: saved.ringkasan !== undefined ? saved.ringkasan : (userData.ringkasan || ''),
    };
    setUser(newUser);

    try {
      const savedJobsData = localStorage.getItem(`${SAVED_JOBS_KEY}_${userKey}`);
      setSavedJobIds(savedJobsData ? JSON.parse(savedJobsData) : []);

      const appliedData = localStorage.getItem(`${APPLIED_JOBS_KEY}_${userKey}`);
      setAppliedJobs(appliedData ? JSON.parse(appliedData) : []);
    } catch {
      setSavedJobIds([]);
      setAppliedJobs([]);
    }
  };

  const loginPerusahaan = (companyData) => {
    let saved = {};
    const compKey = (companyData.email || companyData.namaPerusahaan || 'default').toLowerCase();
    try {
      const savedProfiles = JSON.parse(localStorage.getItem('ayokerja_company_profiles') || '{}');
      saved = savedProfiles[compKey] || {};
    } catch {
      saved = {};
    }

    const isGoogle = (saved.namaPerusahaan || companyData.namaPerusahaan || '').toLowerCase().includes('google') ||
      (companyData.email || '').toLowerCase().includes('google');
    const compName = saved.namaPerusahaan || companyData.namaPerusahaan || 'PT Perusahaan Mitra';

    const newCompany = {
      isLoggedIn: true,
      role: 'perusahaan',
      namaPerusahaan: compName,
      email: saved.email || companyData.email || 'recruitment@perusahaan.co.id',
      industri: saved.industri || companyData.industri || 'Teknologi Informasi & SaaS',
      ukuranKaryawan: saved.ukuranKaryawan || (isGoogle ? '500 - 1.000 Karyawan' : '50 - 200 Karyawan'),
      lokasi: saved.lokasi || (isGoogle ? 'SCBD, Senayan, Jakarta Selatan' : 'Jakarta, Indonesia'),
      website: saved.website || (isGoogle ? 'https://careers.google.com' : 'https://perusahaan.co.id'),
      linkedin: saved.linkedin || (isGoogle ? 'https://linkedin.com/company/google-indonesia' : ''),
      instagram: saved.instagram || (isGoogle ? '@googleindonesia' : ''),
      deskripsi: saved.deskripsi || (isGoogle
        ? 'Perusahaan teknologi multinasional penyedia ekosistem mesin pencari, komputasi awan Google Cloud, dan infrastruktur kecerdasan buatan.'
        : `${compName} adalah entitas korporasi resmi yang membuka peluang karir melalui platform rekrutmen AYOKERJA!.`),
      logo: saved.logo || (isGoogle ? '/assets/company-google.png' : '/assets/logo.png'),
      banner: saved.banner || '',
    };
    setUser(newCompany);
    setSavedJobIds([]);
    setAppliedJobs([]);
  };

  const updateCompanyProfile = (fields) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...fields };
      try {
        const savedProfiles = JSON.parse(localStorage.getItem('ayokerja_company_profiles') || '{}');
        const compKey = (updated.email || updated.namaPerusahaan || 'default').toLowerCase();
        savedProfiles[compKey] = { ...savedProfiles[compKey], ...fields };
        localStorage.setItem('ayokerja_company_profiles', JSON.stringify(savedProfiles));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    setSavedJobIds([]);
    setAppliedJobs([]);
  };

  const updateProfile = (fields) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...fields };
      try {
        const savedProfiles = JSON.parse(localStorage.getItem('ayokerja_user_profiles') || '{}');
        const userKey = getUserKey(updated);
        savedProfiles[userKey] = {
          nama: updated.nama,
          email: updated.email,
          posisi: updated.posisi,
          lokasi: updated.lokasi,
          telepon: updated.telepon,
          linkedin: updated.linkedin,
          ringkasan: updated.ringkasan,
        };
        localStorage.setItem('ayokerja_user_profiles', JSON.stringify(savedProfiles));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const toggleSaveJob = (jobId, jobData = null) => {
    if (!user || user.role !== 'pelamar') {
      return false;
    }
    setSavedJobIds((prev) => {
      const isAlreadySaved = prev.includes(jobId);
      if (isAlreadySaved) {
        setSavedJobDetails((prevDetails) => {
          const updated = { ...prevDetails };
          delete updated[jobId];
          return updated;
        });
        return prev.filter((id) => id !== jobId);
      } else {
        if (jobData) {
          setSavedJobDetails((prevDetails) => ({
            ...prevDetails,
            [jobId]: jobData,
          }));
        }
        return [...prev, jobId];
      }
    });
    return true;
  };

  const applyJob = (job, applicationDetails = {}) => {
    if (!user || user.role !== 'pelamar') {
      return false;
    }
    if (!appliedJobs.some((item) => item.id === job.id)) {
      const newApplication = {
        id: job.id,
        title: job.title,
        company: job.company,
        logo: job.logo || '/assets/company-google.png',
        location: job.location || 'Jakarta',
        salary: job.salary || 'Kompetitif',
        type: job.type || 'Full-time',
        category: job.categoryLabel || job.category || 'Teknologi',
        date: new Date().toISOString().split('T')[0],
        status: 'Terkirim',
        resumeName: applicationDetails.resumeName || 'Resume_Luthfi_Frontend.pdf',
        coverLetter: applicationDetails.coverLetter || '',
        portfolioUrl: applicationDetails.portfolioUrl || '',
        expectedSalary: applicationDetails.expectedSalary || '',
        ...applicationDetails,
      };
      setAppliedJobs((prev) => [newApplication, ...prev]);
      return true;
    }
    return false;
  };

  const withdrawApplication = (jobId) => {
    if (!user || user.role !== 'pelamar') {
      return false;
    }
    setAppliedJobs((prev) => prev.filter((item) => item.id !== jobId));
    return true;
  };

  const isPelamar = Boolean(user && user.role === 'pelamar');

  return (
    <AuthContext.Provider
      value={{
        user,
        isPelamar,
        loginPelamar,
        loginPerusahaan,
        logout,
        updateProfile,
        updateCompanyProfile,
        savedJobIds,
        savedJobDetails,
        toggleSaveJob,
        appliedJobs,
        applyJob,
        withdrawApplication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
