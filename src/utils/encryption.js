import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'nike-secure-key-2026-eval3';

export const encrypt = (data) => {
  try {
    const stringified = JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
  } catch (error) {
    console.error('Error encriptando:', error);
    return null;
  }
};

export const decrypt = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Error desencriptando:', error);
    return null;
  }
};

export const hash = (data) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};