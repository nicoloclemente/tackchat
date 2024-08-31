import React, { useState } from 'react';
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import { PiChatsTeardrop } from "react-icons/pi";
import { PiUser } from "react-icons/pi";
import { PiGlobeStand } from "react-icons/pi";
import { PiDotsThree } from "react-icons/pi";
import { PiShuffleSimpleFill } from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
import { PiGlobeHemisphereWestFill } from "react-icons/pi";


import { useAuthContext } from "../../context/AuthContext.jsx";
import useLogout from "../../hooks/useLogout.js";
import { formatFullDate } from "../../utils/formatFullDate.js";
import StartedConversations from "./StartedConversations.jsx";
import Profile from "./Profile.jsx";
import ShareButton from "./ShareButton.jsx";
import Globe from "./Globe.jsx";

const Sidebar = ({ onConversationClick }) => {
    const { authUser } = useAuthContext();

    const [selected, setSelected] = useState('Chats');

    const handleSelect = (button) => {
        setSelected(button);
    };

    const { loading, logout } = useLogout();

    const memberSince = authUser ? formatFullDate(authUser.createdAt) : "N/A";

    return (
        <div
            className="w-full h-full md:w-auto bg-white md:border-r border-slate-500 flex flex-col md:pb-4 relative md:min-w-96">

            {/* Header */}
            <div className="border-b-0 px-4 flex items-center">
                <div className="flex items-center space-x-4">
                    <button type="submit" className="mx-2 mt-2">
                        <ShareButton />
                    </button>

                    {/* Conditionally render IoIosAdd button */}
                    {selected === 'Chats' && (
                        <button type="submit" className="mx-2 mt-2">
                            <IoIosAdd className="text-3xl hover:bg-gray-400 p-1 text-white bg-orange-600 rounded-full" />
                        </button>
                    )}
                </div>

                <h1 className="py-2 font-bold text-4xl ml-auto">
                    {selected}
                </h1>
            </div>

            {selected === 'Tack' && (
                <div className="flex-1 overflow-y-auto">
                    <SearchInput />
                    <Conversations onConversationClick={onConversationClick} />
                </div>
            )}

            {selected === 'Discover' && (
                <div className="flex-1 overflow-y-auto w-screen fixed z-20">
                    <Globe />
                </div>
            )}

            {selected === 'Chats' && (
                <div className="flex-1 overflow-y-auto">
                    <SearchInput />
                    <StartedConversations onConversationClick={onConversationClick} />
                </div>
            )}

            {selected === 'Profile' && (
                <div className="flex-1 overflow-y-auto">
                    <Profile />
                </div>
            )}

            <div className="fixed bottom-7 left-4 right-4 flex justify-around border rounded-full p-1.5 bg-white text-4xl z-20
                md:static md:bottom-3 md:mt-auto md:border-0 md:bg-transparent">
                <div
                    className={`flex flex-col items-center ${selected === 'Tack' ? 'text-orange-600' : 'text-gray-600'}`}
                    onClick={() => handleSelect('Tack')}
                >
                    <PiGlobeStand />
                    <span className="text-xs py-0.5">Tack</span>
                </div>

                <div
                    className={`flex flex-col items-center ${selected === 'Discover' ? 'text-orange-600' : 'text-gray-600'}`}
                    onClick={() => handleSelect('Discover')}
                >
                    <PiGlobeHemisphereWestFill />
                    <span className="text-xs py-0.5">Discover</span>
                </div>

                <div
                    className={`flex flex-col items-center ${selected === 'Chats' ? 'text-orange-600' : 'text-gray-600'}`}
                    onClick={() => handleSelect('Chats')}
                >
                    <PiChatsTeardrop />
                    <span className="text-xs py-0.5">Chats</span>
                </div>

                <div
                    className={`flex flex-col items-center ${selected === 'Profile' ? 'text-orange-600' : 'text-gray-600'}`}
                    onClick={() => handleSelect('Profile')}
                >
                    <PiUser />
                    <span className="text-xs py-0.5">Profile</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;