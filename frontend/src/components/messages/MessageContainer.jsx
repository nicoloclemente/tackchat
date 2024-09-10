// MessageContainer.jsx
import { useEffect } from 'react';
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { PiChats } from "react-icons/pi";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { IoIosArrowBack } from "react-icons/io";
import { useLanguage } from '../../context/LanguageContext'; // Import the context

const MessageContainer = ({ onBackClick }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const { selectedLanguage } = useLanguage(); // Use the context

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);

    return (
        <div className="w-full h-full md:h-auto flex flex-col bg-gray-100 bg-opacity-75" id="chatBackground">
            {!selectedConversation ? (
                <div className="hidden md:flex items-center justify-center w-full h-full">
                    <NoChatSelected/>
                </div>
            ) : (
                <>
                    <div className="gap-2 bg-white px-4 py-2 flex items-center border-b">
                        <IoIosArrowBack
                            onClick={onBackClick}
                            className="text-3xl cursor-pointer md:hidden"
                        />
                        <div
                            className={`avatar ${isOnline ? 'online' : 'offline'}`}>
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
                            </div>
                        </div>
                    </div>
                    <Messages selectedLanguage={selectedLanguage}/> {/* Pass the language, which has been selected in profile */}
                    <MessageInput/>
                </>
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-orange-600 font-semibold flex flex-col items-center gap-2">
                <div className="w-60 h-60 rounded-full overflow-hidden">
                    <img src={authUser.profilePic} alt="user avatar" className="w-full h-full object-cover"/>
                </div>
                <p>Welcome {authUser.fullName}</p>
                <p>Select a chat to start messaging</p>
                <PiChats className="text-3xl md:text-6xl text-center"/>
            </div>
        </div>
    );
};