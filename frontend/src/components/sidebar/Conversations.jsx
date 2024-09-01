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
            {!loading && (
            <div className="text-xs py-4 flex items-center justify-center">
                <p>You have reached the end of the page</p>
            </div>
                )}
        </div>
    );
};

export default Conversations;