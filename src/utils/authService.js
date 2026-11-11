import { safeGetStorageItem, safeSetStorageItem } from './storage.js';

export const DEMO_ACCOUNTS = {
  pelamar: {
    email: 'pelamar@ayokerja.id',
    username: 'Luthfi',
    nama: 'Luthfi Ramadhan',
    password: 'ayokerja123',
  },
  perusahaan: {
    email: 'hr@google.co.id',
    namaPerusahaan: 'PT Google Indonesia',
    industri: 'Teknologi Informasi & SaaS',
    password: 'ayokerja123',
  },
};

const STORAGE_KEYS = {
  pelamar: 'ayokerja_registered_pelamar',
  perusahaan: 'ayokerja_registered_perusahaan',
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Memverifikasi login pelamar dengan akun demo atau akun terdaftar di localStorage.
 */
export async function authenticatePelamar(identifier, passwordInput) {
  await delay(350);

  const key = String(identifier || '').trim().toLowerCase();
  const password = String(passwordInput || '');

  if (!key) {
    throw new Error('Alamat email atau username pelamar wajib diisi.');
  }
  if (password.length < 6) {
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

  if (matchedAccount.password && password !== matchedAccount.password) {
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
  const password = String(passwordInput || '');

  if (!cleanUsername || !cleanFullName || !cleanEmail) {
    throw new Error('Mohon lengkapi username, nama lengkap, dan alamat email.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    throw new Error('Format alamat email tidak valid.');
  }
  if (password.length < 6) {
    throw new Error('Kata sandi baru minimal harus 6 karakter.');
  }

  const registeredUsers = safeGetStorageItem(STORAGE_KEYS.pelamar, {});
  const safeMap = registeredUsers && typeof registeredUsers === 'object' ? { ...registeredUsers } : {};

  const userData = {
    nama: cleanFullName,
    email: cleanEmail,
    username: cleanUsername,
    password,
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
  const password = String(passwordInput || '');

  if (!emailKey || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailKey)) {
    throw new Error('Masukkan alamat email resmi perusahaan yang valid.');
  }
  if (password.length < 6) {
    throw new Error('Kata sandi akun perusahaan minimal 6 karakter.');
  }

  const registered = safeGetStorageItem(STORAGE_KEYS.perusahaan, {});
  const fromStorage = registered && typeof registered === 'object' ? registered[emailKey] : null;
  const demo = DEMO_ACCOUNTS.perusahaan;
  const matchedAccount = fromStorage || (emailKey === demo.email ? demo : null);

  if (!matchedAccount) {
    throw new Error('Email perusahaan belum terdaftar. Gunakan akun demo atau daftar perusahaan baru.');
  }

  if (matchedAccount.password && password !== matchedAccount.password) {
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
  const password = String(passwordInput || '');

  if (!cleanName || !cleanEmail || !cleanPhone) {
    throw new Error('Mohon lengkapi nama perusahaan, nomor telepon kantor, dan email PIC.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    throw new Error('Format email PIC / HR Recruiter tidak valid.');
  }
  if (password.length < 6) {
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
    password,
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
