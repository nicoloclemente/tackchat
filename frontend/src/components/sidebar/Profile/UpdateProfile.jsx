import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { useLanguage } from '../../../context/LanguageContext.jsx';
import { availableLanguages } from '../../../utils/languages.js';
import { availableCountries } from '../../../utils/countries.js';

const UpdateProfile = ({ closeEditProfile }) => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [password, setPassword] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { authUser, setAuthUser } = useAuthContext();
    const { selectedLanguage, setSelectedLanguage } = useLanguage();

    useEffect(() => {
        if (authUser) {
            setFullName(authUser.fullName || '');
            setUsername(authUser.username || '');
            setProfilePic(authUser.profilePic || '');
            setSelectedCountry(authUser.country || '');
            setSelectedLanguage(authUser.language || '');
        }
    }, [authUser, setSelectedLanguage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/profile/updateProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    profilePic,
                    country: selectedCountry,
                    language: selectedLanguage,
                    password,
                    userId: authUser._id,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const updatedUser = {
                    ...authUser,
                    fullName: data.fullName,
                    username: data.username,
                    profilePic: data.profilePic,
                    country: data.country,
                    language: data.language,
                };
                setAuthUser(updatedUser);
                localStorage.setItem("chat-user", JSON.stringify(updatedUser));
                closeEditProfile();
                alert('Profile updated successfully');
            } else {
                alert(data.error || 'Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Error updating profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderInput = (label, value, setValue, type = 'text') => (
        <div className="mb-6 w-full relative">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition duration-300 ease-in-out"
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={label}
            />
        </div>
    );

    const renderSelect = (label, value, setValue, options) => (
        <div className="mb-6 w-full">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition duration-300 ease-in-out"
            >
                {options.map((option) => (
                    <option key={option.code} value={option.code}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="relative">
            <button
                onClick={closeEditProfile}
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900 focus:outline-none text-xl"
            >&times;
            </button>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto">
                {renderInput("Full Name", fullName, setFullName)}
                {renderInput("Username", username, setUsername)}
                {renderInput("Profile Picture URL", profilePic, setProfilePic)}
                {renderSelect("Country", selectedCountry, setSelectedCountry, availableCountries)}
                {renderSelect("Language", selectedLanguage, setSelectedLanguage, availableLanguages)}
                {renderInput("New Password", password, setPassword, 'password')}
                <button
                    type="submit"
                    className={`w-full px-4 py-2 mt-4 text-white bg-orange-600 rounded-md 
                        hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 
                        transition-all duration-300 ease-in-out transform hover:scale-105 
                        ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Updating...' : 'Done'}
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;