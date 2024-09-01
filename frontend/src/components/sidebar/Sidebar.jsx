import React, { useState } from 'react';
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import { PiChatsTeardrop, PiUser, PiGlobeStand, PiDotsThree, PiShuffleSimpleFill, PiGlobeHemisphereWestFill } from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
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
    const [showConversationsPopup, setShowConversationsPopup] = useState(false);

    const handleSelect = (button) => {
        setSelected(button);
    };

    const { loading, logout } = useLogout();
    const memberSince = authUser ? formatFullDate(authUser.createdAt) : "N/A";

    return (
        <div className="w-full h-full md:w-auto bg-white md:border-r flex flex-col md:pb-4 relative md:min-w-96">
            {/* Header */}
            <div className="border-b-0 px-4 flex items-center">
                <div className="flex gap-4 items-center">
                    <button type="submit" className="">
                        <ShareButton />
                    </button>

                    {selected === 'Chats' && (
                        <button
                            type="button"
                            className=""
                            onClick={() => setShowConversationsPopup(true)}
                        >
                            <IoIosAdd className="text-3xl hover:bg-gray-400 p-1 text-white bg-orange-600 rounded-full" />
                        </button>
                    )}
                </div>

                <h1 className="py-2 font-bold text-4xl ml-auto">
                    {selected}
                </h1>
            </div>

            {selected === 'Tack' && (
                <div className="flex-1 overflow-y-auto fixed">
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

            {/* Conversations Popup */}
            {showConversationsPopup && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-30 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ease-in-out">
                    <div
                        className="bg-white rounded-lg w-full md:w-1/4 h-5/6 relative flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4">
                            <h2 className="text-lg flex-grow font-semibold text-center">New Chat</h2>
                            <button
                                className="text-gray-600 hover:text-gray-800"
                                onClick={() => setShowConversationsPopup(false)}
                            >
                                <span className="text-xl">&times;</span> {/* X symbol */}
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="p-2">
                            <SearchInput/>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 overflow-y-auto">
                            <Conversations onConversationClick={onConversationClick}/>
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed bottom-7 left-4 right-4 flex justify-around border rounded-full p-1.5 bg-white text-4xl z-20
                md:static md:bottom-3 md:mt-auto md:border-0 md:bg-transparent">
                <div
                    className={`flex flex-col items-center ${selected === 'Tack' ? 'text-orange-600' : 'text-gray-600'}`}
                    onClick={() => handleSelect('Tack')}
                >
                    <PiGlobeHemisphereWestFill/>
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
                    <PiUser />
                    <span className="text-xs py-0.5">Profile</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;