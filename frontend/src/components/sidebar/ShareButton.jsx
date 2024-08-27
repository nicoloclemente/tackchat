import React from 'react';
import { PiDotsThree } from "react-icons/pi";

const ShareButton = () => {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Tackchat',
                text: 'Tackchat: Chat In Every Language',
                url: 'https://www.tackchat.com',
            })
                .then(() => console.log('Condiviso con successo'))
                .catch((error) => console.log('Errore nella condivisione:', error));
        } else {
            alert('La tua piattaforma non supporta la condivisione web.');
        }
    };

    return (
        <PiDotsThree
            onClick={handleShare}
            className="text-3xl hover:bg-gray-400 p-1 text-white bg-orange-600 rounded-full"
        />
    );
};

export default ShareButton;