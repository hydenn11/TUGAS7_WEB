/**
 * Modul Utilitas Penyimpanan Aman (Safe Browser Storage)
 * Mencegah Browser Storage Poisoning (CWE / SonarQube S5147)
 * dengan validasi tipe, pembersihan karakter berbahaya, dan penanganan error.
 */

export function sanitizeStorageInput(data) {
  if (data === null || data === undefined) return data;
  if (typeof data === 'string') {
    // Sanitasi karakter berbahaya dan strip kontrol karakter
    return data.replace(/[<>'"\\]/g, '').trim();
  }
  if (typeof data === 'number' || typeof data === 'boolean') {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeStorageInput);
  }
  if (typeof data === 'object') {
    const cleanObj = {};
    for (const [key, val] of Object.entries(data)) {
      const cleanKey = String(key).replace(/[^\w-]/g, '');
      cleanObj[cleanKey] = sanitizeStorageInput(val);
    }
    return cleanObj;
  }
  return data;
}

export function safeSetStorageItem(key, value) {
  try {
    const cleanKey = String(key).replace(/[^\w-]/g, '');
    const cleanValue = sanitizeStorageInput(value);
    const serialized = typeof cleanValue === 'string' ? cleanValue : JSON.stringify(cleanValue);
    localStorage.setItem(cleanKey, serialized);
  } catch (error) {
    console.error(`Gagal menyimpan data ke storage [${key}]:`, error);
  }
}

export function safeGetStorageItem(key, defaultValue = null) {
  try {
    const cleanKey = String(key).replace(/[^\w-]/g, '');
    const item = localStorage.getItem(cleanKey);
    if (!item) return defaultValue;
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch (error) {
    console.error(`Gagal membaca data dari storage [${key}]:`, error);
    return defaultValue;
  }
}
