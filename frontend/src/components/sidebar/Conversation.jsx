import useConversation from "../../zustand/useConversation.js";
import {useSocketContext} from "../../context/SocketContext.jsx";

const Conversation = ({conversation, lastIdx, language}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return <>
        <div className={`flex gap-4 items-center hover:bg-gray-100 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-gray-200" : ""}
        `}
             onClick={() => setSelectedConversation(conversation)}
        >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-16 md:w-12 rounded-full">
                    <img src={conversation.profilePic} alt="user avatar" />
                </div>
            </div>

            <div className="flex flex-col flex-1 border-b pb-5">
                <div className="flex gap-3 justify-between">
                    <div className="flex flex-col overflow-hidden">
                        <p className="font-bold text-xl md:font-normal md:text-lg text-black whitespace-nowrap overflow-hidden text-ellipsis">{conversation.fullName}</p>
                        <p className="font-normal text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">{isOnline ? "online" : "offline"}</p>
                    </div>
                    <span className="pl-5 text-sm text-gray-500">{language}</span>
                </div>
                {/*{!lastIdx && <div className="divider my-0 py-0 h-1" />}*/}
            </div>
        </div>


    </>;
};
export default Conversation;
