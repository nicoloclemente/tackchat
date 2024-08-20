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

    // Status for translated message
    const [translatedMessage, setTranslatedMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Definizione di setError

    // Function to translate the message
    const handleTranslate = async () => {
        setLoading(true);
        setError(null); // Clear any previous errors

        try {
            // change the fetch with http://localhost:5001 for local production
            const response = await fetch('https://tackchat.onrender.com/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: message.message,
                    targetLanguage: selectedLanguage // Use the selected language
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
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={profilePic} />
                </div>
            </div>
            <div
                className={`chat-bubble ${bubbleTextColor} ${bubbleBgColor} pb-2 mb-1 break-words max-w-96 rounded-lg`}>
                {message.message}
                {/* Translation button */}
                <div className="mt-2 flex gap-1">
                    <button
                        onClick={handleTranslate}
                        className="text-xs font-bold text-orange-50 hover:bg-blue-500 bg-black rounded-full px-3"
                        disabled={loading}
                    >
                        {loading ? "In progress..." : "T"}
                    </button>
                    <div className="chat-footer opacity-50 text-xs gap-1 text-right w-full text-black">{formattedTime}</div>
                </div>
                {/* Show translated message, if available */}
                {translatedMessage && (
                    <div className="mt-2 ${translatedTextColor}">
                        <hr className="my-1"/>
                        <p>Translation: {translatedMessage}</p>
                    </div>
                )}
                {/* Show an error message, if available */}
                {error && (
                    <div className="mt-2 text-red-500">
                        <p>Errore: {error}</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Message;
