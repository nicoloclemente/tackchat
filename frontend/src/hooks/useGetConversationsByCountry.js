import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversationsByCountry = (countryCode) => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!countryCode) return;

        const getConversationsByCountry = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/users`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                // Filtrare gli utenti basati sul countryCode
                const filteredConversations = data.filter(user => user.country === countryCode);
                setConversations(filteredConversations);
            } catch (error) {
                setError(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversationsByCountry();
    }, [countryCode]);

    return { loading, conversations, error };
};

export default useGetConversationsByCountry;