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
    const [error, setError] = useState(null); // Definizione di setError

    // Function to translate the message
    const handleTranslate = async () => {
        setLoading(true);
        setError(null);

        try {
            // Determina l'URL del server in base all'ambiente
            let serverUrl;
            if (window.location.hostname === "tackchat.it") {
                serverUrl = "https://www.tackchat.it";
            } else if (window.location.hostname === "localhost") {
                serverUrl = "http://localhost:5001";  // URL del server locale for production
            } else {
                serverUrl = "https://tackchat.onrender.com";
            }

            const response = await fetch(`${serverUrl}/translate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: message.message,
                    targetLanguage: selectedLanguage
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Errore HTTP ${response.status}: ${errorText}`);
                throw new Error(`Errore HTTP ${response.status}: ${errorText}`);
            }

            const text = await response.text();
            console.log('Risposta grezza dal server:', text);

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
                    <img alt="Tailwind CSS chat bubble component" src={profilePic} />
                </div>
            </div>
            <div
                className={`chat-bubble ${bubbleTextColor} ${bubbleBgColor} pb-2 mb-1 break-words max-w-96 rounded-7`}>
                {message.message}
                {/* Translation button */}
                <div className="flex gap-1 pt-1">
                    <button
                        onClick={handleTranslate}
                        className={`${translateButtonShow} text-xs font-bold text-orange-50 hover:bg-blue-500 bg-black rounded-full px-3`}
                        disabled={loading}
                    >
                        {loading ? "In progress..." : "t"}
                    </button>
                    <div className="chat-footer text-sm gap-1 text-right w-full text-gray-600 pl-3">{formattedTime}</div>
                </div>
                {/* Show translated message, if available */}
                {translatedMessage && (
                    <div className="mt-2 ${translatedTextColor}">
                        <hr className="my-1"/>
                        <p>{translatedMessage}</p>
                    </div>
                )}
                {/* Show an error message, if available */}
                {error && (
                    <div className="mt-2 text-red-500 bg-black rounded-lg">
                        <p>Errore: {error}</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Message;
