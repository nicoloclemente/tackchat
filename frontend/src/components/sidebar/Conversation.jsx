import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

const Conversation = ({ conversation, lastIdx, language }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <div
            className={`flex gap-4 items-center hover:bg-gray-100 rounded p-2 py-1 cursor-pointer
            ${isSelected ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedConversation(conversation)}
        >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-16 md:w-12 rounded-full">
                    <img src={conversation.profilePic} alt="user avatar" />
                </div>
            </div>

            <div className="flex flex-col flex-1 border-b pb-5">
                <div className="flex justify-between items-baseline">
                    <div className="flex flex-col overflow-hidden">
                        <div className="flex items-baseline">
                            <p className="font-bold text-xl md:font-normal md:text-lg text-black whitespace-nowrap overflow-hidden text-ellipsis">
                                {conversation.fullName}
                            </p>
                            <span className="ml-2 font-normal text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                                [{conversation.username}]
                            </span>
                        </div>
                        <p className="font-normal text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                            {isOnline ? "online" : "offline"}
                        </p>
                    </div>
                    {/*<span className="pl-5 text-gray-500">{language}</span>*/}
                </div>
            </div>
        </div>
    );
};

export default Conversation;