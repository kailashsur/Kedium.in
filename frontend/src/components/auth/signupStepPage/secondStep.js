
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { emailRegex, passwordRegex } from "@/lib/regX";
import AuthLayer from "@/pages/AuthLayer";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { toast_theme1 } from "@/lib/hot-toast";


export default function SecondStep({ prev, next, currentState }) {
  const dispatch = useDispatch();
  const [errorState, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const step = useSelector((state) => state.Auth.step);

  const uData = useSelector((state) => state.User.data)

  const prevPath = useSelector((state) => state.Path.toGoPath);

  const router = useRouter();
  const { asPath } = router;
  

  const [isButtonDisabled, setButtonDisabled] = useState(false);


  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setButtonDisabled(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData);

    if (!formDataObj.email.length) {
      setError("Enter Email");
      setTimeout(() => {
        setError("");
        setButtonDisabled(false);
      }, 5000);
      return
    }
    if (!emailRegex.test(formDataObj.email)) {
      setError("Email is invalid")
      setTimeout(() => {
        setError("");
        setButtonDisabled(false);
      }, 5000);
      return
    }
    if (!passwordRegex.test(formDataObj.password)) {
      setError("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
      setTimeout(() => {
        setError("");
        setButtonDisabled(false);
      }, 5000);
      return
    }
    // The function or method fetching for signup
    if (currentState == "signup") {
      let loading = toast.loading("Please wait...", toast_theme1)
      try {
        const responce = await axios.post(`${process.env.API_URL}/api/v1/u/auth/signup`,
          { "email": formDataObj.email, "password": formDataObj.password },
          { withCredentials: true });

        toast.dismiss(loading)
        if (responce) {
          // dispatch(addUser(responce.data.user));
          toast.success("Signup Successfully", toast_theme1)
          setLoading(false)
          setTimeout(() => {
            setError("");
            next();
          }, 5000);
        }

      } catch (error) {
        setError(error.message)
       
        setLoading(false);
        toast.dismiss(loading);
        setButtonDisabled(false);
        toast.error(error.message, toast_theme1)
        setTimeout(() => {
          setError("");
        }, 5000);

      } finally {
        toast.dismiss(loading)
        setLoading(false);
      }
    }
    // This is for login fetching 
    if (currentState == "login") {
      let loading = toast.loading("Please wait...", toast_theme1)
      try {
        const responce = await axios.post(`${process.env.API_URL}/api/v1/u/auth/login`,
          { "email": formDataObj.email, "password": formDataObj.password },
          { withCredentials: true });
        toast.dismiss(loading)

        if (responce) {
          toast.success("Login Successfully", toast_theme1)
          // dispatch(addUser(responce.data.user));
          setLoading(false)
          setError("");

          let loading = toast.loading("Redirecting ...")
          
          setTimeout(() => {
            toast.dismiss(loading);
            router.reload();
          }, 3000);

        }

      } catch (error) {
        setError(error.message)
        toast.error(error.message, toast_theme1)
        setLoading(false);
        setButtonDisabled(false);

        setTimeout(() => {
          setError("");

        }, 5000);
      } finally {
        setLoading(false);
        toast.dismiss(loading)
      }
    }





  }

  function handelBack(e) {
    e.preventDefault();
    prev();
  }

  // --------------------------------------------------------------------------------

  if (step == 2)
    return (
      <AuthLayer>
        <>
          <h2 className=" text-[28px] font-serif ">
            {
              currentState == "signup" ? "Sign up with email" : currentState == "login" ? "Sign in with email" : ""
            }
          </h2>

          <div className=" h-[312px] flex flex-col justify-between items-center ">

            {/* Input form  */}
            <form className=" flex flex-col gap-8 mt-12" onSubmit={handelSubmit}>
              <div className=" flex flex-col gap-2">
                <label className=" text-xs text-center">Your email</label>
                <input className=" border-b border-black focus:outline-none focus text-center "
                  type="text" name="email" />
              </div>

              <div className=" flex flex-col gap-2">
                <label className=" text-xs text-center">Password</label>
                <input className=" border-b border-black focus:outline-none focus text-center "

                  type="text" name="password" />
              </div>

              <button type="submit"
                disabled={isButtonDisabled}
                className="bg-black text-white py-2 px-4 rounded-full text-sm disabled:bg-gray-500  "
              >{
                  currentState == "login" ? "Login" : "Continue"
                }</button>
            </form>
            {/* <div>
          {
            loading ? "loading..." : ""
          }
        </div> */}

            <div className=" text-red-600 p-4">
              {
                errorState != undefined ? `${errorState}` : ""
              }
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

              {
                currentState == "signup" ? "All sign up options" : currentState == "login" ? "All sign in options" : ""
              }
            </div>


          </div>

          {/* footer policys */}
          <div className=" text-xs mt-14 text-center px-2">
            <p className="">
              This site is protected by reCAPTCHA Enterprise and the
            </p>
            <p className=" mt-1 px-2">
              <span className=" underline">Google Privacy Policy</span> and <span className=" underline">Terms of Service</span> apply.
            </p>
          </div>
        </>
      </AuthLayer>
    );
}
