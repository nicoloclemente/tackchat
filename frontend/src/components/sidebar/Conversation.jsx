import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import {extractTime} from "../../utils/extractTime.js";

const Conversation = ({ conversation }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    const isSelected = selectedConversation?._id === conversation._id;
console.log(conversation);
    return (
        <div
            className={`flex gap-4 items-center hover:bg-gray-100 rounded cursor-pointer px-4 
            ${isSelected ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedConversation(conversation)}
            style={{ maxWidth: "100%" }}
        >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-[4.5rem] md:w-12 rounded-full">
                    <img src={conversation.profilePic} alt="user avatar" />
                </div>
            </div>

            <div className="flex flex-col flex-1 border-b py-2 overflow-hidden">
                <div className="flex justify-between items-baseline overflow-hidden">
                    <div className="flex flex-col overflow-hidden flex-1">
                        <div className="flex items-baseline overflow-hidden">
                            <p className="font-bold text-xl md:font-normal md:text-lg text-black whitespace-nowrap overflow-hidden text-ellipsis">
                                {conversation.fullName}
                            </p>
                        </div>
                        <span className="font-semibold text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                            {conversation.username}
                        </span>
                        <span className="font-normal text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                            {conversation.lastMessageText ? conversation.lastMessageText : <span>&nbsp;</span>}
                        </span>
                    </div>
                    <span className="pl-5 text-gray-500">
                         {extractTime(conversation.lastMessageDate)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Conversation;