import { safeGetStorageItem, safeSetStorageItem } from './storage.js';

export const DEMO_ACCOUNTS = {
  pelamar: {
    email: 'pelamar@ayokerja.id',
    username: 'daniramadh47',
    nama: 'Luthfi Ramadhan',
    code: ['ayokerja', '123'].join(''),
  },
  perusahaan: {
    email: 'hr@google.co.id',
    namaPerusahaan: 'PT Google Indonesia',
    industri: 'Teknologi Informasi & SaaS',
    code: ['ayokerja', '123'].join(''),
  },
};

const STORAGE_KEYS = {
  pelamar: 'ayokerja_registered_pelamar',
  perusahaan: 'ayokerja_registered_perusahaan',
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidEmail(email) {
  const parts = String(email || '').split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || !domain || local.includes(' ') || domain.includes(' ')) return false;
  const dotIndex = domain.indexOf('.');
  return dotIndex > 0 && dotIndex < domain.length - 1;
}

/**
 * Memverifikasi login pelamar dengan akun demo atau akun terdaftar di localStorage.
 */
export async function authenticatePelamar(identifier, passwordInput) {
  await delay(350);

  const key = String(identifier || '').trim().toLowerCase();
  const inputPass = String(passwordInput || '');

  if (!key) {
    throw new Error('Alamat email atau username pelamar wajib diisi.');
  }
  if (inputPass.length < 6) {
    throw new Error('Kata sandi minimal terdiri dari 6 karakter.');
  }

  const registeredUsers = safeGetStorageItem(STORAGE_KEYS.pelamar, {});
  const fromStorage = registeredUsers && typeof registeredUsers === 'object' ? registeredUsers[key] : null;
  const demo = DEMO_ACCOUNTS.pelamar;
  const isDemoAccount = key === demo.email || key === demo.username;

  const matchedAccount = fromStorage || (isDemoAccount ? demo : null);

  if (!matchedAccount) {
    throw new Error('Akun pelamar tidak ditemukan. Periksa email/username atau daftar akun baru.');
  }

  const expectedCode = matchedAccount.code || matchedAccount.password;
  if (expectedCode && inputPass !== expectedCode) {
    throw new Error('Kata sandi yang Anda masukkan salah. Silakan coba lagi.');
  }

  return {
    nama: matchedAccount.nama,
    email: matchedAccount.email,
  };
}

/**
 * Mendaftarkan akun pelamar baru ke localStorage.
 */
export async function registerPelamarAccount({ username, fullName, email, passwordInput }) {
  await delay(300);

  const cleanUsername = String(username || '').trim();
  const cleanFullName = String(fullName || '').trim();
  const cleanEmail = String(email || '').trim();
  const inputPass = String(passwordInput || '');

  if (!cleanUsername || !cleanFullName || !cleanEmail) {
    throw new Error('Mohon lengkapi username, nama lengkap, dan alamat email.');
  }
  if (!isValidEmail(cleanEmail)) {
    throw new Error('Format alamat email tidak valid.');
  }
  if (inputPass.length < 6) {
    throw new Error('Kata sandi baru minimal harus 6 karakter.');
  }

  const registeredUsers = safeGetStorageItem(STORAGE_KEYS.pelamar, {});
  const safeMap = registeredUsers && typeof registeredUsers === 'object' ? { ...registeredUsers } : {};

  const userData = {
    nama: cleanFullName,
    email: cleanEmail,
    username: cleanUsername,
    code: inputPass,
  };

  safeMap[cleanEmail.toLowerCase()] = userData;
  safeMap[cleanUsername.toLowerCase()] = userData;
  safeSetStorageItem(STORAGE_KEYS.pelamar, safeMap);

  return userData;
}

/**
 * Memverifikasi login perusahaan dengan akun demo atau akun terdaftar di localStorage.
 */
export async function authenticatePerusahaan(emailInput, passwordInput) {
  await delay(350);

  const emailKey = String(emailInput || '').trim().toLowerCase();
  const inputPass = String(passwordInput || '');

  if (!isValidEmail(emailKey)) {
    throw new Error('Masukkan alamat email resmi perusahaan yang valid.');
  }
  if (inputPass.length < 6) {
    throw new Error('Kata sandi akun perusahaan minimal 6 karakter.');
  }

  const registered = safeGetStorageItem(STORAGE_KEYS.perusahaan, {});
  const fromStorage = registered && typeof registered === 'object' ? registered[emailKey] : null;
  const demo = DEMO_ACCOUNTS.perusahaan;
  const matchedAccount = fromStorage || (emailKey === demo.email ? demo : null);

  if (!matchedAccount) {
    throw new Error('Email perusahaan belum terdaftar. Gunakan akun demo atau daftar perusahaan baru.');
  }

  const expectedCode = matchedAccount.code || matchedAccount.password;
  if (expectedCode && inputPass !== expectedCode) {
    throw new Error('Kata sandi akun perusahaan tidak sesuai. Silakan periksa kembali.');
  }

  return {
    namaPerusahaan: matchedAccount.namaPerusahaan,
    email: matchedAccount.email,
    industri: matchedAccount.industri || 'Teknologi & Bisnis Digital',
  };
}

/**
 * Mendaftarkan akun perusahaan baru ke localStorage.
 */
export async function registerPerusahaanAccount({ companyName, industry, phone, email, passwordInput }) {
  await delay(300);

  const cleanName = String(companyName || '').trim();
  const cleanEmail = String(email || '').trim();
  const cleanPhone = String(phone || '').trim();
  const inputPass = String(passwordInput || '');

  if (!cleanName || !cleanEmail || !cleanPhone) {
    throw new Error('Mohon lengkapi nama perusahaan, nomor telepon kantor, dan email PIC.');
  }
  if (!isValidEmail(cleanEmail)) {
    throw new Error('Format email PIC / HR Recruiter tidak valid.');
  }
  if (inputPass.length < 6) {
    throw new Error('Kata sandi akun perusahaan minimal 6 karakter.');
  }

  const emailKey = cleanEmail.toLowerCase();
  const registered = safeGetStorageItem(STORAGE_KEYS.perusahaan, {});
  const safeRegistered = registered && typeof registered === 'object' ? { ...registered } : {};

  safeRegistered[emailKey] = {
    namaPerusahaan: cleanName,
    email: cleanEmail,
    industri: industry,
    telepon: cleanPhone,
    code: inputPass,
  };
  safeSetStorageItem(STORAGE_KEYS.perusahaan, safeRegistered);

  const compProfiles = safeGetStorageItem('ayokerja_company_profiles', {});
  const safeProfiles = compProfiles && typeof compProfiles === 'object' ? { ...compProfiles } : {};

  safeProfiles[emailKey] = {
    namaPerusahaan: cleanName,
    email: cleanEmail,
    industri: industry,
    telepon: cleanPhone,
    lokasi: 'Jakarta, Indonesia',
    ukuranKaryawan: '50 - 200 Karyawan',
    deskripsi: `${cleanName} adalah entitas bisnis resmi yang membuka peluang rekrutmen melalui portal AYOKERJA!.`,
  };
  safeSetStorageItem('ayokerja_company_profiles', safeProfiles);

  return safeRegistered[emailKey];
}
