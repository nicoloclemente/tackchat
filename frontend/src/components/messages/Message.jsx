import { useAuthContext } from "../../context/AuthContext.jsx";
import useConversation from "../../zustand/useConversation.js";
import { extractTime } from "../../utils/extractTime.js";
import { useState } from "react";

const Message = ({ message, selectedLanguage }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? 'bg-orange-600' : 'bg-gray-300';
    const bubbleTextColor = fromMe ? 'text-white' : 'text-black';
    const picShow = fromMe ? "hidden" : "";
    const translateButtonShow = fromMe ? "hidden" : "";

    // Status for translated message
    const [translatedMessage, setTranslatedMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to determine the base URL
    const getBaseUrl = () => {
        const hostname = window.location.hostname;
        if (hostname === 'tackchat.it') {
            return 'https://tackchat.it';
        } else if (hostname === 'tackchat.onrender.com') {
            return 'https://tackchat.onrender.com';
        } else {
            return 'http://localhost:5001'; // URL for local development
        }
    };

    // Function to translate the message
    const handleTranslate = async () => {
        setLoading(true);
        setError(null); // Clear any previous errors

        try {
            const baseUrl = getBaseUrl();
            const response = await fetch(`${baseUrl}/translate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: message.message,
                    targetLanguage: selectedLanguage
                })
            });

            // Check the response status code
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Errore HTTP ${response.status}: ${errorText}`);
                throw new Error(`Errore HTTP ${response.status}: ${errorText}`);
            }

            // Get the answer as text
            const text = await response.text();
            console.log('Risposta grezza dal server:', text);

            // Try to convert to JSON
            try {
                const data = JSON.parse(text);
                console.log('Dati JSON:', data);
                if (data && data.translatedText) {
                    setTranslatedMessage(data.translatedText);
                } else {
                    throw new Error('Formato di risposta non valido');
                }
            } catch (jsonError) {
                console.error('Errore di parsing JSON:', jsonError.message);
                setError('Errore di parsing JSON: ' + jsonError.message);
            }

        } catch (error) {
            console.error('Errore durante la traduzione:', error.message);
            setError(`Errore: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`chat ${chatClassName}`}>
            <div className={`${picShow} chat-image avatar`}>
                <div className="w-10 rounded-full">
                    <img alt="Profile" src={profilePic} />
                </div>
            </div>
            <div
                className={`chat-bubble ${bubbleTextColor} ${bubbleBgColor} pb-2 mb-1 break-words max-w-96 rounded-lg`}>
                {message.message}
                <div className="flex gap-1 pt-1">
                    <button
                        onClick={handleTranslate}
                        className={`${translateButtonShow} text-xs font-bold text-orange-50 hover:bg-blue-500 bg-black rounded-full px-3`}
                        disabled={loading}
                    >
                        {loading ? "In progress..." : "Translate"}
                    </button>
                    <div className="chat-footer text-sm gap-1 text-right w-full text-gray-600 pl-3">{formattedTime}</div>
                </div>
                {translatedMessage && (
                    <div className="mt-2 text-gray-700">
                        <hr className="my-1"/>
                        <p>{translatedMessage}</p>
                    </div>
                )}
                {error && (
                    <div className="mt-2 text-red-500 bg-black rounded-lg p-2">
                        <p>Errore: {error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;