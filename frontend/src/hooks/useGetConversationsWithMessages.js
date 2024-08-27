import { useEffect, useState } from "react";
import useGetConversations from "./useGetConversations";
import toast from "react-hot-toast";
import io from "socket.io-client";

const SOCKET_URL = "https://tackchat.onrender.com"; // URL del server WebSocket

const useGetConversationsWithMessages = () => {
    const { conversations, loading: conversationsLoading } = useGetConversations();
    const [conversationsWithMessages, setConversationsWithMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const fetchMessagesForConversations = async () => {
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
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (!conversationsLoading && conversations.length > 0) {
            fetchMessagesForConversations();
        }
    }, [conversations, conversationsLoading]);

    useEffect(() => {
        const socketClient = io(SOCKET_URL);
        setSocket(socketClient);

        socketClient.on('messageUpdate', (updatedMessages) => {
            // Logica per aggiornare le conversazioni con i nuovi messaggi
            setConversationsWithMessages(prevConversations => {
                const updatedConversations = prevConversations.map(conversation => {
                    const newMessages = updatedMessages[conversation._id] || [];
                    const lastMessage = newMessages[newMessages.length - 1];
                    return {
                        ...conversation,
                        lastMessageText: lastMessage?.message || conversation.lastMessageText,
                        lastMessageDate: lastMessage?.createdAt || conversation.lastMessageDate,
                        lastMessageSender: lastMessage?.senderId || conversation.lastMessageSender,
                    };
                });

                return updatedConversations;
            });
        });

        return () => {
            socketClient.off('messageUpdate');
            socketClient.disconnect();
        };
    }, []);

    return { conversationsWithMessages, loading };
};

export default useGetConversationsWithMessages;