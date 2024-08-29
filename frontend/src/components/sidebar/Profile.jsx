import React, { useState } from 'react';
import { useAuthContext } from "../../context/AuthContext.jsx";
import useLogout from "../../hooks/useLogout.js";
import { formatFullDate } from "../../utils/formatFullDate.js";
import UpdateProfile from "./UpdateProfile.jsx";

const Profile = () => {
    const { authUser } = useAuthContext();
    const { loading, logout } = useLogout();
    const [isEditOpen, setIsEditOpen] = useState(false);

    const memberSince = authUser ? formatFullDate(authUser.createdAt) : "N/A";

    const openEditProfile = () => setIsEditOpen(true);
    const closeEditProfile = () => setIsEditOpen(false);

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="flex flex-col items-center py-6">
                <div className="flex items-center gap-6 mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
                        <img
                            src={authUser.profilePic}
                            alt="User avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-semibold text-gray-800">{authUser.fullName}</p>
                        <p className="text-lg text-gray-600">@{authUser.username}</p>
                        <button
                            className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-600 transition"
                            onClick={openEditProfile}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
                <p className="text-sm text-gray-600">Member since: {memberSince}</p>
            </div>

            {isEditOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>
                        <UpdateProfile closeEditProfile={closeEditProfile} />
                        <button
                            className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                            onClick={closeEditProfile}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-8">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={logout}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Profile;