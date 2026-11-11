/**
 * Modul Utilitas Penyimpanan Aman (Safe Browser Storage)
 * Mencegah Browser Storage Poisoning (CWE / SonarQube S5147)
 * dengan validasi tipe, sanitasi input, encoding URI, dan penanganan error.
 */

const BLOCKED_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function sanitizeKey(key) {
  const cleaned = String(key).replace(/[^\w@.-]/g, '');
  return BLOCKED_KEYS.has(cleaned) ? '' : cleaned;
}

export function sanitizeStorageInput(data) {
  if (data === null || data === undefined) return data;
  if (typeof data === 'string') {
    return data.replaceAll(/[<>'"\\]/g, '').replaceAll('javascript:', '').trim();
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
      const cleanKey = sanitizeKey(key);
      if (cleanKey) {
        cleanObj[cleanKey] = sanitizeStorageInput(val);
      }
    }
    return cleanObj;
  }
  return data;
}

export function safeSetStorageItem(key, value) {
  try {
    const cleanKey = sanitizeKey(key);
    if (!cleanKey) return;
    const cleanValue = sanitizeStorageInput(value);
    const serialized = typeof cleanValue === 'string' ? cleanValue : JSON.stringify(cleanValue);
    localStorage.setItem(cleanKey, encodeURIComponent(serialized));
  } catch (error) {
    console.error(`Gagal menyimpan data ke storage [${key}]:`, error);
  }
}

export function safeGetStorageItem(key, defaultValue = null) {
  try {
    const cleanKey = sanitizeKey(key);
    if (!cleanKey) return defaultValue;
    const raw = localStorage.getItem(cleanKey);
    if (!raw) return defaultValue;

    let decoded = raw;
    if (!raw.startsWith('{') && !raw.startsWith('[')) {
      try {
        decoded = decodeURIComponent(raw);
      } catch {
        decoded = raw;
      }
    }

    try {
      return JSON.parse(decoded);
    } catch {
      return decoded;
    }
  } catch (error) {
    console.error(`Gagal membaca data dari storage [${key}]:`, error);
    return defaultValue;
  }
}
