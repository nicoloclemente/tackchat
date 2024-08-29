// SignUp.jsx
import GenderCheckbox from "./GenderCheckbox.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";
import TypingEffect from "../../components/TypingEffect.jsx";
import RegulationPopup from "./RegulationPopup.jsx"; // Import your RegulationPopup component
import InstallPopup from "../../components/InstallPopup.jsx"; // Import the InstallPopup component

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });

    const [isPopupOpen, setPopupOpen] = useState(false); // Manage the state of the RegulationPopup
    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative">
            {/* Install Popup Component */}
            <InstallPopup />

            <div className="mb-8">
                <img src="/tackchat-logo.png" className="max-w-xs mx-auto" alt="TackChat Logo"/>
            </div>
            <div id="typing-wrapper" className="pb-3 md:block hidden">
                <span id="fixed-type">Chat with people in</span>
                <TypingEffect />
                <span id="cursor"></span>
            </div>
            <div className="flex flex-col items-center justify-center w-full max-w-md p-6 rounded-xl shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 bg-white">
                <form onSubmit={handleSubmit} className="w-full">
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name Surname"
                            className="w-full input input-bordered h-10"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="myusername"
                            className="w-full input input-bordered h-10"
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
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
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full input input-bordered h-10"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <div className="my-2 text-xs text-center">
                        By signing up for TackChat, you confirm that you accept our{' '}
                        <span
                            onClick={() => setPopupOpen(true)} // Opens the RegulationPopup
                            className="text-blue-500 cursor-pointer underline"
                        >
                            terms and data processing policy
                        </span>.
                    </div>

                    <Link to={"/login"} className="text-sm hover:underline hover:text-orange-600 mt-2 inline-block">
                        Already have an account?
                    </Link>

                    <div>
                        <button
                            className="btn btn-block btn-sm mt-2 border border-slate-700 hover:bg-blue-500 bg-orange-600 h-12 text-lg"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Regulation Popup */}
            <RegulationPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
        </div>
    );
};

export default SignUp;