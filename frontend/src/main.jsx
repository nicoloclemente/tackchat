import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';
import { LanguageProvider } from './context/LanguageContext';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker
registerSW({ immediate: true });


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <SocketContextProvider>
                    <LanguageProvider>
                        <App />
                    </LanguageProvider>
                </SocketContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);