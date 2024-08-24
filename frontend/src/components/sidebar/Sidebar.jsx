import React, { useState } from 'react';
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import { IoMdChatbubbles } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext.jsx";

const Sidebar = ({ onConversationClick }) => {
    const {authUser} = useAuthContext();

    const [selected, setSelected] = useState('chat');

    const handleSelect = (button) => {
        setSelected(button);
    };

    return (
        <div className="w-full h-full md:w-auto md:h-auto bg-white md:border-r border-slate-500 p-4 flex flex-col pb-7 md:pb-4">
            <h1 className="p-2 py-1 font-bold text-3xl mb-3">Chats</h1>
            <SearchInput />
            <div className="divider px-3"></div>

            {/* Visualizza Conversations sempre nella vista desktop */}
            <div className="hidden md:block">
                <Conversations onConversationClick={onConversationClick} />
            </div>

            {/* Visualizza Conversations solo se discover è selezionato su mobile */}
            {selected === 'discover' && (
                <div className="md:hidden">
                    <Conversations onConversationClick={onConversationClick} />
                </div>
            )}

            {selected === 'chats' && (
                <div className="md:hidden">
                    <Conversations onConversationClick={onConversationClick} />
                </div>
            )}

            {selected === 'profile' && (
                <div className="flex items-center justify-center w-full h-full md:hidden">
                    <div
                        className="px-4 text-center text-xl text-orange-600 font-semibold flex flex-col items-center gap-2">
                        <div className="w-60 rounded-full">
                            <img src={authUser.profilePic} alt="user avatar"/>
                        </div>
                        <p>Name: {authUser.fullName}</p>
                        <p>Username: {authUser.username}</p>
                    </div>
                </div>
            )}

            <div className="hidden md:flex md:flex-col md:mt-auto">
                <LogoutButton/>
            </div>

            <div className="md:hidden flex justify-around bg-gray-100 border rounded-full mt-auto p-2 text-4xl">
                <div
                    className={`flex flex-col items-center ${selected === 'discover' ? 'text-orange-600' : ''}`}
                    onClick={() => handleSelect('discover')}
                >
                    <BiWorld/>
                    <span className="text-xs">Discover</span>
                </div>
                <div
                    className={`flex flex-col items-center ${selected === 'chats' ? 'text-orange-600' : ''}`}
                    onClick={() => handleSelect('chats')}
                >
                    <IoMdChatbubbles />
                    <span className="text-xs">Chats</span>
                </div>
                <div
                    className={`flex flex-col items-center ${selected === 'profile' ? 'text-orange-600' : ''}`}
                    onClick={() => handleSelect('profile')}
                >
                    <FaUser />
                    <span className="text-xs">Profile</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;