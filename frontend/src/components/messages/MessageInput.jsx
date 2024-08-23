import { RiSendPlaneFill } from "react-icons/ri";
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
        <form className="px-4 py-2 bg-gray-200 pb-7 md:pb-2" onSubmit={handleSubmit}>
            <div className="flex w-full items-center">
                <input
                    type="text"
                    className="ml-2 rounded-lg block w-full p-2.5 bg-white text-black caret-black"
                    placeholder="Send a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="ml-2 mr-2 text-[30px] hover:text-blue-500 p-3 text-black"
                >
                    {loading ? <div className="loading loading-spinner"></div> : <RiSendPlaneFill />}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;