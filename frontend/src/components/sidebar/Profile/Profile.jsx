import React, { useState } from 'react';
import { useAuthContext } from "../../../context/AuthContext.jsx";
import useLogout from "../../../hooks/useLogout.js";
import { formatFullDate } from "../../../utils/formatFullDate.js";
import UpdateProfile from "./UpdateProfile.jsx";

const Profile = () => {
    const { authUser } = useAuthContext();
    const { loading, logout } = useLogout();
    const [isEditOpen, setIsEditOpen] = useState(false);

    const memberSince = authUser ? formatFullDate(authUser.createdAt) : "N/A";

    const openEditProfile = () => setIsEditOpen(true);
    const closeEditProfile = () => setIsEditOpen(false);

    return (
        <div className="w-full max-w-4xl mx-auto p-2">
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg items-center">
                        <img
                            src={authUser.profilePic}
                            alt="User avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-start">
                        <p className="text-3xl font-bold text-gray-800">{authUser.fullName}</p>
                        <p className="text-lg text-gray-600">@{authUser.username}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-600 transition"
                            onClick={openEditProfile}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
                <p className="text-sm text-gray-500 text-center">Member since: {memberSince}</p>
            </div>

            {isEditOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
                        <UpdateProfile closeEditProfile={closeEditProfile}/>
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-8">
                <button
                    className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
                    onClick={logout}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Profile;