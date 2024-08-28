import React, { useState } from 'react';
import { useAuthContext } from "../../context/AuthContext.jsx";
import useLogout from "../../hooks/useLogout.js";
import { formatFullDate } from "../../utils/formatFullDate.js";
import UpdateProfile from "./UpdateProfile.jsx";

const Profile = () => {
    const { authUser } = useAuthContext();
    const { loading, logout } = useLogout();
    const [isEditOpen, setIsEditOpen] = useState(false);  // Stato per gestire la visibilità del popup

    const memberSince = authUser ? formatFullDate(authUser.createdAt) : "N/A";

    const openEditProfile = () => {
        setIsEditOpen(true);
    };

    const closeEditProfile = () => {
        setIsEditOpen(false);
    };

    return (
        <div className="w-full">
            <div className="flex items-center w-full h-full flex-col py-4">
                <div className="px-4 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                        <img
                            src={authUser.profilePic}
                            alt="user avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-orange-600 text-xl">{authUser.fullName}</p>
                        <p className="text-lg text-gray-500">@{authUser.username}</p>
                        <button
                            className="rounded-lg px-6 py-1 bg-gray-200 mt-2"
                            onClick={openEditProfile}  // Apre il popup
                        >
                            Edit profile
                        </button>
                    </div>
                </div>
            </div>
            <p className="text-sm font-thin text-gray-800 text-center">Member since: {memberSince}</p>

            {isEditOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl mb-7 text-center font-bold">Edit Profile</h2>
                        <UpdateProfile closeEditProfile={closeEditProfile}/>
                        <button
                            className="mt-4 text-orange-600 hover:underline"
                            onClick={closeEditProfile}  // Chiude il popup
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="flex justify-center border px-4 mt-20">
                <button
                    className="hover:bg-gray-400 text-red-500 p-2"
                    onClick={logout}
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Profile;