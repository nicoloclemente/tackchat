import { useEffect, useState } from "react";
import useGetConversations from "./useGetConversations";
import toast from "react-hot-toast";

const useGetConversationsWithMessages = () => {
    const { conversations, loading: conversationsLoading } = useGetConversations();
    const [conversationsWithMessages, setConversationsWithMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMessagesForConversations = async () => {
            setLoading(true);
            const messagesByConversation = {};

            try {
                // Recupera i messaggi per ogni conversazione
                for (const conversation of conversations) {
                    const res = await fetch(`/api/messages/${conversation._id}`);
                    const data = await res.json();
                    if (data.error) throw new Error(data.error);
                    messagesByConversation[conversation._id] = data;  // Salva i messaggi per ogni conversazione
                }

                // Arricchisce le conversazioni con i dettagli dell'ultimo messaggio
                const enrichedConversations = conversations
                    .filter(conversation =>
                        messagesByConversation[conversation._id] && messagesByConversation[conversation._id].length > 0
                    )
                    .map(conversation => {
                        const messages = messagesByConversation[conversation._id];
                        const lastMessage = messages[messages.length - 1]; // Ottiene l'ultimo messaggio
                        return {
                            ...conversation,
                            lastMessageText: lastMessage.message,
                            lastMessageDate: lastMessage.createdAt,
                            lastMessageSender: lastMessage.senderId,
                        };
                    });

                setConversationsWithMessages(enrichedConversations);

                // Memorizza le conversazioni arricchite nel localStorage
                localStorage.setItem('conversationsWithMessages', JSON.stringify(enrichedConversations));
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Prova a caricare le conversazioni dal localStorage
        const savedConversations = localStorage.getItem('conversationsWithMessages');
        if (savedConversations) {
            setConversationsWithMessages(JSON.parse(savedConversations));
        } else if (!conversationsLoading && conversations.length > 0) {
            // Se non ci sono conversazioni salvate, recuperale dal server
            fetchMessagesForConversations();
        }
    }, [conversations, conversationsLoading]);

    return { conversationsWithMessages, loading };
};

export default useGetConversationsWithMessages;