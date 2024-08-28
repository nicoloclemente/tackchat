import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        // Richiede il permesso per inviare notifiche
        const requestNotificationPermission = async () => {
            if (Notification.permission === "default") {
                await Notification.requestPermission();
            }
        };

        requestNotificationPermission();

        socket?.on("newMessage", (newMessage) => {
            // Suona la notifica audio
            const sound = new Audio(notificationSound);
            sound.play();

            // Aggiorna i messaggi
            setMessages([...messages, newMessage]);

            // Mostra la notifica push se permesso
            if (Notification.permission === "granted") {
                new Notification("New message", {
                    body: `${newMessage.senderId}: ${newMessage.message}`,
                    icon: "/path/to/icon.png", // puoi aggiungere l'icona del mittente o una generica
                });
            }
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
};

export default useListenMessages;