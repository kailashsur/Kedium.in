import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "../user-auth-form"
import { AuthFormType } from "@/pages/u/auth"

interface Step1Props extends React.HTMLAttributes<HTMLDivElement> {
    onboarding: boolean
    setOnboarding: React.Dispatch<React.SetStateAction<boolean>>
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
    form: AuthFormType
    setForm: React.Dispatch<React.SetStateAction<AuthFormType>>
    referrerUrl?: string
}

export default function Step1({ onboarding, setOnboarding, step, setStep, form, setForm, referrerUrl }: Step1Props) {


    return (<>
        {/* Step - 1 [ Create or Login account ] */}
        <div className=" relative min-h-screen w-full h-full flex flex-col items-center justify-center p-6 font-Mori ">
            <button
                onClick={() => setOnboarding(!onboarding)}
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8 bg-lime-500 text-white"
                )}
            >
                {onboarding ? "Sign In" : "Sign Up"}
            </button>

            <div className="lg:p-8 flex justify-center items-center ">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {onboarding ? 'Create an account' : 'Sign in to your account'}
                        </h1>
                        <p className="text-sm text-muted-foreground ">
                            Enter your email below to {onboarding ? 'create an account' : 'sign in to your account'}
                        </p>
                    </div>
                    <UserAuthForm onboarding={onboarding} setOnboarding={setOnboarding} step={step} setStep={setStep} form={form} setForm={setForm} />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    </>)
}