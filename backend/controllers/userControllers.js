// controllers/userController.js

// db schema import
import User from "../models/User.js";



class UserClass {

    async getUser (req, res){
        const user_id = req.user; // here "user" is a _id of user
        
        try {
            const user = await User.findOne({ _id: user_id }).select('-_id -__v ');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({result : user});
        } catch (error) {
            throw error;
        }
    }

    async updateUser(req, res) {
        const toUpdateData = req.body; // it may be like toUpdateData = {fullname, username} or it can be only toUpdateData= {fullname}
        const user = req.user;

        // Ensure the UserAuth cookie is available
        let userAuth = req.cookies.UserAuth;
        if (!userAuth) {
            return res.status(400).json({ error: 'UserAuth cookie is missing' });
        }

        try {

            const result = await User.updateMany({ _id: user }, { $set: toUpdateData });

            userAuth.fullname = toUpdateData.fullname;
            if (result) {

                // Set the updated cookie
                res.status(200).cookie('UserAuth', userAuth, {
                    httpOnly: true,
                    // secure: true, // Uncomment this line if using HTTPS
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                }).send("user cookie updated successfully");
            }

        } catch (err) {
            console.error('Error updating user:', err);
            return res.status(400).json({ error: err.message });
        }
    }    
}
const userControllers = new UserClass();
export default userControllers;


// Add more controller functions as needed (e.g., createUser,  