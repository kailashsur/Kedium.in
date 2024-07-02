import { useDispatch, useSelector } from "react-redux";
import { enable, updateStep } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { addUser } from "@/store/slices/userSlice";
import { signIn } from "next-auth/react";


export default function FirstStep({ next, currentState }) {
  const dispatch = useDispatch();
  const { step, state } = useSelector((state) => state.Auth);


  const userData = useSelector((state) => state.User.data);




  function handelSigninRoute(e) {
    e.preventDefault();
    currentState == "signup" ? dispatch(enable("login")) : dispatch(enable("signup"))
  }

  function SignupWithEmail(e) {
    e.preventDefault();
    next();
  }

  async function handelOAuthSignIn() {
    const result = await signIn();

    dispatch(addUser(result))
  }

  if (step == 1) {
    return (
      <>
        <h2 className=" text-[28px] font-serif ">
          {
            currentState == "signup" ? "Join Medium." : currentState == "login" ? "Welcome back." : ""
          }
        </h2>

        <div className=" h-[312px] flex flex-col justify-between ">
          {/* Google signup */}
          <div className=" w-64 mt-[50px] flex flex-col gap-3 text-base "
            onClick={handelOAuthSignIn}
          >
            <div className=" w-full border border-black p-2 rounded-full flex justify-start items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className=""
              >
                <g fillRule="evenodd" clipRule="evenodd">
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
              <span className=" px-4">
                {
                  currentState == "signup" ? "Sign up with Google" : currentState == "login" ? "Sign in with Google" : ""
                }
              </span>
            </div>

            {/* End Oautu signup */}


            {/* email signup */}

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
                  <path d="M3.5 8l8.5 6 8.5-6" strokeLinecap="round"></path>
                </g>
              </svg>
              <span className=" px-4">
                {
                  currentState == "signup" ? "Sign up with Email" : currentState == "login" ? "Sign in with Email" : ""
                }
              </span>
            </button>
          </div>

          <p>
            {
              currentState == "signup" ? "No account?" : currentState == "login" ? "Already have an account?" : ""
            }
            {" "}
            <span
              className=" text-[#1A8917] font-bold cursor-pointer"
              onClick={handelSigninRoute}
            >
              {
                currentState == "signup" ? "Sign In" : currentState == "login" ? "Create one" : ""
              }
            </span>
          </p>
        </div>

        <p className=" w-52 text-xs mt-14 text-center">
          Click {

            currentState == "signup" ? "\"Sign in\"" : currentState == "login" ? "\"Sign up\"" : ""

          } to agree to Medium’s Terms of Service and acknowledge
          that Medium’s Privacy Policy applies to you.
        </p>
      </>
    );
  }

}
