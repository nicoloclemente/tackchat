import React from 'react';
import Conversation from "./Conversation.jsx";
import useGetConversationsWithMessages from "../../hooks/useGetConversationsWithMessages.js";


const StartedConversations = ({ onConversationClick }) => {
    const { loading, conversationsWithMessages } = useGetConversationsWithMessages();

    // Funzione per gestire il clic su una conversazione
    const handleConversationClick = (conversation) => {
        if (onConversationClick) {
            onConversationClick(conversation);
        }
    };

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
            ) : (
                <>
                    {conversationsWithMessages.length > 0 ? (
                        conversationsWithMessages.map((conversation, idx) => (
                            <div
                                key={conversation._id}
                                onClick={() => handleConversationClick(conversation)}
                            >
                                <Conversation
                                    conversation={conversation}
                                    lastIdx={idx === conversationsWithMessages.length - 1}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-xs pt-4 pb-28 flex items-center justify-center md:hidden">
                            <p>There are no conversations with messages</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StartedConversations;