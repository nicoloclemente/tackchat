// MessageContainer.jsx
import { useState, useEffect } from 'react';
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { PiChats } from "react-icons/pi";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx"; // Importa useSocketContext
import { useAuthContext } from "../../context/AuthContext.jsx";
import { IoIosArrowBack } from "react-icons/io";

const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'it', name: 'Italian' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese' },
];

const MessageContainer = ({ onBackClick }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext(); // Ottieni gli utenti online
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Stato per la lingua selezionata

    useEffect(() => {
        // Cleanup function (unmounts), non mostra l'ultima chat aperta quando si fa il login
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);

    return (
        <div className="w-full h-full md:h-auto flex flex-col bg-gray-100 bg-opacity-75" id="chatBackground">
            {!selectedConversation ? (
                <div className="hidden md:flex items-center justify-center w-full h-full">
                    {/* Mostra solo su dispositivi non mobili (larghezza >= 768px) */}
                    <NoChatSelected/>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div className="gap-2 bg-white px-4 py-2 flex items-center border-b border-slate-500">
                        <IoIosArrowBack
                            onClick={onBackClick}
                            className="text-3xl cursor-pointer md:hidden"
                        />
                        <div
                            className={`avatar ${isOnline ? 'online' : 'offline'}`}> {/* Change class based on online status */}
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img src={selectedConversation.profilePic} alt="user avatar"
                                     className="w-full h-full object-cover"/>
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 ml-4">
                            <div className="flex gap-3 justify-between items-center">
                                <div className="flex flex-col overflow-auto">
                                    <p className="font-normal text-black text-xl">{selectedConversation.fullName}</p>
                                    <p className="font-normal text-sm text-gray-500">{isOnline ? "online" : "offline"}</p>
                                </div>
                                <div className="relative">
                                    <select
                                        value={selectedLanguage}
                                        onChange={handleLanguageChange}
                                        className="text-lg bg-black h-10 text-white rounded-full p-2 text-center"
                                    >
                                        {availableLanguages.map((lang) => (
                                            <option key={lang.code} value={lang.code}>
                                                {lang.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Messages selectedLanguage={selectedLanguage}/> {/* Passa la lingua selezionata */}
                    <MessageInput/>
                </>
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    const {authUser} = useAuthContext();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div
                className="px-4 text-center sm:text-lg md:text-xl text-orange-600 font-semibold flex flex-col items-center gap-2">
                <div className="w-60 rounded-full">
                    <img src={authUser.profilePic} alt="user avatar"/>
                </div>
                <p>Welcome {authUser.fullName}</p>
                <p>Select a chat to start messaging</p>
                <PiChats className="text-3xl md:text-6xl text-center"/>
            </div>
        </div>
    );
};
