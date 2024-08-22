import React from 'react';
import Conversation from "./Conversation.jsx";
import useGetConversations from "../../hooks/useGetConversations.js";
import { getRandomLanguageCode } from "../../utils/language.js";

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
                        language={getRandomLanguageCode()}
                        lastIdx={idx === conversations.length - 1}
                    />
                </div>
            ))}
            {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
        </div>
    );
};

export default Conversations;