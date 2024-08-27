import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const updateProfile = async (req, res) => {
    try {
        const { userId, fullName, username, profilePic, password } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verifica se la password è stata fornita e aggiorna
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Aggiorna altri campi se forniti
        if (fullName) user.fullName = fullName;
        if (username) user.username = username;
        if (profilePic) user.profilePic = profilePic;

        await user.save();

        // Aggiorna il token JWT se necessario
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
        });
    } catch (error) {
        console.log('Error in updateProfile controller', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};