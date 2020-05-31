import CryptoJS from 'crypto-js';

export default class Crypto {
  public decrypt = (encrypted: any, isJSON: boolean = false) => {
    const decryptedData = CryptoJS.AES.decrypt(
      encrypted,
      process.env.CRYPTO_SECRET!
    ).toString(CryptoJS.enc.Utf8);
    return isJSON ? JSON.parse(decryptedData) : decryptedData;
  };

  public encrypt = (data: any, isJSON: boolean = false) =>
    CryptoJS.AES.encrypt(
      isJSON ? JSON.stringify(data) : data,
      process.env.CRYPTO_SECRET!
    ).toString();

  public encryptMonitor = (data: any, isJSON: boolean = false) =>
    CryptoJS.AES.encrypt(
      isJSON ? JSON.stringify(data) : data,
      process.env.CRYPTO_SECRET_MONITOR!
    ).toString();
}
