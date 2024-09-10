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
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.log('Sharing error:', error));
        } else {
            alert('Your platform does not support web sharing.');
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