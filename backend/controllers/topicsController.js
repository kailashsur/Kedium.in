// controllers/userController.js

// db schema import
import User from "../models/User.js";
import Topic from "../models/Topic.js";


class TopicsClass {

    async updateTopics(req, res) {
        const {topicArray} = req.body; // Extracting topicArray from the request body
        const user = req.user;
    
        // Ensure the user is valid
        if (!user) {
            return res.status(400).json({ error: 'You are not authenticated' });
        }
    
        // Ensure topicArray is an array and not empty
        if (!Array.isArray(topicArray) || topicArray.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty topic array' });
        }
    
        try {
            // Find and update the user's interested topics
            const result = await User.findOneAndUpdate(
                { _id: user },
                { $set: { interested_in: topicArray } },
                { new: true, useFindAndModify: false, select: '_id username interested_in' },
                
            );
    
            if (result) {
                // Respond with the updated user object
                return res.status(200).json({ result });
            } else {
                // Handle case where the user was not found
                return res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'An error occurred while updating the user' });
        }
    }
    
    async getTopics(req, res) {

        const user = req.user;
    
        // Ensure the user is valid
        if (!user) {
            return res.status(400).json({ error: 'You are not authenticated' });
        }
    
  
        try {
            // Find and update the user's interested topics
            const result = await User.findOne(
                { _id: user } // Ensure you are using `user._id` to correctly match the document by ID
            ).select('_id username interested_in');
    
            if (result) {
                // Respond with the updated user object
                return res.status(200).json({ result });
            } else {
                // Handle case where the user was not found
                return res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'An error occurred while updating the user' });
        }
    }

}
const topicsControllers = new TopicsClass();
export default topicsControllers;


// Add more controller functions as needed (e.g., createUser,  