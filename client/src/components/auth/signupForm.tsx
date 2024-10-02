"use client";


import { AuthState, disable, updateState, updateStep } from "@/store/slices/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import of the steps of the signup form
import FirstStep from "./signupStepPage/FirstStep";
import SecondStep from "./signupStepPage/SecondStep";
import ThirdStep from "./signupStepPage/ThirdStep";
import { useRouter } from "next/router";
import { UserState } from "@/store/slices/userSlice";


export default function SignupForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {step, state} = useSelector((state : {Auth : AuthState}) => state.Auth);

  // Steps of signup
  const [currentStep, setCurrentStep] = useState<number>(step);
  const [currentState, setCurrentState] = useState<string>(state);

  const UserData =  useSelector((state : { User : UserState})=>state.User.data)
 
  
  useEffect(() => {
    setCurrentStep(step);
    setCurrentState(state);
  }, [state, step]);

  if(UserData?.access_token && currentState == "signup"){
    dispatch(updateStep(3))
  }
  if(UserData?.access_token && currentState == "login"){
    router.push("/")
  }
  



// handel next and prev function
  function handleNextStep() : void {
    dispatch(updateStep(currentStep + 1) );
  }

  function handlePrevStep() : void {
    dispatch(updateStep(currentStep - 1) );
  }

  // Cross close window button to handel the popup window close
  function handelclosewindow(e : React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(disable());
  }

  // These steps are for signup with email only
  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <FirstStep next={handleNextStep} currentState={currentState}/>;
      case 2:
        return <SecondStep prev={handlePrevStep} next={handleNextStep} currentState={currentState} />;
      case 3:
        return <ThirdStep />;
      
      default:
        return <FirstStep  next={handleNextStep} currentState={currentState}/>;
    }
  };


  return (
    <>
      <div className=" bg-primary-background dark:bg-primary-dart-background dark:text-primary-dark-text relative h-full w-full sm:max-w-[680px] flex flex-col items-center justify-center">
        {/* Cross Clos Action button */}
        <button
          className=" absolute top-0 right-0 p-2"
          onClick={handelclosewindow}
        >
          <svg className="ia fr ib hg" width="29" height="29">
            <path
              d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>

        {/* Steps of Signup */}
        {/* In first step, the home page of the signup form */}
        {renderForm()}
      </div>
    </>
  );
}
