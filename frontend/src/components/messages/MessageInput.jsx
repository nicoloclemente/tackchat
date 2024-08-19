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
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="flex w-full items-center">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300 text-black caret-black"
                    placeholder="Send a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="ml-4 text-xl text-white hover:bg-blue-500 p-3 bg-orange-600 rounded-xl border border-gray-300"
                >
                    {loading ? <div className="loading loading-spinner"></div> : <RiSendPlaneFill />}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;