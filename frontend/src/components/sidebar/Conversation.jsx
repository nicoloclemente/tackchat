import useConversation from "../../zustand/useConversation.js";
import {useSocketContext} from "../../context/SocketContext.jsx";

const Conversation = ({conversation, lastIdx, language}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return <>
        <div className={`flex gap-2 items-center hover:bg-gray-100 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-gray-200" : ""}
        `}
             onClick={() => setSelectedConversation(conversation)}
        >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img src={conversation.profilePic} alt="user avatar" />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <div className="flex flex-col overflow-auto">
                        <p className="font-bold text-black">{conversation.fullName}</p>
                        <p className="font-thin text-sm text-black">{isOnline ? "online" : "offline"}</p>
                    </div>
                    <span className="text-xl">{language}</span>
                </div>
            </div>
        </div>

        {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>;
};
export default Conversation;
