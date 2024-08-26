import Message from "./Message.jsx";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages.js";
import useConversation from "../../zustand/useConversation.js";
import {extractTime} from "../../utils/extractTime.js";

const Messages = ({ selectedLanguage }) => { // Accept the selectedLanguage prop
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100)
    }, [messages]);

    return (
        <div className="px-4 py-2 flex-1 overflow-auto">
            <div className="flex flex-col justify-between items-center py-4 gap-y-2">
                <p className="font-normal text-black text-xl">{selectedConversation.fullName}</p>
                <p className="font-normal text-sm text-gray-500">{selectedConversation.username}</p>
            </div>
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} selectedLanguage={selectedLanguage}/> {/* Passes selectedLanguage */}
                </div>
            ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx}/>)}

            {!loading && messages.length === 0 && (
                <p className="text-center">Send a message to start the conversation</p>
            )}
        </div>
    );
};

export default Messages;
