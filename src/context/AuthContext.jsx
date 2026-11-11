import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { safeGetStorageItem, safeSetStorageItem } from '../utils/storage';

const AuthContext = createContext();

const STORAGE_KEY = 'ayokerja_pelamar_user';
const SAVED_JOBS_KEY = 'ayokerja_saved_jobs';
const SAVED_JOB_DETAILS_KEY = 'ayokerja_saved_job_details';
const APPLIED_JOBS_KEY = 'ayokerja_applied_jobs';

function getUserKey(usr) {
  if (!usr) return 'guest';
  return (usr.email || usr.nama || 'default').trim().toLowerCase();
}

function readStoredUser() {
  const parsed = safeGetStorageItem(STORAGE_KEY, null);
  return parsed?.isLoggedIn ? parsed : null;
}

function readPelamarScopedData(prefix, fallback) {
  const parsed = readStoredUser();
  if (parsed?.role === 'pelamar') {
    const userKey = getUserKey(parsed);
    const data = safeGetStorageItem(`${prefix}_${userKey}`, null);
    if (data !== null) return data;
  }
  return fallback;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [savedJobIds, setSavedJobIds] = useState(() => readPelamarScopedData(SAVED_JOBS_KEY, []));
  const [savedJobDetails, setSavedJobDetails] = useState(() =>
    readPelamarScopedData(SAVED_JOB_DETAILS_KEY, {})
  );
  const [appliedJobs, setAppliedJobs] = useState(() => readPelamarScopedData(APPLIED_JOBS_KEY, []));

  useEffect(() => {
    if (user) {
      safeSetStorageItem(STORAGE_KEY, user);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'pelamar') {
      const userKey = getUserKey(user);
      safeSetStorageItem(`${SAVED_JOBS_KEY}_${userKey}`, savedJobIds);
      safeSetStorageItem(`${SAVED_JOB_DETAILS_KEY}_${userKey}`, savedJobDetails);
    }
  }, [savedJobIds, savedJobDetails, user]);

  useEffect(() => {
    if (user?.role === 'pelamar') {
      const userKey = getUserKey(user);
      safeSetStorageItem(`${APPLIED_JOBS_KEY}_${userKey}`, appliedJobs);
    }
  }, [appliedJobs, user]);

  const loginPelamar = useCallback((userData) => {
    const userKey = (userData.email || userData.nama || 'default').toLowerCase();
    const savedProfiles = safeGetStorageItem('ayokerja_user_profiles', {});
    const saved = savedProfiles?.[userKey] || {};

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

    const savedJobs = safeGetStorageItem(`${SAVED_JOBS_KEY}_${userKey}`, []);
    setSavedJobIds(Array.isArray(savedJobs) ? savedJobs : []);

    const savedApplied = safeGetStorageItem(`${APPLIED_JOBS_KEY}_${userKey}`, []);
    setAppliedJobs(Array.isArray(savedApplied) ? savedApplied : []);
  }, []);

  const loginPerusahaan = useCallback((companyData) => {
    const compKey = (companyData.email || companyData.namaPerusahaan || 'default').toLowerCase();
    const savedProfiles = safeGetStorageItem('ayokerja_company_profiles', {});
    const saved = savedProfiles?.[compKey] || {};

    const isGoogle =
      (saved.namaPerusahaan || companyData.namaPerusahaan || '').toLowerCase().includes('google') ||
      (companyData.email || '').toLowerCase().includes('google');
    const compName = saved.namaPerusahaan || companyData.namaPerusahaan || 'PT Perusahaan Mitra';

    const defaultDesc = isGoogle
      ? 'Perusahaan teknologi multinasional penyedia ekosistem mesin pencari, komputasi awan Google Cloud, dan infrastruktur kecerdasan buatan.'
      : `${compName} adalah entitas korporasi resmi yang membuka peluang karir melalui platform rekrutmen AYOKERJA!.`;

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
      deskripsi: saved.deskripsi || defaultDesc,
      logo: saved.logo || (isGoogle ? '/assets/company-google.png' : '/assets/logo.png'),
      banner: saved.banner || '',
    };
    setUser(newCompany);
    setSavedJobIds([]);
    setAppliedJobs([]);
  }, []);

  const updateCompanyProfile = useCallback((fields) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...fields };
      const savedProfiles = safeGetStorageItem('ayokerja_company_profiles', {});
      const compKey = (updated.email || updated.namaPerusahaan || 'default').toLowerCase();
      const nextProfiles = {
        ...savedProfiles,
        [compKey]: { ...savedProfiles?.[compKey], ...fields },
      };
      safeSetStorageItem('ayokerja_company_profiles', nextProfiles);
      return updated;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSavedJobIds([]);
    setAppliedJobs([]);
  }, []);

  const updateProfile = useCallback((fields) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...fields };
      const savedProfiles = safeGetStorageItem('ayokerja_user_profiles', {});
      const userKey = getUserKey(updated);
      const nextProfiles = {
        ...savedProfiles,
        [userKey]: {
          nama: updated.nama,
          email: updated.email,
          posisi: updated.posisi,
          lokasi: updated.lokasi,
          telepon: updated.telepon,
          linkedin: updated.linkedin,
          ringkasan: updated.ringkasan,
        },
      };
      safeSetStorageItem('ayokerja_user_profiles', nextProfiles);
      return updated;
    });
  }, []);

  const toggleSaveJob = useCallback((jobId, jobData = null) => {
    if (user?.role !== 'pelamar') {
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
      }
      if (jobData) {
        setSavedJobDetails((prevDetails) => ({
          ...prevDetails,
          [jobId]: jobData,
        }));
      }
      return [...prev, jobId];
    });
    return true;
  }, [user]);

  const applyJob = useCallback((job, applicationDetails = {}) => {
    if (user?.role !== 'pelamar') {
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
  }, [user, appliedJobs]);

  const withdrawApplication = useCallback((jobId) => {
    if (user?.role !== 'pelamar') {
      return false;
    }
    setAppliedJobs((prev) => prev.filter((item) => item.id !== jobId));
    return true;
  }, [user]);

  const isPelamar = user?.role === 'pelamar';

  const contextValue = useMemo(() => ({
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
  }), [
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
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
