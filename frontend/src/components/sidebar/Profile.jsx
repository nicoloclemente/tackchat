import React from 'react';
import {useAuthContext} from "../../context/AuthContext.jsx";
import useLogout from "../../hooks/useLogout.js";
import {formatFullDate} from "../../utils/formatFullDate.js";

const Profile = () => {

    const { authUser } = useAuthContext();
    const {loading, logout} = useLogout();

    const memberSince = authUser ? formatFullDate(authUser.createdAt) : "N/A";
    return (
        <div className="w-full">
            <div className="flex w-full justify-end px-4">
                <button
                    className="text-lg hover:bg-gray-400 font-bold text-orange-600 mt-4 p-2 border border-orange-600 rounded-full"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
            <div className="flex items-center w-full h-full">
                <div className="px-4 flex items-center gap-4">
                    <div className="w-24 rounded-full">
                        <img src={authUser.profilePic} alt="user avatar" />
                    </div>
                    <div>
                        <p className="text-orange-600 text-xl">{authUser.fullName}</p>
                        <p className="text-lg text-gray-500">@{authUser.username}</p>
                        <p className="text-sm  font-thin text-gray-800">Member since: {memberSince}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;