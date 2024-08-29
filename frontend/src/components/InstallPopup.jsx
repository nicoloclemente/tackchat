// InstallPopup.jsx
import React, { useEffect, useState } from 'react';

const InstallPopup = () => {
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        // Check if the PWA prompt should be shown
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            // We could store the event if needed, but for simplicity, we just show the popup
            setShowPopup(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const detectDeviceInstructions = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            return (
                <div>
                    <p>To install TackChat on Android:</p>
                    <ul>
                        <li>Open the browser menu by tapping the three dots in the upper-right corner.</li>
                        <li>Select "Add to Home Screen" or "Install".</li>
                        <li>Follow the instructions to complete the installation.</li>
                    </ul>
                </div>
            );
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return (
                <div>
                    <p>To install TackChat on iOS:</p>
                    <ul>
                        <li>Open the browser menu by tapping the share icon (a square with an upward arrow).</li>
                        <li>Select "Add to Home".</li>
                        <li>Follow the instructions to complete the installation.</li>
                    </ul>
                </div>
            );
        }

        if (navigator.userAgent.indexOf('Chrome') > -1 && !/Android|iPad|iPhone|iPod/.test(userAgent)) {
            return (
                <div>
                    <p>To install TackChat on Chrome Desktop:</p>
                    <ul>
                        <li>Click the three dots in the upper-right corner of the browser.</li>
                        <li>Select "Install TackChat".</li>
                        <li>Follow the instructions to complete the installation.</li>
                    </ul>
                </div>
            );
        }

        return (
            <div>
                <p>To install TackChat:</p>
                <ul>
                    <li>Follow the instructions specific to your device and browser.</li>
                </ul>
            </div>
        );
    };

    return (
        showPopup && (
            <div className="fixed bottom-4 left-4 w-80 bg-white p-4 rounded-lg shadow-lg flex flex-col items-center z-50">
                <h2 className="text-lg font-semibold mb-2">Install TackChat</h2>
                <div className="mb-2">
                    {detectDeviceInstructions()}
                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() => setShowPopup(false)}
                >
                    Close
                </button>
            </div>
        )
    );
};

export default InstallPopup;