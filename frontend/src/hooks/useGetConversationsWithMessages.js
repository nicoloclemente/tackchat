import { useEffect, useState, useCallback } from "react";
import useGetConversations from "./useGetConversations";
import toast from "react-hot-toast";

const useGetConversationsWithMessages = () => {
    const { conversations, loading: conversationsLoading } = useGetConversations();
    const [conversationsWithMessages, setConversationsWithMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMessagesForConversations = useCallback(async () => {
        setLoading(true);
        const messagesByConversation = {};

        try {
            const fetchPromises = conversations.map(async (conversation) => {
                const res = await fetch(`/api/messages/${conversation._id}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                messagesByConversation[conversation._id] = data;
            });

            await Promise.all(fetchPromises);

            const enrichedConversations = conversations
                .filter(conversation => messagesByConversation[conversation._id]?.length > 0)
                .map(conversation => {
                    const messages = messagesByConversation[conversation._id];
                    const lastMessage = messages[messages.length - 1];
                    return {
                        ...conversation,
                        lastMessageText: lastMessage.message,
                        lastMessageDate: lastMessage.createdAt,
                        lastMessageSender: lastMessage.senderId,
                    };
                });

            setConversationsWithMessages(enrichedConversations);
            localStorage.setItem('conversationsWithMessages', JSON.stringify(enrichedConversations));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [conversations]);

    useEffect(() => {
        const savedConversations = localStorage.getItem('conversationsWithMessages');
        if (savedConversations) {
            setConversationsWithMessages(JSON.parse(savedConversations));
        } else if (!conversationsLoading && conversations.length > 0) {
            fetchMessagesForConversations();
        }
    }, [conversationsLoading, conversations, fetchMessagesForConversations]);

    return { conversationsWithMessages, loading };
};

export default useGetConversationsWithMessages;