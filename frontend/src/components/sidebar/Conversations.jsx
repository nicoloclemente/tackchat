import React from 'react';
import Conversation from "./Conversation.jsx";
import useGetConversations from "../../hooks/useGetConversations.js";

const Conversations = ({ onConversationClick }) => {
    const { loading, conversations } = useGetConversations();

    // Funzione per gestire il clic su una conversazione
    const handleConversationClick = (conversation) => {
        if (onConversationClick) {
            onConversationClick(conversation);
        }
    };

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {conversations.map((conversation, idx) => (
                <div key={conversation._id} onClick={() => handleConversationClick(conversation)}>
                    <Conversation
                        conversation={conversation}
                        lastIdx={idx === conversations.length - 1}
                    />
                </div>
            ))}
            {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
            <div className="text-xs pt-4 pb-28 flex items-center justify-center md:hidden">
                <p>There are no more conversation</p>
            </div>
        </div>
    );
};

export default Conversations;