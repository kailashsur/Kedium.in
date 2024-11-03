import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "../../components/auth/user-auth-form"
import { useEffect, useState } from "react"
import Step1 from "@/components/auth/signup/step1"
import Step2 from "@/components/auth/signup/step2"
import Step3 from "@/components/auth/signup/step3"
import Step4 from "@/components/auth/signup/step4"
import Step5 from "@/components/auth/signup/step5"
import AccountCreatedSuccessfully from "@/components/auth/signup/step5"
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import Loader from "@/components/ui/loader"
import { useParams } from "next/navigation"

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}







interface AuthProps extends React.HTMLAttributes<HTMLDivElement> { }

export interface AuthFormType {
    email: string;
    password: string;
    username: string;
    fullname: string;
}

export default function Auth() {

    //  Step onboarding authentication
    //  Step 1: enter email & password
    //  Step 2: Verify Email by entering otp
    //  Step 4: Set Username
    //  Step 3: Enter Fullname
    //  Step 5: Set Profile Picture
    //  Step 6: Complete

    // Or
    // Step 1: Sign In [ Email/Username, Password ] or sign in with google or github
    // go to profile page

    // set form in session storage and get it from there
    const [accessToken, setAccessToken] = useState<string>("")
    const [form, setForm] = useState<AuthFormType>({} as AuthFormType)
    const [UserData, setUserData] = useState<any>({})
    
    const router = useRouter();
    const [referrerUrl, setReferrerUrl] = useState<string>("");
    
    const { isOnboardingQuery} = router.query as { isOnboardingQuery: string|boolean }
    


    const [onboarding, setOnboarding] = useState<boolean>(isOnboardingQuery == (true || 'true')) 
    
    useEffect(() => {

        if (isOnboardingQuery == 'true') {
            setOnboarding(true)
        } 
        
        if(isOnboardingQuery == 'false'){
            setOnboarding(false)
        }
    }
    , [isOnboardingQuery])

    
    /**
     * explain the above line
     *  isOnboardingQuery is a string and it can be 'true' or 'false'
     * if it is 'true' then setOnboarding to true else set it to false
     * 
     */
    const [step, setStep] = useState<number>(1)                      // Step 1, 2, 3, 4, 5, 6

    const totalSteps = 6




    useEffect(() => {
        // Set the referrer URL
        setReferrerUrl(document.referrer);
    }, []); // here add dependancy FIXME:

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const { data: { accessToken } } = await axios.get('/api/getAccessToken');
                setAccessToken(accessToken);

                const { data: { data } } = await axios.get(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/auth/login-with-access-token`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                setUserData(data);

                setForm({
                    email: data.email,
                    password: "",
                    username: data.username,
                    fullname: data.fullname
                });

                if (!data.email_verified) {
                    // setOnboarding(true);
                    // setStep(2);

                    toast.custom((t) => (
                        <div
                            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                        >
                            <div className="flex-1 w-0 p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 pt-0.5">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src="/images/profile.png"
                                            alt="Verify Email"
                                        />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            Hi, {data.fullname}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Please check your {data.email} inbox to verify your email address.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-l border-gray-200">
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        setOnboarding(true);
                                        setStep(2);
                                    }}
                                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </div>
                    ));
                }

            } catch (error) {
                // Log the error response

            }
        };
        fetchToken();
    }, [])





    const renderStep = () => {

        switch (step) {
            case 1:
                return <Step1 onboarding={onboarding} setOnboarding={setOnboarding} step={step} setStep={setStep} form={form} setForm={setForm} />
            case 2:
                return <Step2 accessToken={accessToken} setAccessToken={setAccessToken} step={step} setStep={setStep} form={form} setForm={setForm} />
            case 3:
                return <Step3 step={step} setStep={setStep} form={form} setForm={setForm} />
            case 4:
                return <Step4 step={step} setStep={setStep} form={form} setForm={setForm} />
            case 5:
                return <AccountCreatedSuccessfully form={form} referrerUrl={referrerUrl} />
            case 6:
                return null;
        }
    }


    //   if (accessToken && (!UserData.email_verified || onboarding)) {
    //     setTimeout(() => {
    //         router.push('/');
    //     }, 3000);
    //     return <Loader />;
    //   }

    if (accessToken && UserData.email_verified && !onboarding) {

        setTimeout(() => {
            router.push('/');
        }, 3000);
        return (
            <Loader />
        )
    }



    // if(accessToken && !UserData.email_verified){
    //     return (
    //         <Loader />
    //     )
    // }

    return (
        <div className=" font-Mori">
            {/* <Toaster position="top-center" reverseOrder={false} /> */}
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
{/* 
    for onboarding
*/}
            {onboarding &&
                renderStep()
            }

{/* 
    for sign in
*/}
            {!onboarding &&
                <Step1 onboarding={onboarding} setOnboarding={setOnboarding} step={step} setStep={setStep} form={form} setForm={setForm} referrerUrl={referrerUrl} />
            }

{/* for sign in
 */}

            {
                !UserData.email_verified && !onboarding && step === 2 && (<Step2 accessToken={accessToken} setAccessToken={setAccessToken} step={step} setStep={setStep} form={form} setForm={setForm} />)
            }
        </div>

    )


}