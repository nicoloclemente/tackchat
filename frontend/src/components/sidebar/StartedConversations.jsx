import React from 'react';
import Conversation from "./Conversation.jsx";
import useGetConversationsWithMessages from "../../hooks/useGetConversationsWithMessages.js";

const StartedConversations = ({ onConversationClick }) => {
    const { loading, conversationsWithMessages } = useGetConversationsWithMessages();

    // Funzione per ordinare le conversazioni per data dell'ultimo messaggio
    const sortedConversations = conversationsWithMessages.slice().sort((a, b) => {
        // Confronta le date dell'ultimo messaggio
        return new Date(b.lastMessageDate) - new Date(a.lastMessageDate);
    });

    // Funzione per gestire il clic su una conversazione
    const handleConversationClick = (conversation) => {
        if (onConversationClick) {
            onConversationClick(conversation);
        }
    };

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {sortedConversations.map((conversation, idx) => (
                <div
                    key={conversation._id}
                    onClick={() => handleConversationClick(conversation)}
                >
                    <Conversation
                        conversation={conversation}
                        lastIdx={idx === sortedConversations.length - 1}
                    />
                </div>
            ))}
            {loading && (
                <span className="loading loading-spinner mx-auto"></span>
            )}
            {!loading && (
                <div className="text-xs pt-4 pb-28 flex items-center justify-center md:hidden">
                    <p>You have reached the end of the page</p>
                </div>
            )}
        </div>
    );
};

export default StartedConversations;