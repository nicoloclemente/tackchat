import React, { useState } from 'react';
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import { PiChatsTeardrop } from "react-icons/pi";
import { PiUser } from "react-icons/pi";
import { PiGlobeStand } from "react-icons/pi";
import { PiDotsThree } from "react-icons/pi";

import { useAuthContext } from "../../context/AuthContext.jsx";
import useLogout from "../../hooks/useLogout.js";
import {formatFullDate} from "../../utils/formatFullDate.js";
import StartedConversations from "./StartedConversations.jsx";
import Profile from "./Profile.jsx";
import ShareButton from "./ShareButton.jsx";

const Sidebar = ({ onConversationClick }) => {
    const { authUser } = useAuthContext();

    const [selected, setSelected] = useState('Chats');

    const handleSelect = (button) => {
        setSelected(button);
    };

    const {loading, logout} = useLogout();

    const memberSince = authUser ? formatFullDate(authUser.createdAt) : "N/A";

    return (
        <div
            className="w-full h-full md:w-auto bg-white md:border-r border-slate-500 flex flex-col md:pb-4 relative md:min-w-96">

            {/* Header */}
            <div className="border-b-0 px-4 flex items-center justify-between">
                <div>
                    <button type="submit" className="mx-2 mt-2"><ShareButton /></button>
                </div>
                <h1 className=" py-2 font-bold text-4xl mb-">{selected}</h1>
            </div>


            {/* Conversations button selected mobile */}
            {(selected === 'Tack') && (
                <div className="flex-1 overflow-y-auto">
                    <SearchInput/>
                    <Conversations onConversationClick={onConversationClick}/>
                </div>
            )}

            {(selected === 'Chats') && (
                <div className="flex-1 overflow-y-auto">
                    <SearchInput/>
                    <StartedConversations onConversationClick={onConversationClick}/>
                </div>
            )}

            {/* Profile view on mobile */}
            {selected === 'Profile' && (
                <div className="flex-1 overflow-y-auto">
                    <Profile />
                </div>
            )}

            <div className="fixed bottom-7 left-4 right-4 flex justify-around border rounded-full p-1.5 bg-white text-4xl z-10
                md:static md:bottom-3 md:mt-auto md:border-0 md:bg-transparent">
                <div
                    className={`flex flex-col items-center ${selected === 'Tack' ? 'text-orange-600' : 'text-gray-600'}`}
                    onClick={() => handleSelect('Tack')}
                >
                    <PiGlobeStand />
                    <span className="text-xs py-0.5">Tack</span>
                </div>
                <div
                    className={`flex flex-col items-center ${selected === 'Chats' ? 'text-orange-600' : 'text-gray-600'}`}
                    onClick={() => handleSelect('Chats')}
                >
                    <PiChatsTeardrop/>
                    <span className="text-xs py-0.5">Chats</span>

                </div>
                <div
                    className={`flex flex-col items-center ${selected === 'Profile' ? 'text-orange-600' : 'text-gray-600'}`}
                    onClick={() => handleSelect('Profile')}
                >
                    <PiUser/>
                    <span className="text-xs py-0.5">Profile</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;