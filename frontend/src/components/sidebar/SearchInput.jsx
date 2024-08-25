import { CiSearch } from "react-icons/ci";
import {useState} from "react";
import useConversation from "../../zustand/useConversation.js";
import useGetConversations from "../../hooks/useGetConversations.js";
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const {setSelectedConversation} = useConversation();
    const {conversations} = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search term must be at least 3 characters");
        }

        const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else toast.error("No such user found!")
    }
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
            <input type="text" placeholder="Search..." className="input input-bordered w-full h-10 rounded-xl caret-orange-600 focus:outline-none"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-circle bg-orange-600 hover:bg-blue-500 text-white border-0">
                <CiSearch className="w-6 h-6 outline-none" />
            </button>
        </form>
    )
}
export default SearchInput;