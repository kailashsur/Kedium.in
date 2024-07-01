import { disable, updateState, updateStep } from "@/store/slices/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FirstStep from "./signupStepPage/FirstStep";
import SecondStep from "./signupStepPage/secondStep";
import ThirdStep from "./signupStepPage/ThirdStep";
import { useRouter } from "next/router";


export default function SignupForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {step, state} = useSelector((state) => state.Auth);

  // Steps of signup
  const [currentStep, setCurrentStep] = useState(step);
  const [currentState, setCurrentState] = useState(state);

  const UserData =  useSelector((state)=>state.User.data)
 
  
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
  function handleNextStep() {
    dispatch(updateStep(currentStep + 1) );
  }

  function handlePrevStep() {
    dispatch(updateStep(currentStep - 1) );
  }

  // Cross close window button to handel the popup window close
  function handelclosewindow(e) {
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
        return <ThirdStep next={handleNextStep} />;
      
      default:
        return <FirstStep />;
    }
  };


  return (
    <>
      <div className=" bg-white relative h-full w-full sm:max-w-[680px] flex flex-col items-center justify-center">
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
