import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";

const Sidebar = () => {
    return (
        <div className="bg-white border-r border-slate-500 p-4 flex flex-col">
            <h1 className="p-2 py-1 font-bold text-xl">Chat</h1>
            <SearchInput />
            <div className="divider px-3"></div>
            <Conversations />

            <LogoutButton />
        </div>
    )
}
export default Sidebar;