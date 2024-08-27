import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../../context/AuthContext.jsx";

const UpdateProfile = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [password, setPassword] = useState('');

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
                // Aggiorna il contesto dell'utente con i nuovi dati
                const updatedUser = {
                    ...authUser,
                    fullName: data.fullName,
                    username: data.username,
                    profilePic: data.profilePic,
                };
                setAuthUser(updatedUser);

                // Salva i dati aggiornati nel localStorage
                localStorage.setItem("chat-user", JSON.stringify(updatedUser));

                alert('Profilo aggiornato con successo');
            } else {
                alert(data.error || 'Errore durante l\'aggiornamento del profilo');
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento del profilo', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col items-start">
            <input
                type="text"
                placeholder="Nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="URL immagine del profilo"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
            />
            <input
                type="password"
                placeholder="Nuova password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="text-lg hover:bg-gray-400 font-bold text-orange-600 mt-4 p-2 border border-orange-600 rounded-full">Update</button>
        </form>
    );
};

export default UpdateProfile;