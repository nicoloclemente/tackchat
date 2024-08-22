import Sidebar from "../../components/sidebar/Sidebar.jsx";
import MessageContainer from "../../components/messages/MessageContainer.jsx";
import React, { useState } from 'react';

const HomeMobile = () => {
    const [showMessageContainer, setShowMessageContainer] = useState(false);

    const handleConversationClick = () => {
        setShowMessageContainer(true);
    };

    const handleBackToSidebar = () => {
        setShowMessageContainer(false);
    };

    return (
        <div className='flex w-full h-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            {/* Condizione per mostrare Sidebar o MessageContainer */}
            <div className={`w-full h-full ${showMessageContainer ? 'hidden' : 'block'}`}>
                <Sidebar onConversationClick={handleConversationClick} />
            </div>
            <div className={`w-full h-full ${showMessageContainer ? 'block' : 'hidden'}`}>
                <MessageContainer onBackClick={handleBackToSidebar} />
            </div>
        </div>
    );
};

export default HomeMobile;