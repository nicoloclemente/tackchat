import { IoSend } from "react-icons/io5";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage.js";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        await sendMessage(message.trim());
        setMessage("");
    };

    return (
        <div className="w-full flex justify-center">
            <form
                className="w-5/6 md:w-full px-4 py-3 bg-gray-100 shadow-lg rounded-full md:rounded-none fixed md:relative md:bottom-0 bottom-7"
                onSubmit={handleSubmit}
            >
                <div className="flex items-center">
                    <input
                        type="text"
                        className="flex-grow mr-3 rounded-full block px-4 py-2 bg-white text-black caret-orange-600 outline-none shadow-sm"
                        placeholder="Write a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className={`text-2xl p-3 rounded-full transition-colors duration-300 ${
                            message.trim() ? "text-white bg-orange-600 hover:bg-orange-700" : "text-gray-400 bg-gray-300 cursor-not-allowed"
                        }`}
                        disabled={!message.trim() || loading}
                    >
                        {loading ? <div className="loading loading-spinner"></div> : <IoSend />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;