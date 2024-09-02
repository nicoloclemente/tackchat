import React, { useState, useEffect, useRef } from 'react';

// Array con tutte le lingue di Google Translate
const languages = [
    "Afrikaans", "Amharic", "Arabic", "Armenian", "Azerbaijani", "Basque", "Belarusian", "Bengali",
    "Bosnian", "Bulgarian", "Catalan", "Cebuano", "Chichewa", "Chinese",
    "Corsican", "Croatian", "Czech", "Danish", "Dutch", "English", "Esperanto", "Estonian", "Finnish",
    "French", "Frisian", "Galician", "Georgian", "German", "Greek", "Gujarati", "Haitian Creole", "Hausa",
    "Hawaiian", "Hebrew", "Hindi", "Hmong", "Hungarian", "Icelandic", "Igbo", "Indonesian", "Irish", "Italian",
    "Japanese", "Javanese", "Kannada", "Kazakh", "Khmer", "Kinyarwanda", "Korean", "Kurdish", "Kyrgyz",
    "Lao", "Latin", "Latvian", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malay", "Malayalam",
    "Maltese", "Maori", "Marathi", "Mongolian", "Myanmar", "Nepali", "Norwegian", "Odia", "Pashto",
    "Persian", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Samoan", "Scots Gaelic", "Serbian",
    "Sesotho", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Sundanese",
    "Swahili", "Swedish", "Tajik", "Tamil", "Tatar", "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu",
    "Uzbek", "Vietnamese", "Welsh", "Xhosa", "Yiddish", "Yoruba", "Zulu"
];

const getRandomIndex = (excludedIndex) => {
    let index;
    do {
        index = Math.floor(Math.random() * languages.length);
    } while (index === excludedIndex); // Ensure we don't pick the same index consecutively
    return index;
};

const TypingEffect = () => {
    const [displayText, setDisplayText] = useState('');
    const [currentLangIndex, setCurrentLangIndex] = useState(getRandomIndex(-1));
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseBetween = 250;
    const typeTimeout = useRef(null);

    useEffect(() => {
        const type = () => {
            const currentLang = languages[currentLangIndex];

            if (isDeleting) {
                setDisplayText(currentLang.substring(0, currentCharIndex - 1));
                setCurrentCharIndex(prev => prev - 1);
            } else {
                setDisplayText(currentLang.substring(0, currentCharIndex + 1));
                setCurrentCharIndex(prev => prev + 1);
            }

            if (!isDeleting && currentCharIndex === currentLang.length) {
                setIsDeleting(true);
                typeTimeout.current = setTimeout(type, pauseBetween);
            } else if (isDeleting && currentCharIndex === 0) {
                setIsDeleting(false);
                setCurrentLangIndex(getRandomIndex(currentLangIndex)); // Get a new random index
                setCurrentCharIndex(0);
                typeTimeout.current = setTimeout(type, 500);
            } else {
                typeTimeout.current = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
            }
        };

        typeTimeout.current = setTimeout(type, typingSpeed);

        // Cleanup on unmount
        return () => clearTimeout(typeTimeout.current);
    }, [currentCharIndex, isDeleting, currentLangIndex]);

    return <span id="typing">&nbsp;{displayText}</span>;
};

export default TypingEffect;
