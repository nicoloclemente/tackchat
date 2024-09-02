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
        <div className="fixed inset-0 flex items-center justify-center z-30 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-gray-800 text-white h-2/3 p-4 rounded shadow-lg z-10 overflow-y-scroll">
                <button
                    onClick={onClose}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Close
                </button>
                <p className="text-lg font-bold">{country.capitalName}</p>
                <p className="text-sm">{country.countryName}</p>
                {loading && <p>Loading conversations...</p>}
                {error && <p className="text-red-500">Error: {error.message}</p>}
                {conversations && conversations.length > 0 ? (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Conversations:</h3>
                        <ul>
                            {conversations.map((conversation, idx) => (
                                <li
                                    key={conversation._id}
                                    onClick={() => handleConversationClick(conversation)}
                                    className="mb-2 cursor-pointer"
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
                    <p className="mt-4">No conversations available.</p>
                )}
            </div>
        </div>
    );
};

export default CountryPopup;