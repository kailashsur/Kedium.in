import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { emailRegex, passwordRegex } from "@/lib/regX";
import AuthLayer from "@/Layout/AuthLayer";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { toast_theme1 } from "@/lib/hot-toast";
import { AuthState, enable } from "@/store/slices/authSlice";

// define the type of the props
interface Props {
  prev: () => void;
  next: () => void;
  currentState: string;
}

export default function SecondStep({ prev, next, currentState }: Props) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const [errorState, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const step = useSelector((state: { Auth: AuthState }) => state.Auth.step);

  //   const uData = useSelector((state) => state.User.data)

  //   const prevPath = useSelector((state) => state.Path.toGoPath);

  const router = useRouter();

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setButtonDisabled(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData);

    if (!formDataObj.email.toString().length) {
      setError("Enter Email");
      setTimeout(() => {
        setError("");
        setButtonDisabled(false);
      }, 5000);
      return;
    }
    if (!emailRegex.test(formDataObj.email.toString())) {
      setError("Email is invalid");
      setTimeout(() => {
        setError("");
        setButtonDisabled(false);
      }, 5000);
      return;
    }
    if (!passwordRegex.test(formDataObj.password.toString())) {
      setError(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
      );
      setTimeout(() => {
        setError("");
        setButtonDisabled(false);
      }, 5000);
      return;
    }
    // The function or method fetching for signup
    if (currentState == "signup") {
      let loading = toast.loading("Please wait...", toast_theme1);
      try {
        const responce = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/u/auth/signup`,
          { email: formDataObj.email, password: formDataObj.password },
          { withCredentials: true },
        );

        toast.dismiss(loading);
        if (responce) {
          // dispatch(addUser(responce.data.user));
          toast.success("Signup Successfully", toast_theme1);
          setLoading(false);
          setTimeout(() => {
            setError("");
            next();
          }, 5000);
        }
      } catch (error: any) {
        setError(error.message);

        setLoading(false);
        toast.dismiss(loading);
        setButtonDisabled(false);
        toast.error("You are alredy registered, please login", toast_theme1);
        setTimeout(() => {
          setError("");
        }, 5000);
      } finally {
        toast.dismiss(loading);
        setLoading(false);
      }
    }
    // This is for login fetching
    if (currentState == "login") {
      let loading = toast.loading("Please wait...", toast_theme1);
      try {
        const responce = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/u/auth/login`,
          { email: formDataObj.email, password: formDataObj.password },
          { withCredentials: true },
        );
        toast.dismiss(loading);

        if (responce) {
          toast.success("Login Successfully", toast_theme1);
          // dispatch(addUser(responce.data.user));
          console.log("responce = ", responce.data);
          setLoading(false);
          setError("");

          let loading = toast.loading("Redirecting ...");

          setTimeout(() => {
            toast.dismiss(loading);
            router.push("/dashboard");
          }, 3000);
        }
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
        setButtonDisabled(false);

        if (error) {
          toast.error(
            "You are not registered user. Create your account.",
            toast_theme1,
          );
          dispatch(enable("signup"));
        }
        setTimeout(() => {
          setError("");
        }, 5000);
      } finally {
        setLoading(false);
        toast.dismiss(loading);
      }
    }
  }

  function handelBack(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    prev();
  }

  // --------------------------------------------------------------------------------

  if (step == 2)
    return (
      <AuthLayer>
        <>
          <h2 className=" text-[28px] font-serif ">
            {currentState == "signup"
              ? "Sign up with email"
              : currentState == "login"
                ? "Sign in with email"
                : ""}
          </h2>

          <div className=" h-[312px] flex flex-col justify-between items-center ">
            {/* Input form  */}
            <form
              className=" flex flex-col gap-8 mt-12"
              onSubmit={handelSubmit}
            >
              <div className=" flex flex-col gap-2">
                <label className=" text-xs text-center">Your email</label>
                <input
                  className="backdrop-blur-md bg-white/30 border border-primary-text/30 rounded-md p-1 focus:outline-none focus:border focus:border-sky-600 text-center px-2 py-1 "
                  placeholder="example@yourdomein.com"
                  type="email"
                  name="email"
                />
              </div>

              <div className=" flex flex-col gap-2">
                <label className=" text-xs text-center">Password</label>

                <div className=" relative flex items-center">
                  <input
                    className=" backdrop-blur-md bg-white/30 border border-primary-text/30 rounded-md p-1 focus:outline-none focus:border focus:border-sky-600 text-center px-2 py-1 "
                    placeholder="Password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                  />
                  <svg
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordVisible(!isPasswordVisible);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 absolute  right-2  font-bold text-primary-text cursor-pointer rounded-sm "
                  >
                    {isPasswordVisible ? (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </>
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    )}
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                disabled={isButtonDisabled}
                className="bg-primary-button font-bold text-white py-2 px-4 rounded-md text-sm disabled:bg-gray-500  "
              >
                {currentState == "login" ? "Login" : "Continue"}
              </button>
            </form>
            {/* <div>
          {
            loading ? "loading..." : ""
          }
        </div> */}

            <div className=" text-red-600 p-4">
              {errorState != undefined ? `${errorState}` : ""}
            </div>

            {/* All signup options */}
            <div
              className=" text-[#1A8917] cursor-pointer flex items-center"
              onClick={handelBack}
            >
              <svg
                className=" inline-block "
                width="24"
                height="24"
                viewBox="0 0 19 19"
              >
                <path
                  d="M11.47 13.97L6.99 9.48 11.47 5l.55.5-3.99 3.98 4 4z"
                  color="#1A8917"
                  fillRule="evenodd"
                ></path>
              </svg>

              {currentState == "signup"
                ? "All sign up options"
                : currentState == "login"
                  ? "All sign in options"
                  : ""}
            </div>
          </div>

          {/* footer policys */}
          <div className=" text-xs mt-14 text-center px-2">
            <p className="">
              This site is protected by reCAPTCHA Enterprise and the
            </p>
            <p className=" mt-1 px-2">
              <span className=" underline">Google Privacy Policy</span> and{" "}
              <span className=" underline">Terms of Service</span> apply.
            </p>
          </div>
        </>
      </AuthLayer>
    );
}
