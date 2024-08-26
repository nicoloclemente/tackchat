import React, { useState } from 'react';
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import { IoMdChatbubbles } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext.jsx";
import useLogout from "../../hooks/useLogout.js";
import {formatFullDate} from "../../utils/formatFullDate.js";
import StartedConversations from "./StartedConversations.jsx";

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
            <div className="border-b-0 px-4">
                <h1 className=" py-2 font-bold text-4xl mb-">{selected}</h1>
            </div>


            {/* Conversations button selected mobile */}
            {(selected === 'Tack') && (
                <div className=" flex-1 overflow-y-auto">
                    <SearchInput/>
                    <Conversations onConversationClick={onConversationClick}/>
                </div>
            )}

            {(selected === 'Chats') && (
                <div className=" flex-1 overflow-y-auto">
                    <SearchInput/>
                    <StartedConversations onConversationClick={onConversationClick}/>
                </div>
            )}

            {/* Profile view on mobile */}
            {selected === 'Profile' && (
                <div className="">
                    <div className="flex w-full justify-end px-4">
                        <button className="text-lg hover:bg-blue-500 hover:text-white font-bold text-gray-500 mt-4 p-2 bg-gray-200 rounded-full" onClick={logout}>Logout</button>
                    </div>
                    <div className="flex items-center w-full h-full">
                        <div
                            className="px-4 text-xl text-orange-600 font-semibold flex items-center gap-4">
                            <div className="w-24 rounded-full">
                                <img src={authUser.profilePic} alt="user avatar"/>
                            </div>
                            <div className="">
                                <p>{authUser.fullName}</p>
                                <p className="text-lg text-gray-500">{authUser.username}</p>
                                <p className="text-xs py-2 text-gray-800">Member since: {memberSince}</p>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <div className="fixed bottom-7 left-4 right-4 flex justify-around border rounded-full p-1.5 bg-gray-200 text-4xl z-10
                md:static md:bottom-3 md:mt-auto md:border-0 md:bg-transparent">
                <div
                    className={`flex flex-col items-center ${selected === 'Tack' ? 'text-orange-600' : ''}`}
                    onClick={() => handleSelect('Tack')}
                >
                    <BiWorld/>
                    <span className="text-xs py-0.5">Tack</span>
                </div>
                <div
                    className={`flex flex-col items-center ${selected === 'Chats' ? 'text-orange-600' : ''}`}
                    onClick={() => handleSelect('Chats')}
                >
                    <IoMdChatbubbles/>
                    <span className="text-xs py-0.5">Chats</span>

                </div>
                <div
                    className={`flex flex-col items-center ${selected === 'Profile' ? 'text-orange-600' : ''}`}
                    onClick={() => handleSelect('Profile')}
                >
                    <FaUser/>
                    <span className="text-xs py-0.5">Profile</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;