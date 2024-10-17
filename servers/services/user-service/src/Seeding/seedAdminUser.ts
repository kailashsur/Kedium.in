// import mongoose from 'mongoose';
// import User from '../models/user.model'; // Adjust the path as necessary
// import logger from '../utils/logger'; // Adjust the path as necessary

// async function seedAdminUser() {
//     await mongoose.connect('mongodb://localhost:27017/mydatabase', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });

//     const adminUser = {
//         username: 'admin',
//         email: 'admin@example.com',
//         password: 'adminpassword', // Make sure to hash the password in a real application
//         fullname: 'Admin User',
//         verified: true,
//         role: 'admin',
//         profile: {
//             profile_img: 'path/to/profile_img.jpg'
//         }
//     };

//     try {
//         const existingUser = await User.findOne({ email: adminUser.email });
//         if (existingUser) {
//             logger.info('Admin user already exists');
//         } else {
//             const user = new User(adminUser);
//             await user.save();
//             logger.info('Admin user created successfully');
//         }
//     } catch (error) {
//         logger.error('Error seeding admin user', error);
//     } finally {
//         await mongoose.disconnect();
//     }
// }

// seedAdminUser();