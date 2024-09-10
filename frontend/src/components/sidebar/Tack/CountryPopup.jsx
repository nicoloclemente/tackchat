import React, { useEffect, useState } from 'react';
import useGetConversationsByCountry from '../../../hooks/useGetConversationsByCountry.js';
import Conversation from "../Conversation.jsx";

const CountryPopup = ({ country, onClose, onConversationClick }) => {
    const [countryCode, setCountryCode] = useState(country?.code || null);
    const { conversations, loading, error } = useGetConversationsByCountry(countryCode);

    useEffect(() => {
        if (country?.code) {
            setCountryCode(country.code);
        }
    }, [country?.code]);

    if (!country) return null;

    const handleConversationClick = (conversation) => {
        if (onConversationClick) {
            onConversationClick(conversation);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-30 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-90">
            <div
                className="bg-gray-800 rounded-lg text-white h-2/3 w-11/12 max-w-lg p-4 shadow-lg z-10 overflow-y-auto">
                <button
                    onClick={onClose}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Close
                </button>
                <p className="text-xl font-bold text-center">{country.capitalName}</p>
                <p className="text-lg text-center">{country.countryName}</p>
                {loading && <p className="text-center">Loading conversations...</p>}
                {error && <p className="text-red-500 text-center">Error: {error.message}</p>}
                {conversations && conversations.length > 0 ? (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-center py-2">New Chats</h3>
                        <ul className="flex flex-col items-center">
                            {conversations.map((conversation, idx) => (
                                <li
                                    key={conversation._id}
                                    onClick={() => handleConversationClick(conversation)}
                                    className="mb-2 cursor-pointer w-full max-w-md bg-white rounded"
                                >
                                    <Conversation
                                        conversation={conversation}
                                        lastIdx={idx === conversations.length - 1}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="mt-4 text-center">No conversations available.</p>
                )}
            </div>
        </div>
    );
};

export default CountryPopup;