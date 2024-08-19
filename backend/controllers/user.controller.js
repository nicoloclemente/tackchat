import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id: { $ne: loggedInUserId } }).select('-password') // to not see our user in the bar (it's a filter that hides our user, that is, the one we are logged in with)

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log('Error in getUsersForSidebar: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}