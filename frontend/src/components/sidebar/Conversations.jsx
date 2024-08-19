import Conversation from "./Conversation.jsx";
import useGetConversations from "../../hooks/useGetConversations.js";
import {getRandomLanguageCode} from "../../utils/language.js";

const Conversations = () => {
    const {loading, conversations} = useGetConversations();
    return (
        <div className="py-2 flex flex-col overflow-auto">

            {conversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    language={getRandomLanguageCode()}
                    lastIdx={idx === conversations.length - 1}
                />
            ))}
            {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
        </div>
    );
};
export default Conversations;
