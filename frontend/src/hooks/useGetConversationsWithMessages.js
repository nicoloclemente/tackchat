import { useEffect, useState } from "react";
import useGetConversations from "./useGetConversations";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext.jsx";

const useGetConversationsWithMessages = () => {
    const { conversations, loading: conversationsLoading } = useGetConversations();
    const [conversationsWithMessages, setConversationsWithMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { socket } = useSocketContext();

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
        if (socket) {
            socket.on("newMessage", (newMessage) => {
                setConversationsWithMessages(prevConversations => {
                    return prevConversations.map(conversation => {
                        if (conversation._id === newMessage.conversationId) {
                            return {
                                ...conversation,
                                lastMessageText: newMessage.message,
                                lastMessageDate: newMessage.createdAt,
                                lastMessageSender: newMessage.senderId,
                            };
                        }
                        return conversation;
                    });
                });
            });

            return () => {
                socket.off("newMessage");
            };
        }
    }, [socket]);

    return { conversationsWithMessages, loading };
};

export default useGetConversationsWithMessages;