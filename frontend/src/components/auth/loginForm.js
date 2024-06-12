import { disable, enable } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";


export default function LoginForm() {
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.User.data);

    // if(userData.access_token){
    // }

    function handelSignupRoute(e) {
        e.preventDefault();
        dispatch(enable("signup"))
    }

    function SignupWithEmail(e) {
        e.preventDefault();

    }

    return (
    <>
        <div className=" relative   bg-white flex flex-col items-center justify-center">
      
                <h2 className=" text-[28px] font-serif ">Welcome back.</h2>

                <div className=" h-[312px] flex flex-col justify-between ">
                    {/* Google signip */}
                    <div className=" w-64 mt-[50px] flex flex-col gap-3 text-base ">
                        <div className=" w-full border border-black p-2 rounded-full flex justify-start items-center">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className=""
                            >
                                <g fill-rule="evenodd" clip-rule="evenodd">
                                    <path
                                        d="M20.64 12.2c0-.63-.06-1.25-.16-1.84H12v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92a8.78 8.78 0 0 0 2.68-6.61z"
                                        fill="#4285F4"
                                    ></path>
                                    <path
                                        d="M12 21a8.6 8.6 0 0 0 5.96-2.18l-2.91-2.26a5.41 5.41 0 0 1-8.09-2.85h-3v2.33A9 9 0 0 0 12 21z"
                                        fill="#34A853"
                                    ></path>
                                    <path
                                        d="M6.96 13.71a5.41 5.41 0 0 1 0-3.42V7.96h-3a9 9 0 0 0 0 8.08l3-2.33z"
                                        fill="#FBBC05"
                                    ></path>
                                    <path
                                        d="M12 6.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 3.96 7.96l3 2.33A5.36 5.36 0 0 1 12 6.6z"
                                        fill="#EA4335"
                                    ></path>
                                </g>
                            </svg>
                            <span className=" px-4">Sign in with Google</span>
                        </div>

                        {/* facebook signin */}

                        <div className=" w-full text-base border border-black p-2 rounded-full flex justify-start items-center">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="l"
                            >
                                <path
                                    d="M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.54V9.8c0-2.5 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.78-1.63 1.57V12h2.78l-.45 2.9h-2.33v6.98A10 10 0 0 0 22 12z"
                                    fill="#1877F2"
                                ></path>
                                <path
                                    d="M15.9 14.9l.44-2.9h-2.78v-1.87c0-.8.39-1.57 1.63-1.57h1.26V6.1s-1.14-.2-2.24-.2c-2.28 0-3.77 1.4-3.77 3.9V12H7.9v2.9h2.54v6.98a10.07 10.07 0 0 0 3.12 0V14.9h2.33z"
                                    fill="#fff"
                                ></path>
                            </svg>
                            <span className=" px-4">Sign in with Facebook</span>
                        </div>

                        {/* X signin */}

                        <div className=" w-full text-base border border-black p-2 rounded-full flex justify-start items-center">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="as"
                            >
                                <path
                                    d="M13.35 10.93l5.53-6.43h-1.31l-4.8 5.59L8.92 4.5H4.5l5.8 8.45-5.8 6.74h1.31l5.08-5.9 4.05 5.9h4.42l-6.01-8.76zm-1.8 2.09l-.59-.84-4.68-6.7H8.3l3.77 5.4.6.85 4.9 7.02h-2.01l-4.01-5.73z"
                                    fill="#242424"
                                ></path>
                            </svg>
                            <span className=" px-4">Sign in with X</span>
                        </div>

                        {/* email signin */}

                        <button className=" w-full text-base border border-black p-2 rounded-full flex justify-start items-center"
                            onClick={SignupWithEmail}
                        >

                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="as"
                            >
                                <g stroke="#242424">
                                    <rect x="3.5" y="5.5" width="17" height="13" rx="1"></rect>
                                    <path d="M3.5 8l8.5 6 8.5-6" stroke-linecap="round"></path>
                                </g>
                            </svg>
                            <span className=" px-4">Sign in with Email</span>
                        </button>
                    </div>

                    <p className=" text-center">
                        No account?{" "}
                        <span
                            className=" text-[#1A8917] font-extrabold cursor-pointer"
                            onClick={handelSignupRoute}
                        >
                            Create one
                        </span>
                    </p>
                </div>

                <p className=" w-52 text-xs mt-14 text-center">
                    Forgot email or trouble signing in? Get help.
                </p>


                <p className=" w-52 text-xs mt-14 text-center">
                    Click “Sign up” to agree to Medium’s Terms of Service and acknowledge
                    that Medium’s Privacy Policy applies to you.
                </p>
        </div>
    </>
    );
}
