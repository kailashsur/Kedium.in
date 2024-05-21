// middleware/hashPassword.js
import bcrypt from "bcryptjs"

export default async function hashPassword(req, res, next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.hashedPassword = hashedPassword; // Store the hashed password in the request object
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


