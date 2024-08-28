import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../../context/AuthContext.jsx";

const UpdateProfile = ({ closeEditProfile }) => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null); // Stato per tracciare l'input attualmente focalizzato

    const { authUser, setAuthUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            setFullName(authUser.fullName || '');
            setUsername(authUser.username || '');
            setProfilePic(authUser.profilePic || '');
        }
    }, [authUser]);

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
                };
                setAuthUser(updatedUser);
                localStorage.setItem("chat-user", JSON.stringify(updatedUser));
                closeEditProfile();
                alert('Profilo aggiornato con successo');
            } else {
                alert(data.error || 'Errore durante l\'aggiornamento del profilo');
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento del profilo', error);
            alert('Errore durante l\'aggiornamento del profilo');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFocus = (inputName) => {
        setFocusedInput(inputName);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    const clearInput = (setInputValue) => {
        setInputValue('');
    };

    const renderInput = (label, value, setValue, type = 'text') => (
        <div className="mb-4 w-full relative">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <input
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => handleFocus(label)}
                    onBlur={handleBlur}
                    placeholder={label}
                />
                {focusedInput === label && value && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                        onClick={() => clearInput(setValue)}
                    >
                        &times;
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-start">
            {renderInput("Full Name", fullName, setFullName)}
            {renderInput("Username", username, setUsername)}
            {renderInput("Profile Picture URL", profilePic, setProfilePic)}
            {renderInput("New Password", password, setPassword, 'password')}
            <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Updating...' : 'Done'}
            </button>
        </form>
    );
};

export default UpdateProfile;