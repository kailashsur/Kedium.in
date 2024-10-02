const crypto = require('crypto');

// Generate a random 32-byte string
const secret = crypto.randomBytes(32).toString('base64');

console.log(secret);
