import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // Replace this with your own secret key

export const encryptString = (plainText: string): string => {
  const encrypted = CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
  return encrypted;
};

export const decryptString = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};
