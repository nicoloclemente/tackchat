import React, { useState } from 'react';
import { useAuthContext } from "../../context/AuthContext.jsx";
import useLogout from "../../hooks/useLogout.js";
import { formatFullDate } from "../../utils/formatFullDate.js";
import UpdateProfile from "./UpdateProfile.jsx";
import { useLanguage } from '../../context/LanguageContext'; // Import the context

const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'it', name: 'Italian' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese' },
];

const Profile = () => {
    const { authUser } = useAuthContext();
    const { loading, logout } = useLogout();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const { selectedLanguage, setSelectedLanguage } = useLanguage(); // Use the context

    const memberSince = authUser ? formatFullDate(authUser.createdAt) : "N/A";

    const openEditProfile = () => setIsEditOpen(true);
    const closeEditProfile = () => setIsEditOpen(false);

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="flex items-center gap-6 mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                        <img
                            src={authUser.profilePic}
                            alt="User avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-gray-800">{authUser.fullName}</p>
                        <p className="text-lg text-gray-600">@{authUser.username}</p>
                        <button
                            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-600 transition"
                            onClick={openEditProfile}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
                <p className="text-sm text-gray-500">Member since: {memberSince}</p>
            </div>

            {isEditOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
                        <UpdateProfile closeEditProfile={closeEditProfile}/>
                        <button
                            className="mt-4 px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition"
                            onClick={closeEditProfile}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Language Selector */}
            <div className="mt-6 flex items-center justify-center space-x-4">
                <span className="text-lg font-semibold text-gray-800">My language is:</span>
                <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="text-lg bg-white border border-gray-300 rounded-lg shadow-sm p-2 outline-none focus:ring-2 focus:ring-orange-500"
                >
                    {availableLanguages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center mt-8">
                <button
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
                    onClick={logout}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Profile;