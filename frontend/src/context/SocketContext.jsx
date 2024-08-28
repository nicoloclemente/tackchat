import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            // Determine the correct URL based on the environment
            const baseURL = window.location.hostname === 'tackchat.it'
                ? 'https://tackchat.it'
                : 'https://tackchat.onrender.com';

            const socket = io(baseURL, {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);

            // Set up socket event listeners
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                socket.off("getOnlineUsers"); // Clean up listener
                socket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};