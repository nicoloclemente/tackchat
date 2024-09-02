import React from 'react';
import SearchInput from './SearchInput.jsx';
import Conversations from './Conversations.jsx';

const ConversationsPopup = ({ onClose, onConversationClick }) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-30 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ease-in-out"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg w-full md:w-1/4 h-5/6 relative flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent click events from closing the popup
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-lg flex-grow font-semibold text-center">New Chat</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={onClose}
                    >
                        <span className="text-xl">&times;</span> {/* X symbol */}
                    </button>
                </div>

                {/* Search Input */}
                <div className="p-2">
                    <SearchInput />
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    <Conversations onConversationClick={onConversationClick} />
                </div>
            </div>
        </div>
    );
};

export default ConversationsPopup;