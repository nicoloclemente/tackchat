import { IoSend } from "react-icons/io5";
import {useState} from "react";
import useSendMessage from "../../hooks/useSendMessage.js";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const {loading, sendMessage} = useSendMessage();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    }
    return (
        <form className="px-4 py-2 bg-gray-200 mb-7 bg-opacity-50" onSubmit={handleSubmit}>
            <div className="flex w-full items-center">
                <input
                    type="text"
                    className="ml-2 rounded-full block w-full p-2 bg-white text-black caret-orange-600 outline-none"
                    placeholder="Send a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="mx-2 text-xl hover:text-blue-500 p-2.5 text-white bg-orange-600 rounded-full"
                >
                    {loading ? <div className="loading loading-spinner"></div> : <IoSend />}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;