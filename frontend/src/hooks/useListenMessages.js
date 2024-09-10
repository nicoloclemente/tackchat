import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
    const [userNames, setUserNames] = useState({}); // Cache for usernames

    // Function to get the username
    const fetchUserName = async (senderId) => {
        try {
            const token = localStorage.getItem('token'); // stored token
            const response = await fetch(`/api/users/${senderId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // JWT token in header
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

    // Function to send notification
    const sendNotification = async (newMessage) => {
        if (Notification.permission === "granted") {
            // Retrieve or use the username from the cache
            let userName = userNames[newMessage.senderId];
            if (!userName) {
                userName = await fetchUserName(newMessage.senderId);
                setUserNames(prev => ({ ...prev, [newMessage.senderId]: userName }));
            }

            const title = `New Message from ${userName}`;
            const options = {
                body: newMessage.message,
                icon: "/icons/icon-192x192.png", // custom icon
            };
            new Notification(title, options);
        }
    };

    useEffect(() => {
        // Ask permission for notifications
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("Permission for notifications granted.");
                }
            });
        }

        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);

            // Send notification
            sendNotification(newMessage);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages, userNames]);

};

export default useListenMessages;