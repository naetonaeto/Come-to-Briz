// Front-end (React)
import crypto from 'crypto-browserify';

const encryptMessage = (message, publicKey) => {
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: crypto.constants.hash,
    },
    Buffer.from(message)
  );
  return encrypted.toString('hex');
};