import {createContext, useContext, useEffect, useState} from "react";
import {useAuthContext} from "./AuthContext.jsx";
import {io} from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if (authUser) {
            // Determine the server URL based on your environment
            let serverUrl;
            if (window.location.hostname === "tackchat.it") {
                serverUrl = "https://www.tackchat.it";
            } else if (window.location.hostname === "localhost") {
                serverUrl = "http://localhost:5001";  // local server URL for production
            } else {
                serverUrl = "https://tackchat.onrender.com";
            }

            const socket = io(serverUrl, {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
}