import { CiLogout } from "react-icons/ci";
import useLogout from "../../../hooks/useLogout.js";

const LogoutButton = () => {

    const {loading, logout} = useLogout();

    return (
        <div className="mt-auto">
            {!loading ? (
                <CiLogout className="w-6 h-6 text-black cursor-pointer hover:text-orange-600"
                          onClick={logout}
                />
            ) : (
                <span className="loading loading-spinner"></span>
            )}
        </div>
    );
};
export default LogoutButton;


