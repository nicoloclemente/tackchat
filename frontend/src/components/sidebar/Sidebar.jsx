import React from 'react';
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";

const Sidebar = ({ onConversationClick }) => {
    return (
        <div className="w-full h-full md:w-auto md:h-auto bg-white md:border-r border-slate-500 p-4 flex flex-col">
            <h1 className="p-2 py-1 font-bold text-[2rem]">Chat</h1>
            <SearchInput />
            <div className="divider px-3"></div>
            <Conversations onConversationClick={onConversationClick} />
            <LogoutButton />
        </div>
    );
};

export default Sidebar;