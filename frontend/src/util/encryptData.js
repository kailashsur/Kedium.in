import CryptoJS from 'crypto-js';


const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

if (!secretKey) {
  throw new Error("Secret key is not defined. Please set NEXT_PUBLIC_SECRET_KEY in your environment variables.");
}

export const encryptData = (data) => {
  try {
    if (!secretKey) throw new Error('Secret key is missing.');
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  } catch (error) {
    console.error('Error encrypting data:', error);
    return null;
  }
};

export const decryptData = (cipherText) => {
  try {
    if (!secretKey) throw new Error('Secret key is missing.');
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};
