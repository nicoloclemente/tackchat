import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
    const [userNames, setUserNames] = useState({}); // Cache per i nomi utenti

    // Funzione per ottenere il nome dell'utente
    const fetchUserName = async (senderId) => {
        try {
            const token = localStorage.getItem('token'); // token memorizzato
            const response = await fetch(`/api/users/${senderId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // token JWT nell'intestazione
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data.fullName || "Anonimo";
            } else {
                console.error("Failed to fetch user name", response.statusText);
                return "Anonimo";
            }
        } catch (error) {
            console.error("Failed to fetch user name", error);
            return "Anonimo";
        }
    };

    // Funzione per inviare la notifica
    const sendNotification = async (newMessage) => {
        if (Notification.permission === "granted") {
            // Recupera o usa il nome utente dalla cache
            let userName = userNames[newMessage.senderId];
            if (!userName) {
                userName = await fetchUserName(newMessage.senderId);
                setUserNames(prev => ({ ...prev, [newMessage.senderId]: userName }));
            }

            const title = `Nuovo Messaggio da ${userName}`;
            const options = {
                body: newMessage.message,
                icon: "/icons/icon-192x192.png", // icona personalizzata
            };
            new Notification(title, options);
        }
    };

    useEffect(() => {
        // Chiedi permesso per le notifiche
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("Permesso per le notifiche concesso.");
                }
            });
        }

        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);

            // Invia la notifica
            sendNotification(newMessage);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages, userNames]);

};

export default useListenMessages;