// Login.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin.js";
import TypingEffect from "../../components/TypingEffect.jsx";
import InstallPopup from "../../components/InstallPopup.jsx";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative">
            <InstallPopup />
            <div className="mb-8">
                <img src="/tackchat-logo.png" alt="tackchat-logo" className="max-w-xs mx-auto" />
            </div>
            <div id="typing-wrapper" className="pb-3 md:block hidden">
                <span id="fixed-type">Chat with people in</span>
                <TypingEffect />
                <span id="cursor"></span>
            </div>
            <div
                className="flex flex-col items-center justify-center w-full max-w-md p-6 rounded-xl shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 bg-white"
            >
                <form onSubmit={handleSubmit} className="w-full">
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="w-full input input-bordered h-10"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered h-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/signup" className="text-sm hover:underline hover:text-orange-600 mt-2 inline-block">
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button
                            className="btn btn-block btn-sm mt-2 border border-slate-700 hover:bg-blue-500 bg-orange-600 h-12 text-xl"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;