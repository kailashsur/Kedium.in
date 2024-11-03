import mongoose from 'mongoose';
import User from '../models/user.model'; // Adjust the path as necessary
import logger from '../utils/logger'; // Adjust the path as necessary
import CONNECT_MONGODB from '../config/db';

export default async function seedAdminUser() {
    // check the database connection is alredy established or not

    if (mongoose.connection.readyState !== 1) {
        await CONNECT_MONGODB();
    }

    const adminUser = {
        username: 'admin',
        email: 'admin@example.com',
        password: 'Password@123', // Make sure to hash the password in a real application
        fullname: 'Admin User',
        verified: true,
        role: 'ADMIN',
        
    };

    try {
        const existingUser = await User.findOne({ email: adminUser.email });

        if (existingUser) {
            logger.info('Admin user already exists');
        } else {
            const user = new User(adminUser);
            await user.save();
            logger.info('Admin user created successfully');
        }
    } catch (error) {
        logger.error('Error seeding admin user', error);
    }
}

