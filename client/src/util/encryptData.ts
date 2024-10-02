import crypto from 'crypto';
// import logger from './logger';

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;


if (!secretKey){
    throw new Error("Secret key is not defined. Please set NEXT_PUBLIC_SECRET_KEY in .env file");
}


const algorithm = 'aes-256-cbc';
// const key = crypto.scryptSync(secretKey, 'salt', 32);
const key = crypto.pbkdf2Sync(secretKey, 'salt', 100000, 32, 'sha512');
const iv = crypto.randomBytes(16);


// Encrypt data
export function encryptData(data : any) : string{
    try {
        if(!secretKey){
            throw new Error("Secret key is missing.");
        }

        // encrypt the data
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(data, 'utf8', 'hex');

        encrypted += cipher.final('hex');

        const final_string = iv.toString('hex') + ':' + encrypted;

        return final_string;
    } catch (error: any) {
        // logger.error(`Error encrypting data: ${error.message}`);
        console.log(`Error encrypting data: ${error.message}`);
        return "";
    }
}


// Decrypt data
export function decryptData(cipherText : string) : string {
    try {
        // decrypt the data 
        const [ivHex, encrypted] = cipherText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');

        decrypted += decipher.final('utf8');
        

        return JSON.parse(decrypted);

    } catch (error: any) {
        // logger.error(`Error decrypting data: ${error.message}`);
        console.log(`Error decrypting data: ${error.message}`);
        return "";
    }
}